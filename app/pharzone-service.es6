(() => {
  'use strict';

  class Pharzone {
    constructor($log, $state, $firebaseObject, $firebaseArray, $rootScope, $firebaseAuth) {
      $log.info('Starting App Services');
/*
      this.promise = (target, data)=> {
        $log.debug('Promising data..', target +': '+data);
        setTimeout(()=> {
          if (data) {
            $rootScope.$apply( ()=> {
              target.data = data;
            });
            return target;
          } else {
            this.promise($rootScope, data);
            $log.debug('looking for data..');
          }
        }, 500);
      };
*/
      let vm = this;
      let ref = new Firebase("https://pharzone.firebaseio.com");
      this.test = 'ALL SYSTEMS OPERATIONAL';
      this.cart = {};
      this.index = {products:{},users:{},orders:{}};
      var authObj = $firebaseAuth(ref);
      this.auth = authObj.$getAuth();
      $rootScope.unauth = ()=>{
        console.log('logging out');
        let ref = new Firebase("https://pharzone.firebaseio.com");
        var authObj = $firebaseAuth(ref);
        var userIs = authObj.$getAuth();
        console.log(userIs);
        authObj.$unauth();
        $rootScope.user = authObj.$getAuth();
        console.log(userIs);
      };
      if (this.auth) {
        console.log("Logged in as:", this.auth.uid);
        $rootScope.user = this.auth.uid;
      } else {
        console.log("Logged out");
      }

      /*
      this.dummyData = {
        products: [
          {
            name: 'Cocaine',
            url:'cocaine',
            price: 100,
            unit: 'g',
            description: 'party drug often too dilute to benefit users',
            image: 'http://blog.heart.org/wp-content/uploads/2014/02/cocaine3.jpg'
          },
          {
            name: 'DMT',
            url:'dmt',
            price: 130,
            unit: 'mg',
            description: 'spiritual drug often associated with enlightenment',
            image: 'http://masswallpapers.mobi/wp-content/uploads/dmt-crystals-photos-7.jpg'
          },
          {
            name: 'LSD',
            url:'lsd',
            price: 12,
            unit: 'paper',
            description: 'Known to unlock the unknown',
            image: 'http://assets.hightimes.com/styles/large/s3/LSD.jpg?itok=bhGTfWkj'
          },
          {
            name: 'Peyote',
            url: 'peyote',
            price: 40,
            unit: 'button',
            description: 'Aboriginal drug often used in ceremonies and rights-of-passage',
            image: 'https://media-cdn.tripadvisor.com/media/photo-s/01/43/ba/48/peyote.jpg'
          },
          {
            name: 'Psilocybe Cubensis',
            url:'psilocybe-cubensis',
            price: 100,
            unit: 'g',
            description: 'A species of psychedelic mushroom whose principal active compounds are psilocybin and psilocin',
            image: 'http://www.culturamix.com/wp-content/gallery/8-67/psilocybe-cubensis-2.jpg'
          }
        ],
        users:[
          {
            name:'irth orbits',
            email:'irth03@gmail.com',
            role:'lab',
            deals:{
              current:[
                {
                  drug: 'lsd',
                  form:'paper',
                  price: '100',
                  unit: 'ml',
                  qty: '1000'
                },
                {
                  drug: 'dmt',
                  form: 'crystals',
                  price: '40',
                  unit: 'mg',
                  qty: '500'
                }
              ],
              complete:[
                {
                  drug: 'meth',
                  form: 'crystals',
                  price: '4',
                  unit: 'g',
                  qty: '5000'
                }
              ]
            }
          },
          {
            name:'jah farmer',
            email:'jaffey@gmail.com',
            role: 'pharmacist',
            lab:'undermarket',
            deals:{
              current:[
                {
                  drug: 'hemmehroid cream',
                  form:'cream',
                  price: '20',
                  unit: '100g',
                  qty: '100'
                },
                {
                  drug: 'backsporin',
                  form: 'salve',
                  price: '55',
                  unit: '50 mg',
                  qty: '540'
                }
              ],
              complete:[
                {
                  drug: 'sales',
                  form: 'peer-pressure',
                  price: '80',
                  unit: 'interaction',
                  qty: '40000'
                }
              ]
            }
          }
        ],
        orders:[
          {
            items:{},
            total:100,
            user:'me'
          }
        ]
      };



      (()=>{
        let ref = new Firebase('https://pharzone.firebaseio.com/');
        var obj = $firebaseObject(ref);
        obj.products = this.dummyData.products;
        obj.$save().then(function(ref) {
          ref.key() === obj.$id; // true
        }, function(error) {
          console.log("Error:", error);
        });
      })();
*/

      this.data = {
	      db: (()=>{
		      let ref = new Firebase('https://pharzone.firebaseio.com/');
		      var dbObj = $firebaseObject(ref).$loaded().then((data)=>{
			      return data;
		      });
		      return dbObj;
	      })(),
        products: (()=>{
          let ref = new Firebase('https://pharzone.firebaseio.com/products');
          var dbObj = $firebaseObject(ref).$loaded().then((data)=>{
            angular.forEach(data, (product, key) =>{
              this.index['products'][product.url] = key;
            });
            return data;
          });
          return dbObj;
        })(),
        users:  (()=>{
          let ref = new Firebase('https://pharzone.firebaseio.com/users');
          var dbObj = $firebaseObject(ref).$loaded().then((data)=>{
            return data;
          });
          return dbObj;
        })(),
        orders:  (()=>{
          let ref = new Firebase('https://pharzone.firebaseio.com/orders');
          var dbObj = $firebaseObject(ref).$loaded().then((data)=>{
            return data;
          });
          return dbObj;
        })()
      };
      /* trying to be clever with data wrangling

      this.db = {};
      angular.forEach(this.data, (method, key)=>{
        $log.log(method, key);
        this.db[key] = method;
      });

      */

	    this.api = {
        updateUser: (user, name, email, pass)=>{
          console.log('updating', user +' '+ name +' '+ email);
          var oldEmail = '';
          let ref = new Firebase("https://pharzone.firebaseio.com/users/"+user);
          var dbObj = $firebaseObject(ref).$loaded().then((data)=>{
            oldEmail = data.email;
            data.name = name;
            data.email = email;
            data.$save().then(()=>{
              if(email !== oldEmail){
                let authRef = new Firebase("https://pharzone.firebaseio.com/");
                var authObj = $firebaseAuth(authRef);
                authObj.$changeEmail({
                  oldEmail: oldEmail,
                  newEmail: email,
                  password: pass
                }).then(function() {
                  console.log("Email changed successfully!");
                }).catch(function(error) {
                  console.error("Error: ", error);
                });
                let ref = new Firebase("https://pharzone.firebaseio.com/index/users/email");
                var dbObj = $firebaseObject(ref).$loaded().then((data)=>{
                  data[email.replace('.','`')] = user;
                  data[oldEmail.replace('.','`')] = null;
                  data.$save();

                })
              }

            })
          });
        },
        login: (email, pass)=>{
          console.log("Logging in as:", email + ': '+pass);
          let ref = new Firebase("https://pharzone.firebaseio.com");
          var authObj = $firebaseAuth(ref);
          authObj.$authWithPassword({
            email: email,
            password: pass
          }).then(function(authData) {
            console.log("Logged in as:", authData.uid);
            $rootScope.user = authData.uid;
          }).catch(function(error) {
            console.error("Authentication failed:", error);
          });
        },
        register: (email, pass, name)=>{
          console.log('registering user', email + ': '+ pass);
          let ref = new Firebase("https://pharzone.firebaseio.com");
          var authObj = $firebaseAuth(ref);
          authObj.$createUser({
            email: email,
            password: pass
          }).then(function(userData) {
            let ref = new Firebase("https://pharzone.firebaseio.com/users");
            var dbObj = $firebaseObject(ref).$loaded().then((data)=>{
              userData.email = email;
              userData.name = name;
              data[userData.uid] = userData;
              data.$save().then(()=>{
                // Indexing users by email
                console.log('indexing...');
                let ref = new Firebase("https://pharzone.firebaseio.com/index/users/email");
                var dbIndex = $firebaseObject(ref).$loaded().then((data)=>{
                  var cleanEmail = email.replace('.','`');
                  data[cleanEmail] = userData.uid;
                  data.$save()
                });
              });
              console.log("User " + userData.uid + " created successfully!");
            });

            return authObj.$authWithPassword({
              email: email,
              password: pass
            });
          }).then(function(authData) {
            console.log("Logged in as:", authData.uid);
            $rootScope.user = authData.uid;
          }).catch(function(error) {
            console.error("Error: ", error);
          });
        },
        unauth: ()=>{
          console.log('logging out');
          let ref = new Firebase("https://pharzone.firebaseio.com");
          var authObj = $firebaseAuth(ref);
          var userIs = authObj.$getAuth();
          console.log(userIs);
          authObj.$unauth();
          $rootScope.user = authObj.$getAuth();
          console.log(userIs);
        },
        deleteUser: (email, pass)=>{
          // TODO Clean up lingering db entries
          console.log("Deleting User: ", email + ': '+pass);
          let ref = new Firebase("https://pharzone.firebaseio.com");
          var authObj = $firebaseAuth(ref);
          authObj.$removeUser({
            email: email,
            password: pass
          }).then(function() {
            let ref = new Firebase("https://pharzone.firebaseio.com/users");
              var dbObj = $firebaseObject(ref).$loaded().then((data)=>{
                data[$rootScope.user] = null;
                data.$save().then(()=>{
                  // De-indexing users by email
                  console.log('de-indexing...');
                  let ref = new Firebase("https://pharzone.firebaseio.com/index/users/email");
                  var dbIndex = $firebaseObject(ref).$loaded().then((data)=>{
                    var cleanEmail = email.replace('.','`');
                    data[cleanEmail] = null;
                    data.$save()
                  });
                });
              });
            console.log("User removed successfully!");
          }).catch(function(error) {
            console.error("Error: ", error);
          });
        },
        promise: (target, data)=> {
          setTimeout(()=> {
            if (data) {
              $rootScope.$apply( ()=> {
                target.data = data;
              });
              return target;
            } else {
              this.api.promise(target, data);
            }
          }, 500);
        },
        save: (productId, user, type, object)=>{
          let ref = new Firebase('https://pharzone.firebaseio.com/users/'+user+'/'+type);
          var obj = $firebaseObject(ref);
          $log.debug(obj, object);
          obj[productId] = object;
          obj.$save().then(function(ref) {
            ref.key() === obj.$id; // true
          }, function(error) {
            console.log("Error:", error);
          });
        },
        make: (user, type, object)=>{
           let ref = new Firebase('https://pharzone.firebaseio.com/users/'+user+'/'+type);
           var obj = $firebaseArray(ref);
           obj.$loaded().then((data)=>{
             data.$add(object)
               .then(function(ref) {
                 var id = ref.key();
                 console.log("added record with id " + id);
             }, function(error) {
               console.log("Error:", error);
             });
           });



          /*if(!this.data[type].object){
            let length = this.data[type].length;
            this.data[type][length]=object;
            this.data[type].$save();
          }*/
        },
        getTime: () => {
          return Date.now();
        },
		    addToCart: (product, cart, qty) => {
          if(!qty) qty = 1;
          product['qty']= qty;
          if(cart[product.name]){
            console.log('Already in cart.');
          } else {
            cart[product.name]=product;
            return cart;
          }

	      },
        cartTotal: (items) => {
          // $log.debug('calculating totals', items);
          var total = 0;
          angular.forEach(items, (item)=>{
            var itemTotal = item.price * item.qty;
            total = total + itemTotal;
          });
          return total;
        },
        checkout: (order, orderTotal, time, vm) => {
          // var timestamp = Date.now();
          order.total = orderTotal;
//        this.data.orders[time]=order;

        if(this.data.orders){
          this.data.orders.$$state.value[time]=order;
          this.data.orders.$$state.value.$save();
        }
        // TODO wire to db
        var href = $state.href("pharzone.cart.payment", { order: time });
        $state.go('pharzone.cart.payment',{order:time});
        }
	    }
    }

    get() {
      return 'Pharzone';
    }
  }

  /**
   * @ngdoc service
   * @name pharzone.service:Pharzone
   *
   * @description
   *
   */
  angular
    .module('pharzone')
    .service('Pharzone', Pharzone);
}());
