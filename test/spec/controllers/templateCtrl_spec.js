'use strict';

describe('controller: templateCtrl', function () {

	beforeEach(function() {
		module("borderfreeApp");
	});

	beforeEach(inject(function($scope, staticapi, $log, $rootScope) {
		$controller('templateCtrl', {
			$scope: $rootScope.$new(),
			$location: $location, 
			staticapi: staticapi

		});
	}));

	describe("success", function() {

	});

});