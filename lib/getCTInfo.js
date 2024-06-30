const db = require('@/config/db').default;

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
      throw new Error('No CTs found for the current week');
    }

    return ctInfo;
  } catch (error) {
    return error.message;
  }
}