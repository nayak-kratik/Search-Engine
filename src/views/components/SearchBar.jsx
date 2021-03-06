import React from "react";
import "../../styles/common.css";
import "../../App.css";
import { func, arrayOf, object, shape, string } from "prop-types";

import SearchLogo from "../../assets/search.svg";
import AddLogo from "../../assets/plus.svg";

const SearchBar = ({
  onChange,
  onSubmit,
  onSelect,
  searchResult,
  selectedBook,
}) => {
  return (
    <>
      <h2 className="title font-weight-bold">Search Books</h2>
      <form
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          selectedBook && onSubmit(e);
        }}
      >
        <input
          type="search"
          id="js-search-input"
          placeholder="Type here to search"
          className="search-bar__input box-shadow-inset border-0  px-3"
          onChange={(e) => onChange(e)}
        ></input>

        <div
          className={`search-recommendation px-3 ${
            searchResult.length ? "d-block" : "d-none"
          } `}
        >
          {searchResult &&
            searchResult.map((item, key) => (
              <div
                className="py-3 search-recommendation__item"
                key={key}
                data-title={item.title}
                data-summary={item.summary}
                data-author={item.author}
                onClick={(e) => {
                  e.preventDefault();
                  onSelect(e);
                }}
              >
                {item.title}
              </div>
            ))}
        </div>

        <button
          className={`search-bar__submit border-0 ml-2 box-shadow-outset ${
            !selectedBook ? "disabled" : ""
          }`}
          type="submit"
        >
          <img
            src={!selectedBook ? SearchLogo : AddLogo}
            alt="Logo"
            className="h-100 w-100"
          />
        </button>
      </form>
    </>
  );
};

SearchBar.propTypes = {
  onChange: func,
  onSubmit: func,
  onSelect: func,
  searchResult: arrayOf(object),
  selectedBook: shape({
    title: string,
    summary: string,
    author: string,
  }),
};
export default SearchBar;
