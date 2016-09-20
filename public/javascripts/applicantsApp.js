var app = angular.module('app', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
    // setup states for home and applicants info
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'HomeCtrl',
      resolve: {
        postPromise: ['applicants', function(applicants){
            return applicants.getAllApplicants();
          }
        ]
      }
    })
    .state('applicants', {
      url: '/applicants/{id}',
      templateUrl: '/applicants.html',
      controller: 'ApplicantsCtrl'
    });

  $urlRouterProvider.otherwise('home');
}]);

app.controller('HomeCtrl', ['$scope', 'applicants',
function($scope, applicants) {
  $scope.applicants = applicants.applicants;
}]);


// Simple factory for retrieving applicants.
// Could extend this with additional functionality to add,
// remove and update mongo data 
app.factory('applicants', ['$http', function($http){
  
  // Object containing applicants array and methods for interacting
  // with it 
  var factoryObject = {applicants: []};

  // Uses express router get in index.js to get all applicants
  // Then create a deep copy with angular.copy, and update the
  // applicants array and in turn the view
  factoryObject.getAllApplicants = function() {
    return $http.get('/applicants').success(function(data){
      angular.copy(data, factoryObject.applicants);
    });
  };
  return factoryObject;
}]);

app.controller('ApplicantsCtrl', ['$scope', '$stateParams', 'applicants',
function($scope, $stateParams, applicants){
  $scope.applicant = applicants.applicants[$stateParams.id];
}]);