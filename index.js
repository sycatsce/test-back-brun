//Server
var express = require('express');
var app = express(); 
const server = require('http').createServer(app);
var cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var router = express.Router();

var teams = [
    { id: 0, name: "Atlanta Hawks", description: "The Atlanta Hawks are an American professional basketball team based in Atlanta, Georgia. They are part of the Southeast Division of the Eastern Conference in the National Basketball Association (NBA). They play their home games at Philips Arena in Downtown Atlanta.", iconURL: "https://www.thesportsdb.com/images/media/team/badge/c6oi9p1611859646.png" },
    { id: 1, name: "Boston Celtics", description: "The Boston Celtics (ˈsɛlˌtɪks) are an American professional basketball franchise based in Boston, Massachusetts. They play in the Atlantic Division of the Eastern Conference in the National Basketball Association (NBA).", iconURL: "https://www.thesportsdb.com/images/media/team/badge/051sjd1537102179.png" },
    { id: 2, name: "Brooklyn Nets", description: "The Brooklyn Nets are an American professional basketball franchise based in Brooklyn, New York, a borough of New York City. They are a member of the Atlantic Division of the Eastern Conference in the National Basketball Association (NBA), as well as an original member of the American Basketball Association (ABA).\r\nThe Brooklyn Nets were founded in 1967 and initially played in Teaneck, New Jersey, as the New Jersey Americans.", iconURL: "https://www.thesportsdb.com/images/media/team/badge/h0dwny1600552068.png" },
    { id: 3, name: "Charlotte Hornets", description: "The Charlotte Hornets are an American professional basketball team based in Charlotte, North Carolina, that competes in the National Basketball Association (NBA). They are members of the Southeast Division in the league's Eastern Conference. The team is largely owned by former NBA player Michael Jordan, who acquired controlling interest in the team in 2010. The Hornets play their home games at Time Warner Cable Arena in center-city Charlotte.", iconURL: "https://www.thesportsdb.com/images/media/team/badge/xqtvvp1422380623.png" },
    { id: 4, name: "Chicago Bulls", description: "The Chicago Bulls are an American professional basketball team. They are based in Chicago, Illinois, playing in the Central Division of the Eastern Conference in the National Basketball Association (NBA)", iconURL: "https://www.thesportsdb.com/images/media/team/badge/yk7swg1547214677.png" },
];

var players = [
    { id: "1", name: "Rajon Rondo", position: "Point Guard", teamId: 0 },
    { id: "2", name: "Bogdan Bogdanović", position: "Shooting Guard", teamId: 0 },
    { id: "3", name: "De'Andre Huntero", position: "Small Forward", teamId: 0 },
    { id: "4", name: "Clint Capela", position: "Center", teamId: 0 },
    { id: "5", name: "Kevin Huerter", position: "Shooting Guard", teamId: 0 },

    { id: "6", name: "Jaylen Brown", position: "Shooting Guard", teamId: 1 },
    { id: "7", name: "Kemba Walker", position: "Point Guard", teamId: 1 },
    { id: "8", name: "Tristan Thompson", position: "Center", teamId: 1 },
    { id: "9", name: "Jayson Tatum", position: "Small Forward", teamId: 1 },
    { id: "10", name: "Semi Ojeleye", position: "Power Forward", teamId: 1 },

    { id: "11", name: "Kyrie Irving", position: "Popint Guard", teamId: 2 },
    { id: "12", name: "Jeff Green", position: "Small Forward", teamId: 2 },
    { id: "13", name: "Tyler Johnson", position: "Shooting Guard", teamId: 2 },
    { id: "14", name: "Timothé Luwawu-Cabarrot", position: "Shooting Guard", teamId: 2 },
    { id: "15", name: "Landry Shamet", position: "Point Guard", teamId: 2 },

    { id: "16", name: "Tomáš Satoranský", position: "Shooting Guard", teamId: 4 },
    { id: "17", name: "Thaddeus Young", position: "Power Forward", teamId: 4 },
    { id: "18", name: "Otto Porter Jr.", position: "Small Forward", teamId: 4 },
    { id: "19", name: "Denzel Valentine", position: "Shooting Guard", teamId: 4 },
    { id: "20", name: "Luke Kornet", position: "Power Forward", teamId: 4 },

    { id: "21", name: "Gordon Hayward", position: "Small Forward", teamId: 3 },
    { id: "21", name: "Miles Bridges", position: "Small Forward", teamId: 3 },
    { id: "22", name: "Joe Chealey", position: "Point Guard", teamId: 3 },
    { id: "23", name: "Devonte' Graham", position: "Point Guard", teamId: 3},
    { id: "24", name: "De'Andre Huntero", position: "Small Forward", teamId: 3 },

];

//List all teams
router.route('/api/v1/teams')
.get(function(request, response){
    response.setHeader('content-type', 'application/json');
    response.send(teams);
});

//Get a team given it's id
router.route('/api/v1/team')
.post(function(request, response){
    response.setHeader('content-type', 'application/json');
    response.send(teams.filter(team => team.id == request.body.id));
});

//List all players
router.route('/api/v1/players')
.get(function(request, response){
    response.setHeader('content-type', 'application/json');
    response.send(players);
});


//Get a player given it's id
router.route('/api/v1/get-player')
.post(function(request, response){
    response.setHeader('content-type', 'application/json');
    response.send(players.filter(player => player.id == request.body.id));
});

//Create a player
router.route('/api/v1/player')
.post(function(request, response){
    response.setHeader('content-type', 'application/json');
    if (request.body.name && request.body.position && request.body.teamId) {
        if(players.push({
            id: players.length,
            name: request.body.name,
            position: request.body.position,
            teamId: request.body.teamId
        })){ response.send({player: "created"}); }
    } else {
        response.send(400, {error: "Invalid format"});
    }
})

//Delete a player
.delete(function(request , response){
	response.setHeader('content-type', 'application/json');
    if(request.body.id){
        if ( players = players.filter(player => player.id != request.body.id)) return response.send({ players });
    }
})

//Edit a player
.put(function(request , response) {
	response.setHeader('content-type', 'application/json')
    if (request.body.id){
        let copy = players.filter(player => player.id == request.body.id )[0];
        if (request.body.name) copy.name = request.body.name;
        if (request.body.position) copy.position = request.body.position;
        if (request.body.teamId) copy.teamId = request.body.teamId;

        players = players.filter(player => player.id != request.body.id);
        players.push(copy);

        response.send({edited: players});
    }
});

//List all the players of a team
router.route('/api/v1/team-players')
.post(function(request, response){
    response.setHeader('content-type', 'application/json');
    if(request.body.id){
        response.send(players.filter(player => player.teamId == request.body.id));
    }
});


app.use(router);
var port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log("Listening...");
})

