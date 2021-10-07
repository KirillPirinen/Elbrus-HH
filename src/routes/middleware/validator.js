//const {Admin} = require('../../db/models');
const bcrypt = require('bcrypt');

class Validator {
  static isAuth = (req, res, next) => {
    if(!req.session.user) {
       res.render('error', {
        message: 'Редактировать, удалять или добавлять записи могут только авторизированные пользователи'
      });
    } else {
      next();
    }
  }
  static checkPass = async (req, res, next) => {
    try{
      let admin = await Admin.findOne({where:{email:req.body.email}});
      if(await bcrypt.compare(req.body.password, admin?.password)) {
        req.session.admin = admin;
        next();
      } else {
        res.render('errorlogin');
      }
    } catch {
      res.render('errorlogin');
    }
  }
}

module.exports = Validator;
