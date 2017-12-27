var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// init app
var app = express();
const ObjectID = require("mongodb").ObjectID
app.use(express.static(__dirname + '/publics'));
// Connection of mongodb
const MongoClient = require('mongodb').MongoClient;
const mongoURL = 'mongodb://localhost:27017/qkmkDB';
MongoClient.connect(mongoURL, function(error,database) {
    if(error) {
        console.log(err);
    } 
    console.log("MongoDb connected!");
    qkmk = database.collection('qkmk'); 
});

// Setup template engine
app.set('views' , path.join(__dirname , 'views'));
app.set('view engine' , 'ejs');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Redirect to index
app.get('/', function(req, res){
    qkmk.find({}).toArray(function(err , docs){
        if(err){
            console.log(err);
        }
        res.render('index',{docs:docs});
    });
   
});
app.get('/lista', function(req, res){
    qkmk.find({}).toArray(function(err , docs){
        if(err){
            console.log(err);
        }
        res.render('lista',{docs:docs});
    });
   
});

//Render to show
app.get('/qkmk/:id', function(req, res){
    qkmk.findOne({_id:ObjectID(req.params.id)},function(err , doc){
        if(err){
            console.log(err);
        }
        res.render('show',{doc:doc});
    });
});

//Add to DB
app.post('/qkmk/add', function(req, res){
    qkmk.insert({ 
                PikaKufitare:req.body.pika_kufitare_input,
                MinimumHyrjeMinuta:req.body.minimum_hyrje_minuta,
                MaximumHyrjeMinuta:req.body.maximum_hyrje_minuta,
                MinimumDaljeMinuta:req.body.minimum_dalje_minuta,
                MaximumDaljeMinuta:req.body.maximum_dalje_minuta,
                MinimumHyrjeMetra:req.body.minimum_hyrje_metra,
                MaximumHyrjeMetra:req.body.maximum_hyrje_metra,
                MinimumDaljeMetra:req.body.minimum_dalje_metra,
                MaximumDaljeMetra:req.body.maximum_dalje_metra
                }, function(err,result) {
                    if(err) {
                        console.log(err);
                    }
                    res.redirect("/");
                });
});

//Edit to DB
app.get('/qkmk/edit/:id', function(req, res){
    qkmk.findOne({_id:ObjectID(req.params.id)},function(err , doc){
        if(err){
            console.log(err);
        }
        res.render('edit',{doc:doc});
    });
});

//Update to DB
app.post('/qkmk/update/:id', function(req, res){
    qkmk.updateOne({_id:ObjectID(req.params.id)},{$set:{PikaKufitare:req.body.pika_kufitare_input,
        MinimumHyrjeMinuta:req.body.minimum_hyrje_minuta,
        MaximumHyrjeMinuta:req.body.maximum_hyrje_minuta,
        MinimumDaljeMinuta:req.body.minimum_dalje_minuta,
        MaximumDaljeMinuta:req.body.maximum_dalje_minuta,
        MinimumHyrjeMetra:req.body.minimum_hyrje_metra,
        MaximumHyrjeMetra:req.body.maximum_hyrje_metra,
        MinimumDaljeMetra:req.body.minimum_dalje_metra,
        MaximumDaljeMetra:req.body.maximum_dalje_metra
        }},function(err , doc){
            res.redirect("/");         
    });
});

//Delete to DB
app.get('/qkmk/delete/:id', function(req, res){
    qkmk.deleteOne({_id:ObjectID(req.params.id)},function(err , doc){
            res.redirect("/");         
    });
});

//Listen to localhost:3000
app.listen(3000, function() {
   console.log("App running at http://localhost:3000");
});