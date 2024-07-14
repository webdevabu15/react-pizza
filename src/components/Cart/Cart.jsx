import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../Navbar/Navbar";
import Logo from "../../assets/logo.svg";
import { IoCartOutline } from "react-icons/io5";
import { PiTrashLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import {
  clearCart,
  minusCartItem,
  plusCartItem,
  removeCartItem,
} from "../../redux/action/addToCard";
import cartMan from "../../assets/cart-man.svg";
import "./Cart.scss";

const Cart = () => {
  const { totalPrice, totalCount, items } = useSelector(({ cart }) => cart);
  const dispatch = useDispatch();
  const addedPizzas = Object.keys(items).map((key) => {
    return items[key].items[0];
  });

  const clearALLCarts = () => {
    if (window.confirm(`Вы действительно хотите очистить корзину?`)) {
      dispatch(clearCart());
    }
  };

  const onRemoveItem = (id) => {
    if (window.confirm("Вы действительно хотите удалить?")) {
      dispatch(removeCartItem(id));
    }
  };
  const onPlusItem = (id) => {
    dispatch(plusCartItem(id));
  };

  const onMinusItem = (id) => {
    dispatch(minusCartItem(id));
  };

  const { cart } = useSelector((state) => state);
  const payNow = () => {
    alert('hammasi sotildi 😎')
  }
  return (
    <>
      <nav>
        <Link to={"/"} className="logo">
          <img src={Logo} alt="" />
          <div className="logo-info">
            <h2>react pizza</h2>
            <p>самая вкусная пицца во вселенной</p>
          </div>
        </Link>
      </nav>
      {totalCount > 0 ? (
        <div className="cart-cards">
          <div className="cart-cards_head">
            <h3>
              <IoCartOutline size={29} /> Корзина
            </h3>
            <button onClick={clearALLCarts} className="cart-btn">
              <PiTrashLight size={18} />
              Очистить корзину
            </button>
          </div>
          <div className="cart-cards-wrapper">
            {addedPizzas.map((obj) => (
              <CartItem
                img={obj.imageUrl}
                key={obj.id}
                id={obj.id}
                name={obj.name}
                type={obj.type}
                size={obj.size}
                totalPrice={items[obj.id].totalPrice}
                totalCount={items[obj.id].items.length}
                onRemove={onRemoveItem}
                onPlus={onPlusItem}
                onMinus={onMinusItem}
              />
            ))}
          </div>
          <div className="allpizza">
            <p className="all-count">
              Всего пицц: <span>{cart.totalCount} шт.</span>
            </p>
            <p className="all-price">
              Сумма заказа: <span>{cart.totalPrice} ₽</span>
            </p>
          </div>
          <div className="btns">
            <Link to="/" className="back-to-home">
              <span>{`< Вернуться назад`}</span>
            </Link>
            <button onClick={payNow} className="pay-now">Оплатить сейчас</button>
          </div>
        </div>
      ) : (
        <div className="cleared-carts">
          <h2>
            Корзина пустая <i>😕</i>
          </h2>
          <p>
            Вероятней всего, вы не заказывали ещё пиццу.
            <br />
            Для того, чтобы заказать пиццу, перейди на главную страницу.
          </p>
          <img src={cartMan} alt="Empty cart" />
          <Link to="/" className="button">
            <span>Вернуться назад</span>
          </Link>
        </div>
      )}
    </>
  );
};

export default Cart;
