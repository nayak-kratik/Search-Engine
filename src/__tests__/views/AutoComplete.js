import React from "react";
import AutoComplete from "../../views/AutoComplete";
import { SearchBar, SearchResult } from "../../views/components/";
import { shallow } from "enzyme";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

const searchBarParams = {
  onChange: () => {},
  onSubmit: () => {},
  onSelect: () => {},
  searchResult: [],
  selectedBook: {},
};

describe("<AutoComplete> component", () => {
  it("should match with <AutoComplete /> snapshot", () => {
    const wrapper = shallow(<AutoComplete />);
    expect(wrapper).toMatchSnapshot();
  });
  it("AutoComplete should have SearchBar sub component", () => {
    const wrapper = shallow(<SearchBar {...searchBarParams} />);
    expect(wrapper).toMatchSnapshot();
  });
  it("AutoComplete should have SearchResult sub component", () => {
    const wrapper = shallow(<SearchResult allBooks={[]} />);
    expect(wrapper).toMatchSnapshot();
  });
});
