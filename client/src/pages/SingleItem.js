import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import MainContext from '../context/MainContext';
import { post } from '../plugins/http';
import Countdown from 'react-countdown';
import { Link } from 'react-router-dom';

const ItemInfo = styled.div`
  display: flex;
  justify-content: left;
  margin-top: 40px;

  && img {
    width: 400px;
    margin-left: 100px;
    margin-right: 100px;
  }

  && span {
    display: inline-block;
  }
`;

const BidList = styled.div`
  width: 300px;
  height: 200px;
  border: 1px solid black;
`;

const SingleItem = () => {
  const { item, setItem, items, currentItem, currentUser, userLoggedIn } = useContext(MainContext);
  const [bids, setBids] = useState([{}]);

  useEffect(() => {
    getItem();
  }, [currentItem, bids]);

  const getItem = async () => {
    setItem(items[currentItem]);
    console.log('item ===', item);
  };

  const bidRef = useRef();

  const handleClick = async () => {
    console.log('clicked', bidRef.current.value);

    if (bidRef.current.value <= item.price) {
      alert('Bid must be higher than current price!');
    } else {
      const data = { itemId: item._id, bidder: currentUser, price: bidRef.current.value };

      console.log('data ===', data);

      const res = await post('updateBid', data);

      console.log('res ===', res);

      setBids((prev) => ({ ...prev, bidder: currentUser, price: bidRef.current.value }));

      console.log('bids ===', bids);
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
          <h2>BID LIST:</h2>
          <BidList>
            {/* {bids !== null
              ? bids.map((x, i) => (
                  <div key={i}>
                    {x.bidder}: €{x.price}
                  </div>
                ))
              : null} */}
          </BidList>
          <input ref={bidRef} type="number" placeholder="BID AMOUNT" />
          <button onClick={handleClick}>BID</button>
        </div>
      </div>
    </ItemInfo>
  ) : (
    <>
      <h1>You must log in to see the auction</h1>
      <Link to={'/'}>LOGIN</Link>
    </>
  );
};

export default SingleItem;
