var app = angular.module('nbaRoutes');
// the resolved data from the router needs to be injected into the controller
app.controller('teamCtrl', function ($scope, $stateParams, teamService, teamData) {

	$scope.teamData = teamData;

	$scope.newGame = {};

	$scope.showNewGameForm = false;
	
	$scope.toggleNewGameForm = function() {
		$scope.showNewGameForm = !$scope.showNewGameForm;
	};

	if ($stateParams.team = "utahjazz") {
		$scope.homeTeam = 'Utah Jazz';
		$scope.logoPath = 'images/jazz-logo.png';
	}
	else if ($stateParams.team = "miamiheat") {
		$scope.homeTeam = 'Miami Heat';
		$scope.logoPath = 'images/heat-logo.png';
	}
	else if($stateParams.team = "losangeleslakers") {
		$scope.homeTeam = 'Minneapolis Lakers';
		$scope.logoPath = 'images/lakers-logo.png';)
	}

	$scope.submitGame = function() {
		$scope.homeTeam.split(' ').join('').toLowerCase();
		teamService.addNewGame($scope.newGame).then(function() {
			teamService.getTeamData($scope.newGame.homeTeam).then(function(res) {
				$scope.teamData = res;
				$scope.newGame = {};
				$scope.showNewGameForm = false;
			});
		});
	}

});
