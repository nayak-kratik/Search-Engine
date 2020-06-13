import React from "react";
import "../../styles/common.css";
import "../../App.css";
import DisplayCard from "./DisplayCard";

const SearchResult = (props) => {
  return (
    <div className="search-result d-flex flex-wrap mt-5 ">
      {props.allBooks.map((book, i) => (
        <DisplayCard key={i} {...book}></DisplayCard>
      ))}
    </div>
  );
};
export default SearchResult;
