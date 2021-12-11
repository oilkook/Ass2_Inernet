var express = require('express');
var router = express.Router();
const db = require('monk')('localhost:27017/VaccineDB');
const { check, validationResult, Result } = require('express-validator');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("blog");
});
router.get('/add', function(req, res, next) {
  res.render("addblog");
});
router.post('/add',[
  check("name","กรุณาป้อนชื่อ-นามสกุล").not().isEmpty(),
  check("num_vaccine","กรุณาใส่จำนวนวัคซีน").not().isEmpty(),
  check("name_vaccine","กรุณาป้อนประเภทวัคซีน").not().isEmpty()
], function(req, res, next) {
  const result = validationResult(req);
  var errors=result.errors;
    if (!result.isEmpty()) {
      res.render('addblog',{errors:errors});
    }
    else{
      //insert to db
      var ct = db.get('blogs');
      ct.insert({
        name:req.body.name,
        num_vaccine:req.body.num_vaccine,
        name_vaccine:req.body.name_vaccine
      },function(err,blog){
        if(err){
          res.send(err);
        }else{
          req.flash("success", "บันทึกข้อมูลสำเร็จ");
          res.location('/blog/add');
          res.redirect('/blog/add');
        }
      })
    }
  // console.log(req.body.name);
  // console.log(req.body.num_vaccine);
  // console.log(req.body.name_vaccine);
});
// router.get('/edit', function(req, res, next) {
//   res.send('Edit Vaccine');
// });
// router.get('/delete', function(req, res, next) {
//     res.send('Delete Vaccine');
//   });

module.exports = router;
  