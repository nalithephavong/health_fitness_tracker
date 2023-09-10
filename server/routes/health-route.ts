import { Router } from 'express';
import { createRecord, deleteRecord, getRecords, updateRecord } from '../controllers/health-controller';

const router = Router();
router.post('/', createRecord);
router.get('/', getRecords);
router.patch('/:id', updateRecord);
router.delete('/:id', deleteRecord);

export default router;