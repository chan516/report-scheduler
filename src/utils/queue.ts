import Queue from "bull";
import Redis from "ioredis";

const redisConnection = new Redis(
  process.env.REDIS_URL || "redis://localhost:6379"
);

const reportQueue = new Queue("reportQueue", {
  redis: {
    host: redisConnection.options.host,
    port: redisConnection.options.port,
    password: redisConnection.options.password,
    db: redisConnection.options.db,
  },
});

export default reportQueue;
