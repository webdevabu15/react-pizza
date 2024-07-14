import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowDropup } from "react-icons/io";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import "./Modal.scss";
import { setSortBy } from "../../redux/action/addToCard";

const Modal = ({ activeSortType, popularArr }) => {
  const [isActiveItem, setIsActiveItem] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const activeLabel = popularArr.find(obj => obj.type === activeSortType.type);
  const sortRef = useRef();
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  


  const handleClick = () => {
    setIsModal(!isModal);
  };

  const handleOutsideClick = (e) => {
    if (sortRef.current && !sortRef.current.contains(e.target)) {
      setIsModal(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const onSelectItem = (type, order) => {
    dispatch(setSortBy({type,order}));
    setIsModal(false);
  };

  return (
    <div className="popular" ref={sortRef}>
      <IoMdArrowDropup />
      <h3>
        Сортировка по: &nbsp;
        <span onClick={handleClick}>{activeLabel && activeLabel.name}</span>
      </h3>
      {isModal && (
        <div className="modal">
          <ul>
            {popularArr.map((item, index) => (
              <li
                key={index} // qo'shilgan key
                onClick={() => onSelectItem(item.type, item.order)}
                className={`${activeSortType.type === item.type ? "active-list" : ""}`}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

Modal.propTypes = {
  activeSortType: PropTypes.object.isRequired,
  popularArr: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
  })).isRequired,
};

export default Modal;
