import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Category } from "../models/Category";

const categoryRepository = AppDataSource.getRepository(Category);

export class CategoryController {
    async list(req: Request, res: Response) {
        try {
            const categories = await categoryRepository.find({
                relations: ["products"],
                order: { id: "ASC" }
            });
            return res.json(categories);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({ message: "Name is required" });
            }

            const category = categoryRepository.create({ name });
            await categoryRepository.save(category);

            return res.status(201).json(category);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
