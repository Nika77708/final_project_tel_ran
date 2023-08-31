import Notiflix from "notiflix";
import { React } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { usePostOrderMutation } from "../../redux/apiSlice";
import { deleteProducts } from "../../redux/basketSlice";
import css from "./OrderForm.module.css";

export default function OrderForm({ length }) {
  const totalPrice = useSelector(
    (state) => state.allReducers.basket.totalPrice
  );

  const total = totalPrice.toFixed(2);
  const totalOrder = useSelector((state) => state.allReducers.basket);

  console.log(total);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [addOrder, { isError }] = usePostOrderMutation();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    addOrder({ ...data, ...totalOrder }) && dispatch(deleteProducts());
    reset(
      {
        phone: "",
      },
      {
        keepErrors: true,
        keepDirty: true,
      }
    );
    Notiflix.Notify.success("Thank you for your order!");
    isError &&
      Notiflix.Notify.info("Something is going wromg. Please try again.");
  };

  return (
    <div className={css.container}>
      <h3 className={css.title}>Order details</h3>

      <div className={css.total}>
        <p className={css.totalTitle}>Total</p>
        <p className={css.totalPrice}>
          {total}
          <span className={css.totalCurrency}>$</span>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        {total > 0 ? (
          <input
            className={css.input}
            {...register("phone", {
              required: true,
              pattern: {
                value: /\(?\+\(?49\)?[ ()]?([- ()]?\d[- ()]?){10}/,
                message: "Invalid phone number",
              },
            })}
            placeholder="+49 (999) 999 99 99"
          />
        ) : (
          <input
            className={css.input}
            {...register("phone", {
              required: true,
              pattern: {
                value: /\(?\+\(?49\)?[ ()]?([- ()]?\d[- ()]?){10}/,
                message: "Invalid phone number",
              },
            })}
            placeholder="+49 (999) 999 99 99"
            disabled={true}
          />
        )}
        {errors.phone && (
          <span className={css.message}>
            The field is required. Please check that the entered phone number is
            correct (only ten numbers, ignoring +49).
          </span>
        )}

        {total > 0 ? (
          <input type="submit" value="Order" className={css.btn} />
        ) : (
          <input
            type="submit"
            value="Please, choose something"
            className={css.btn2}
            disabled={true}
          />
        )}
      </form>
    </div>
  );
}
