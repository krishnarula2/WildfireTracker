const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/firmsdata',
    createProxyMiddleware({
      target: 'https://firms.modaps.eosdis.nasa.gov',
      changeOrigin: true,
      pathRewrite: {
        '^/firmsdata': '/data/active_fire/suomi-npp-viirs-c2/csv/SUOMI_VIIRS_C2_Global_24h.csv'
      },
      headers: {
        'Accept': 'text/csv, application/csv, text/plain',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log('[Proxy] Request received for:', req.url);
        // Remove any problematic headers that might cause issues
        proxyReq.removeHeader('if-none-match');
        proxyReq.removeHeader('if-modified-since');
        console.log('Proxying request to:', proxyReq.path);
        console.log('With headers:', proxyReq.getHeaders());
      },
      onProxyRes: (proxyRes, req, res) => {
        console.log('[Proxy] Response received for:', req.url);
        // Log response details for debugging
        console.log('[Proxy] Response Status:', proxyRes.statusCode);
        console.log('[Proxy] Response Type:', proxyRes.headers['content-type']);
        
        // Handle redirects explicitly
        if (proxyRes.statusCode === 301 || proxyRes.statusCode === 302) {
          console.log('[Proxy] Redirect detected to:', proxyRes.headers.location);
        }

        let originalBody = [];
        proxyRes.on('data', function (chunk) {
          originalBody.push(chunk);
        });
        proxyRes.on('end', function () {
          const bodyString = Buffer.concat(originalBody).toString('utf8');
          console.log('[Proxy] Received body (first 500 chars):', bodyString.substring(0, 500));
        });
        
        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      },
      onError: (err, req, res) => {
        console.error('Proxy Error:', err);
        res.writeHead(500, {
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*'
        });
        res.end('Proxy error: ' + err.message);
      }
    })
  );
}; 