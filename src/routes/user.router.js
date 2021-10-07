const router = require('express').Router();

router.get('/', (req, res)=>{
  res.render('user')
})

router.post('/', (req, res)=>{
  req.body
})


module.exports = router;
