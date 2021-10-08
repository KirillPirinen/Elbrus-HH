const router = require('express').Router();
const Validator = require('./middleware/validator');
const {Location, User, Group, Sequelize} = require('../../db/models');
const searcher = require('../functions/searcher');
const Op = Sequelize.Op;
const xslxUploader = require('./xlsx.router');
const upload = require('./middleware/uploading');
//Get запросы
router
.get('/', async (req, res) => {
  res.render('admin/index');
})
.get('/group/new', (req, res) => {
  res.render('admin/addgroup')
})
.get('/location/new', (req,res) => {
  res.render('admin/addlocation')
})
.get('/user/:id', async (req, res) => {
  const {id} = req.params;
  const user = await User.findOne({where:{id:Number(id)}, include:{
    model:Group,
  }})
  res.render('admin/usercard', {user})
})
.get('/user/edit/:id', async (req, res) => {
  const user = await User.findOne({where:{id:Number(req.params.id)}, include:{
    model:Group
  }})
  const groupid = user.Group.id;
  const locationid = user.Group.locationid;
  const groups = await Group.findAll({
    where:{id:{[Op.ne]:groupid}},
    include:{
      model:Location,
      where:{id:locationid}
    }})
  res.render('admin/useredit', {user, groups});
})

.get('/location/:id', async (req, res) => {
  const {id} = req.params;
  const groups = await Group.findAll({
      include:{
        model:Location,
        where:{id:Number(id)}
      }
  })
  res.render('admin/groups', {groups});
})
.get('/groups/:id', async (req, res) => {
  const {id} = req.params;
  const groupname = await Group.findOne({where:{id:Number(id)}});
  const users = await User.findAll({
    include:{
      model:Group,
      where:{id:Number(id)}
    }
})
res.render('admin/users', {users, Group:groupname});
})
.get('/exit', (req, res) => {
  req.session.destroy();
  res.clearCookie('sid').redirect('/admin');
})
//Post запросы
router
.post('/', Validator.checkPass, (req, res) => {
  req.session.isAuth = true;
  res.render('');
})
.post('/search', async (req, res) => {
  const [firstname, lastname] = req.body.search.split(' ');
  const allusers = await User.findAll();
  const users = searcher(allusers, [firstname, lastname]);
  if(users.length) return res.render('admin/users', {users});
  else res.render('admin/error', {message:'Резюме не найдено в базе'});
})
.post('/location/new', async (req, res) => {
  const{city} = req.body;
  await Location.create({city});
  res.redirect('/admin/group/new');
})
.post('/group/new', async (req, res) => {
  const{name, locationid, year} = req.body;
  const data = await Group.create({name:`${name}-${year}`, locationid:Number(locationid)});
  res.redirect('/admin');
})
.post('/user/edit/', upload.fields([{ name: 'pdfcv', maxCount: 1 }, { name: 'userphoto', maxCount: 1 }]), async (req, res) => {
  const {firstname, patronymic, lastname, groupid, graduationdate, telegram, github, hhcv, id} = req.body;
  const currentValues = await User.findOne({where:{id:Number(id)}});
  let {userphoto, pdfcv} = req.files;
  pdfcv = pdfcv || [{filename:currentValues.pdfcv}];
  userphoto = userphoto || [{filename:currentValues.userphoto}];
  const newValues = {firstname, patronymic, lastname, groupid, graduationdate, telegram, github, hhcv, id, pdfcv:pdfcv[0].filename, userphoto:userphoto[0].filename}
  try{
  await User.update(newValues, {where:{id:Number(id)}});
  res.redirect(`/admin/user/${id}`);
  }catch (err){
    return res.render('admin/error', {message:'Ошибка изменения'});
  }
})

router.use('/xlsx', xslxUploader);

module.exports = router;
