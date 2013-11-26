'use strict';

var app = angular.module('borderfreeApp');

app.controller('productCtrl', ['$scope', 'staticapi', '$log', '$rootScope',
	  function ($scope, staticapi, $log, $rootScope) {


		var getProducts = function() {

		    staticapi.get( "products" ).
		        success(function(data, status, headers, config) {

		        	// create a nested array for productList so we can track positioning
					$scope.productList = [];

		            var productQ = data.products.length

		            for(var i = 0; i < productQ; i++) {
		                if (i % 4 == 0) $scope.productList.push([]);
		                	$scope.productList[$scope.productList.length - 1]
		                		.push(data.products[i]);
		            }

		        }).
		        error(function(data, status, headers, config) {
		            alert("HTTP ERROR "+status);
		        });
	    }();


		$scope.addToCart = function(productObj) {

			// if its already in the $rootScope.addedList array
			for(var i = 0; i < $rootScope.addedList.length; ++i)
			{
				if(productObj.name === $rootScope.addedList[i].name) { // would rather use an id here

					$rootScope.addedList[i].quantity += 1;
					$rootScope.addedList[i].totalPrice = parseFloat($rootScope.addedList[i].totalPrice) + 
														 parseFloat($rootScope.addedList[i].individualPrice);

					$rootScope.tallies.subtotal += parseFloat($rootScope.addedList[i].individualPrice);

					return;
				} 
			}

			// to add a new element to the $rootScope.addedList array
			var dispatchObj = {};
			dispatchObj.name = productObj.name;
			dispatchObj.quantity = 1;
			if(productObj.sale == true)
				dispatchObj.individualPrice = productObj.salePrice;
			else
				dispatchObj.individualPrice = productObj.listPrice;
			dispatchObj.totalPrice = dispatchObj.individualPrice;

			$rootScope.addedList.unshift(dispatchObj);

			$rootScope.tallies.subtotal += parseFloat(dispatchObj.individualPrice);

			return;
		};

 }]);
