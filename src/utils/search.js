const privateMethods = {
  sortSearchResult(resultHashMap) {
    const sortedHashMap = Object.values(resultHashMap).sort(function (a, b) {
      return a.count > b.count ? -1 : b.count > a.count ? 1 : 0;
    });
    return sortedHashMap;
  },

  getBooks(searchResultHashMap, booksData, numberOfResults) {
    let finalResult = [];
    searchResultHashMap.forEach((result) => {
      finalResult.push({
        id: result.id,
        title: booksData["titles"][result.id],
        summary: booksData["summaries"][result.id].summary,
        author: booksData["authors"][result.id].author,
      });
    });
    return finalResult.slice(0, numberOfResults);
  },
};

export default class SearchEngine {
  constructor() {
    this.hashMap = require("../assets/hashMap.json");
    this.booksData = require("../assets/data.json");
  }

  search(searchQuery, numberOfResults) {
    const resultsHashMap = [];
    searchQuery
      .trim()
      .replace(/\s\s*/g, " ")
      .split(" ")
      .forEach((eachKeyword) => {
        const frequencyArray = this.hashMap[eachKeyword];
        if (frequencyArray) {
          for (let [key, value] of Object.entries(frequencyArray)) {
            if (resultsHashMap[key] === undefined) {
              resultsHashMap[key] = value;
            } else {
              resultsHashMap[key]["count"] += value["count"];
            }
          }
        }
      });
    const sortedHashMap = privateMethods.sortSearchResult(resultsHashMap);
    const finalResult = privateMethods.getBooks(
      sortedHashMap,
      this.booksData,
      numberOfResults
    );
    return finalResult;
  }
}
