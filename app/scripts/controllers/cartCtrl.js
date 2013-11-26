'use strict';

var app = angular.module('borderfreeApp');

app.controller('cartCtrl', ['$scope', 'staticapi', '$log', '$rootScope',
    function ($scope, staticapi, $log, $rootScope) {


    var getCartObj = function() {

        staticapi.get( "cart" ).
            success(function(data, status, headers, config) {

                $rootScope.shippingOptions = data.cart.shippingmethods;

                // update $rootScope tally from JSON per requirements
                $rootScope.tallies.shipping = data.cart.totals.shipping;
                $rootScope.tallies.subtotal = data.cart.totals.subtotal;
                $rootScope.tallies.tax = data.cart.totals.tax;
                $rootScope.tallies.total = data.cart.totals.total;

                changeActiveShipping('Ground Shipping');

            }).
            error(function(data, status, headers, config) {
                alert("HTTP ERROR "+status);
            });
    }();


    // can't watch on object change -- only a variable or an array
    $rootScope.$watch('tallies.subtotal + tallies.shipping', function() {
        
        if($rootScope.tallies.shipping !== undefined &&
            $rootScope.tallies.subtotal !== undefined) {

                $rootScope.tallies.total = $rootScope.tallies.shipping;
                
                if($rootScope.tallies.tax > 0)
                    $rootScope.tallies.total += ($rootScope.tallies.subtotal * $rootScope.tallies.tax)
                
                $rootScope.tallies.total += $rootScope.tallies.subtotal;

                // below is specific to free GroundShipping requirement on > $500 purchases

                if($rootScope.tallies.subtotal > 500 &&                         // would've liked to 
                    $scope.activeShippingKey === 'Ground Shipping') {           // separate this block
                                                                                // but the 2nd $watch
                                $scope.specialDiscount = true;                  // wouldn't fire insync
                                $rootScope.tallies.shipping = 0;                // when activeShippingKey changes

                } else if ($rootScope.tallies.subtotal <= 500 &&                // have to repopulate 
                           $scope.activeShippingKey === 'Ground Shipping') {    // Ground Shipping $ 
                                                                                // if the user reverts
                                $scope.specialDiscount = false;                 // $ amount to under 500
                                $rootScope.tallies.shipping = $rootScope
                                                                .shippingOptions['Ground Shipping']
                                                                .price;

                } else {
                                $scope.specialDiscount = false;
                }
        }
    });


    $scope.removeAddedItem = function(productName) {

        var i; // hunting for index of added item
        for(i = 0; i < $rootScope.addedList.length; ++i) {
          if(productName === $rootScope.addedList[i].name) // would rather use an id here
            break;
        }

        $rootScope.tallies.subtotal -= parseFloat($rootScope.addedList[i].individualPrice);

        if($rootScope.addedList[i].quantity == 1) {
            $rootScope.addedList.splice(i, 1);
        } else {
            $rootScope.addedList[i].quantity -= 1;
            $rootScope.addedList[i].totalPrice -= $rootScope.addedList[i].individualPrice;
        }
    };


    var changeActiveShipping = function(name) {
        $scope.activeShippingKey = name;
        $rootScope.tallies.shipping =  parseFloat($rootScope.shippingOptions[name].price);
    }


    $scope.triggerShippingChange = function(name) {     // Angular can't parse Object elements in order
                                                        // Have to use an objectorderby filter to convert
        for (var key in $rootScope.shippingOptions) {   // object to an array. Problem is that this array
                                                        // only serves up the nested .name value instead
           // hairy JSON                                // of the key needed to invoke changeActiveShipping             
           var obj = $rootScope.shippingOptions[key];   // method. So this helper function makes the conversion
                                                        
           if(name === obj.name) {
                changeActiveShipping(key);
           }
        }
    }

 }]);
