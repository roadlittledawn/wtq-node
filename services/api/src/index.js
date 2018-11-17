const app = require('./app');

const { log } = console;

app.listen(80, () => {
  log('> Ready on http://localhost:8001');
});
