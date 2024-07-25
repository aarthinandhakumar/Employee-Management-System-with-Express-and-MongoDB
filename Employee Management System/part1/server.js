const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// setup handlebars view engine
const handlebars = require('express-handlebars');

app.engine('handlebars', 
	handlebars({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

// static resources
app.use(express.static(__dirname + '/public'));

// Use the employee module
const cities = require('./mongo_zipCodeModule_v2');

// GET request to the homepage

app.get('/', function (req, res){
	res.render('homeView');
});

app.get('/zip', async function(req, res) {
	if (req.query.id) {
		let id = req.query.id;
		let result = await cities.lookupByZipCode(id);
		res.render('lookupByZipView', result);
	} else {
		res.render('lookupByZipForm');
	}
});

app.post('/zip', async function(req, res) {
	let id = req.body.id;
	let result = await cities.lookupByZipCode(id);
	res.render('lookupByZipView', result);
});


app.get('/zip/:id', async function(req, res) {
	let id = req.params.id;
	let result = await cities.lookupByZipCode(id);

	res.format({

		'application/json': function() {
			res.json(result);
		},

		'application/xml': function() {
			let resultXml = 
				'<?xml version="1.0"?>\n' +
						'<zipCode id="' + result._id + '">\n' + 
						'   <city>' + result.city + '</city>\n' + 
						'   <state>' + result.state + '</state>\n' + 	
						'   <pop>' + result.pop + '</pop>\n' + 				 
						'</zipCode>\n';
					
			
			res.type('application/xml');
			res.send(resultXml);
		},

		'text/html': function() {
			res.render('lookupByZipView', result);

		}
	});
});

app.get('/city', async function(req, res) {
    if (req.query.city && req.query.state) {
        let city = req.query.city;
        let state = req.query.state;

        // Await the result of the lookup function
        let data = await cities.lookupByCityState(city, state);

        // Render the view based on the result
        if (data && data.data.length > 0) {
            res.render('lookupByCityStateView', { data } );
        } else {
            res.render('lookupByCityStateForm', { error: 'No results found for the provided city and state.' });
        }
    } else {
        res.render('lookupByCityStateForm');
    }
});

app.post('/city', async function(req, res) {
    let city = req.body.city;
    let state = req.body.state;
    
    // Await the result of the lookup function
    let data = await cities.lookupByCityState(city, state);

    // Render the view based on the result
    if (data && data.data.length > 0) {
        res.render('lookupByCityStateView', { data } );
    } else {
        res.render('lookupByCityStateView', { error: 'No results found for the provided city and state.' });
    }
});

app.get('/city/:city/state/:state', async function(req, res) {
    let city = req.params.city;
    let state = req.params.state;
    
    // Await the result of the lookup function
    let data = await cities.lookupByCityState(city, state);

    // Handle the response format
    res.format({
        'application/json': function() {
            if (data && data.data.length > 0) {
                res.json(data);
            } else {
                res.status(404).send('City and state not found');
            }
        },

        'application/xml': function() {
            if (data && data.data.length > 0) {
                const { create } = require('xmlbuilder2');
                const xmlData = create({
                    "city-state": {
                        "@city": city,
                        "@state": state,
                        entry: data.data.map(entry => ({
                            "@zip": entry.zip,
                            "@pop": entry.pop
                        }))
                    }
                });
                res.type('application/xml');
                res.send(xmlData.end({ prettyPrint: true }));
            } else {
                res.status(404).send('City and state not found');
            }
        },

        'text/html': function() {
            if (data && data.data.length > 0) {
                res.render('lookupByCityStateView', { data } );
            } else {
                res.status(404).render('404', { error: 'City and state not found' });
            }
        }
    });
});

app.get('/pop', async function(req, res) {
    if (req.query.state) {
        let state = req.query.state;
        let data = await cities.getPopulationByState(state);
        res.render('populationView', { data } );
    } else {
        res.render('populationForm');
    }
});

app.get('/pop/:state', async function(req, res) {
    let state = req.params.state;
    let data = await cities.getPopulationByState(state);

    res.format({
        'application/json': function() {
            res.json(data);
        },

        'application/xml': function() {
            const { create } = require('xmlbuilder2');
            const xmlData = create({
                "state-pop": {
                    "@state": state,
                    pop: data.pop
                }
            });
            res.type('application/xml');
            res.send(xmlData.end({ prettyPrint: true }));
        },

        'text/html': function() {
            res.render('populationView', { data } );
        }
    });
});

app.use(function(req, res) {
	res.status(404);
	res.render('404');
});

app.listen(3000, function(){
  console.log('http://localhost:3000');
});