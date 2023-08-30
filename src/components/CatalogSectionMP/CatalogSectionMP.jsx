import React from "react";
import { NavLink  } from "react-router-dom";
import { useGetAllСategoriesQuery } from "../../redux/apiSlice";
import CatalogItem from "../CatalogItem/CatalogItem";
import Loader from "../Loader/Loader";
import Section from "../Section/Section";
import css from "./CatalogSectionMP.module.css";

export default function CatalogSectionMP() {
  const { data, error, isLoading } = useGetAllСategoriesQuery();

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
      <div className={css.container}>
        <h3 className={css.title}>Catalog</h3>

        <NavLink to="/categories">
            <button className={css.btn}>All categories</button>
        </NavLink>
      </div>

      <div className={css.wrapper}>
        {data &&
          data.map((el) => <CatalogItem key={el.id} {...el} />).slice(0, 4)}
      </div>
    </Section>
  );
}
