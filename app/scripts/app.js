'use strict';

var app = angular.module('borderfreeApp', ['ui.state']);

app.config(function($stateProvider, $urlRouterProvider){
  
  $urlRouterProvider.otherwise('/');
 
  $stateProvider
      .state('template', {
    url: '/',
    views: {
      "products": {
        templateUrl: '/views/products.html',
        controller: 'productCtrl'
      }, 
      "cart": {
        templateUrl: '/views/cart.html',
        controller: 'cartCtrl'
      }, 
      "logosearch": {
        templateUrl: '/views/logosearch.html'
      }
    },
    onEnter: function($rootScope){

        // $rootScope variables so the methods from two different
        // controllers can use arguments and manipulate shared variables
        // Also helps maintain order of events when invoking services

        $rootScope.addedList = []; 
        $rootScope.searchText = '';
        $rootScope.tallies = {};

        //here for legibility
        $rootScope.shippingOptions;
        $rootScope.tallies.shipping;
        $rootScope.tallies.subtotal;
        $rootScope.tallies.tax;
        $rootScope.tallies.total;

    },
    onExit: function($rootScope){

        $rootScope.addedList.length = 0;
        $rootScope.searchText = '';
        $rootScope.shippingOptions = {};
        $rootScope.tallies = {};

    }
  });
});