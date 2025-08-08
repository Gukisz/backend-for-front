import pool from '../database/connection';

export type Student = {
  id?: number;
  name: string;
  email: string;
  course_id?: number | null;
};

export const StudentModel = {
  async findAll() {
    const sql = `
      SELECT s.id, s.name AS student_name, s.email, s.course_id,
             c.name AS course_name, c.description AS course_description
      FROM students s
      LEFT JOIN courses c ON s.course_id = c.id
      ORDER BY s.id;
    `;
    const [rows] = await pool.query(sql);
    return rows;
  },

  async findById(id: number) {
    const [students] = await pool.query(
      `SELECT s.id, s.name AS student_name, s.email, s.course_id,
              c.name AS course_name, c.description AS course_description
       FROM students s
       LEFT JOIN courses c ON s.course_id = c.id
       WHERE s.id = ?`,
      [id]
    );
    return (students as any[])[0] || null;
  },

  async create(student: Student) {
    const [result] = await pool.query('INSERT INTO students (name, email, course_id) VALUES (?, ?, ?)', [
      student.name,
      student.email,
      student.course_id || null,
    ]);
    const insertId = (result as any).insertId;
    return this.findById(insertId);
  },

  async update(id: number, student: Student) {
    await pool.query('UPDATE students SET name = ?, email = ?, course_id = ? WHERE id = ?', [
      student.name,
      student.email,
      student.course_id || null,
      id,
    ]);
    return this.findById(id);
  },

  async delete(id: number) {
    const [result] = await pool.query('DELETE FROM students WHERE id = ?', [id]);
    return (result as any).affectedRows > 0;
  },

  async findByEmail(email: string) {
    const [rows] = await pool.query('SELECT id, name, email, course_id FROM students WHERE email = ?', [email]);
    return (rows as any[])[0] || null;
  }
};
