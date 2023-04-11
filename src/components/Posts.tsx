import { useQuery } from 'react-query';
import { fetchPosts, fetchMorePosts, fetchPostByUsername, deletePost, editPost } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import { getTimeAgo } from '../utils';
import { useState, useEffect } from 'react';
import Button from './Button';
import BaseCard from './BaseCard';
import Modal from './Modal';
import FormField from './FormField';
import CustomLoader from './CustomLoader';
import SnackBar from './SnackBar';

function Posts() {
  const [posts, setPosts] = useState<Array<string | number>>([]);
  const [pageCount, setPageCount] = useState<number>(10);
  const [noMorePosts, setNoMorePosts] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [currentPostId, setCurrentPostId] = useState<number>(0);
  const [emptyFields, setEmptyFields] = useState<boolean>(true);
  const [postsLoading, setPostsLoading] = useState<boolean>(false);
  const [hasDeletedPost, setHasDeletedPost] = useState<boolean>(false);
  const [hasEditedPost, setHasEditedPost] = useState<boolean>(false);
  const hasReachedBottom = useSelector((state: any) => state.scroll.hasReachedBottom);
  const isFetchingByUsername = useSelector((state: any) => state.post.isFetchingByUsername);
  const hasCreatedPost = useSelector((state: any) => state.post.hasCreatedPost);
  const username = useSelector((state: any) => state.user.name);
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  const { isLoading, isError, refetch } = useQuery('posts', fetchPosts, {
    staleTime: 60000,
    refetchInterval: 60000,
    onSuccess(data) {
      if (isFetchingByUsername) return;

      if (posts.length <= 0 || !hasReachedBottom) {
        setPosts(data?.results);
        dispatch({ type: 'post/hasFetched' });
        return;
      }

      const newPosts = posts.map((post: any) => {
        const newPost = data?.results.find((p: any) => p.id === post.id);
        if (newPost) {
          return newPost;
        }
        return post;
      });

      setPosts(newPosts);
    },
  });

  const loadMorePosts = async (): Promise<void> => {
    setPostsLoading(true);
    if (isFetchingByUsername) {
      setPostsLoading(false);
      setPageCount(10);
      return;
    }

    const morePosts = await fetchMorePosts(pageCount);
    setPosts([...posts, ...morePosts?.results]);

    if (morePosts?.results?.length > 0) {
      setPageCount(pageCount + 10);
    }

    if (morePosts?.results.length === 0) {
      setNoMorePosts(true);
    }

    setPostsLoading(false);
  };

  const findPostById = (id: number) => {
    const postById: any = posts.find((post: any) => post.id === id);

    setContent(postById?.content);
    setTitle(postById?.title);
  };

  const fetchUsernameData = async () => {
    setPostsLoading(true);
    const postsByUserName = await fetchPostByUsername(username);
    setPosts(postsByUserName?.results);
    setPostsLoading(false);
  };

  const validateEmptyFields = () => {
    if (title.length > 0 && content.length > 0) {
      setEmptyFields(false);
    } else {
      setEmptyFields(true);
    }
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleModalState = (id: number, state: string) => {
    setCurrentPostId(id);

    if (state === 'delete') {
      setIsDeleting(true);
      return;
    }

    setIsEditing(true);
    findPostById(id);
  };

  const closeModal = () => {
    setIsDeleting(false);
    setIsEditing(false);
    setTitle('');
    setContent('');
    setCurrentPostId(0);
  };

  const handleDelete = async () => {
    await deletePost(currentPostId);

    if (isFetchingByUsername) {
      fetchUsernameData();
    } else {
      refetch();
    }

    closeModal();
    setHasDeletedPost(true);

    setTimeout(() => {
      setHasDeletedPost(false);
    }, 4000);
  };

  const handleEdit = async () => {
    await editPost(
      {
        title,
        content,
      },
      currentPostId
    );

    if (isFetchingByUsername) {
      fetchUsernameData();
    } else {
      refetch();
    }

    closeModal();
    setHasEditedPost(true);

    setTimeout(() => {
      setHasEditedPost(false);
    }, 4000);
  };

  const handleCorrectPostRender = () => {
    if (isFetchingByUsername) {
      fetchUsernameData();
    } else {
      refetch();
    }
  };

  useEffect(() => {
    if (hasReachedBottom) {
      loadMorePosts();
    }
  }, [hasReachedBottom]);

  useEffect(() => {
    if (isLoggedIn) {
      handleCorrectPostRender();
    }
  }, [isFetchingByUsername, hasCreatedPost, isLoggedIn]);

  useEffect(() => {
    validateEmptyFields();
  }, [content, title]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-10 mt-10">
        <CustomLoader />
        <span>Loading...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <span className="text-red-500">Error!</span>
        <Button theme="primary">Refetch Items</Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-10 mt-6">
        {posts.length === 0 ? (
          <span className="text-gray-500">No posts yet</span>
        ) : (
          <>
            {posts.map((post: any, i: number) => (
              <BaseCard
                key={post.id || i}
                canInteract={post.username === username}
                type="postcard"
                content={post.content}
                size="medium"
                title={post.title}
                timeMoment={getTimeAgo(post.created_datetime)}
                user={post.username}
                onEdit={() => handleModalState(post.id, 'edit')}
                onDelete={() => handleModalState(post.id, 'delete')}
              />
            ))}
            {postsLoading ? (
              <CustomLoader />
            ) : (
              <>
                {posts.length > 0 && (
                  <div className="flex items-center justify-center">
                    {!noMorePosts && !isFetchingByUsername ? (
                      <Button theme="primary" onClick={loadMorePosts} disabled={postsLoading}>
                        Load More
                      </Button>
                    ) : (
                      <span className="text-gray-500">You've reached the end of the content</span>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
      <Modal isOn={isDeleting}>
        <div className="m-5 h-[70%] flex justify-between flex-col">
          <span className="font-bold text-[22px]">Are you sure you want to delete this item?</span>
          <div className="flex space-x-4 items-end justify-end">
            <Button theme="ghost" onClick={closeModal}>
              Cancel
            </Button>
            <Button theme="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
      <Modal isOn={isEditing} size="medium">
        <div className="m-5 h-[85%] flex justify-between flex-col">
          <span className="font-bold text-[22px]">Edit item</span>
          <div className="flex flex-col space-y-4">
            <FormField label="Title" value={title} onChange={handleTitleChange} />
            <FormField isTextarea label="Content" value={content} onChange={handleContentChange} />
          </div>
          <div className="flex space-x-4 items-end justify-end">
            <Button theme="ghost" onClick={closeModal}>
              Cancel
            </Button>
            <Button theme="success" onClick={handleEdit} disabled={emptyFields}>
              Save
            </Button>
          </div>
        </div>
      </Modal>
      <SnackBar message="Post successfully deleted!" duration={4000} isOpen={hasDeletedPost} theme="success" />
      <SnackBar message="Post successfully edited!" duration={4000} isOpen={hasEditedPost} theme="success" />
    </>
  );
}

export default Posts;
