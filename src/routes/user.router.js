const router = require('express').Router();
const { User } = require('../../db/models')

router.get('/', (req, res)=>{
  res.render('user')
})

router.post('/', async (req, res)=>{
  console.log(req.body)
  const {firstname, patronymic, lastname, groupid, graduationdate, telegram, github, hcv, pdfcv, userphoto } = req.body
  try{
  await User.create({firstname, patronymic, lastname, groupid, graduationdate, telegram, github, hcv, pdfcv, userphoto})
  } catch (err){
    return res.redirect('/user')
  }
})


module.exports = router;
