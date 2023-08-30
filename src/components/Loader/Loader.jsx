import React from "react";
import { ColorRing } from "react-loader-spinner";

export default function Loader() {
  return (
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={[
        "#9ACD32",
        "#ADFF2F",
        "#7FFF00",
        "#7CFC00",
        "#008000",
        "#00FF00",
        "#32CD32",
        "#00FF7F",
        "#00FA9A",
      ]}
    />
  );
}
