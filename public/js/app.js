angular.module('snApp', ['snApp.home', 'snApp.common', 'ui.calendar', 'ui.bootstrap'])
.config(['$sceProvider', function($sceProvider) {
    
    $sceProvider.enabled(false);
}]);