angular.module('wasteaware.services', [])

.factory('ParseService', function ($q, $rootScope) {

	var parseService = {};

	parseService.getIssues = function () {
        $rootScope.$broadcast('loading:show');
		
		var defer = $q.defer();

        var Issues = Parse.Object.extend("Issues");
        var query = new Parse.Query(Issues);
        var issues = [];

        query.find({
          success: function(results) {
            	for (var i = 0; i < results.length; i++) {
              var object = results[i];
              temp = {"id":object.id,"title":object.get('title'),"description":object.get('description'),"image":object.get('image'), "createdAt":object.get('createdAt')}
              issues.push(temp);
            }
            defer.resolve(issues); 
            $rootScope.$broadcast('loading:hide');
          },
          error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
            $rootScope.$broadcast('loading:hide');
          }
        });

        return defer.promise;
	};

	parseService.getPoints = function () {
        $rootScope.$broadcast('loading:show');
		
		var defer = $q.defer();

        var Points = Parse.Object.extend("Points");
        var query = new Parse.Query(Points);
        var points = [];

        query.find({
          success: function(results) {
            	for (var i = 0; i < results.length; i++) {
              var object = results[i];
              temp = {"id":object.id,"name":object.get('name'),"address":object.get('address'),"image":object.get('image')}
              points.push(temp);
            }
            defer.resolve(points); 
            $rootScope.$broadcast('loading:hide');
          },
          error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
            $rootScope.$broadcast('loading:hide');
          }
        });

        return defer.promise;
	};

	return parseService;
})