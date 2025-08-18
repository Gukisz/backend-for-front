import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Product } from "../models/Product";
import { Category } from "../models/Category";

const productRepository = AppDataSource.getRepository(Product);
const categoryRepository = AppDataSource.getRepository(Category);

export class ProductController {
    async list(req: Request, res: Response) {
        try {
            const products = await productRepository.find({
                relations: ["category"],
                order: { id: "ASC" }
            });
            return res.json(products);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { name, price, categoryId } = req.body;

            if (!name || !price || !categoryId) {
                return res.status(400).json({ message: "Name, price and categoryId are required" });
            }

            const category = await categoryRepository.findOneBy({ id: Number(categoryId) });
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }

            const product = productRepository.create({ name, price, category });
            await productRepository.save(product);

            return res.status(201).json(product);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
