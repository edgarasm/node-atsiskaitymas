import React, { useContext, useEffect, useState } from 'react';
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
  background-color: white;
  transition: transform 0.1s;

  &&:hover {
    transform: scale(1.05);
    cursor: pointer;
  }

  && img {
    height: 200px;
  }

  && p {
    font-size: 14px;
    margin: 0;
  }
`;

const Auction = () => {
  const { socket, items, setItems, setCurrentItem, currentItem, userLoggedIn } =
    useContext(MainContext);
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    getItems();
  }, [items]);

  const getItems = async () => {
    const res = await get('auction');
    // console.log('res ===', res);
    setItems(res.data);
    // console.log('items ===', items);
    setIsLoading(false);
  };

  const handleClick = (id) => {
    setCurrentItem(id);

    // console.log('currentItem ===', currentItem);
    socket.emit('joinRoom', currentItem);
    console.log('joinRoom ===', currentItem);

    nav('/singleItem/' + id);
  };

  const Completionist = () => {
    <p>auction ended</p>;
  };

  return userLoggedIn ? (
    !isLoading ? (
      <AuctionList>
        {items.map((x, i) => {
          return (
            <Card key={i} onClick={() => handleClick(x._id)}>
              <img src={x.image} alt="" />
              <p>{x.title}</p>
              <p>Starting price: €{x.price}</p>
              <p>
                Auction ends in:{' '}
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
      <p>Loading...</p>
    )
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

export default Auction;
