import React from "react";
import Section from "../../components/Section/Section";
import { NavLink } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { useGetAllСategoriesQuery } from "../../redux/apiSlice";
import css from "./CategoriesPage.module.css";

export default function CategoriesPage() {
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
      <h3 className={css.title}>Categories</h3>

      <div className={css.wrapper}>
        {data &&
          data.map((el, index) => (
            <NavLink
              className={css.nav}
              key={el.id}
              to={`/categories/${el.id}`}
            >
              <img
                className={css.img}
                src={`https://backend-for-final-project-garden.onrender.com/${el.image}`}
                alt=""
              />
              <p className={css.titleSection}>{el.title}</p>
            </NavLink>
          ))}
      </div>
    </Section>
  );
}
