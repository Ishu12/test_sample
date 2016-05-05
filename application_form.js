var Cloudant = require('cloudant');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var me = "ishu121992"; // Set this to your own account
var password = "oabi1234";

var cloudant = Cloudant({account:me, password:password});

cloudant.db.list(function(err, allDbs) {
  console.log('All my databases: %s', allDbs.join(', '))
});

 app.use(express.static('public'));
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
//Router to handle request
app.get('/', function (req, res) {
	//res.send('Hello Ishu');
res.sendfile(__dirname + '/application_form.html');
//var email = req.param('email', null);  
//res.write(email);
})

app.post('/submit',function(req,res){
	console.log(req.body.name);
	console.log(req.body.last_name);
	console.log(req.body.email);
	console.log(req.body.contact);
	//var name= req.body.name
	var userDetails={
		f_name: req.body.name,
    l_name:req.body.last_name,
		Email_id:req.body.email,
		contact_number:req.body.contact

	}
	res.write ("WELCOME" + " " + req.body.name + "--THESE ARE YOUR FORM DETAILS \r\n");
	res.write ("Name --" + req.body.name + " " + req.body.last_name + "\r\n");
	res.write ("Email_id --" + req.body.email + "\r\n");
    res.write ("Contact --" + req.body.contact + "\r\n");
	//res.end();


var ishu = cloudant.db.use('ishu')
 
    // ...and insert a document in it.
    ishu.insert(userDetails, function(err, body, header) {
      if (err) {
        return console.log('[ishu.insert] ', err.message);
      }

      console.log('You have inserted the data.');
      console.log(body);
    });
    
	res.write("welcome "+req.body.name);
	res.end();
});
	//console.log(userdetails);
app.listen(8080);
console.log("Huy");