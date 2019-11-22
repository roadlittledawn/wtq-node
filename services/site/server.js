const next = require('next');
const express = require('express');
const loadGraphQL = require('./server/graphql');

const { NODE_ENV, GRAPHQL_URL } = process.env;
const dev = NODE_ENV !== 'production';

const { log } = console;

const boot = async () => {
  // Prep the next app.
  const app = next({ dev });
  const handle = app.getRequestHandler();
  await app.prepare();

  // Create the web server but do not listen.
  const webserver = express();

  // Load custom routes.
  loadGraphQL(GRAPHQL_URL, webserver);
  webserver.get('/word/create', (req, res) => {
    app.render(req, res, '/word-create');
  });

  webserver.get('/word/:slug', (req, res) => {
    const { slug } = req.params;
    app.render(req, res, '/word', { slug });
  });

  webserver.get('/phrase/:slug', (req, res) => {
    const { slug } = req.params;
    app.render(req, res, '/phrase', { slug });
  });

  webserver.get('/quote/:slug', (req, res) => {
    const { slug } = req.params;
    app.render(req, res, '/quote', { slug });
  });

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
