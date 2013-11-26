'use strict';

var app = angular.module('borderfreeApp');

app.filter('orderObjectBy', function() {
	return function(items, field, reverse) {

		// Angular can't parse Object elements in order
        // Have to use an objectorderby filter to convert
        // object to an array.

		var filtered = [];

		angular.forEach(items, function(item) {
		  filtered.push(item);
		});

		filtered.sort(function (a, b) {
		  return (a[field] > b[field]);
		});

		if(reverse) 
			filtered.reverse();

		return filtered;
	};
});