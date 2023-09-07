import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Section from "../../components/Section/Section";
import { useGetSingleProductQuery } from "../../redux/apiSlice";
import {
  addProductBasket,
  countTotalPrice,
  countTotalProducts,
} from "../../redux/basketSlice";
import css from "./SingleProductPage.module.css";

export default function SingleProductPage() {
  const { id } = useParams();

  const { data, isLoading, error } = useGetSingleProductQuery(id);
  const res = data && data[0];
  const dispatch = useDispatch();

  const ref = useRef(null);

  const addProductBasketHandler = (product) => {
    dispatch(addProductBasket(product));
    dispatch(countTotalPrice());
    dispatch(countTotalProducts());
  };

  setTimeout(() => {
    if (ref.current) {
        ref.current.scrollIntoView({
          behavior: "smooth",
        });
      }
  }, 100);

  if (error) {
    return (
      <Section>
        <div className={css.error}>Error: Oooops, we have problems 😔</div>
      </Section>
    );
  }

  return (
    <Section>
      {isLoading ? (
        <Section>
          <Loader />
        </Section>
      ) : (
        <div className={css.container}>
          <div className={css.imgContainer}>
            <h1 ref={ref} className={css.title}>
              {res.title}
            </h1>
            <img
              className={css.img}
              src={`https://backend-for-final-project-garden.onrender.com/${res.image}`}
              alt={res.title}
            />
          </div>

          <div className={css.wrapper}>
            <div className={css.prices}>
              {res.discont_price !== null ? (
                <>
                  <div className={css.discont}>
                    {res.discont_price}
                    <span>$</span>
                  </div>
                  <div className={css.price}>
                    {res.price}
                    <span>$</span>
                  </div>
                  <div className={css.pros}>
                    {Math.round((res.discont_price * 100) / res.price) - 100}%
                  </div>
                </>
              ) : (
                <div className={css.actPrice}>
                  {res.price}
                  <span>$</span>
                </div>
              )}
            </div>

            <button
              className={css.btn}
              onClick={() => addProductBasketHandler(res)}
            >
              To cart
            </button>

            <div className={css.descriptionContainer}>
              <p className={css.descriptionTitle}>Description</p>
              <p className={css.description}>{res.description}</p>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
