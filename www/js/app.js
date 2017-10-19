// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app=angular.module('starter', ['ionic'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state("actualites",{
      url:"/actualites",
        templateUrl:"views/actualites.html",
        controller:"ActualiteController"
    });
    $stateProvider.state("detailActualite",{
        url:"/actualite/:idAct",
        templateUrl:"views/detailActualite.html",
        controller:"DetailActualiteController"
    });
    $urlRouterProvider.otherwise("actualites");
})
app.controller("DetailActualiteController",function ($http,$scope,$stateParams) {
    $scope.idActualite=$stateParams.idAct;
    $scope.actualite={};
    $scope.url="http://localhost:8080";
    $http.get("http://localhost:8080/actualites/"+$stateParams.idAct)
        .success(function (data) {
            $scope.actualite=data;
        })
})
app.controller("ActualiteController",function ($http,$scope,$state) {
  $scope.listAct=[];
  $scope.currentPage=-1;
  $scope.size=4;
  $scope.url="http://localhost:8080";
  $scope.pageCount=0;
  $scope.chargerAcualites=function (page) {
      $http.get("http://localhost:8080/chercher?page="+$scope.currentPage+"&size="+$scope.size)
          .success(function (data) {
              $scope.pageCount=data.totalPages;
              data.content.forEach(function (act) {
                  $scope.listAct.push(act);
              });
              $scope.$broadcast('scroll.infiniteScrollComplete')

          }).error(function (err) {
          console.log(err)
      })

  }
    $scope.getDetailActualite=function (id) {
        $state.go("detailActualite",{
            idAct:id
        })
    }
  //$scope.chargerAcualites(0);
    $scope.loadMore=function () {

        if($scope.pageCount>=$scope.currentPage){
          console.log($scope.pageCount+"****"+$scope.currentPage)
            ++$scope.currentPage;

            $scope.chargerAcualites($scope.currentPage);
        }

    }
})