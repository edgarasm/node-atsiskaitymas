import React, { useRef } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import MainContext from '../context/MainContext';
import { post } from '../plugins/http';
import { useContext } from 'react';

const ItemForm = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  && input {
    border: 2px solid black;
    border-radius: 10px;
    width: 400px;
    height: 40px;
    font-size: 20px;
    margin: 5px;
    padding: 5px;
  }

  && button {
    border: 2px solid black;
    border-radius: 10px;
    width: 400px;
    height: 40px;
    font-size: 20px;
    margin-top: 20px;
    cursor: pointer;
  }
  && button:hover {
    background-color: lightgrey;
  }
`;
const AddItem = () => {
  const { setItems, userLoggedIn } = useContext(MainContext);
  const imageRef = useRef();
  const titleRef = useRef();
  const timeRef = useRef();
  const priceRef = useRef();

  const nav = useNavigate();

  const startAuction = async () => {
    if (
      imageRef.current.value === '' ||
      titleRef.current.value === '' ||
      timeRef.current.value === '' ||
      priceRef.current.value === ''
    ) {
      alert('inputs cannot be empty');
      return;
    } else {
      const item = {
        image: imageRef.current.value,
        title: titleRef.current.value,
        time: timeRef.current.value,
        price: priceRef.current.value,
      };
      const res = await post('addItem', item);

      if (res.error === false) {
        setItems(item);
        imageRef.current.value = '';
        titleRef.current.value = '';
        timeRef.current.value = '';
        priceRef.current.value = '';

        nav('/auction');
      } else {
        alert(res.message);
      }
    }
  };

  return userLoggedIn ? (
    <ItemForm>
      <input ref={imageRef} type="text" placeholder="IMAGE URL" />
      <input ref={titleRef} type="text" placeholder="TITLE" />
      <input ref={timeRef} type="datetime-local" placeholder="END TIME" />
      <input ref={priceRef} type="number" placeholder="START PRICE" />
      <button onClick={startAuction}>START AUCTION</button>
    </ItemForm>
  ) : (
    <>
      <h1>
        You must{' '}
        <span>
          <Link to={'/'}>log in</Link>
        </span>{' '}
        to see the auction
      </h1>
    </>
  );
};

export default AddItem;
