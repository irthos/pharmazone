'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var PharzoneCart = (function () {
    function PharzoneCart(Pharzone, $log) {
      _classCallCheck(this, PharzoneCart);

      $log.log('PharzoneCart');
      this.test = Pharzone.test;
      this.cart = Pharzone.cart;
      // this.db = Pharzone.data.db();
      this.cartTotal = Pharzone.api.cartTotal;
      this.checkout = Pharzone.api.checkout;
      this.getTime = Pharzone.api.getTime;
      this.promise = Pharzone.api.promise;
      // this.orders = Pharzone.data.orders;
      this.orders = this.promise(this, Pharzone.data.orders);
    }

    /**
     * @ngdoc service
     * @name pharzoneCart.service:PharzoneCart
     *
     * @description
     *
     */

    _createClass(PharzoneCart, [{
      key: 'get',
      value: function get() {
        return 'PharzoneCart';
      }
    }]);

    return PharzoneCart;
  })();

  angular.module('pharzoneCart').service('PharzoneCart', PharzoneCart);
})();
//# sourceMappingURL=../pharzone-cart/pharzone-cart-service.js.map