import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { TfiBag } from "react-icons/tfi";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.svg";
import Section from "../Section/Section";
import css from "./Header.module.css";

export default function Header() {
  const [nav, setNav] = useState(false);

  const totalProduct = useSelector(
    (state) => state.allReducers.basket.totalProducts
  );

  return (
    <header>
      <Section>
        <div className={css.container}>
          <div className={css.logoContainer}>
            <NavLink to="/">
              <img alt="logo" src={logo} className={css.logo} />
            </NavLink>
            <NavLink to="/categories" className={css.catalog}>
              Catalog
            </NavLink>
          </div>

          <nav className={css.navContainer}>
            <ul className={nav ? [css.menu, css.active].join(" ") : [css.menu]}>
              <li className={css.navItem}>
                <NavLink
                  onClick={() => setNav(!nav)}
                  className={({ isActive }) => (isActive ? css.active : "")}
                  to="/"
                >
                  Main Page
                </NavLink>
              </li>
              <li className={css.navItem}>
                <NavLink
                  onClick={() => setNav(!nav)}
                  className={({ isActive }) => (isActive ? css.active : "")}
                  to="/products"
                >
                  All products
                </NavLink>
              </li>
              <li className={css.navItem}>
                <NavLink
                  onClick={() => setNav(!nav)}
                  className={({ isActive }) => (isActive ? css.active : "")}
                  to="/sales"
                >
                  All sales
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className={css.itemsWrapper}>
            <div onClick={() => setNav(!nav)} className={css.mobile_btn}>
              {nav ? <AiOutlineClose size={35} /> : <AiOutlineMenu size={35} />}
            </div>

            <NavLink to="/basket">
              <div className={css.basketContainer}>
                <TfiBag className={css.bag} />

                <p className={css.total}>{totalProduct}</p>
              </div>
            </NavLink>
          </div>
        </div>
      </Section>
    </header>
  );
}
