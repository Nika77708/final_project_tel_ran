import Notiflix from "notiflix";
import { React } from "react";
import { useForm } from "react-hook-form";
import { usePostPhoneNumberForDiscountMutation } from "../../redux/apiSlice";
import css from "./Form.module.css";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [postPhoneNumberForDiscount, { isError }] =
    usePostPhoneNumberForDiscountMutation();

  const onSubmit = (data) => {
    postPhoneNumberForDiscount(data);

    reset(
      {
        phone: "",
      },
      {
        keepErrors: true,
        keepDirty: true,
      }
    );
    Notiflix.Notify.success(
      "Thank you. Wait for a message with a discount code."
    );

    isError && Notiflix.Notify.info("Something is wrong. Please try again.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <input
        type="tel"
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
      {errors.phone && (
        <div className={css.messageContainer}>
          The field is required.
          Please check that the entered phone number is correct (only ten numbers, ignoring +49).
        </div>
      )}

      <input type="submit" value="Get a discount" className={css.btn} />
    </form>
  );
}
