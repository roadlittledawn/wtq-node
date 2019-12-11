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

  webserver.get('/author/create', (req, res) => {
    app.render(req, res, '/authorCreate');
  });

  webserver.get('/author/:id/edit', (req, res) => {
    const { id } = req.params;
    app.render(req, res, '/authorEdit', { id });
  });

  webserver.get('/word/create', (req, res) => {
    app.render(req, res, '/wordCreate');
  });

  webserver.get('/word/:slug/edit', (req, res) => {
    const { slug } = req.params;
    app.render(req, res, '/wordEdit', { slug });
  });

  webserver.get('/word/:slug', (req, res) => {
    const { slug } = req.params;
    app.render(req, res, '/word', { slug });
  });

  webserver.get('/phrase/create', (req, res) => {
    app.render(req, res, '/phraseCreate');
  });

  webserver.get('/phrase/:slug/edit', (req, res) => {
    const { slug } = req.params;
    app.render(req, res, '/phraseEdit', { slug });
  });

  webserver.get('/phrase/:slug', (req, res) => {
    const { slug } = req.params;
    app.render(req, res, '/phrase', { slug });
  });

  webserver.get('/quote/create', (req, res) => {
    app.render(req, res, '/quoteCreate');
  });

  webserver.get('/quote/:slug/edit', (req, res) => {
    const { slug } = req.params;
    app.render(req, res, '/quoteEdit', { slug });
  });

  webserver.get('/quote/:slug', (req, res) => {
    const { slug } = req.params;
    app.render(req, res, '/quote', { slug });
  });

  webserver.get('/taxonomy/:taxName/create', (req, res) => {
    const { taxName } = req.params;
    app.render(req, res, '/taxCreate', { taxName });
  });

  webserver.get('/taxonomy/contexts/id/:id/edit', (req, res) => {
    const { id } = req.params;
    app.render(req, res, '/taxEditContexts', { id });
  });

  webserver.get('/taxonomy/etymologies/id/:id/edit', (req, res) => {
    const { id } = req.params;
    app.render(req, res, '/taxEditEtymologies', { id });
  });

  webserver.get('/taxonomy/partsOfSpeech/id/:id/edit', (req, res) => {
    const { id } = req.params;
    app.render(req, res, '/taxEditPartsOfSpeech', { id });
  });

  webserver.get('/taxonomy/tones/id/:id/edit', (req, res) => {
    const { id } = req.params;
    app.render(req, res, '/taxEditTones', { id });
  });

  webserver.get('/taxonomy/topics/id/:id/edit', (req, res) => {
    const { id } = req.params;
    app.render(req, res, '/taxEditTopics', { id });
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
