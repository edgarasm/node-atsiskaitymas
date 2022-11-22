import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MainContext from '../context/MainContext';
import { post } from '../plugins/http';

const Flex = styled.div`
  display: flex;
`;

const AuthForm = styled.div`
  margin: auto;
  margin-top: 80px;
  padding: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  width: 300px;
  height: 300px;
  border: 4px solid black;
  border-radius: 10px;

  && input {
    border: 2px solid black;
    border-radius: 10px;
    width: 200px;
    height: 40px;
    font-size: 20px;
    padding: 5px;
    margin: 5px;
  }

  && button {
    border: 2px solid black;
    border-radius: 10px;
    width: 160px;
    height: 40px;
    font-size: 20px;
  }
`;

const Auth = () => {
  const nav = useNavigate();
  const { socket, setUserLoggedIn, setCurrentUser } = useContext(MainContext);

  const usernameRef = useRef();
  const pass1Ref = useRef();
  const pass2Ref = useRef();
  const loginUsernameRef = useRef();
  const loginPassRef = useRef();

  const register = async () => {
    const user = {
      username: usernameRef.current.value,
      pass1: pass1Ref.current.value,
      pass2: pass2Ref.current.value,
    };

    const res = await post('register', user);
    console.log('res ===', res);
    if (res.error === false) {
      setUserLoggedIn(true);
      setCurrentUser(user.username);

      socket.emit('login', user);

      nav('/auction');
    } else if (res.error) {
      alert(res.message);
    }
  };

  const login = async () => {
    const user = {
      username: loginUsernameRef.current.value,
      password: loginPassRef.current.value,
    };
    const res = await post('login', user);
    console.log('res ===', res);
    if (res.error === false) {
      setUserLoggedIn(true);
      setCurrentUser(user.username);

      socket.emit('login', user);

      nav('/auction');
    } else if (res.error) {
      alert(res.message);
    }
  };

  return (
    <Flex>
      <AuthForm>
        <h3>REGISTER</h3>
        <input ref={usernameRef} type="text" placeholder="Username" />
        <input ref={pass1Ref} type="text" placeholder="Password" />
        <input ref={pass2Ref} type="text" placeholder="Repeat Password" />
        <button onClick={register}>REGISTER</button>
      </AuthForm>
      <AuthForm>
        <h3>LOGIN</h3>
        <input ref={loginUsernameRef} type="text" placeholder="Username" />
        <input ref={loginPassRef} type="text" placeholder="Password" />
        <button onClick={login}>LOGIN</button>
      </AuthForm>
    </Flex>
  );
};

export default Auth;
