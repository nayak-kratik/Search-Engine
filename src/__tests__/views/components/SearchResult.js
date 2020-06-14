import React from "react";
import { SearchResult } from "../../../views/components";
import { shallow } from "enzyme";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

const searchResults =  [
    { title: "Test", summary: "Summary", author: "Author" },
    { title: "Test2", summary: "Summary2", author: "Author2" },
    { title: "Test3", summary: "Summary3", author: "Author3" },
  ];

describe("SearchResult component snapshot", () => {
  it("should match with <SearchResult /> snapshot", () => {
    const wrapper = shallow(<SearchResult allBooks={searchResults} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Search results display", () => {
  it("should display n search result on render", () => {
    const wrapper = shallow(<SearchResult allBooks={searchResults}/>);
    expect(wrapper.find(".search-result").children()).toHaveLength(3)
  });

  
});
