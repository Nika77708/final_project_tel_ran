import React from "react";
import { NavLink  } from "react-router-dom";
import css from "./CatalogItem.module.css";

export default function CatalogItem({ id, title, image }) {
  return (
    <NavLink  className={css.container} to={`/categories/${id}`}>
      <img
        className={css.img}
        src={`https://backend-for-final-project-garden.onrender.com/${image}`}
        alt={title}
      ></img>

      <p className={css.title}>{title}</p>
    </NavLink>
  );
}
