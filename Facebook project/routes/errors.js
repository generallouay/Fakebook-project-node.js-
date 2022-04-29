const router = require('express').Router();

router.get('/404',(req,res) => res.render('404'))

router.get('/comingsoon',(req,res)=>{
    res.send('<h3>this feature will be available soon!</h3>')
})

module.exports = router;