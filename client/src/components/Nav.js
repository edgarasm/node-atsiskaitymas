import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MainContext from '../context/MainContext';

const NavBar = styled.div`
  margin: 0;
  padding: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: lightcoral;
  border-bottom: 4px solid black;

  && a {
    text-decoration: none;
    font-weight: 500;
    font-size: 20px;
    color: black;
    transition: transform 0.1s;
  }
  && a:hover {
    transform: scale(1.1);
  }
`;
const Nav = () => {
  const { userLoggedIn, setUserLoggedIn } = useContext(MainContext);

  const logout = () => {
    localStorage.removeItem('token');
    console.log('logout');
    setUserLoggedIn(false);
  };

  return (
    <NavBar>
      {!userLoggedIn ? (
        <div>WELCOME TO THE AUCTION</div>
      ) : (
        <>
          <Link to={'/auction'}>AUCTION</Link>
          <Link to={'/addItem'}>ADD ITEM</Link>
          <Link onClick={logout} to={'/'}>
            LOG OUT
          </Link>
        </>
      )}
    </NavBar>
  );
};

export default Nav;
