module.exports = function searcher(arr, params) {
  params = params.filter(e=>e);
  let result = arr.filter(e => {
    if(params.length === 1) {
      console.log(e.firstname);
      if(e.firstname.toLowerCase() === params[0].toLowerCase()) return true;
      else return false;
    } else if (params.length === 2) {
      if(e.firstname.toLowerCase() === params[0].toLowerCase() && e.firstname.toLowerCase() === params[1].toLowerCase()) return true;
      else return false;
    } else {
      return false;
    }
  })
  return result;
}
