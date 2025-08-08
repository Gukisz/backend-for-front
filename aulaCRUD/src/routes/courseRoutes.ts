import { Router } from 'express';
import { CourseController } from '../controllers/courseController';

const router = Router();

router.get('/', CourseController.list);
router.get('/:id', CourseController.getById);
router.post('/', CourseController.create);
router.put('/:id', CourseController.update);
router.delete('/:id', CourseController.remove);

export default router;
