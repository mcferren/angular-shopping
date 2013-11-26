'use strict';

var app = angular.module('borderfreeApp');

app.service('staticapi', ['$http', '$log',
	  function ($http, $log) {

	  	// standard service that offers a promise to those who invoke
	    this.get = function (val) {

	        return $http.get("/scripts/services/staticData/" + val + ".json");
	    };

 }]);