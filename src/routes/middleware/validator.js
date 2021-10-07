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
    try{
      let admin = await Admin.findOne({where:{login:req.body.login}});
      if(await bcrypt.compare(req.body.password, admin?.password)) {
        req.session.admin = admin;
        res.redirect('/admin');
      } else {
        res.render('error', {message:'Данные неверные'});
      }
    } catch {
      res.render('error', {message:'Ошибка отправки формы'});
    }
  }
}

module.exports = Validator;
