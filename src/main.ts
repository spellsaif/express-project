import createServer from '@utils/create-server';

const SERVER_PORT = process.env.SERVER_PORT || 3000;

async function main() {
  const app = createServer();

  app.listen(SERVER_PORT, () => {
    console.log(`Listening at http://localhost:${SERVER_PORT} `);
  });
}

main();
