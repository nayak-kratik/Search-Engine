import React from "react";
import "../../styles/common.css";
import "../../App.css";

const DisplayCard = ({ title, summary, author }) => {
  return (
    <>
      <div className="search-result__display-card d-flex flex-column flex-1 m-3 px-3 box-shadow-outset justify-content-center">
        <h2>{title}</h2>
        <sup>By - {author}</sup>
        <span className="read-more position-absolute">
          Hover to read summary
        </span>
        {/* <p className="display-card__summary flex-5 m-0">{summary}</p> */}
      </div>
    </>
  );
};
export default DisplayCard;
