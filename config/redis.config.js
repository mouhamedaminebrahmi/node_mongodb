const Redis = require("ioredis");
require("dotenv").config();
const redisClient = Redis.createClient({
  host: process.env.REDIS,
  port: "6379",
});

//local success
//docker succes

async function setDataInRedis(id, data) {
  await redisClient.set(id, JSON.stringify(data), "EX", 6);
}

async function getDataFromRedis(id) {
  let data;
  data = await redisClient.get(id);
  return data;
}

module.exports = { setDataInRedis, getDataFromRedis };
