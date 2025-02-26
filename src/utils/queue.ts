import Bull from "bull";
import Redis from "ioredis";
import Report from "../models/report.model";

const redisConnection = new Redis(
  process.env.REDIS_URL || "redis://localhost:6379"
);

const createBullQueue = (queueName: string): Bull.Queue => {
  // Create a Bull queue instance with Redis configuration
  const queue = new Bull(queueName, {
    redis: {
      host: redisConnection.options.host,
      port: redisConnection.options.port,
      password: redisConnection.options.password,
      db: redisConnection.options.db,
    },
    prefix: 'emobi',
    defaultJobOptions: {
      attempts: 3,
      backoff: { type: 'exponential', delay: 1000 },
      removeOnComplete: true
    }
  });

  queue.on('completed', (job) => {
    console.log(`Job ${job.id} completed with result`);
  });

  queue.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed with error: ${err.message}`);
  });
  return queue;
};

const queue = createBullQueue('voiceCloneQueue');

queue.process(async (job) => {
  const { report_id, time } = job.data;
  try {
    const voice = await Report.findByPk(report_id);

    if (!voice)
      throw new Error(`Report with ID ${report_id} does not exist.`);

    console.info(`Processing report ${report_id} started.`);

    console.info('[Report]', report_id, time);
  } catch (error) {
    console.error(`Error processing voice ${report_id}:`, error);
  }
});

const addToQueue = async (data: {
  report_id: string;
  time: Date;
}) => {
  try {
    await queue.add(data);
    console.info(
      `Added report with ID ${data.report_id} to the queue.`
    );
  } catch (error) {
    console.error(
      `Failed to add report with ID ${data.report_id} to the queue:`,
      error
    );
    throw error;
  }
};

export default addToQueue;