const db = require("@/config/db").default;

export async function CTMarksInputSearch(Department, Course, Section) {
  try {
    console.log(Department, Course, Section);

    let [ctResults] = await db.execute(
      `SELECT *,
        SUBSTRING(student_roll, 3, 2) AS department,
        CASE
          WHEN CAST(SUBSTRING(student_roll, 5, 3) AS UNSIGNED) > 60 AND CAST(SUBSTRING(student_roll, 5, 3) AS UNSIGNED) < 121 THEN 'B'
          WHEN CAST(SUBSTRING(student_roll, 5, 3) AS UNSIGNED) > 120 AND CAST(SUBSTRING(student_roll, 5, 3) AS UNSIGNED) < 181 THEN 'C'
          ELSE 'A'
        END AS section
      FROM ct_result
      WHERE department = ? AND course_id = ? AND section = ?`,
      [Department, Course, Section]
    );

    return ctResults;
  } catch (error) {
    console.log(error.message);
    throw new Error("CT Marks could not be fetched.");
  }
}
