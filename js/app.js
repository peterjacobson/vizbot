"use strict";

var app = angular.module('app', [
  'ngRoute',
  'ngResource',
  'br.fullpage'
]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    //$locationProvider.html5Mode(true);
    $routeProvider.
      when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      }).
      when('/login', {
        templateUrl: 'views/login/login.html',
        controller: 'LoginCtrl'
      }).
      when('/register', {
        templateUrl: 'views/login/register.html',
        controller: 'RegisterCtrl'
      }).
      when('/consents', {
        templateUrl: 'views/consents/consents.html',
        controller: 'ConsentsCtrl'
      }).
      when('/createconsent', {
        templateUrl: 'views/consents/createconsent.html',
        controller: 'CreateConsentCtrl'
      }).
      when('/dashboard', {
        templateUrl: 'views/dashboard/dashboard.html',
        controller: 'DashboardCtrl'
      }).
      when('/workspace', {
        templateUrl: 'views/dashboard/workspace.html',
        controller: 'WorkspaceCtrl'
      }).
      when('/summary', {
        templateUrl: 'views/dashboard/summary.html',
        controller: 'SummaryCtrl'
      }).
      when('/profile', {
        templateUrl: 'views/profile/profile.html',
        controller: 'ProfileCtrl'
      }).
      when('/productSpec', {
        templateUrl: 'views/dashboard/productSpec/productSpec.html',
        controller: 'ProductSpecCtrl'
      }).
      when('/contact', {
        templateUrl: 'views/dashboard/contact/contact.html',
        controller: 'ContactCtrl'
      });
      
}]);
