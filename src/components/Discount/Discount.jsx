import React from "react";
import gnome from "../../images/garden_gnome.png";
import Form from "../Form/Form";
import Section from "../Section/Section";
import css from "./Discount.module.css";

export default function Discount() {
  return (
    <Section>
      <div className={css.container}>
        <img className={css.gnome} src={gnome} alt="garden gnome" />

        <div className={css.infoContainer}>
          <p className={css.discount}>5% off</p>
          <p className={css.title}>on the first order</p>
          <Form></Form>
        </div>        
      </div>
    </Section>
  );
}
