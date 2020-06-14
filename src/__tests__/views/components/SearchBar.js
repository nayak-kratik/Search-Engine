import React from "react";
import { SearchBar } from "../../../views/components";
import { shallow, mount } from "enzyme";
import sinon from "sinon";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

const searchBarParams = {
  onChange: sinon.spy(),
  onSubmit: sinon.spy(),
  onSelect: sinon.spy(),
  searchResult: [
    { title: "Test", summary: "Summary", author: "Author" },
    { title: "Test2", summary: "Summary2", author: "Author2" },
  ],
  selectedBook: {},
};

const searchBarParamsWithoutSelectedBook = {
  onChange: sinon.spy(),
  onSubmit: sinon.spy(),
  onSelect: sinon.spy(),
  searchResult: [],
  selectedBook: undefined,
};

describe("SearchBar component snapshot", () => {
  it("should match with <SearchBar /> snapshot", () => {
    const wrapper = shallow(<SearchBar {...searchBarParams} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("SearchBar component event handlers", () => {
  it("should trigger onChange event on typing in text field ", () => {
    const wrapper = mount(<SearchBar {...searchBarParams} />);
    wrapper.find("input").simulate("change", { target: { value: "Hello" } });
    expect(searchBarParams.onChange).toHaveProperty("callCount", 1);
    expect(searchBarParams.onChange.calledOnce).toBe(true);
  });

  it("should trigger onSubmit event on form submit ", () => {
    const wrapper = mount(<SearchBar {...searchBarParams} />);
    wrapper.find("form").simulate("submit");
    expect(searchBarParams.onSubmit.calledOnce).toBe(true);
  });

  it("should trigger onSelect event on selecting a recommendation ", () => {
    const wrapper = mount(<SearchBar {...searchBarParams} />);
    wrapper.find(".search-recommendation__item").first().simulate("click");
    expect(searchBarParams.onSelect.calledOnce).toBe(true);
  });
});

describe("SearchBar component - Display logic  ", () => {
  it("should have header  ", () => {
    const wrapper = mount(<SearchBar {...searchBarParams} />);
    const text = wrapper.find("h2").text();
    expect(text).toEqual("Search Books");
  });

  it("should disable submit button if no recommendations are selected", () => {
    const wrapper1 = mount(
      <SearchBar {...searchBarParamsWithoutSelectedBook} />
    );
    expect(wrapper1.find(".search-bar__submit").hasClass("disabled")).toBe(
      true
    );
    const wrapper2 = mount(<SearchBar {...searchBarParams} />);
    expect(wrapper2.find(".search-bar__submit").hasClass("disabled")).toBe(
      false
    );
  });
});
