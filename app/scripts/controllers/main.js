'use strict';

angular.module('app')
  .controller('MainCtrl', function ($scope, $interval, stackedAreaChartSampleData, pieChartSampleData, RandomTimeSeriesDataModel, RandomTopNDataModel) {
    var widgetDefinitions = [
      {
        title: 'SARASA',
        name: 'sarasa',
        template: '<div progressbar class="progress-striped" type="info" value="percentage">{{percentage}}%</div>',
        style: {
          width: '50%'
        }
      },
      {
        title: 'Balanza',
        templateUrl: 'template/fountains.html',
        style: {
        	width: '50%'
        }
      },
      {
          name: 'MyWidget',
          template: '<div>Hola</div>'
        }
    ];


    var defaultWidgets = _.map(widgetDefinitions, function (widgetDef) {
      return {
        name: widgetDef.name
      };
    });

    $scope.dashboardOptions = {
      widgetButtons: true,
      widgetDefinitions: widgetDefinitions,
      defaultWidgets: defaultWidgets
    };

// random scope value (scope-watch widget)
    $interval(function () {
      $scope.randomValue = Math.random();
    }, 500);

// percentage (gauge widget, progressbar widget)
    $scope.percentage = 5;
    $interval(function () {
      $scope.percentage = ($scope.percentage + 10) % 100;
    }, 1000);

    // nvd3-stacked-area-chart
    $scope.stackedAreaChartData = stackedAreaChartSampleData;

    $scope.xAxisTickFormat = function () {
      return function (d) {
        return d3.time.format('%x')(new Date(d));
      };
    };

    // pie chart
    $scope.pieChartData = pieChartSampleData;

    /*
     var pieChart = angular.copy(pieChartSampleData);

     $interval(function () { //TODO
     var a = pieChart[0];
     var b = pieChart[1];
     var sum = a.y + b.y;
     a.y = (a.y + 1) % sum;
     b.y = sum - a.y;
     $scope.pieChartData = angular.copy(pieChart);
     }, 500);
     */

    // external controls
    $scope.addWidget = function (directive) {
      $scope.dashboardOptions.addWidget({
        name: directive
      });
    };

    $scope.addWidgetScopeWatch = function () {
      $scope.dashboardOptions.addWidget({
        name: 'scope-watch',
        attrs: {
          value: 'randomValue'
        }
      });
    };
  });