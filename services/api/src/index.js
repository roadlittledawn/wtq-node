const app = require('./app');
const db = require('./connections/db');

const { log } = console;

db.then((mongoose) => {
  log(`> Successfully connected to ${mongoose.client.s.url}`);
  app.listen(80, () => {
    log('> Ready on http://localhost:8001/graphql');
  });
}).catch(e => setImmediate(() => { throw e; }));
