const http = require('http');
const os = require('os');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MyApp — CI/CD Pipeline</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --bg: #0a0a0f;
    --surface: #12121a;
    --surface2: #1a1a26;
    --border: rgba(255,255,255,0.07);
    --accent: #00f5a0;
    --accent2: #00d9f5;
    --accent3: #f500d9;
    --text: #ffffff;
    --muted: rgba(255,255,255,0.45);
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Syne', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Grid background */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(0,245,160,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,245,160,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
    z-index: 0;
  }

  .wrapper {
    position: relative;
    z-index: 1;
    max-width: 960px;
    margin: 0 auto;
    padding: 60px 24px;
  }

  /* Header */
  .header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 64px;
  }

  .logo {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Space Mono', monospace;
    font-size: 20px;
    font-weight: 700;
    color: #0a0a0f;
  }

  .brand { font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
  .brand span { color: var(--accent); }

  .status-badge {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(0,245,160,0.1);
    border: 1px solid rgba(0,245,160,0.25);
    border-radius: 100px;
    padding: 6px 16px;
    font-size: 13px;
    font-weight: 700;
    color: var(--accent);
    font-family: 'Space Mono', monospace;
  }

  .dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: var(--accent);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }

  /* Hero */
  .hero {
    margin-bottom: 56px;
  }

  .hero-tag {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: var(--accent2);
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  .hero h1 {
    font-size: clamp(36px, 6vw, 64px);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -2px;
    margin-bottom: 20px;
  }

  .hero h1 .line2 {
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero p {
    font-size: 16px;
    color: var(--muted);
    max-width: 480px;
    line-height: 1.7;
  }

  /* Stats grid */
  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
    margin-bottom: 40px;
  }

  .stat-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 24px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.2s;
  }

  .stat-card:hover { border-color: rgba(255,255,255,0.15); }

  .stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
  }

  .stat-card.green::before { background: linear-gradient(90deg, var(--accent), transparent); }
  .stat-card.blue::before  { background: linear-gradient(90deg, var(--accent2), transparent); }
  .stat-card.pink::before  { background: linear-gradient(90deg, var(--accent3), transparent); }
  .stat-card.amber::before { background: linear-gradient(90deg, #f5c800, transparent); }

  .stat-label {
    font-size: 11px;
    font-family: 'Space Mono', monospace;
    color: var(--muted);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .stat-value {
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.5px;
    font-family: 'Space Mono', monospace;
    word-break: break-all;
  }

  .stat-card.green .stat-value { color: var(--accent); }
  .stat-card.blue  .stat-value { color: var(--accent2); }
  .stat-card.pink  .stat-value { color: var(--accent3); }
  .stat-card.amber .stat-value { color: #f5c800; }

  /* Pipeline stages */
  .section-title {
    font-size: 11px;
    font-family: 'Space Mono', monospace;
    color: var(--muted);
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .pipeline {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 12px;
    margin-bottom: 40px;
  }

  .stage {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 20px;
    text-align: center;
  }

  .stage-icon {
    font-size: 28px;
    margin-bottom: 10px;
  }

  .stage-name {
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .stage-status {
    font-size: 11px;
    font-family: 'Space Mono', monospace;
    color: var(--accent);
  }

  /* Info row */
  .info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 40px;
  }

  @media (max-width: 600px) { .info-grid { grid-template-columns: 1fr; } }

  .info-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 24px;
  }

  .info-card h3 {
    font-size: 13px;
    font-weight: 700;
    color: var(--muted);
    margin-bottom: 16px;
    font-family: 'Space Mono', monospace;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid var(--border);
    font-size: 14px;
  }

  .info-row:last-child { border-bottom: none; }
  .info-row .key { color: var(--muted); }
  .info-row .val { font-family: 'Space Mono', monospace; font-size: 12px; }

  /* Footer */
  .footer {
    text-align: center;
    color: var(--muted);
    font-size: 13px;
    font-family: 'Space Mono', monospace;
    padding-top: 40px;
    border-top: 1px solid var(--border);
  }
</style>
</head>
<body>
<div class="wrapper">

  <header class="header">
    <div class="logo">M</div>
    <div class="brand">My<span>App</span></div>
    <div class="status-badge"><div class="dot"></div> LIVE</div>
  </header>

  <section class="hero">
    <p class="hero-tag">// deployment status</p>
    <h1>Pipeline<br><span class="line2">Deployed.</span></h1>
    <p>Your Node.js app is running successfully via Jenkins CI/CD and Docker on AWS EC2.</p>
  </section>

  <div class="stats">
    <div class="stat-card green">
      <div class="stat-label">Status</div>
      <div class="stat-value">SUCCESS</div>
    </div>
    <div class="stat-card blue">
      <div class="stat-label">Version</div>
      <div class="stat-value">v2.0</div>
    </div>
    <div class="stat-card pink">
      <div class="stat-label">Port</div>
      <div class="stat-value">3000</div>
    </div>
    <div class="stat-card amber">
      <div class="stat-label">Uptime</div>
      <div class="stat-value" id="uptime">0s</div>
    </div>
  </div>

  <p class="section-title">// pipeline stages</p>
  <div class="pipeline">
    <div class="stage">
      <div class="stage-icon">⬇️</div>
      <div class="stage-name">Clone Code</div>
      <div class="stage-status">✓ passed</div>
    </div>
    <div class="stage">
      <div class="stage-icon">🐳</div>
      <div class="stage-name">Build Image</div>
      <div class="stage-status">✓ passed</div>
    </div>
    <div class="stage">
      <div class="stage-icon">🛑</div>
      <div class="stage-name">Stop Old</div>
      <div class="stage-status">✓ passed</div>
    </div>
    <div class="stage">
      <div class="stage-icon">🚀</div>
      <div class="stage-name">Deploy</div>
      <div class="stage-status">✓ passed</div>
    </div>
  </div>

  <div class="info-grid">
    <div class="info-card">
      <h3>Server Info</h3>
      <div class="info-row"><span class="key">Hostname</span><span class="val">__HOSTNAME__</span></div>
      <div class="info-row"><span class="key">Platform</span><span class="val">__PLATFORM__</span></div>
      <div class="info-row"><span class="key">Node.js</span><span class="val">__NODE__</span></div>
      <div class="info-row"><span class="key">CPUs</span><span class="val">__CPUS__</span></div>
    </div>
    <div class="info-card">
      <h3>Deployment</h3>
      <div class="info-row"><span class="key">Time</span><span class="val">__TIME__</span></div>
      <div class="info-row"><span class="key">Docker</span><span class="val">myapp:v1</span></div>
      <div class="info-row"><span class="key">Jenkins</span><span class="val">myapp-pipeline</span></div>
      <div class="info-row"><span class="key">Branch</span><span class="val">main</span></div>
    </div>
  </div>

  <footer class="footer">
    Built with Jenkins + Docker + AWS EC2 &mdash; Pradeep Kumar DevOps
  </footer>

</div>
<script>
  let s = 0;
  setInterval(() => {
    s++;
    const h = Math.floor(s/3600), m = Math.floor((s%3600)/60), sec = s%60;
    document.getElementById('uptime').textContent =
      h > 0 ? h+'h '+m+'m' : m > 0 ? m+'m '+sec+'s' : sec+'s';
  }, 1000);
</script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  const page = html
    .replace('__HOSTNAME__', os.hostname())
    .replace('__PLATFORM__', process.platform)
    .replace('__NODE__', process.version)
    .replace('__CPUS__', os.cpus().length + ' cores')
    .replace('__TIME__', new Date().toLocaleString());

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(page);
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
  console.log('Version 2.0 - Deployed via Jenkins CI/CD');
});
