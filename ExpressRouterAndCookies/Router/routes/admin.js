const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
    if (req.query.isAdmin) {
        next()
    }
    res.send("Sorry not an admin!")
})

router.get('/', (req,res)=>{
    res.send('Admin data')
})

router.get('/:id', (req,res)=>{
    res.send('One admin data')
})

module.exports = router