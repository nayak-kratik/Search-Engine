const fs = require("fs");

const readFile = (file_path) => {
  return new Promise((resolve, reject) => {
    const data = fs.readFileSync(file_path);
    resolve(JSON.parse(data));
  });
};

const createSummaryHashMap = (booksData) => {
  return new Promise((resolve, reject) => {
    let hashmap = {};
    // let skipWords = ["the", "in", "to", "a", "have", "has"];
    const noOfBooks = booksData["summaries"].length;
    const summaries = booksData["summaries"];
    for (let i = 0; i < noOfBooks; i++) {
      const summaryWordsArray = summaries[i]["summary"]
        .toLowerCase()
        .trim()
        .replace(/[^a-zA-Z ]/g, "")
        .replace(/\s\s*/g, " ")
        .split(" ");
      const bookId = summaries[i]["id"];
      for (let j = 0; j < summaryWordsArray.length; j++) {
        for (let k = 1; k <= summaryWordsArray[j].length; k++) {
          let currentKey = summaryWordsArray[j].slice(0, k);
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
  // There are few steps for processing the data.json to create hashmap.
  // First load the JSON file and assign it to booksData variable
  const booksData = await readFile("./src/assets/data.json");
  // Pass the booksData variable to hashMapCreator wizard.
  const summaryHashMap = await createSummaryHashMap(booksData);
  const result = await writeHashMapToFile(summaryHashMap);
  return result;
}
preProcess();
