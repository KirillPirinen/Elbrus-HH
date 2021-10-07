const router = require('express').Router();
const Validator = require('./middleware/validator');
const {Location, User, Group} = require('../../db/models');

router.get('/', (req, res) => {
  //if(req.session.isAuth) {
    res.render('admin/index')
  // } else {
  //    res.render('admin/adminlogin');
  //  }
})
.get('/group/new', (req, res) => {
  res.render('admin/addgroup', /*{location}*/)
})
.get('/location/new', (req,res) => {
  res.render('admin/addlocation')
})
.get('/user/:id', async (req, res) => {
  const user = await User.findOne({where:{id}})
  res.render('/admin/usercard', {user})
})
.get('/user/edit/:id', async (req, res) => {
  const user = await User.findOne({where:{id}})
  res.render('/admin/edit', {user});
})

router
.post('/', Validator.checkPass, (req, res) => {
  req.session.isAuth = true;
  res.render('');
})
.post('/search/', async (req, res) => {
  let query = req.body.search;
  let [fname, lname] = query.split(' ');
  const user = await User.findOne({where:{fname, lname}});
  if(user) return res.redirect(`/user/${user.id}`);
  res.render('admin/error', {message:'Резюме не найдено в базе'});
})
.post('/location/new', async (req, res) => {
  await Location.create({name:req.body.location});
  res.redirect('/group/new');
})
.post('/group/new', async (req, res) => {
  await Group.create({name:req.body.location, locationid:req.body.location});
  res.redirect('/');
});

module.exports = router;
