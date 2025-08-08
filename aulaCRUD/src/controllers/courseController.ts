import { Request, Response } from 'express';
import { CourseModel } from '../models/courseModel';

export const CourseController = {
  async list(req: Request, res: Response) {
    try {
      const courses = await CourseModel.findAll();
      res.json(courses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao listar cursos' });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const course = await CourseModel.findById(id);
      if (!course) return res.status(404).json({ message: 'Curso não encontrado' });
      res.json(course);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao buscar curso' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { name, description } = req.body;
      if (!name) return res.status(400).json({ message: 'Campo name é obrigatório' });
      const newCourse = await CourseModel.create({ name, description });
      res.status(201).json(newCourse);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao criar curso' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { name, description } = req.body;
      const course = await CourseModel.findById(id);
      if (!course) return res.status(404).json({ message: 'Curso não encontrado' });
      const updated = await CourseModel.update(id, { name, description });
      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao atualizar curso' });
    }
  },

  async remove(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const existed = await CourseModel.findById(id);
      if (!existed) return res.status(404).json({ message: 'Curso não encontrado' });
      // Optional: you might want to check students referencing this course before delete.
      const success = await CourseModel.delete(id);
      if (!success) return res.status(400).json({ message: 'Não foi possível excluir' });
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao excluir curso' });
    }
  }
};
