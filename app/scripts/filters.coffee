angular.module 'jobFoundryFilters', []

angular.module('jobFoundryFilters').filter 'join', ->
	(array) ->
		array.join ', '		

angular.module('jobFoundryFilters').filter 'isEmpty', ->
	(array) ->
		array.length is 0
