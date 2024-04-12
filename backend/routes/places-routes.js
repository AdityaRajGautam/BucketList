import express from 'express';
import { getPlaceById,getPlaceByUserId,createplace,updatePlace ,deletePlace} from '../controllers/places-controllers.js';

const router = express.Router();

router.route('/:pid').get(getPlaceById)
router.route('/user/:uid').get(getPlaceByUserId);
router.route('/').post(createplace)
router.route('/:pid').put(updatePlace);
router.route('/:pid').delete(deletePlace)


export default router;