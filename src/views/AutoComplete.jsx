import React, { useState } from "react";
import { SearchBar, SearchResult } from "./components";
import SearchEngine from "../utils/search";

const AutoComplete = () => {
  const [searchInstance] = useState(new SearchEngine());
  const [searchResult, setSearchResult] = useState([]);
  const [selectedBook, setSelectedBook] = useState(undefined);
  const [allSelectedBooks, setAllSelectedBook] = useState([]);

  const populateInputField = (title) => {
    document.getElementsByClassName("search-bar__input")[0].value = title;
    document.getElementsByClassName("search-bar__input")[0].style.color =
      "var(--highlight-color)";
  };
  const unPopulateInputField = () => {
    document.getElementsByClassName("search-bar__input")[0].value = "";
    document.getElementsByClassName("search-bar__input")[0].style.color =
      "var(--text-color)";
    setSelectedBook(undefined);
  };

  const highlightSelectedBook = (chosenBook) => {
    setSearchResult([]);
    populateInputField(chosenBook.title);
  };

  const onChange = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const numberOfResults = 5;
    setSearchResult(
      searchQuery.length
        ? searchInstance.search(searchQuery, numberOfResults)
        : []
    );
  };

  const onSelect = (e) => {
    // Convert DOMStringMap to Object
    // The DOMStringMap interface is used for the HTMLElement.dataset attribute,to represent data for custom attributes added to elements.
    const chosenBook = Object.assign({}, e.target.dataset);
    setSelectedBook(chosenBook);
    highlightSelectedBook(chosenBook);
  };

  const onSubmit = (e) => {
    setAllSelectedBook((prevSelectedBooks) => [
      ...prevSelectedBooks,
      selectedBook,
    ]);
    unPopulateInputField();
  };

  const searchBarParams = {
    onChange,
    onSubmit,
    onSelect,
    searchResult,
    selectedBook,
  };
  return (
    <>
      <SearchBar {...searchBarParams}></SearchBar>
      <SearchResult allBooks={allSelectedBooks}></SearchResult>
    </>
  );
};
export default AutoComplete;
