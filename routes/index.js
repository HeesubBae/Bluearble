
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.arduino = function(req, res){
  res.render('arduino', { title: 'Express' });
};