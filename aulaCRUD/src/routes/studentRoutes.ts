import { Router } from 'express';
import { StudentController } from '../controllers/studentController';

const router = Router();

router.get('/', StudentController.list);
router.get('/:id', StudentController.getById);
router.post('/', StudentController.create);
router.put('/:id', StudentController.update);
router.delete('/:id', StudentController.remove);

export default router;
