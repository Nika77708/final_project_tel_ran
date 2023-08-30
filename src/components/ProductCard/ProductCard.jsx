import React, { useState } from "react";
import { useGetSingleProductQuery } from "../../redux/apiSlice";
import Loader from "../Loader/Loader";
import Section from "../Section/Section";
import css from "./ProductCard.module.css";

export default function ProductCard({
  title,
  price,
  image,
  discont_price,
  addToBasketHandler,
}) {
  const { isLoading } = useGetSingleProductQuery();

  const [isShown, setIsShown] = useState(false);

  return (
    <>
      {isLoading ? (
        <Section>
          <Loader />
        </Section>
      ) : (
        <div className={css.container}>
          <div
            className={css.imgWrapper}
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
          >
            {isLoading ? (
              <Loader />
            ) : (
              <img
                className={css.img}
                src={`https://backend-for-final-project-garden.onrender.com/${image}`}
                alt={title}
              />
            )}

            {isShown && (
              <button
                className={css.btn}
                onClick={addToBasketHandler}
              >
                Add to cart
              </button>
            )}
          </div>

          <div className={css.prices}>
            {discont_price !== null ? (
              <>
                <div className={css.discont}>
                  {discont_price}
                  <span>$</span>
                </div>
                <div className={css.price}>
                  {price}
                  <span>$</span>
                </div>
                <div className={css.pros}>
                  {Math.abs(Math.round((discont_price * 100) / price) - 100)}%
                </div>
              </>
            ) : (
              <div className={css.actPrice}>
                {price}
                <span>$</span>
              </div>
            )}
          </div>

          <div className={css.title}>{title}</div>
        </div>
      )}
    </>
  );
}
