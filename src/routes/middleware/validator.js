const {Admin} = require('../../../db/models');
const bcrypt = require('bcrypt');

class Validator {
  static isAuth = (req, res, next) => {
    if(!req.session.admin) {
      res.render('admin/adminlogin');
    } else {
      next();
    }
  }
  static checkPass = async (req, res, next) => {
    const saltRounds = 1;
    const pass = 123;
    const password = await bcrypt.hash(pass, saltRounds);
    await Admin.create({login:'admin', password})
    try{
      let admin = await Admin.findOne({where:{email:req.body.email}});
      if(await bcrypt.compare(req.body.password, admin?.password)) {
        req.session.admin = admin;
        next();
      } else {
        res.render('error', {message:'Данные неверные'});
      }
    } catch {
      res.render('error', {message:'Ошибка отправки формы'});
    }
  }
}

module.exports = Validator;
