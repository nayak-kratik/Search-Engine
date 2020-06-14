const privateMethods = {
  // Sort based on number of occurance
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

  /*
   * Function: search
   *     This function takes the search string and number of results to be displayed.
   *
   * Params/Handler:
   *     searcQuery: String
   *     numberOfResults: Integer
   *
   * Return:
   *     resultsHashMap: Array
   *
   */
  search(searchQuery, numberOfResults) {
    const resultsHashMap = [];
    // Trim search query, remove all unwanted spaces and convert to array of sub strings.
    searchQuery
      .trim()
      .replace(/\s\s*/g, " ")
      .split(" ")
      .forEach((eachKeyword) => {
        // Check number of occurance of each search keyword and get the frequency map.
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

    //  Sort based on number of occurance.
    const sortedHashMap = privateMethods.sortSearchResult(resultsHashMap);
    // Get books data as an array of objects
    const finalResult = privateMethods.getBooks(
      sortedHashMap,
      this.booksData,
      numberOfResults
    );
    return finalResult;
  }
}
