const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = process.env.PORT || 3000;  // Use environment variable or default port 3000

// Replace with your MariaDB connection details (secure these!)
const connectionPool = mysql.createPool({
  host: 'your_mariaDB_host',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name'
});

// API endpoint to fetch data
app.get('/api/data', async (req, res) => {
  try {
    const [rows] = await connectionPool.query('SELECT * FROM your_table LIMIT 10');
    res.json(rows);  // Send data as JSON response
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});