import React, { useMemo } from "react";
import { IoClose } from "react-icons/io5";
import {useSelector} from 'react-redux'
const CartItem = ({
  img,
  key,
  id,
  name,
  type,
  size,
  count,
  onRemove,
  onPlus,
  onMinus,
  item,

}) => {

  const handleRemoveClick = () => {
    onRemove(item);
  };
  const handlePlusItem = () => {
    onPlus(item);
  };

  const handleMinusItem = () => {

    onMinus(item);
  };

  const totalPrice = useMemo(() => {
    return count * item.price
  },[count])

const state = useSelector(state =>  state)

  return (
    <>
      <div className="cart-card" id={id} key={key}>
        <div className="img-wrp">
          <img src={img} alt={name} />
          <h3>
            {name} <span>{`${type},${size ? size : ""} cm`}</span>
          </h3>
        </div>
        <div className="pizza-count">
          <button onClick={handleMinusItem}>-</button>
          <p>{count}</p>
          <button onClick={handlePlusItem}>+</button>
        </div>
        <div className="pizza-price">
          <p>&#x20BD;{totalPrice}</p>
          <button onClick={handleRemoveClick}>
            <IoClose />
          </button>
        </div>
      </div>
     
    </>
  );
};

export default CartItem;
