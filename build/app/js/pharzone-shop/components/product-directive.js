'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name pharzoneShop.directive:product
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="pharzoneShop">
       <file name="index.html">
        <product></product>
       </file>
     </example>
   *
   */
  angular.module('pharzoneShop').directive('product', product);

  function product($log) {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: 'pharzone-shop/components/product-directive.tpl.html',
      replace: false,
      controllerAs: 'product',
      controller: function controller(PharzoneShop, $state) {
        $log.debug('Testing PharzoneShop service from product directive', PharzoneShop.test);
        var vm = this;
        var url = $state.params.product;
        vm.product = PharzoneShop.productsIndex[url];
        vm.name = vm.product.name;
        vm.addToCart = PharzoneShop.addToCart;
        vm.cart = PharzoneShop.cart;
      },
      link: function link(scope, element, attrs) {
        /*jshint unused:false */
        /*eslint "no-unused-vars": [2, {"args": "none"}]*/
      }
    };
  }
})();
//# sourceMappingURL=../../pharzone-shop/components/product-directive.js.map