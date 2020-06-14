import React, { useState } from "react";
import { SearchBar, SearchResult } from "./components";
import SearchEngine from "../utils/search";

const AutoComplete = () => {
  const [searchInstance] = useState(new SearchEngine());
  const [searchResult, setSearchResult] = useState([]);
  const [selectedBook, setSelectedBook] = useState(undefined);
  const [allSelectedBooks, setAllSelectedBook] = useState([]);

  /*
   * Function: highlightSelectedBook
   *     This function populates the input field with selected book title and  hides recommendation box.
   *
   * Params/Handler:
   *     chosenBook - Object
   *
   * Return:
   *     None
   */

  const highlightSelectedBook = (chosenBook) => {
    setSearchResult([]);
    document.getElementsByClassName("search-bar__input")[0].value =
      chosenBook.title;
  };

  /*
   * Function: onChange
   *     This function gets the user input and calls search method
   *
   * Params/Handler:
   *     Input event
   *
   * Return:
   *     None
   */

  const onChange = (event) => {
    const searchQuery = event.target.value.trim().toLowerCase();

    if (searchQuery.length) {
      setSearchResult(searchInstance.search(searchQuery, 10));
    } else {
      setSearchResult([]);
      setSelectedBook(undefined);
    }
  };

  /*
   * Function: onSelect
   *     This function gets triggered when user selects a recommended book from the dropdown.
   *
   * Params/Handler:
   *     Click event
   *
   * Return:
   *     None
   */

  const onSelect = (e) => {
    // Convert DOMStringMap(used to represent custom attriutes added to element) to Object
    const chosenBook = Object.assign({}, e.target.dataset);
    setSelectedBook(chosenBook);
    highlightSelectedBook(chosenBook);
  };

  /*
   * Function: onSubmit
   *     This function gets triggered on submitting the form. The selected book will be added to 'allSelectedBook' array .
   *
   * Params/Handler:
   *     Submit event
   *
   * Return:
   *     None
   */

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
