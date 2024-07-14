import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPizzas,
  setCategory,
  setSortBy,
} from "../../redux/action/addToCard.js";
import Modal from "../Modal/Modal.jsx";
import Cards from "../Cards/Cards.jsx";
import { category } from "../contains/contains.ts";
import "./Main.scss";

const Main = () => {
  const [isActiveItem, setIsActiveItem] = useState(null);
  const AllPizza = useSelector((state) => state.data.data);
  const stateCategory = useSelector((state) => state.filters.category);
  const sortBy = useSelector((state) => state.filters.sortBy);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPizzas(stateCategory,sortBy));
  }, [dispatch,stateCategory,sortBy]);

  const onSelectCategory = React.useCallback((index) => {
    setIsActiveItem(index);
    dispatch(setCategory(index));
  }, []);

  const popularArr = [
    { name: "популярности", type: "popular", order: "desc" },
    { name: "цене", type: "price", order: "desc" },
    { name: "алфавит", type: "name", order: "asc" },
  ];

  const handleAddPizzaToCart = (obj) => {
    dispatch({
      type: 'ADD_PIZZA_CART',
      payload: obj,
    });
  };

  return (
    <div className="container">
      <div className="pizza-category">
        <div className="pizza-items">
          <p
            className={`pizza-item ${
              stateCategory === null ? "active-item" : ""
            }`}
            onClick={() => onSelectCategory(null)}
          >
            Все
          </p>
          {category.map((item, index) => (
            <p
              key={index}
              className={`pizza-item ${
                stateCategory === index ? "active-item" : ""
              } `}
              onClick={() => onSelectCategory(index)}
            >
              {item}
            </p>
          ))}
        </div>
        {<Modal activeSortType={sortBy} popularArr={popularArr} />}
      </div>
      <div className="all-pizza">
        <h2 className="all-pizza-title">Все пиццы</h2>
        <div className="pizza-cards">
          {AllPizza && AllPizza.map((item, index) => (
            <Cards
              id={item.id}
              price={item.price}
              sizes={item.sizes}
              name={item.name}
              imageUrl={item.imageUrl}
              types={item.types}
              onClickAddPizza={handleAddPizzaToCart}
              addedCount={cartItems[item.id] && cartItems[item.id].items.length}
              
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
