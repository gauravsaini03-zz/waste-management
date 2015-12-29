angular.module('wasteaware', ['ionic', 'wasteaware.controllers','wasteaware.services', 'ionic-material','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    Parse.initialize("YV5xUliXm53MGmY4UchK5v6x79jJifvuoCstarHd", "BxpuVkX9DkLpv5FeXoL9MVeZiPEh5Dlz9XZpdaMw");
    
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.report', {
    url: '/report',
    views: {
      'menuContent': {
        templateUrl: 'templates/report.html',
        controller: 'ReportCtrl'
      },
      'fabContent': {
          template: ''
      }
    }
  })

  .state('app.listing', {
    url: '/listing',
    views: {
      'menuContent': {
        templateUrl: 'templates/listing.html',
        controller: 'ListCtrl'
      },
      'fabContent': {
          template: '<button ui-sref="app.report" id="fab-listing" class="button button-fab button-fab-top-right expanded button-calm drop icon ion-plus-round"></button>',
          controller: function ($timeout) {
              $timeout(function () {
                  document.getElementById('fab-listing').classList.toggle('on');
              }, 200);
          }
      }
    },
    resolve: {
      data: function ($q, ParseService) {
        return ParseService.getIssues();
      }
    }
  })
  .state('app.collection-points', {
    url: '/collection-points',
    views: {
      'menuContent': {
        templateUrl: 'templates/collection-points.html',
        controller: 'PointsCtrl'
      },
      'fabContent': ''
    },
    resolve: {
      data: function ($q, ParseService) {
        return ParseService.getPoints();
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/report');
});
