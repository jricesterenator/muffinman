/*jslint devel: true*/
/*global angular*/

(function () {
    'use strict';

    angular.module('myTodo', [])

        .controller('mainController', ['$scope', '$http', function ($scope, $http) {

            function resetForm() {
                $scope.formData = {
                    task: {}
                };
            }

            resetForm();
            $scope.myerrors = undefined;
            
            $http.get('/api/tasks')
                .success(function (data) {
                    $scope.tasks = data;
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });

            $scope.createTask = function () {
                
                console.log("POSTING: ");
                console.log($scope.formData);
                console.log($scope.formData.task.name);
                
                var taskName = $scope.formData.task.name;
                if (angular.isUndefined(taskName)) {
                    $scope.errors = "noInput";
                    return;
                }
                $scope.errors = undefined;
                
                $http.post('/api/tasks', $scope.formData)
                    .success(function (data) {
                        resetForm();

                        $scope.tasks = data;
                        console.log(data);
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });

            };
        }]);
}());