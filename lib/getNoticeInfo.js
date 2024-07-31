const db = require("@/config/db").default;

export async function getCTInfo(studentInfo) {
  // console.log("STUDENT INFO: ", studentInfo);
  const year = studentInfo.semester.year + "" + studentInfo.semester.semester;
  // console.log("YEAR: ", year);
  try {
    const [ctInfo] = await db.execute(
      `SELECT * FROM ct
      WHERE section = ?
      AND department = ?
      AND YEARWEEK(time, 1) = YEARWEEK(CURDATE(), 1)
      AND course_code LIKE "${year}__"`, // like 3201 or 3202
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

export async function getAllNoticeInfo(studentInfo) {
  try {
    const [noticeInfo] = await db.execute(
      `SELECT * FROM all_notice
      WHERE YEARWEEK(time, 1) = YEARWEEK(CURDATE(), 1)
      AND series=?`,
      [studentInfo.series]
    );

    if (noticeInfo.length === 0) {
      throw new Error(process.env.NO_NOTICE_FOUND);
    }

    return noticeInfo;
  } catch (error) {
    return error.message;
  }
}

export async function getAllNoteInfo(noticeID) {
  try {
    const [allNoteInfo] = await db.execute(
      `SELECT * FROM all_notice NATURAL JOIN courses
      WHERE notice_id = ?`,
      [noticeID]
    );

    if (allNoteInfo.length === 0) {
      throw new Error(process.env.NO_CT_FOUND);
    }

    return allNoteInfo[0];
  } catch (error) {
    return error.message;
  }
}

export async function getTeacherCTInfo(teacherID) {
  try {
    const [ctInfo] = await db.execute(
      `SELECT * FROM ct
      NATURAL JOIN courses
      INNER JOIN teachers ON courses.course_teacher = teachers.teacher_id
      WHERE teacher_id = ?
      AND YEARWEEK(time, 1) = YEARWEEK(CURDATE(), 1)`,
      [teacherID]
    );

    if (ctInfo.length === 0) {
      throw new Error(process.env.NO_CT_ERROR_TEACHER);
    }

    return ctInfo;
  } catch (error) {
    return error.message;
  }
}

export async function getTeacherCTNote(noticeID) {
  try {
    const [noticeInfo] = await db.execute(
      `SELECT * FROM ct NATURAL JOIN courses
      WHERE ct_id = ?`,
      [noticeID]
    );

    if (noticeInfo.length === 0) {
      throw new Error(process.env.NO_CT_ERROR_TEACHER);
    }

    return noticeInfo[0];
  } catch (error) {
    return error.message;
  }
}

export async function getTeacherALLNoticeInfo() {
  try {
    const [noticeInfo] = await db.execute(
      `SELECT * FROM teacher_notice
      WHERE YEARWEEK(time, 1) = YEARWEEK(CURDATE(), 1)`
    );

    if (noticeInfo.length === 0) {
      throw new Error(process.env.NO_NOTICE_ERROR_TEACHER);
    }

    return noticeInfo;
  } catch (error) {
    return error.message;
  }
}

export async function getTeacherALLNoteInfo(noticeID) {
  try {
    const [noticeInfo] = await db.execute(
      `SELECT * FROM teacher_notice
      WHERE notice_id = ?`,
      [noticeID]
    );

    if (noticeInfo.length === 0) {
      throw new Error(process.env.NO_CT_ERROR_TEACHER);
    }

    return noticeInfo[0];
  } catch (error) {
    return error.message;
  }
}
