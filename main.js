// main.js
import dbClient from './utils/db';

const waitConnection = () => {
  return new Promise((resolve, reject) => {
    let i = 0;
    const repeatFct = async () => {
      await setTimeout(() => {
        i += 1;
        if (i >= 10) {
          reject(new Error('Failed to connect to MongoDB'));
        } else if (!dbClient.isAlive()) {
          console.log(`Attempt ${i}: MongoDB not connected yet`);
          repeatFct();
        } else {
          resolve();
        }
      }, 1000);
    };
    repeatFct();
  });
};

(async () => {
  try {
    console.log(`Initial connection status: ${dbClient.isAlive()}`);
    await waitConnection();
    console.log(`Final connection status: ${dbClient.isAlive()}`);
    console.log(`Number of users: ${await dbClient.nbUsers()}`);
    console.log(`Number of files: ${await dbClient.nbFiles()}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
})();
