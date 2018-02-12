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
    })
    .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl'
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
      link: $scope.link,
      upvotes: 0,
      comments: [
        {author: 'Joe', body: 'Cool post!', upvotes: 0},
        {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
      ]
    });
    $scope.title = ''
    $scope.link = ''
  };
  
  $scope.incrementUpvotes = function(post) {
    post.upvotes += 1;
  };

}])
.controller('PostsCtrl', [
'$scope',
'$stateParams',
'postFactory',
function($scope, $stateParams, postFactory){
  $scope.post = postFactory.posts[$stateParams.id];
  
  $scope.incrementUpvotes = function(post) {
    post.upvotes += 1;
  };
  
  $scope.addComment = function(){
  if($scope.body === '') {
    return;
  }
  $scope.post.comments.push({
    body: $scope.body,
    author: 'user',
    upvotes: 0
  });
  $scope.body = '';
};
}]);