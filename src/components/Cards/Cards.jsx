import React, { useState } from "react";
import Button from "../Button/Button.jsx";
import classNames from "classnames";
import { useSelector } from "react-redux";


const Cards = ({
  addedCount,
  id,
  imageUrl,
  name,
  types,
  sizes,
  price,
  onClickAddPizza
}) => {
  const availableType = ["тонкое", "традиционное"];
  const availableSize = [26, 30, 40];
  const [activeType, setActiveType] = useState(types[0]);
  const [activeSize, setActiveSize] = useState(availableSize.indexOf(sizes[0]));

  const onSelectType = (index) => {
    setActiveType(index );
  };

  const onSelectSize = (index) => {
    setActiveSize(index);
  };

  const onAddPizza = () => {
    const obj = {
      id,
      name,
      imageUrl,
      price,
      size: availableSize[activeSize],
      type: availableType[activeType],
    };

    onClickAddPizza(obj);
  };


  return (
    <div className="card" id={id}>
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <div className="pizza-settings">
        <div className="sort-pizza">
          {availableType.map((type, index) => (
            <p
              key={index}
              onClick={() => onSelectType(index)}
              className={classNames({
                active: activeType === index,
                disabled: !types.includes(index),
              })}
            >
              {type}
            </p>
          ))}
        </div>
        <div className="pizza-size">
          {availableSize.map((size, index) => (
            <p
              key={index}
              onClick={() => onSelectSize(index)}
              className={classNames({
                activeSize: activeSize === index,
                disabledSize: !sizes.includes(size),
              })}
            >
              {size} cm.
            </p>
          ))}
        </div>
      </div>
      <div className="pizza-price">
        <p>{price}&#x20BD;</p>
        <Button click={onAddPizza} text={"+ Добавить"} count={addedCount} />
      </div>
    </div>
  );
};

export default Cards;
