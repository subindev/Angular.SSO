(function (app) {
    var appcontroller = function (OidcTokenManager, $timeout) {
        var self = this;


        $timeout(function () {
            self.profile = JSON.stringify(OidcTokenManager.profile);
            self.access_token = OidcTokenManager.access_token;
        }, 100); //need to find a better way

        self.signout = function () {
            OidcTokenManager.redirectForLogout();
        };

        self.callapi = function () {
            var xhr = new XMLHttpRequest();
            xhr.onload = function (e) {
                if (xhr.status == 200) {
                    $timeout(function () {
                        self.result = xhr.response;
                    });
                }
            };
            xhr.onerror = function () {
                if (xhr.status === 401) {
                    OidcTokenManager.removeToken();
                }
            };

            xhr.open("GET", "http://localhost:60466/identity", true);
            xhr.setRequestHeader("Authorization", "Bearer " + OidcTokenManager.access_token);
            xhr.send();
        };
    };

    app.controller('appcontroller', appcontroller);

})(angular.module('app1'));