const fs = require("fs");

/*
 * Function: readFile
 *     This function reads the data.json file for further processing.
 *
 * Params/Handler:
 *     Path to the file
 *
 * Return:
 *     File data as JSON
 */

const readFile = (file_path) => {
  return new Promise((resolve, reject) => {
    const data = fs.readFileSync(file_path);
    resolve(JSON.parse(data));
  });
};

/*
 * Function: createSummaryHashMap
 *     This function creates a  map file for the input file. This map file contains info
 *     regarding the number of occurances of all the word present in summaries.
 *     This hashmap file is used for efficient search result.
 *
 * Params/Handler:
 *     booksData : Object - This is the data read by previous function
 *
 * Return:
 *     Object with mapping info
 */
const createSummaryHashMap = (booksData) => {
  return new Promise((resolve, reject) => {
    let hashmap = {};
    const noOfBooks = booksData["summaries"].length;
    const summaries = booksData["summaries"]; // Get all summaries
    for (let i = 0; i < noOfBooks; i++) {
      // Get all the words in a summary as Array format without any special chars or spaces
      const summaryWordsArray = summaries[i]["summary"]
        .toLowerCase()
        .trim()
        .replace(/[^a-zA-Z ]/g, "")
        .replace(/\s\s*/g, " ")
        .split(" ");
      const bookId = summaries[i]["id"];

      for (let j = 0; j < summaryWordsArray.length; j++) {
        // Loop through summary words array and get each word
        for (let k = 1; k <= summaryWordsArray[j].length; k++) {
          // Create sub string of each word.
          let currentKey = summaryWordsArray[j].slice(0, k);
          // Create frequency map for each sub string
          if (hashmap[currentKey] === undefined) {
            hashmap[currentKey] = {};
          }
          if (hashmap[currentKey][bookId] === undefined) {
            hashmap[currentKey][bookId] = { id: bookId, count: 1 };
          } else {
            hashmap[currentKey][bookId]["count"] += 1;
          }
        }
      }
    }
    resolve(hashmap);
  });
};

/*
 * Function: writeHashMapToFile
 *     Save previously generated hashMap to a file
 *
 * Params/Handler:
 *     hashmap : Object - Object with mapping info
 *
 * Return:
 *     Status
 */

const writeHashMapToFile = (hashMap) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      "./src/assets/hashMap.json",
      JSON.stringify(hashMap),
      (err) => {
        if (err) throw reject(err);
        resolve("Hashmap created");
      }
    );
  });
};
async function preProcess() {
  // These are few steps for processing the data.json to create hashmap.
  // First load the JSON file and assign it to booksData variable
  const booksData = await readFile("./src/assets/data.json");
  // Pass the booksData variable to hashMapCreator function.
  const summaryHashMap = await createSummaryHashMap(booksData);
  // Write hashmap to file
  const result = await writeHashMapToFile(summaryHashMap);
  return result;
}
preProcess();
