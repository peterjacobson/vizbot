"use strict";

app.controller('WorkspaceCtrl', ['$scope', 'Consent','User', 'fileUpload',

	function ($scope, Consent, User, fileUpload) {

		
		$scope.checkInfoBuilding = false;
		$scope.checkInfoPeople = false;
		$scope.checkInfoProject = false;
		$scope.checkInfoDocument = false;
		$scope.checkInfoCouncil = false;
		$scope.docAdded = false;
		var idconsent = JSON.parse(sessionStorage.getItem('idConsentSelected'));
		$scope.username = JSON.parse(sessionStorage.getItem('username'));
		$scope.url = "http://localhost:3000/";

		$scope.init = function(){
			$scope.consent = Consent.get({_id: idconsent} )
			.$promise.then(function(consent) {
				$scope.consent = consent;
				if($scope.consent.buildingInfo){
					$scope.checkInfoBuilding = true;
					$scope.building = $scope.consent.buildingInfo;
				}
				if($scope.consent.project){
					$scope.checkInfoProject = true;
					$scope.project = $scope.consent.project;
				}
				if($scope.consent.people.length > 0)
					$scope.checkInfoPeople = true;
				if($scope.consent.doc.length > 0)
					$scope.checkInfoDocument = true;
			});
			if(JSON.parse(sessionStorage.getItem('product'))){
				$scope.articleChoose = JSON.parse(sessionStorage.getItem('product'));
				$scope.checkInfoDocument = true;
			}
		};

		$scope.addBuildingInfo = function(){
			$scope.consent = Consent.get({_id: idconsent} )
			.$promise.then(function(consent) {
				$scope.consent = consent;
				$scope.building.client = consent.client;
				$scope.building.address = consent.address;
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
				$('#addPeopleModal').modal('hide');
				$scope.checkInfoPeople = true;
			});
		};

		$scope.uploadFile = function(){
			var file = $scope.myFile;
			console.log('file is ' + JSON.stringify(file));
			var uploadUrl = $scope.url + idconsent +'/document';
			var ret = fileUpload.uploadFileToUrl(file, uploadUrl);
			ret.success(function(){
				$scope.docAdded = true;
				$scope.checkInfoDocument = true;
				$('#addDocument').modal('hide');
				$scope.myFile = null;
				$scope.init();
			})
			.error(function(){
				return false;
			});
		};

		$scope.submitApplication = function(){
			$scope.consent = Consent.get({_id: idconsent})
			.$promise.then(function(consent) {
				$scope.consent = consent;
				$scope.consent.status = 'submitted';
				$scope.status = 'Action from Council required';
				$scope.consent.$save();
			});		
		};

		$scope.removeProduct = function(prod){
			for (var i = 0; i < $scope.articleChoose.length; i++) {
				if($scope.articleChoose[i].product_slug == prod.product_slug){
					$scope.articleChoose.splice(i, 1);
					sessionStorage.setItem('product', JSON.stringify($scope.articleChoose));
				}
			}
		};

	}]);