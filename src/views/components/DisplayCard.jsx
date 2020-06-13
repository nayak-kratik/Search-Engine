import React from "react";
import "../../styles/common.css";
import "../../App.css";

const DisplayCard = ({ title, summary, author }) => {
  return (
    <div className="flip-container box-shadow-outset search-result__display-card m-3 flex-1">
      <div className="flipper h-100 w-100 position-relative">
        <div className="front position-absolute  h-100  w-100 d-flex flex-column  justify-content-center ">
          <h2 className="px-3">{title}</h2>
          <span>By - {author}</span>
          <span className="read-more position-absolute">
            Hover to read the summary
          </span>
        </div>
        <div className="back position-absolute h-100  px-3  d-flex overflow-scroll ">
          <p className="m-auto p-3">{summary}</p>
        </div>
      </div>
    </div>
  );
};
export default DisplayCard;
