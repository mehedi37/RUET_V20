import { createPool } from 'mysql2';

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ruet_v20'
});

pool.getConnection((err, connection) => {
  if(err) {
    console.error("An error occurred while connecting to the database:", err);
  } else {
    console.log("Successfully connected to the database.");
    connection.release();
  }
});

export default pool.promise();