import React from "react";
import Section from "../Section/Section";
import css from "./Map.module.css";

export default function Map() {
  return (
    <Section>
      <iframe
        className={css.map}
        title="address"
        src="https://maps.google.com/maps?q=Linkstraße 2/8 Etage, 10785 Berlin&t=&z=15&ie=UTF8&iwloc=&output=embed"
        width="100%"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </Section>
  );
}
