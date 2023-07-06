var cron = require("node-cron");

module.exports = () => {
  cron.schedule("*/10 * * * * *", () => {
    //console.log("running a task every 10 seconds");
  });
};
