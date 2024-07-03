// main.js
const redisClient = require('./utils/redis');

(async () => {
    // Wait for a short period to ensure the client is connected
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(redisClient.isAlive());
    console.log(await redisClient.get('myKey'));
    await redisClient.set('myKey', 12, 5);
    console.log(await redisClient.get('myKey'));

    setTimeout(async () => {
        console.log(await redisClient.get('myKey'));
    }, 1000 * 10);
})();
