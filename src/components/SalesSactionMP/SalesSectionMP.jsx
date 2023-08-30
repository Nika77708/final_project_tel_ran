import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useGetAllProductsQuery } from "../../redux/apiSlice";
import {
    addProductBasket,
    countTotalPrice,
    countTotalProducts,
} from "../../redux/basketSlice";
import Loader from "../Loader/Loader";
import ProductCard from "../ProductCard/ProductCard";
import Section from "../Section/Section";
import css from "./SalesSectionMP.module.css";

export default function SalesSectionMP() {
  const { data, error, isLoading } = useGetAllProductsQuery();

  const dispatch = useDispatch();

  if (isLoading) {
    return (
      <Section>
        <Loader />
      </Section>
    );
  }

  if (error) {
    return (
      <Section>
        <div className={css.error}>Error: Oooops, we have problems 😔</div>
      </Section>
    );
  }

  const discountProducts =
    data && data.filter((el) => el.discont_price !== null);

  const newArray = discountProducts.map((item) => {
    return {
      ...item,
      pros: Math.abs(Math.round((item.discont_price * 100) / item.price) - 100),
    };
  });

  const addToBasketHandler = (event, el) => {
    event.preventDefault();
    dispatch(addProductBasket(el));
    dispatch(countTotalPrice());
    dispatch(countTotalProducts());
  };

  return (
    <Section>
      <NavLink to={`/sales`}>
        <h1 className={css.title}>Sale</h1>
      </NavLink>

      <div className={css.wrapper}>
        {newArray
          .map((el) => (
            <NavLink to={`/products/${el.id}`} key={el.id}>
              <ProductCard
                {...el}
                addToBasketHandler={(event) => addToBasketHandler(event, el)}
              />
            </NavLink>
          ))
          .slice(0, 4)}
      </div>
    </Section>
  );
}
