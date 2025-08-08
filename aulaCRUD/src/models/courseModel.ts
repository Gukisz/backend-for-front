import pool from '../database/connection';

export type Course = {
  id?: number;
  name: string;
  description?: string | null;
};

export const CourseModel = {
  async findAll() {
    const sql = `
      SELECT c.id, c.name, c.description, COUNT(s.id) AS student_count
      FROM courses c
      LEFT JOIN students s ON s.course_id = c.id
      GROUP BY c.id
      ORDER BY c.id;
    `;
    const [rows] = await pool.query(sql);
    return rows;
  },

  async findById(id: number) {
    const [courses] = await pool.query('SELECT id, name, description FROM courses WHERE id = ?', [id]);
    const course = (courses as any[])[0];
    if (!course) return null;

    const [students] = await pool.query('SELECT id, name, email, course_id FROM students WHERE course_id = ?', [id]);
    course.students = students;
    return course;
  },

  async create(course: Course) {
    const [result] = await pool.query('INSERT INTO courses (name, description) VALUES (?, ?)', [course.name, course.description || null]);
    const insertId = (result as any).insertId;
    const [rows] = await pool.query('SELECT id, name, description FROM courses WHERE id = ?', [insertId]);
    return (rows as any[])[0];
  },

  async update(id: number, course: Course) {
    await pool.query('UPDATE courses SET name = ?, description = ? WHERE id = ?', [course.name, course.description || null, id]);
    const [rows] = await pool.query('SELECT id, name, description FROM courses WHERE id = ?', [id]);
    return (rows as any[])[0];
  },

  async delete(id: number) {
    const [result] = await pool.query('DELETE FROM courses WHERE id = ?', [id]);
    return (result as any).affectedRows > 0;
  }
};
