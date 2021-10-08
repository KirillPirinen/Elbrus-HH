const router = require('express').Router();
router.get('/', async (req, res)=>{
res.render('success');
})

module.exports = router;
