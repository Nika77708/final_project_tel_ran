import React from "react";
import { LiaInstagram, LiaWhatsapp } from "react-icons/lia";
import Section from "../Section/Section";
import css from "./Contacts.module.css";

export default function Contacts() {
  return (
    <Section>
      <div className={css.wrapper}>
        <div className={css.contacts}>
          <div>
            <h3 className={css.title}>Contact</h3>
            <address className={css.phone}>
              <a href="tel:+499999999999">+49 999 999 99 99</a>
            </address>
          </div>

          <div className={css.socialMediaWrapper}>
            <a
              target="_blank"
              rel="noopen noreferrer"
              className={css.anchor}
              href="https://www.instagram.com/"
            >
              <LiaInstagram className={css.instagram} />
              Instagram
            </a>
            <a
              target="_blank"
              rel="noopen noreferrer"
              className={css.anchor}
              href="https://www.whatsapp.com/"
            >
              <LiaWhatsapp className={css.whatsUp} />
              WhatsApp
            </a>
          </div>
        </div>

        <div className={css.address}>
          <h3 className={css.title}>Address</h3>
          <address className={css.adressDescription}>
            <a
              href="https://www.google.com/maps/place/AIT+TR+GmbH/@52.5079655,13.3737465,17z/data=!3m1!5s0x47a851cbc6be2f3b:0x7edf0a3a9c29227c!4m6!3m5!1s0x47a851d00f714303:0xb7b4fcea44396e2d!8m2!3d52.5079329!4d13.3750447!16s%2Fg%2F11f67hstq4?entry=ttu"
              target="_blank"
              rel="noopen noreferrer"
            >
              Linkstraße 2, 8 OG, 10785, Berlin, Deutschland
            </a>
          </address>

          <div className={css.workingTimeWrapper}>
            <p className={css.workingTime}>Working Hours:</p>
            <p className={css.hours}>24 hours a day</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
