import React from "react";
import "../../styles/common.css";
import "../../App.css";
import { func } from "prop-types";

import SearchLogo from "../../assets/search.svg";

const SearchBar = ({ onChange, onSubmit }) => {
  return (
    <>
      <h2 className="title font-weight-bold">Search Books</h2>
      <form
        onSubmit={(e) => onSubmit(e)}
        className="search-bar d-flex justify-content-center"
      >
        <input
          placeholder="Type here to search"
          className="search-bar__input box-shadow-inset border-0 mr-2 px-3"
          onChange={(e) => onChange(e)}
        ></input>
        <button
          className="search-bar__submit border-0 ml-2 box-shadow-outset"
          type="submit"
        >
          <img src={SearchLogo} alt="Search Logo" className="h-100 w-100" />
        </button>
      </form>
    </>
  );
};

SearchBar.propTypes = {
  onChange: func,
  onSubmit: func,
};
export default SearchBar;
