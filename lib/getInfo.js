const db = require('@/config/db').default;

export async function getTeachers() {
  const [rows, fields] = await db.execute('SELECT * FROM teachers');
  // console.log("T: ", rows);
  return rows;
}

export async function getStudents() {
  const [rows, fields] = await db.execute('SELECT * FROM students');
  return rows;
}