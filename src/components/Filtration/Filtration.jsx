import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDiscountedOnly,
  selectFromPrice,
  selectSorting,
  selectToPrice,
} from "../../redux/filterSlice";
import css from "./Filtration.module.css";

export const Filtration = ({
  products,
  setFiltredProducts,
  onlySale = false,
}) => {
  const dispatch = useDispatch();

  const fromPrice = useSelector((state) => state.allReducers.filter.fromPrice);
  const toPrice = useSelector((state) => state.allReducers.filter.toPrice);
  const discountedOnly = useSelector(
    (state) => state.allReducers.filter.setDiscountedOnly
  );
  const sortingValue = useSelector(
    (state) => state.allReducers.filter.sortingValue
  );

  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      const actualPrice = product.discont_price || product.price;
      return (
        (!fromPrice || actualPrice > Number(fromPrice)) &&
        (!toPrice || actualPrice < Number(toPrice)) &&
        (!discountedOnly || product.discont_price)
      );
    });

    const sortedProducts = filteredProducts.sort((a, b) => {
      const actualPriceA = a.discont_price || a.price;
      const actualPriceB = b.discont_price || b.price;
      if (sortingValue === "asc") {
        return actualPriceA - actualPriceB;
      } else if (sortingValue === "des") {
        return actualPriceB - actualPriceA;
      } else {
        return 0;
      }
    });

    setFiltredProducts(sortedProducts);
  }, [
    discountedOnly,
    fromPrice,
    sortingValue,
    toPrice,
    products,
    setFiltredProducts,
  ]);

  return (
    <div className={css.mainWrapper}>
      <div className={css.priceWrapper}>
        <label>Price:</label>

        <input
          className={css.input}
          type="number"
          value={fromPrice}
          placeholder="from"
          min="0"
          onChange={(ev) => dispatch(selectFromPrice(ev.target.value))}
        ></input>

        <input
          className={css.input}
          type="number"
          value={toPrice}
          placeholder="to"
          min="1"
          onChange={(ev) => dispatch(selectToPrice(ev.target.value))}
        ></input>
      </div>

      <div className={css.sortWrapper}>
        {!onlySale && (
          <div className={css.discWrapper}>
            <label htmlFor="checkbox">Discounted items</label>

            <input
              type="checkbox"
              name="checkbox"
              checked={discountedOnly}
              onChange={(ev) =>
                dispatch(selectDiscountedOnly(ev.target.checked))
              }
            ></input>
          </div>
        )}
        <div className={css.sortedWrapper}>
          <label>Sorted:</label>
          <select
            className={css.select}
            value={sortingValue}
            onChange={(ev) => dispatch(selectSorting(ev.target.value))}
          >
            <option>by default</option>
            <option value="asc">asc</option>
            <option value="des">des</option>
          </select>
        </div>
      </div>
    </div>
  );
};
