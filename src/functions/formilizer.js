module.exports = function formilizer(arr, groupid) {
  let result = [];
  for(let i = 1; i < arr.length; i++) {
    let [firstname, lastname, patronymic] = arr[i][0].split(' ');
    patronymic = patronymic || '';
    let telegram = arr[i][1];
    if(/@/.test(telegram)) telegram = telegram.replace(/@/, '');
    const hhcv = arr[i][2];
    const github = arr[i][3];
    result.push({firstname, lastname, patronymic, groupid:Number(groupid), telegram, hhcv, github});
  }
  return result;
}
