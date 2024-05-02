import express from 'express';
import { getPlaceById,getPlaceByUserId,createplace,updatePlace ,deletePlace} from '../controllers/places-controllers.js';
import {check} from 'express-validator'

const router = express.Router();

router.route('/:pid').get(getPlaceById)
router.route('/user/:uid').get(getPlaceByUserId);
router.route('/').post([
    check('title').not().isEmpty(),
    check('description').isLength({min:5}),
    check('address').not().isEmpty()
    ],createplace)
router.route('/:pid').patch([
    check('title').not().isEmpty(),
    check('description').isLength({min:5})
],updatePlace);
router.route('/:pid').delete(deletePlace)


export default router;