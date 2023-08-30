import React from "react";
import Section from "../../components/Section/Section";
import error from "../../images/error.jpg";
import css from "./ErrorPage.module.css";

export default function ErrorPage() {
  return (
    <div>
      <Section>
        <img className={css.img} src={error} alt="Error 404"></img>
      </Section>
    </div>
  );
}
