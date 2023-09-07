import React, { useCallback, useEffect, useState  } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Filtration } from "../../components/Filtration/Filtration";
import Loader from "../../components/Loader/Loader";
import ProductCard from "../../components/ProductCard/ProductCard";
import Section from "../../components/Section/Section";
import { useGetAllProductsQuery } from "../../redux/apiSlice";
import {
    addProductBasket,
    countTotalPrice,
    countTotalProducts,
} from "../../redux/basketSlice";
import css from "./AllProductsPage.module.css";


export default function AllProductsPage({ isDiscounted = false }) {
  const [filteredProducts, setFiltredProducts] = useState();
  const { data, error, isLoading } = useGetAllProductsQuery();
  const dispatch = useDispatch();

  const addToBasketHandler = (event, el) => {
    event.preventDefault();
    dispatch(addProductBasket(el));
    dispatch(countTotalPrice());
    dispatch(countTotalProducts());
  };

  const setFiltredProductsHandler = useCallback((productsToFilter) => {
    setFiltredProducts(productsToFilter);
  }, []);

  useEffect(() => {
    if (data) {
      if (isDiscounted) {
        const filtered = data.filter((el) => el.discont_price !== null);
        setFiltredProducts(filtered);
      } else {
        setFiltredProducts(data);
      }
    }
  }, [data, isDiscounted]);

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

  return (
    <Section>
      <h1 className={css.mainTitle}>
        {isDiscounted === false ? "All products" : "Sales"}
      </h1>
      <Filtration
        products={data}
        setFiltredProducts={setFiltredProductsHandler}
        onlySale={isDiscounted ? true : false}
      />

      <div className={css.wrapper}>
        {filteredProducts &&
          filteredProducts.map((el) => (
            <NavLink to={`/products/${el.id}`} key={el.id}>
              <ProductCard
                {...el}
                addToBasketHandler={(event) => addToBasketHandler(event, el)}
              />
            </NavLink>
          ))}
      </div>
    </Section>
  );
}
