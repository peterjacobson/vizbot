app.controller('LoginCtrl', ['$scope', '$location',
	'User',
	'Consent',

	function ($scope, $location, User, Consent) {

	//$scope.user = new User();
	$scope.consent = new Consent();
	$scope.consents = new Array();
	console.log($scope.user);
	$scope.login = {
		mail : "mohamed@gmail.com",
		pwd : "pwd"
	};

	$scope.save = function(){
		User.logIn({}, $scope.login, function(data,headers){
			sessionStorage.clear();
			sessionStorage.setItem('userId', JSON.stringify(headers('id')));
			$location.path("/consents/");
		});
	};
}]);