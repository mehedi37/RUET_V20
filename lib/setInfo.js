const db = require('@/config/db').default;

export async function setTeachers(
  teacher_name,
  teacher_email,
  teacher_password
) {
  await db.execute('INSERT INTO teachers (teacher_name, teacher_email, teacher_password) VALUES (?, ?, ?)',
    [teacher_name, teacher_email, teacher_password], (err, result) => {
      if(err) {
        console.error("An error occurred while inserting teacher: ", err);
        return err;
      } else {
        console.log("Successfully inserted teacher.ID: ", result.insertId);
        return result;
      }
    });
}

export async function setStudents(
  student_roll,
  student_name,
  student_email,
  student_password
) {
  await db.execute('INSERT INTO students (student_roll, student_name, student_email, student_password) \
    VALUES (?, ?, ?, ?)',
    [student_roll, student_name, student_email, student_password], (err, result) => {
      if(err) {
        console.error("An error occurred while inserting student: ", err);
        return err;
      } else {
        console.log("Successfully inserted student.ID: ", result.insertId);
        return result;
      }
    });
}