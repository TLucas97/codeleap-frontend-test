import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseCard from '../components/BaseCard';
import Posts from '../components/Posts';
import ToggleSwitch from '../components/ToggleSwitch';
import CreatePost from '../components/CreatePost';
import ArrowUpIcon from '../../public/images/up-arrow-icon.png';
import LogoutIcon from '../../public/images/logout.png';
import Modal from '../components/Modal';
import Button from '../components/Button';

function MainPage() {
  const currentUser = useSelector((state: any) => state.user.name);
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
  const hasFetchedPosts = useSelector((state: any) => state.post.hasFetchedPosts);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState<any>(0);
  const [userPostsOnly, setUserPostsOnly] = useState<boolean>(false);
  const [startScrollBtnView, setStartScrollBtnView] = useState<boolean>(false);
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleScroll = () => {
    const scrollTop = scrollRef?.current?.scrollTop;
    setScroll(scrollTop);
  };

  const handleScrollToTop = () => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const handleToggle = () => {
    const currentPostState = !userPostsOnly;

    setUserPostsOnly(currentPostState);

    if (userPostsOnly) {
      dispatch({ type: 'post/clearFetchingByUsername' });
      return;
    }
    dispatch({ type: 'post/fetchingByUsername' });
  };

  const handleLogout = () => {
    if (window.localStorage) {
      localStorage.removeItem('username');
    }
    dispatch({ type: 'post/clearFetchingByUsername' });
    dispatch({ type: 'post/reset' });
    dispatch({ type: 'user/logout' });
  };

  useEffect(() => {
    const detectEndOfScroll = () => {
      const element: any = scrollRef.current;
      const scrollTop: any = element?.scrollTop;
      const scrollHeight: any = element?.scrollHeight;
      const height: any = element?.clientHeight;

      if (scroll > 2000) {
        setStartScrollBtnView(true);
      } else {
        setStartScrollBtnView(false);
      }

      if (scroll < 2000) {
        return;
      }

      if (scrollTop + height >= scrollHeight && hasFetchedPosts) {
        dispatch({ type: 'scroll/reachedBottom' });
      } else {
        dispatch({ type: 'scroll/reset' });
      }
    };

    detectEndOfScroll();
  }, [scroll]);

  useEffect(() => {
    if (window.localStorage) {
      const username = localStorage.getItem('username');
      if (!username && !isLoggedIn) {
        navigate('/');
        return;
      }

      dispatch({ type: 'user/login', payload: username });
    }
  }, [isLoggedIn]);

  return (
    <>
      <div className="border w-full h-full flex items-center justify-center animate-fadeIn">
        <div
          className="card:w-[800px] w-full h-full card:h-[96%] border bg-ghost shadow-xl overflow-scroll overflow-x-hidden"
          ref={scrollRef}
          onScroll={handleScroll}
        >
          <div className="w-[98%] card:w-[793px] z-50 h-[80px] bg-primary text-white flex justify-between items-center fixed">
            <span className="ml-6 font-bold card:text-[22px] text-[14px] card:block flex flex-col">
              CodeLeap Network <span>{`( ${currentUser || 'Username'} )`}</span>
            </span>
            <div className="mr-6 flex space-x-4">
              <div className="flex space-x-2 items-center justify-center">
                <p className="font-semibold text-[12px] card:text-[16px]">{userPostsOnly ? 'My posts' : 'All posts'}</p>
                <ToggleSwitch onClick={handleToggle} />
              </div>
              {startScrollBtnView && (
                <button className={`animate-zoomIn`} onClick={handleScrollToTop}>
                  <img
                    src={ArrowUpIcon}
                    alt="up-icon"
                    className="w-[25px] bg-white p-1 rounded-full hover:bg-primary transition ease-in-out"
                  />
                </button>
              )}
              <button onClick={() => setLogoutModal(true)}>
                <img src={LogoutIcon} alt="logout" className="w-[27px] h-[27px]" />
              </button>
            </div>
          </div>
          <div className="flex items-center flex-col justify-center mt-[104px]">
            <BaseCard type="basic" content="" size="medium">
              <CreatePost />
            </BaseCard>
            <div className="w-full h-full">
              <Posts />
            </div>
          </div>
        </div>
      </div>
      <Modal isOn={logoutModal}>
        <div className="m-5 flex flex-col justify-between h-[70%]">
          <span className="font-bold text-[22px] mb-4 card:mb-0">Confirm logout</span>
          <div className="flex justify-end items-end space-x-4">
            <Button theme="ghost" onClick={() => setLogoutModal(false)}>
              Cancel
            </Button>
            <Button theme="danger" onClick={handleLogout}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default MainPage;
