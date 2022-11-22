import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import MainContext from '../context/MainContext';
import { get, post } from '../plugins/http';
import Countdown from 'react-countdown';
import { Link } from 'react-router-dom';

const ItemInfo = styled.div`
  display: flex;
  justify-content: left;
  margin-top: 40px;
  font-weight: 500;

  && img {
    border: 4px solid black;
    border-radius: 10px;
    width: 400px;
    margin-left: 100px;
    margin-right: 100px;
  }

  && span {
    display: inline-block;
  }

  && input {
    border: 2px solid black;
    border-radius: 10px;
    width: 180px;
    height: 27px;
    padding: 5px;
    font-size: 20px;
  }

  && button {
    border: 2px solid black;
    border-radius: 10px;
    width: 100px;
    height: 40px;
    font-size: 20px;
    margin-top: 10px;
    margin-left: 12px;
    cursor: pointer;
  }
  && button:hover {
    background-color: lightgrey;
  }
`;

const BidsList = styled.div`
  width: 300px;
  height: 140px;
  border: 2px solid black;
  border-radius: 10px;
  background-color: white;
  overflow: auto;
`;

const SingleItem = () => {
  const { socket, item, setItem, items, currentItem, currentUser, userLoggedIn } =
    useContext(MainContext);
  const [bids, setBids] = useState([{}]);
  const [bidsList, setBidsList] = useState([]);

  useEffect(() => {
    getItem();
  }, [items]);

  useEffect(() => {
    socket.on('receiveBids', (data) => {
      console.log('data ===', data);
      setBidsList((prev) => [...prev, data]);
      console.log('bidsList ===', bidsList);
    });
  }, [bidsList, socket]);

  const getItem = async () => {
    const res = await get('singleItem/' + currentItem);
    // console.log('res ===', res);
    setItem(res.data);
    // console.log('item ===', item);
  };

  const bidRef = useRef();

  const handleClick = async () => {
    if (bidRef.current.value <= item.price) {
      alert('Bid must be higher than current price!');
    } else {
      console.log('new bid: €', bidRef.current.value);

      const data = { itemId: item._id, bidder: currentUser, price: bidRef.current.value };

      // console.log('data ===', data);

      socket.emit('sendBid', data);

      const res = await post('updateBid', data);
      // console.log('res ===', res);

      // setBids((prev) => ({ ...prev, bidder: currentUser, price: bidRef.current.value }));

      // console.log('bids ===', bids);
    }
  };

  const Completionist = () => <p>auction ended</p>;

  return userLoggedIn ? (
    <ItemInfo>
      <div>
        <img src={item.image} alt="" />
      </div>
      <div>
        <div>
          <p>TITLE: {item.title}</p>
          <p>CURRENT PRICE: €{item.price}</p>
          <p>
            TIME LEFT:{' '}
            <span>
              <Countdown date={item.time}>
                <Completionist />
              </Countdown>
            </span>
          </p>
          <p>HIGHEST BIDDER: {item.bidder ? item.bidder : ''}</p>
        </div>
        <div>
          <h2>BIDS LIST:</h2>
          <BidsList>
            {bidsList !== null
              ? bidsList.map((x, i) => (
                  <p key={i}>
                    {x.bidder}: €{x.price}
                  </p>
                ))
              : null}
          </BidsList>
          <input ref={bidRef} type="number" placeholder="BID AMOUNT" />
          <button onClick={handleClick}>BID</button>
        </div>
      </div>
    </ItemInfo>
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

export default SingleItem;
