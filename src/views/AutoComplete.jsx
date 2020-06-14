import React, { useState } from "react";
import { SearchBar, SearchResult } from "./components";
import SearchEngine from "../utils/search";

const AutoComplete = () => {
  const [searchInstance] = useState(new SearchEngine());
  const [searchResult, setSearchResult] = useState([]);
  const [selectedBook, setSelectedBook] = useState(undefined);
  const [allSelectedBooks, setAllSelectedBook] = useState([]);

  const highlightSelectedBook = (chosenBook) => {
    setSearchResult([]);
    document.getElementsByClassName("search-bar__input")[0].value =
      chosenBook.title;
  };

  const onChange = (event) => {
    const searchQuery = event.target.value.trim().toLowerCase();
    searchQuery
      ? setSearchResult(searchInstance.search(searchQuery, 5))
      : setSelectedBook(undefined);
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
    document.getElementsByClassName("search-bar__input")[0].value = "";
    setSelectedBook(undefined);
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
