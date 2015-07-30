(() => {
  'use strict';

  /**
   * @ngdoc directive
   * @name pharzoneShop.directive:productList
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="pharzoneShop">
       <file name="index.html">
        <product-list></product-list>
       </file>
     </example>
   *
   */
  angular
    .module('pharzoneShop')
    .directive('productList', productList);

  function productList($log) {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: 'pharzone-shop/components/product-list-directive.tpl.html',
      replace: false,
      controllerAs: 'productList',
      controller(PharzoneShop) {
        $log.debug('Testing PharzoneShop service from product-list directive', PharzoneShop.test);
        let vm = this;
        vm.name = 'productList';
        vm.addToCart = PharzoneShop.addToCart;
        vm.products = PharzoneShop.products;
        vm.cart = PharzoneShop.cart;
      },
      link(scope, element, attrs) {
        /*jshint unused:false */
        /*eslint "no-unused-vars": [2, {"args": "none"}]*/
      }
    };
  }
}());