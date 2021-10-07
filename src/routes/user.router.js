const router = require('express').Router();
const { User, Group } = require('../../db/models')

router.get('/', async (req, res)=>{
  const groups = await Group.findAll();
  res.render('user', {groups});
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
