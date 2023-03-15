var express = require('express');
var app = express();

const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

//var cors = require('cors');

var data = {};
var id = 0;

app.use(express.static('html'));

// app.use((req, res, next)=>{
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
// 	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-length, X-Requested-With');
// 	next();
// });

// app.post("/annotation", cors(), function(req, res){

app.post("/anno", function (req, res) {

    // affiche {}
    console.log("rentrer");
    var body = req.body;
    var loc = 0;
    let t = 0;
    // console.log("test de la var : ")
    // console.log("Test de la var : ")
    console.log(t);

    // while (t < data.length) {
    //     console.log("Test de la var : data[t][URI]");
    //     console.log(data[t][URI]);
    //     if (data[t][URI] == body[URI]) {

    //         data[t] += body[Commentaire];
    //         loc = 1;
    //         break;
    //     }
    //     t+=1
    // }
    if (t == 0) {
        console.log("ici");
        data[id] = body;
        id++;
    }
    console.log(data);
    res.send("votre commentaire a été sauvegardé !");
    //console.log(data);
});


app.get("/IdAnnot/:Annot", function (req, res) {
    console.log("salut");
    var IdAnnot = req.params.Annot;


    var Exist = Object.keys(data).includes(IdAnnot);

    res.format({

        'text/html': function () {
            if (Exist) {
                res.setHeader('Content-Type', 'text/html');
                res.send("<!DOCTYPE html><html lang='fr'><head><meta charset='UTF-8'/><title>Titre</title></head><body><div>" + JSON.stringify(data[IdAnnot]) +
                    "</div></body></html>");
            }
            else {
                res.send("<!DOCTYPE html><html lang='fr'><head><meta charset='UTF-8'/><title>Titre</title></head><body><p>aucune annotation n'est associée à cette clé</p></body></html>");
            }
        },

        'application/json': function () {
            console.log("ici");
            if (Exist) {
                res.send(data[IdAnnot]);
                console.log("existe");
            }
            else {
                res.send("aucune annotation n'est associée à cette clé");
            }
        }
    });

});



app.get("/URI", function(req, res){
    console.log(" je suis rentré dans /URI");
	var IdURI = req.query.AnnotURI;

	
	console.log(IdURI);
	
	var ChoixFormat=req.query.FormatAnnotURI;
	
	if (ChoixFormat=="html"){
		req.headers['accept']= 'text/html';
	}
	else {
		if (ChoixFormat=="json"){
			req.headers['accept']=  'application/json';
		}	
	}
	
	if (IdURI=="AllInfo"){
		res.format ({
		   'text/html': function() {
				res.setHeader('Content-Type', 'text/html');
				res.send("<!DOCTYPE html><html lang='fr'><head><meta charset='UTF-8'/><title>Titre</title></head><body><div>"+JSON.stringify(data)+
						"</div></body></html>"); 
		   },

		   'application/json': function() {
			    res.setHeader('Content-Type','application/json');
				res.send(data); 
			}
		});
	}else {
	
		var tabRep=[];
		
		for (key in data){
			// console.log(key);
			if (data[key]["URI"]==IdURI){
				tabRep.push({"IdAnnotation" : key, "Commentaire" : data[key]["Commentaire"]});
			}
		}
		
		console.log(tabRep);
			
		res.format ({
			   'text/html': function() {
					res.setHeader('Content-Type', 'text/html');
					res.send("<!DOCTYPE html><html lang='fr'><head><meta charset='UTF-8'/><title>Titre</title></head><body><div>"+JSON.stringify(tabRep)+
							"</div></body></html>"); 
			   },

			   'application/json': function() {
					res.setHeader('Content-Type','application/json');
					res.send(tabRep); 
				}
		});
	
	}
	
});


        // app.get("/IdURI", function(req, res){
        // res.send("salut toto!");
        // });

        app.listen(port, function () {
            console.log('serveur listening on port : ' + port);
        });