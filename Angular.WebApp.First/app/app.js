var app = angular.module('app1', []);

var config = {
    authority: "https://localhost:44333/",
    client_id: "angularapp1",
    redirect_uri: window.location.protocol + "//" + window.location.host + "/index.html",
    post_logout_redirect_uri: window.location.protocol + "//" + window.location.host + "/index.html",

    // these two will be done dynamically from the buttons clicked, but are
    // needed if you want to use the silent_renew
    response_type: "id_token token",
    scope: "openid profile email read write",

    // silent renew will get a new access_token via an iframe 
    // just prior to the old access_token expiring (60 seconds prior)
    silent_redirect_uri: window.location.protocol + "//" + window.location.host + "/silent_renew.html",
    silent_renew: true,

    // this will allow all the OIDC protocol claims to vbe visible in the window. normally a client app 
    // wouldn't care about them or want them taking up space
    filter_protocol_claims: false
};

var mgr = new OidcTokenManager(config);

app.constant("OidcTokenManager", mgr);

app.run(function (OidcTokenManager) {

    if (window.location.hash) {
        // you are authenticated, do nothing right now
        handleCallback(OidcTokenManager);
    }
    else {
        OidcTokenManager.redirectForToken();
    }

});

function handleCallback(mgr) {
    mgr.processTokenCallbackAsync().then(function () {
        var hash = window.location.hash.substr(1);
        var result = hash.split('&').reduce(function (result, item) {
            var parts = item.split('=');
            result[parts[0]] = parts[1];
            return result;
        }, {});

        console.log(JSON.stringify(result));
    }, function (error) {
        console.log(JSON.stringify(reserrorult));
    });
}

