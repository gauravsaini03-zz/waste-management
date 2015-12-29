angular.module('wasteaware.controllers', [])

.controller('AppCtrl', function($scope, $ionicLoading, $rootScope, ParseService, $ionicPopover) {
  
  // Loader
  $rootScope.$on('loading:show', function(event) {
      $ionicLoading.show({template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'})
  })
  $rootScope.$on('loading:hide', function() {
      $ionicLoading.hide()
  })

  $scope.isExpanded = false;
  $scope.hasHeaderFabLeft = false;
  $scope.hasHeaderFabRight = false;

  var navIcons = document.getElementsByClassName('ion-navicon');
  for (var i = 0; i < navIcons.length; i++) {
      navIcons.addEtventListener('click', function() {
          this.classList.toggle('active');
      });
  }

  $scope.setHeaderFab = function(location) {
      var hasHeaderFabLeft = false;
      var hasHeaderFabRight = false;

      switch (location) {
          case 'left':
              hasHeaderFabLeft = true;
              break;
          case 'right':
              hasHeaderFabRight = true;
              break;
      }

      $scope.hasHeaderFabLeft = hasHeaderFabLeft;
      $scope.hasHeaderFabRight = hasHeaderFabRight;
  };

  $scope.hasHeader = function() {
      var content = document.getElementsByTagName('ion-content');
      for (var i = 0; i < content.length; i++) {
          if (!content[i].classList.contains('has-header')) {
              content[i].classList.toggle('has-header');
          }
      }

  };

  $scope.setExpanded = function(bool) {
      $scope.isExpanded = bool;
  };

  $scope.clearFabs = function() {
      var fabs = document.getElementsByClassName('button-fab');

      if (fabs.length && fabs.length > 1) {
          fabs[0].remove();
      }
  };

})

.controller('ReportCtrl', function($scope, $cordovaCamera, $rootScope,$state, $timeout,ionicMaterialMotion, ionicMaterialInk) {
  
  $scope.$on('$ionicView.enter', function(e) {

    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    var fabs = document.getElementsByClassName('button-fab');
    if (fabs.length && fabs.length >= 1) {
        fabs[0].remove();
    } 
        
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
  });

  // Set Motion
  

  $scope.report = {};

  $scope.save = function () {
    $rootScope.$broadcast('loading:show');

    var Issues = Parse.Object.extend("Issues");
    var report = new Issues();

    report.set("title", $scope.report.title);
    report.set("description", $scope.report.description);

    var image = new Parse.File($scope.report.title + ".jpeg", { base64: $scope.report.image });
    report.set("image", image);

    report.save(null, {
      success: function(gameScore) {
        // Execute any logic that should take place after the object is saved.
        console.log('New object created with objectId: ' + gameScore.id);
        $rootScope.$broadcast('loading:hide');
        $state.go('app.listing');
      },
      error: function(gameScore, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        console.log('Failed to create new object, with error code: ' + error.message);
        $rootScope.$broadcast('loading:hide');
      }
    });
  }
  


  $scope.captureImage = function () {
    document.addEventListener("deviceready", function () {

      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation:true
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
        $scope.report.image = "data:image/jpeg;base64," + imageData;
      }, function(err) {
        alert("error while capture");
      });

    }, false);
  }
})

.controller('ListCtrl', function($scope, data, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {

  $scope.issues = data;

  $scope.$on('$ionicView.enter', function(e) {
    $scope.$parent.clearFabs();
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    
    $timeout(function() {
        
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
  })

})

.controller('PointsCtrl', function($scope, $stateParams, data, $timeout, ionicMaterialMotion, ionicMaterialInk) {

  $scope.points = data;
  
  $scope.$parent.clearFabs();


  // Delay expansion
  $timeout(function() {
      //$scope.isExpanded = true;
      //$scope.$parent.setExpanded(false);
      document.getElementsByTagName('ion-list')[0].className += ' animate-ripple';
      ionicMaterialMotion.ripple();
  }, 500);

  // Set Ink
  ionicMaterialInk.displayEffect();


});
