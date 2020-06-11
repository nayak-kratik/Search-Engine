import React from "react";
import "../../styles/common.css";
import "../../App.css";
import DisplayCard from "./DisplayCard";

const SearchResult = () => {
  return (
    <div className="search-result d-flex flex-wrap mt-5 ">
      <DisplayCard></DisplayCard>
      <DisplayCard></DisplayCard>
      <DisplayCard></DisplayCard>
      <DisplayCard></DisplayCard>
      <DisplayCard></DisplayCard>
    </div>
  );
};
export default SearchResult;
