const db = require("@/config/db").default;

export default async function getCTInfo(studentInfo) {
  try {
    const [ctInfo] = await db.execute(
      `SELECT * FROM ct
      WHERE section = ?
      AND department = ?
      AND YEARWEEK(time, 1) = YEARWEEK(CURDATE(), 1)`,
      [studentInfo.section, studentInfo.department.department_id]
    );

    if (ctInfo.length === 0) {
      throw new Error(process.env.NO_CT_FOUND);
    }

    return ctInfo;
  } catch (error) {
    return error.message;
  }
}

export async function getCTNoteInfo(ctID) {
  try {
    const [ctNoteInfo] = await db.execute(
      `SELECT * FROM ct NATURAL JOIN courses
      WHERE ct_id = ?`,
      [ctID]
    );

    if (ctNoteInfo.length === 0) {
      throw new Error(process.env.NO_CT_FOUND);
    }

    return ctNoteInfo[0];
  } catch (error) {
    return error.message;
  }
}
