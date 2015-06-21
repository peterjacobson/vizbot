app.controller('WorkspaceCtrl', ['$scope', 'Consent','User', function ($scope, Consent, User) {

	
	$scope.checkInfoBuilding = false;
	$scope.checkInfoPeople = false;
	$scope.checkInfoProject = false;
	$scope.checkInfoDocument = false;
	var idconsent = JSON.parse(sessionStorage.getItem('idConsentSelected'));

	$scope.init = function(){
		$scope.consent = Consent.get({_id: idconsent} )
		.$promise.then(function(consent) {
	      $scope.consent = consent;
	      if($scope.consent.buildingInfo)
	      	$scope.checkInfoBuilding = true;
	      if($scope.consent.project.description)
	      	$scope.checkInfoProject = true;
	      if($scope.consent.people.length > 0)
	      	$scope.checkInfoPeople = true;
	      if($scope.consent.doc.length > 0)
	      	$scope.checkInfoDocument = true;
	    });
	};

	$scope.addBuildingInfo = function(){
		$scope.consent = Consent.get({_id: idconsent} )
		.$promise.then(function(consent) {
	      $scope.consent = consent;
	      $scope.consent.buildingInfo = $scope.building;
	      $scope.consent.$save();
		  $scope.checkInfoBuilding = true;
		  $('#addBuildingInfo').modal('hide');
	    });
	};

	$scope.saveProject = function(){
		$scope.consent = Consent.get({_id: idconsent})
		.$promise.then(function(consent) {
		  $scope.consent = consent;
	      $scope.consent.project = $scope.project;
	      $scope.consent.$save();
		  $scope.checkInfoProject = true;
		  $('#addproject').modal('hide'); 
	    });
		
	};

	$scope.savePeople = function(){
		$scope.consent = Consent.get({_id : idconsent})
		.$promise.then(function(consent){
			$scope.consent = consent;
			if($scope.peopleType == 'pro'){
				$scope.people.pro.peopleType = $scope.peopleType;
				$scope.consent.people.push($scope.people.pro); 
				$scope.consent.$save();
				$scope.people = null;
			}
			if($scope.peopleType == 'agent'){
				$scope.people.agent.peopleType = $scope.peopleType;
				$scope.consent.people.push($scope.people.agent);
				$scope.consent.$save();
				$scope.people = null;
			}
			if($scope.peopleType == 'licensed'){
				$scope.people.licensed.peopleType = $scope.peopleType;
				$scope.consent.people.push($scope.people.licensed);
				$scope.consent.$save();
				$scope.people = null;
			}
			if($scope.peopleType == 'client'){
				$scope.people.client.peopleType = $scope.peopleType;
				$scope.consent.people.push($scope.people.client); 
				$scope.consent.$save();
				$scope.people = null; 
			}
			$('#addPeopleModal').modal('hide');

			$scope.checkInfoPeople = true;
			// clean $scope.people
		});
	};

	$scope.saveDocument = function(){
		$('#addDocument').modal('hide'); 
		$scope.checkInfoDocument = true;
	};

}]);