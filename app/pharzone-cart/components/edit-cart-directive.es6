(() => {
  'use strict';

  /**
   * @ngdoc directive
   * @name pharzoneCart.directive:editCart
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="pharzoneCart">
       <file name="index.html">
        <edit-cart></edit-cart>
       </file>
     </example>
   *
   */
  angular
    .module('pharzoneCart')
    .directive('editCart', editCart);

  function editCart($log) {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: 'pharzone-cart/components/edit-cart-directive.tpl.html',
      replace: false,
      controllerAs: 'editCart',
      controller($scope, PharzoneCart) {
        let vm = this;
        // let db = PharzoneCart.db;
        vm.name = 'editCart';
        vm.db = {};
        vm.cart = PharzoneCart.cart;
        vm.cartTotal = PharzoneCart.cartTotal;
	      vm.checkout = PharzoneCart.checkout;
	      vm.getTime = PharzoneCart.getTime;
/*
        var getDb = (()=> {
          setTimeout(()=> {
            if (db.$$state.value) {
              $scope.$apply(function() {
                vm.db = db.$$state.value;
                /!*vm.db['products'] = ;
                vm.db.$save();*!/
              });
            } else {
              getDb();
            }

          }, 500);
        })();
*/
      },
      link(scope, element, attrs) {
        /*jshint unused:false */
        /*eslint "no-unused-vars": [2, {"args": "none"}]*/
      }
    };
  }
}());
