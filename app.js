angular.module('flapperNews', ['ui.router'])
.factory('postFactory', [function(){
  var o = {
    posts: []
  };
  return o;
}])
.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    });

  $urlRouterProvider.otherwise('home');
}])
.controller('MainCtrl', [
'$scope',
'postFactory',
function($scope, postFactory){
  $scope.test = 'Hello world!';
  
  $scope.posts = postFactory.posts;
  
  $scope.addPost = function() {
    if(!$scope.title || $scope.title === '') {
      return;
    }
    $scope.posts.push({
      title: $scope.title,
      upvotes: 0,
      link: $scope.link
    });
    $scope.title = ''
    $scope.link = ''
  };
  
  $scope.incrementUpvotes = function(post) {
    post.upvotes += 1;
  };
}]);