import React from "react";
import "../../styles/common.css";
import "../../App.css";

const DisplayCard = ({ title, summary, author }) => {
  return (
    <div className="flip-container box-shadow-outset search-result__display-card m-3 flex-1">
      <div className="flipper h-100 w-100 position-relative">
        <div className="front position-absolute  h-100  w-100 d-flex flex-column  justify-content-center ">
          <h2 className="display-card__title px-3">{title}</h2>
          <span className="display-card__author">By {author}</span>
          <span className="read-more position-absolute">
            Hover to read the summary
          </span>
        </div>
        <div className="back position-absolute h-90 my-1  px-3  d-flex overflow-scroll align-content-center ">
          <p className="display-card__summary m-auto p-3">{summary}</p>
        </div>
      </div>
    </div>
  );
};
export default DisplayCard;
