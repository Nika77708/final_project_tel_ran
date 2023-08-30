import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { Filtration } from "../../components/Filtration/Filtration";
import Loader from "../../components/Loader/Loader";
import ProductCard from "../../components/ProductCard/ProductCard";
import Section from "../../components/Section/Section";
import { useGetProductsByCategoryQuery } from "../../redux/apiSlice";
import {
    addProductBasket,
    countTotalPrice,
    countTotalProducts,
} from "../../redux/basketSlice";
import css from "./CategoryListPage.module.css";

export const CategoryListPage = () => {
  const [filteredProducts, setFiltredProducts] = useState();
  const { id } = useParams();
  const { data, error, isLoading } = useGetProductsByCategoryQuery(id);
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
      <h1>{data.category.title}</h1>
      <Filtration
        products={data.data}
        setFiltredProducts={setFiltredProductsHandler}
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
};
