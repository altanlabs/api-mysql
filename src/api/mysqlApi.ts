import express, { Request, Response } from 'express';
import mysql from 'mysql';

const app = express();
const port = 3000;

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'yourusername',
  password: 'yourpassword',
  database: 'yourdatabase'
});

// Connect to the database
db.connect((err: mysql.MysqlError) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Define a route to fetch data
app.get('/api/data', (_req: Request, res: Response) => {
  const query = 'SELECT * FROM your_table';
  db.query(query, (err: mysql.MysqlError, results: any) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Failed to fetch data' });
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
