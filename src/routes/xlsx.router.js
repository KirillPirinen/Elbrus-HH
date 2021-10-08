const router = require('express').Router();
const {Group, User} = require('../../db/models/');
const upload = require('../routes/middleware/uploading');
const XLSX = require('xlsx');
const path = require('path');
const formilizer = require('../functions/formilizer');

router.get('/', async (req, res) => {
  const groups = await Group.findAll();
  res.render('admin/xlsx/xlsxadd', {groups});
})

router.post('/', upload.single('excel'), async (req, res) => {
  //1 - ФИО, 2 - telegram, 3 - hhlink, 4 - githublink
  const sheet = XLSX.readFile(path.join(process.env.PWD, 'public', 'uploads', req.file.filename))
  const rawData = XLSX.utils.sheet_to_json(sheet.Sheets[sheet.SheetNames[0]], {raw:true, header:1, blankrows:false});
  const prepearedData = formilizer(rawData, req.body.groupid);
  console.log(prepearedData);
  await User.bulkCreate(prepearedData);
})

module.exports = router;
