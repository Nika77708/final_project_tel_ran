import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from "./CartPage.module.css";
import ProductsInBacket from "../../components/ProductsInBasket/ProductsInBacket";
import {
  cleanBasket,
  countTotalPrice,
  countTotalProducts,
  decreaseProduct,
  deleteProduct,
  addProductBasket,
} from "../../redux/basketSlice";
import { TfiAngleRight } from "react-icons/tfi";
import Section from "../../components/Section/Section";
import OrderForm from "../../components/OrderForm/OrderForm";
import { NavLink } from "react-router-dom";
import cart from "../../images/emptyCart.webp";

export default function CartPage() {
  const data = useSelector((state) => state.allReducers.basket.products);
  const dispatch = useDispatch();

  const cleanBasketHandler = () => {
    dispatch(cleanBasket());
    dispatch(countTotalPrice());
    dispatch(countTotalProducts());
  };

  const addProductToBasketHandler = (product) => {
    dispatch(addProductBasket(product));
    dispatch(countTotalPrice());
    dispatch(countTotalProducts());
  };

  const decreaseProductHandler = (product) => {
    dispatch(decreaseProduct(product));
    dispatch(countTotalPrice());
    dispatch(countTotalProducts());
  };

  const deleteProductHandler = (product) => {
    dispatch(deleteProduct(product));
    dispatch(countTotalPrice());
    dispatch(countTotalProducts());
  };

  const length = data.length

  return (
    <Section>
      <div className={css.apperWrapper}>
        <NavLink className={css.navApperWrapper} to={`/`}>
          Home
        </NavLink>

        <>
          <NavLink className={css.navApperWrapper} to={`/products`}>
            Back to the store <TfiAngleRight className={css.arrow} />
          </NavLink>
        </>
      </div>

      <div className={css.wrapper}>
        <div className={css.container}>
          {data.length !== 0 ? (
            data.map((el) => (
              <ProductsInBacket
                key={el.id}
                {...el}
                addProductToBasketHandler={() => addProductToBasketHandler(el)}
                decreaseProductHandler={() => decreaseProductHandler(el)}
                deleteProductHandler={() => deleteProductHandler(el)}
              />
            ))
          ) : (
            <div className={css.cartWrapper}>
              <p className={css.cartTitle}>The cart is empty</p>
              <img className={css.cart} src={cart} alt={cart} />
            </div>
          )}

          {data.length !== 0 ? (
            <button className={css.btn} onClick={() => cleanBasketHandler()}>
              Clear cart
            </button>
          ) : (
            ""
          )}
        </div>

        <OrderForm length={length} />
      </div>
    </Section>
  );
}
