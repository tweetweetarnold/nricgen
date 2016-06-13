// constant
var appName = 'Singapore NRIC Generator';

// page setup
document.title = appName;

// main module
var app = angular.module('nricgen', []);

// main controller
function controller($scope) {	

	// consts	
	var numberLength = 9; // NRIC fixed length
	var randomMax = 9; // max random number to be generated
	var firstChars = {
		'NRIC' : ['S', 'T'],
		'FIN' : ['F', 'G']
	}
	var lastChars = {
		'NRIC' : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'Z', 'J'],
		'FIN' : ['K', 'L', 'M', 'N', 'P', 'Q', 'R', 'T', 'U', 'W', 'X']
	}
    var intMul = [2,7,6,5,4,3,2];

	// dom init
	$scope.appName = appName;
	$scope.result = '';
	$scope.nricType = 'NRIC';
	$scope.number = 1;

	$scope.generate = function (e) {		
		var random = [];

		for (var i = 0; i < $scope.number; i++) {
			random.push(generateSingle($scope.nricType));
		}

		$scope.result = random;		
	}


	function generateSingle(nricType) {
		var random = '';
		var mulTotal = 0;
		var checkIndex = 0;

		random += firstChars[nricType][Math.floor((Math.random() * (firstChars[nricType].length-1)))];

		for (var i = 0; i < numberLength-2; i++) {
			random += Math.floor((Math.random() * randomMax)).toString();
		}

		if (random[0] == 'T' || random[0] == 'G') {
			mulTotal = 4;
		}

		for (var i = 1; i < numberLength-1; i++) {
			mulTotal += parseInt(random[i]) * intMul[i-1];
		}

		checkIndex = 10 - mulTotal % 11;
		random += lastChars[nricType][checkIndex];
		return random;
	}

}
