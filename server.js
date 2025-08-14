const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// Serve static assets from the project root and the public folder
const rootDir = __dirname;
const publicDir = path.join(rootDir, 'public');

app.use(
  express.static(rootDir, {
    setHeaders(res, filePath) {
      if (filePath.endsWith('.jsx')) {
        // Ensure JSX files are served with a JavaScript MIME type
        res.setHeader('Content-Type', 'application/javascript');
      }
    },
  })
);
app.use(express.static(publicDir));

const DB_FILE = path.join(__dirname, 'messages.json');
function readDB() {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  } catch {
    return [];
  }
}
function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

app.post('/api/messages', (req, res) => {
  const db = readDB();
  const newMsg = { ...req.body, date: new Date().toISOString() };
  db.push(newMsg);
  writeDB(db);
  res.json({ ok: true });
});

// Send index.html for any other request to support client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(rootDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
