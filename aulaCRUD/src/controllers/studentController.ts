import { Request, Response } from 'express';
import { StudentModel } from '../models/studentModel';

export const StudentController = {
  async list(req: Request, res: Response) {
    try {
      const students = await StudentModel.findAll();
      res.json(students);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao listar alunos' });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const student = await StudentModel.findById(id);
      if (!student) return res.status(404).json({ message: 'Aluno não encontrado' });
      res.json(student);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao buscar aluno' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { name, email, course_id } = req.body;
      if (!name || !email) return res.status(400).json({ message: 'Campos name e email são obrigatórios' });

      const exists = await StudentModel.findByEmail(email);
      if (exists) return res.status(409).json({ message: 'Email já cadastrado' });

      const newStudent = await StudentModel.create({ name, email, course_id });
      res.status(201).json(newStudent);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao criar aluno' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { name, email, course_id } = req.body;
      const student = await StudentModel.findById(id);
      if (!student) return res.status(404).json({ message: 'Aluno não encontrado' });

      if (email && (student.email !== email)) {
        const other = await StudentModel.findByEmail(email);
        if (other && other.id !== id) return res.status(409).json({ message: 'Email já cadastrado por outro aluno' });
      }

      const updated = await StudentModel.update(id, { name, email, course_id });
      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao atualizar aluno' });
    }
  },

  async remove(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const student = await StudentModel.findById(id);
      if (!student) return res.status(404).json({ message: 'Aluno não encontrado' });
      const ok = await StudentModel.delete(id);
      if (!ok) return res.status(400).json({ message: 'Não foi possível excluir' });
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao excluir aluno' });
    }
  }
};
