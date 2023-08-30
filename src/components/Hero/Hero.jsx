import React from "react";
import { NavLink } from "react-router-dom";
import img from "../../images/flowerbed.png";
import Section from "../Section/Section";
import css from "./Hero.module.css";

export default function Hero() {
  return (
    <Section>
      <div className={css.hero}>
        
        <div className={css.container}>
          <h1 className={css.title}>Sale</h1>
          <p className={css.description}>New season</p>

          <NavLink to={`/sales`}>
            <h1 className={css.sale}>Sale</h1>
          </NavLink>
        </div>

        <img src={img} alt="tree" className={css.img}></img>
      </div>
    </Section>
  );
}
