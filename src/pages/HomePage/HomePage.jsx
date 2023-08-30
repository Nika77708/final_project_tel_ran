import React from "react";
import CatalogSectionMP from "../../components/CatalogSectionMP/CatalogSectionMP";
import Discount from "../../components/Discount/Discount";
import Hero from "../../components/Hero/Hero";
import SalesSectionMP from "../../components/SalesSactionMP/SalesSectionMP";

export default function HomePage() {
  return (
    <>
      <Hero></Hero>
      <CatalogSectionMP />
      <Discount></Discount>
      <SalesSectionMP></SalesSectionMP>
    </>
  );
}
