const { URL } = require('url');
const http = require('http');
const https = require('https');
const proxy = require('http-proxy-middleware');

module.exports = (url, express) => {
  if (!url) throw new Error('No GraphQL URL was provided.');
  const parsed = new URL(url);

  const agentOpts = { keepAlive: true };
  const agent = parsed.protocol === 'https:' ? new https.Agent(agentOpts) : new http.Agent(agentOpts);

  express.use('/graphql', proxy({
    agent,
    target: url,
    changeOrigin: true,
  }));
};
