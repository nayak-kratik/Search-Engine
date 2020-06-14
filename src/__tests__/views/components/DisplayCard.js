import React from "react";
import  DisplayCard  from "../../../views/components/DisplayCard";
import { shallow, mount } from "enzyme";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

const cardDetails = {
  title: "Test title",
  summary: "Test summary",
  author: "Test author",
  
};


describe("DisplayCard component snapshot", () => {
  it("should match with <DisplayCard /> snapshot", () => {
    const wrapper = shallow(<DisplayCard {...cardDetails} />);
    expect(wrapper).toMatchSnapshot();
  });
});


describe("DisplayCard component", () => {
  it("should show appropriate details ", () => {
    const wrapper = mount(<DisplayCard {...cardDetails} />);
    const title =wrapper.find(".display-card__title").text();
    const summary =wrapper.find(".display-card__summary").text();
    const author =wrapper.find(".display-card__author").text();
    expect(title).toEqual(cardDetails.title);
    expect(summary).toEqual(cardDetails.summary);
    expect(author).toEqual(`By ${cardDetails.author}`);
  });

  
});

