import React from "react";
import "../../styles/common.css";
import "../../App.css";
import SearchLogo from "../../assets/search.svg";

const SearchBar = () => {
  return (
    <div className=" search-bar d-flex justify-content-center">
      <input className="search-bar__input  border-0 mr-2 px-3"></input>
      <button className="search-bar__submit border-0 ml-2">
        <img src={SearchLogo} alt="Search Logo" className="h-100 w-100" />
      </button>
    </div>
  );
};
export default SearchBar;
