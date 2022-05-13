// const { sendNewsletter } = require("./email/sendNewsletter");
const { updateArticles } = require("./articles/updateArticles");

require("dotenv").config();
var CronJob = require("cron").CronJob;

// Cron interval every 15 minutes
const startCronJob = (callback, interval = " */15 * * * *") => {
  const timeZone = "Europe/Oslo";
  console.log(`Starting cron job at ${interval}`);
  new CronJob(interval, callback, null, true, timeZone);
};

async function run() {
  // startCronJob(sendNewsletter);
  startCronJob(updateArticles);
}

run();
