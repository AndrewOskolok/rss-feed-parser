const { Worker } = require("worker_threads");
const path = require("path");
const { handleParsedPosts } = require("../services/utils/handleParsedPosts");

const { FEED_FOR_PARSING, PERIOD_IN_MINUTES } = process.env;

const runParseWorker = (data) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      path.join(__dirname, "../services/utils/parser.js"),
      {
        workerData: data,
      }
    );
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
};

const startInterval = () => {
  setInterval(() => {
    runParseWorker({ url: FEED_FOR_PARSING })
      .then((result) => handleParsedPosts(result))
      .catch((err) => console.error(`Error of worker: ${err}`));
  }, PERIOD_IN_MINUTES * 60 * 1000); // 10 minutes in milliseconds
};

startInterval();
