//Core modules
const fs = require("fs");
const path = require("path");

//Local modules
const rootDir = require("../utils/path");
const { fetchAll } = require("./user");


module.exports = class Feedback {
  constructor(feedback) {
    this.feedback = feedback;
  }

  save() {
    Feedback.fetchAll((feedbackData) => {
      feedbackData.push(this);
      const feedbackFilePath = path.join(rootDir, "data", "feedback.json");
      fs.writeFile(feedbackFilePath, JSON.stringify(feedbackData), (err) => {
        console.log(err);
      }); 
    });
  }

  static fetchAll(callback) {
    const feedbackFilePath = path.join(rootDir, "data", "feedback.json");

    fs.readFile(feedbackFilePath, (err, data) => {
      callback(err ? [] : JSON.parse(data));
    });
  }
};
