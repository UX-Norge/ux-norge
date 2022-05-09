const { sendNewsletter } = require("./email/sendNewsletter");
const { updateArticles } = require("./articles/updateArticles");

require("dotenv").config();
var CronJob = require("cron").CronJob;

const startCronJob = (callback, interval = "*/5 * * * * *") => {
  const timeZone = "Europe/Oslo";
  // Cron interval every 5 seconds

  new CronJob(interval, callback, null, true, timeZone);
};

async function run() {
  startCronJob(sendNewsletter);
  startCronJob(updateArticles);
}

run();
