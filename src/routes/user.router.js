const router = require('express').Router();
const { User, Group } = require('../../db/models')
const upload = require('./middleware/uploading');

router.get('/', async (req, res)=>{
  const groups = await Group.findAll();
  res.render('user', {groups});
})

router.post('/', upload.fields([{ name: 'pdfcv', maxCount: 1 }, { name: 'userphoto', maxCount: 1 }]), async (req, res)=>{
  const {firstname, patronymic, lastname, groupid, graduationdate, telegram, github, hhcv} = req.body
  let {userphoto, pdfcv} = req.files;
  pdfcv = pdfcv || [{filename:null}];
  try{
  await User.create({firstname, patronymic, lastname, groupid, graduationdate, telegram, github, hhcv, pdfcv:pdfcv[0].filename, userphoto:userphoto[0].filename})
  //Добавление успешно
  }catch (err){
    return res.render('/admin/error', {message:'Ошибка добавления'})
  }
})


module.exports = router;
