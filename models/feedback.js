const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");
const rootDir = require("../utils/path");

const feedbackFilePath = path.join(rootDir, "data", "feedback.json");

const readFeedback = (callback) => {
  fs.readFile(feedbackFilePath, (err, data) => {
    if (err) return callback([]);
    try {
      const parsed = JSON.parse(data);
      callback(Array.isArray(parsed) ? parsed : []);
    } catch {
      callback([]);
    }
  });
};

const writeFeedback = (feedbackData, callback) => {
  fs.writeFile(feedbackFilePath, JSON.stringify(feedbackData), (err) => {
    if (err) console.error(err);
    if (callback) callback(err);
  });
};

module.exports = class Feedback {
  constructor({ id, feedback, submittedBy, createdAt }) {
    this.id = id || randomUUID();
    this.feedback = feedback;
    this.submittedBy = submittedBy;
    this.createdAt = createdAt || new Date().toISOString();
  }

  save(callback) {
    Feedback.fetchAll((feedbackData) => {
      feedbackData.push(this);
      writeFeedback(feedbackData, callback);
    });
  }

  static fetchAll(callback) {
    readFeedback((feedbackData) => {
      callback(
        feedbackData.map((item) => ({
          id: item.id || randomUUID(),
          feedback: item.feedback || "",
          submittedBy: item.submittedBy || null,
          createdAt: item.createdAt || null,
        })),
      );
    });
  }

  static findById(id, callback) {
    Feedback.fetchAll((feedbackData) => {
      const item = feedbackData.find((f) => f.id === id);
      callback(item || null);
    });
  }

  static updateById(id, updatedText, callback) {
    Feedback.fetchAll((feedbackData) => {
      const index = feedbackData.findIndex((f) => f.id === id);
      if (index === -1) return callback(false);

      feedbackData[index].feedback = updatedText;
      writeFeedback(feedbackData, () => callback(true));
    });
  }

  static deleteById(id, callback) {
    Feedback.fetchAll((feedbackData) => {
      const next = feedbackData.filter((f) => f.id !== id);
      if (next.length === feedbackData.length) return callback(false);

      writeFeedback(next, () => callback(true));
    });
  }
};
