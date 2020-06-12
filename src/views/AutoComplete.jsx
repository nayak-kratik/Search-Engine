import React, { useState, useEffect } from "react";
import { SearchBar, SearchResult } from "./components";
import SearchEngine from "../utils/search";

const AutoComplete = () => {
  const [searchInstance] = useState(new SearchEngine());
  const [searchResult, setSearchResult] = useState([]);
  const [selectedBook ,setSelectedBook] = useState(undefined)

  const onChange = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const numberOfResults = 5;
    setSearchResult(
      searchQuery.length
        ? searchInstance.search(searchQuery, numberOfResults)
        : []
    );
  };
  const onSelect =(e) =>{
    // Convert DOMStringMap to Object
    // The DOMStringMap interface is used for the HTMLElement.dataset attribute,to represent data for custom attributes added to elements.
    setSelectedBook(
      Object.assign({}, e.target.dataset)
    )
  }
  
  const onSubmit = (e) => {
    console.log(e);
  };
  const searchBarParams = {
    onChange,
    onSubmit,
    onSelect,
    searchResult,
    selectedBook
  };
  return (
    <>
      <SearchBar {...searchBarParams}></SearchBar>
      <SearchResult></SearchResult>
    </>
  );
};
export default AutoComplete;
