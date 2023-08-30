import { TfiClose, TfiMinus, TfiPlus } from "react-icons/tfi";
import css from "./ProductsInBacket.module.css";

export default function ProductsInBacket({
  image,
  title,
  quantity,
  price,
  discont_price,
  addProductToBasketHandler,
  decreaseProductHandler,
  deleteProductHandler,
}) {
  return (
    <div className={css.container}>
      <div className={css.mainContainer}>
        <div className={css.imgContainer}>
          <img
            className={css.img}
            src={`https://backend-for-final-project-garden.onrender.com/${image}`}
            alt={title}
          />
        </div>

        <div className={css.wrapper}>
          <div className={css.wrapper2}>
            <div className={css.titleWrapper}>{title}</div>

            <div className={css.btnContainer}>
              <TfiPlus
                className={css.btn}
                onClick={addProductToBasketHandler}
              />
              <p> {quantity}</p>

              <TfiMinus className={css.btn} onClick={decreaseProductHandler} />
            </div>
          </div>

          <div className={css.firstPrice}>
            {discont_price ? discont_price : price}$
          </div>

          <div className={css.secondPrice}>
            {discont_price && price ? `${price}$` : "  "}
          </div>
        </div>

        <button className={css.btn} onClick={deleteProductHandler}>
          <TfiClose />
        </button>
      </div>
    </div>
  );
}
