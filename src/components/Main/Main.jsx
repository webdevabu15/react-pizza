import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPizzas,
  setCategory,
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
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchPizzas(stateCategory, sortBy));
  }, [dispatch, stateCategory, sortBy]);

  const onSelectCategory = React.useCallback((index) => {
    setIsActiveItem(index);
    dispatch(setCategory(index));
  }, []);

  const popularArr = [
    { name: "популярности", type: "rating", order: "desc" },
    { name: "цене", type: "price", order: "desc" },
    { name: "алфавит", type: "name", order: "asc" },
  ];
  const { items } = useSelector(({ cart }) => cart);

  const handleAddPizzaToCart = (obj) => {
    dispatch({
      type: "ADD_PIZZA_CART",
      payload: { ...obj, count: 0 },
    });
  };

  let a = Object.values(items)
    .map((item, i) => item.items)
    .flat()
    .map((item) => item);

  let b = Object.values(items).map((item, i) => item.totalCount);
  let id = AllPizza.map((item) => item.id);
  console.log();

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
          {AllPizza &&
            AllPizza.map((item, index) => {
              return (
                <Cards
                  id={item.id}
                  price={item.price}
                  sizes={item.sizes}
                  name={item.name}
                  imageUrl={item.imageUrl}
                  types={item.types}
                  onClickAddPizza={handleAddPizzaToCart}
                  addedCount={a.reduce(
                    (sum, el) => (el.id === item.id ? (sum += el.count) : sum),
                    0
                  )}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Main;
