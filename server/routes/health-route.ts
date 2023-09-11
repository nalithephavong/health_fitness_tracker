import { Router } from 'express';
import { 
    createRecord, 
    deleteRecord, 
    getRecords, 
    updateRecord, 
    searchFoods 
} from '../controllers/health-controller';

const router = Router();
router.get('/search', searchFoods);
router.post('/', createRecord);
router.get('/', getRecords);
router.patch('/:id', updateRecord);
router.delete('/:id', deleteRecord);

export default router;