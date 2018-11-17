const app = require('./app');

const { log } = console;

const server = app.listen(2112, () => {
  log('> Ready on http://localhost:2112');
});

