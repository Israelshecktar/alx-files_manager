// Redis server
const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    // Handle connection errors
    this.client.on('error', (err) => console.error(`Redis client error: ${err}`));
    this.client.on('connect', () => console.log('Redis client connected'));
    this.client.on('ready', () => console.log('Redis client ready'));

    // Promisify the redis methods
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return this.getAsync(key);
  }

  async set(key, value, duration) {
    await this.setAsync(key, value, 'EX', duration);
  }

  async del(key) {
    await this.delAsync(key);
  }
}

// Export an instance of RedisClient
const redisClient = new RedisClient();
module.exports = redisClient;
