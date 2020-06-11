import React from "react";
import "../../styles/common.css";
import "../../App.css";

const DisplayCard = () => {
  return (
    <div className="search-result__display-card d-flex flex-column flex-1 m-3 box-shadow-outset">
      <h2 className="display-card__title flex-1 m-0">Title</h2>
      <p className="display-card__summary flex-5 m-0">Summary</p>
      <h6 className="display-card__author flex-1 m-0"> Author</h6>
    </div>
  );
};
export default DisplayCard;
