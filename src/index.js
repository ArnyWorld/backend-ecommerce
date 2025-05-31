const express = require('express');
const config = require('./config');

const app = express();
const port = config.port;
// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server!' });
});

// Start Server
app.listen(port, () => {
  console.log(`E-commerce server running on port ${port}`);
});