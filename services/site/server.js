const next = require('next');
const express = require('express');

const dev = process.env.NODE_ENV !== 'production';

const { log } = console;

const boot = async () => {
  // Prep the next app.
  const app = next({ dev });
  const handle = app.getRequestHandler();
  await app.prepare();

  // Create the web server but do not listen.
  const webserver = express();

  // Load custom routes.

  // Have next handle all others.
  webserver.get('*', (req, res) => handle(req, res));

  // Listen.
  webserver.listen(80, (e) => {
    if (e) throw e;
    log('> Site ready.');
  });
};

// Boot
boot().catch(e => setImmediate(() => { throw e; }));
