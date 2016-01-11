angular.module("TestAngularJS",["LocalStorageModule"])
  .controller("ListaDeLibros",function($scope,$http){
    $scope.posts = [];
    $scope.newPost = {};
    $http.get("http://jsonplaceholder.typicode.com/posts")
    .success(function(data){
      console.log(data);
      $scope.posts=data;
    })
    .error(function(error){

    });
    $scope.addPost = function(){
    $http.post("http://jsonplaceholder.typicode.com/posts",{
      title: $scope.newPost.title,
      body: $scope.newPost.body,
      userId: 1
    })
    .success(function(data,status,headers,config){
      console.log(data);
      $scope.posts.push(data);
      $scope.newPost = {};
    })
    .error(function(error,status,headers,config){
      console.log(error);
    });
    }
  })
.service("ToDoService",function(localStorageService){
    this.key="angular-todolist";
      if(localStorageService.get(this.key)){
          this.activities = localStorageService.get(this.key);
      }else{
        this.activities = [];
      }

    this.add = function(newActiv){
      this.activities.push(newActiv);
      this.updateLocalStorage();
    };
    this.updateLocalStorage = function(){
      localStorageService.set(this.key,this.activities);
    };
    this.clean = function(){
      this.activities = [];
      this.updateLocalStorage();
      return this.getAll;
    };
    this.getAll = function(){
      return this.activities;
    };
    this.removeItem = function(item){
      this.activities = this.activities.filter(function(activity){
        return activity !== item;
      });
      this.updateLocalStorage();
      return this.getAll();
    };


  return this;
})

  .controller("ToDoController",function($scope,ToDoService){

    /*
      {
        descripcion: 'hacer la tarea',
        fecha: '10-01-16 20:32hs'
      }
    */
    $scope.toDo = ToDoService.getAll();
    $scope.newActiv = {};

    $scope.addActiv = function(){
      ToDoService.add($scope.newActiv);
      $scope.newActiv={};
    }

    $scope.removeActiv = function(item){
      $scope.toDo = ToDoService.removeItem(item);
    }

    $scope.clean = function(){
      $scope.toDo = ToDoService.clean();
    }
  });
