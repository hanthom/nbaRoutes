var app = angular.module('nbaRoutes');

app.service('teamService', function ($http, $q) {

    // service code
    this.addNewGame = function(gameObj) {
        console.log(gameObj.homeTeam);
    	var url = 'https://api.parse.com/1/classes/' + gameObj.homeTeam;

    	if (parseInt(gameObj.homeTeamScore) > parseInt(gameObj.opponentScore)) {
    		gameObj.won = true;
    	}
    	else {
    		gameObj.won = false;
    	}
        console.log(gameObj);
    	return $http({
    		method: 'POST',
    		url: url,
    		data: gameObj,
    	});
    }

    this.getTeamData = function(team) {
    	var deferred = $q.defer();
    	var url = 'https://api.parse.com/1/classes/' + team + '?order=-createdAt';

    	$http({
    		method: 'GET',
    		url: url,
    	}).then(function(data) {
    		var results = data.data.results;
    		var wins = 0;
    		var losses = 0;

    		for (var i=0; i < results.length; i++) {
    			if (results[i].won === true) {
    				wins++;
    			}
    			else {
    				losses++;
    			}

                switch(results[i].homeTeam) {
                    case "utahjazz":
                        results[i].homeTeam = "Utah Jazz";
                        break;
                    case "losangeleslakers":
                        results[i].homeTeam = "Minneapolis Lakers";
                        break;
                    case "miamiheat":
                        results[i].homeTeam = "Miami Heat";
                        break;
                }
    		}

    		results.wins = wins;
    		results.losses = losses;

            // var resultsObj = {
            //     gameArray: results,
            //     wins: wins,
            //     losses: losses
            // };
            deferred.resolve(results);
    	})
        return deferred.promise;
    }


});