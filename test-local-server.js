// Simple test server to run the Cloudflare Worker locally
const worker = require('./dist/index.js');

// Simple HTTP server wrapper
const http = require('http');

const PORT = 8787;

const server = http.createServer(async (req, res) => {
  try {
    // Create a Request object from the incoming request
    const url = `http://localhost:${PORT}${req.url}`;
    const headers = {};
    Object.keys(req.headers).forEach(key => {
      headers[key] = req.headers[key];
    });

    let body = '';
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      body = await new Promise((resolve) => {
        let data = '';
        req.on('data', chunk => data += chunk);
        req.on('end', () => resolve(data));
      });
    }

    const request = new Request(url, {
      method: req.method,
      headers: headers,
      body: body || undefined
    });

    // Call the worker's fetch handler
    const response = await worker.default.fetch(request, {}, {});

    // Send the response back
    res.statusCode = response.status;
    
    // Copy headers
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // Send body
    const text = await response.text();
    res.end(text);

  } catch (error) {
    console.error('Error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Internal server error', details: error.message }));
  }
});

server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}/`);
  console.log(`\n📝 Available endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/health`);
  console.log(`   GET  http://localhost:${PORT}/discovery`);
  console.log(`   POST http://localhost:${PORT}/`);
  console.log(`\n🛑 Press Ctrl+C to stop\n`);
});

