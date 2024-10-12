const db = require("@/config/db").default;

export async function CTNotice(course_id, section, department, time, note) {
  try {
    await db.execute(
      `INSERT INTO ct (course_id, section, department, time, note)
      VALUES (?, ?, ?, ?, ?)`,
      [course_id, section, department, time, note]
    );
    console.log("CT Notice saved successfully");
    return true;
  } catch (error) {
    console.log(error.message);
    throw new Error("CT Notice could not be saved.");
  }
}

export async function StudentNotice(
  notice_creator,
  notice_title,
  notice,
  time,
  series,
  section,
  department
) {
  try {
    await db.execute(
      `INSERT INTO all_notice (notice_id, notice_creator, notice_title, notice, time, series, section, department)
      VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)`,
      [notice_creator, notice_title, notice, time, series, section, department]
    );

    console.log("Student Notice saved successfully");

    return true;
  } catch (error) {
    console.log(error.message);
    throw new Error("Student Notice could not be saved");
  }
}

export async function TeacherNotice(
  notice_creator,
  notice_title,
  notice,
  time,
  department
) {
  try {
    await db.execute(
      `INSERT INTO teacher_notice (notice_id, notice_creator, notice_title, notice, time, department)
      VALUES (NULL, ?, ?, ?, ?, ?)`,
      [notice_creator, notice_title, notice, time, department]
    );

    console.log("Teacher Notice saved successfully");

    return true;
  } catch (error) {
    console.log(error.message);
    throw new Error("Teacher Notice could not be saved");
  }
}
