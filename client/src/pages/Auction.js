import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainContext from '../context/MainContext';
import { get } from '../plugins/http';
import Countdown from 'react-countdown';

const AuctionList = styled.div`
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 10px;
  width: 200px;
  height: 260px;
  border: 4px solid black;
  border-radius: 10px;

  && img {
    height: 200px;
  }

  &&:hover {
    scale: 1.05;
    cursor: pointer;
  }
  && p {
    font-size: 14px;
    margin: 0;
  }
`;

const Auction = () => {
  const { items, setItems, setCurrentItem, userLoggedIn } = useContext(MainContext);
  const nav = useNavigate();

  useEffect(() => {
    getItems();
  }, [setItems]);

  const getItems = async () => {
    const res = await get('auction');
    console.log('res ===', res);
    setItems(res.data);
    console.log('items ===', items);
  };

  const handleClick = (i) => {
    console.log('i ===', i);
    setCurrentItem(i);
    nav('/singleItem/' + i);
    console.log('items ===', items);
  };

  const Completionist = () => <p>auction ended</p>;

  return userLoggedIn ? (
    <AuctionList>
      {items.map((x, i) => {
        return (
          <Card key={i} onClick={() => handleClick(i)}>
            <img src={x.image} alt="" />
            <p>{x.title}</p>
            <p>Starting price: €{x.price}</p>
            <p>
              Auction ends in:
              <span>
                <Countdown date={x.time}>
                  <Completionist />
                </Countdown>
              </span>
            </p>
          </Card>
        );
      })}
    </AuctionList>
  ) : (
    <>
      <h1>You must log in to see the auction</h1>
      <Link to={'/'}>LOGIN</Link>
    </>
  );
};

export default Auction;
