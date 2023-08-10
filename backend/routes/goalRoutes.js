const express = require ('express')
const router = express.Router();
const {getGoals, getUserGoals, deleteGoals, editGoals, setGoals} = require('../controlers/goalController')
const {Protect} = require('../middleware/authMiddleware')

router.route('/').get(Protect, getUserGoals).post(Protect, setGoals);
router.route('/me').get(Protect, getUserGoals);
router.route('/:id').put(Protect,editGoals).delete(Protect,deleteGoals);


module.exports = router