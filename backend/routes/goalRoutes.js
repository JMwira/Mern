const express = require ('express')
const router = express.Router();
const {getGoals, deleteGoals, editGoals, setGoals} = require('../controlers/goalController')

router.route('/').get(getGoals).post(setGoals)
router.route('/:id').put(editGoals).delete(deleteGoals)


module.exports = router