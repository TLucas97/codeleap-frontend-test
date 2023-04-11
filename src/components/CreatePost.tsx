import FormField from './FormField';
import Button from './Button';
import SnackBar from './SnackBar';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makePost } from '../actions';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const username = useSelector((state: any) => state.user.name);
  const [emptyFields, setEmptyFields] = useState<boolean>(true);
  const [hasCreatedPost, setHasCreatedPost] = useState<boolean>(false);
  const dispatch = useDispatch();

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

  const handlePostCreation = async () => {
    const newPost = await makePost({ username, title, content });

    if (!newPost) return;

    dispatch({ type: 'post/createdPost' });
    setTitle('');
    setContent('');
    setHasCreatedPost(true);

    setTimeout(() => {
      setHasCreatedPost(false);
    }, 4000);
  };

  useEffect(() => {
    validateEmptyFields();
  }, [title, content]);

  return (
    <>
      <div className="mx-6 my-4 flex flex-col">
        <span className="text-[22px] font-bold">What's on your mind?</span>
        <div className="flex flex-col space-y-2 mt-6">
          <FormField label="Title" value={title} onChange={handleTitleChange} />
          <FormField label="Content" isTextarea value={content} onChange={handleContentChange} />
        </div>
        <div className="flex items-end justify-end mt-6">
          <Button theme="primary" onClick={handlePostCreation} disabled={emptyFields}>
            Create
          </Button>
        </div>
      </div>
      <SnackBar message="Post successfully created!" duration={4000} isOpen={hasCreatedPost} theme="success" />
    </>
  );
}

export default CreatePost;
