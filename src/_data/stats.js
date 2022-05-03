require("dotenv").config();

const fetch = require("@11ty/eleventy-fetch");

async function getStatistics({ sheetId, apiKey }) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/%D0%9B%D0%B8%D1%81%D1%821?key=${apiKey}`;
  const options = { duration: "1d", type: "json" };

  console.log("- Fetching new statistics -");

  const { values } = await fetch(url, options);

  return values.map((v) => v[1]);
}

module.exports = async () =>
  getStatistics({
    sheetId: process.env.STATS_SPREADSHEET_ID,
    apiKey: process.env.STATS_GOOGLE_SHEETS_API_KEY,
  });
