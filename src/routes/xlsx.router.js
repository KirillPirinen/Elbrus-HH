const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('admin/xlsx/xlsxadd');
})

module.exports = router;
