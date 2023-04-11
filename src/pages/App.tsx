import BaseCard from '../components/BaseCard';
import FormField from '../components/FormField';
import Button from '../components/Button';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>('');
  const [emptyFields, setEmptyFields] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleUsernameChange = (value: string) => {
    setUsername(value);

    if (value.length > 0) {
      setEmptyFields(false);
    } else {
      setEmptyFields(true);
    }
  };

  const handleEnter = () => {
    if (window.localStorage) {
      localStorage.setItem('username', username);
    }
    dispatch({ type: 'user/login', payload: username });
    navigate('/main');
  };

  useEffect(() => {
    if (window.localStorage) {
      const username = localStorage.getItem('username');
      if (username) {
        setUsername(username);
        dispatch({ type: 'user/login', payload: username });
        navigate('/main');
      }
    }
  }, []);

  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <BaseCard type="basic" content="" size="small">
          <div className="m-7 flex flex-col space-y-5">
            <span className="font-bold text-[22px]">Welcome to CodeLeap network!</span>
            <div className="flex flex-col space-y-3">
              <FormField label="Please enter your username" onChange={handleUsernameChange} value={username} />
              <div className="flex space-x-4 justify-end items-end">
                <Button theme="primary" onClick={handleEnter} disabled={emptyFields}>
                  Enter
                </Button>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>
    </>
  );
}

export default App;
