const express = require ('express')
const router = express.Router();

router.get('/', (req, res)=>{
    res.status(200).json({
        message:"goal retrieved"
    })
})
router.post('/', (req, res)=>{
    res.status(200).json({
        message:"Goal posted"
    })
})
router.put('/:id', (req, res)=>{
    res.status(200).json({
        message:req.params.id,
        text:"edited"
    })
})
router.delete('/:id', (req, res)=>{
    res.status(200).json({
        message:req.params.id,
        text:"deleted"
    })
})


module.exports = router