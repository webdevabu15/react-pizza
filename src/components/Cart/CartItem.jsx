import React from "react";
import { IoClose } from "react-icons/io5";
// import Button from "../Button/Button";
const CartItem = ({
  img,
  key,
  id,
  name,
  type,
  size,
  totalPrice,
  totalCount,
  onRemove,
  onPlus,
  onMinus,
}) => {
  console.log(img);
  const handleRemoveClick = () => {
    onRemove(id);
  };
  const handlePlusItem = () => {
    onPlus(id);
  };

  const handleMinusItem = () => {
    onMinus(id);
  };

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
          <p>{totalCount}</p>
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
