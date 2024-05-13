const connection = require('../config/DBconfig');

const createUserTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )
  `;

  connection.query(query, (err, result) => {
    if (err) {
      console.error('Error creating users table:', err);
      return;
    }
    console.log('Users table created or already exists');
  });
};

createUserTable();

const registerUser = (userData, callback) => {
  const { username, email, password } = userData;
  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

  connection.query(query, [username, email, password], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};


const findUserByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';

  connection.query(query, [email], (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, results[0]);
  });
};

module.exports = { registerUser, findUserByEmail };