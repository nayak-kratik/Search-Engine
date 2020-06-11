import React, { useState } from "react";
import { SearchBar, SearchResult } from "./components";
import SearchEngine from "../utils/search";

const AutoComplete = () => {
  const [searchInstance] = useState(new SearchEngine());

  const onChange = (event) => {
    const searchQuery = event.target.value;
    searchQuery.length && searchInstance.search(searchQuery, 10);
    console.log(searchInstance.search(searchQuery, 10));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };
  const searchBarParams = {
    onChange,
    onSubmit,
  };

  return (
    <>
      <SearchBar {...searchBarParams}></SearchBar>
      <SearchResult></SearchResult>
    </>
  );
};
export default AutoComplete;
