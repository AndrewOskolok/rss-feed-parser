const { parentPort, workerData } = require("worker_threads");
const RSSParser = require("rss-parser");
const parser = new RSSParser();

const parseRSSFeed = async (url) => {
  try {
    const feed = await parser.parseURL(url);
    return feed.items.map((item) => ({
      guid: item.guid,
      title: item.title,
      pubDate: item.isoDate,
      content: item["content:encodedSnippet"],
      link: item.link,
      categories: item.categories,
      creator: item.creator,
    }));
  } catch (err) {
    throw new Error("Error of parse RSS feed: " + err.message);
  }
};

// Task executing
const runTask = async () => {
  try {
    const result = await parseRSSFeed(workerData.url);
    parentPort.postMessage(result);
  } catch (err) {
    parentPort.postMessage({ error: err.message });
  }
};

runTask();
