import React, { useContext } from "react";
import PizzaCss from "./Pizza.module.css";
import { Pizza } from "../types";
import { useAddToCart } from "./AddToCart";

interface Props {
  pizza: Pizza;
}

const PizzaItem: React.FC<Props> = ({ pizza }) => {
  const addToCart = useAddToCart();
  const handleClick = () => {
    addToCart({
      id: pizza.id,
      name: pizza.name,
      price: pizza.price,
    });
  };
  return (
    <li className={PizzaCss.container}>
      <h2>{pizza.name}</h2>
      <h2>{pizza.description}</h2>
      <h2>{pizza.price}</h2>
      <button type="button" onClick={handleClick}>
        Add To Cart
      </button>
    </li>
  );
};

export default PizzaItem;
