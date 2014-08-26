cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/plugin.google.maps/www/googlemaps-cdv-plugin.js",
        "id": "plugin.google.maps.phonegap-googlemaps-plugin",
        "clobbers": [
            "plugin.google.maps"
        ]
    },
    {
        "file": "plugins/nl.x-services.plugins.toast/www/Toast.js",
        "id": "nl.x-services.plugins.toast.Toast",
        "clobbers": [
            "window.plugins.toast"
        ]
    },
    {
        "file": "plugins/nl.x-services.plugins.toast/test/tests.js",
        "id": "nl.x-services.plugins.toast.tests"
    },
    {
        "file": "plugins/org.apache.cordova.dialogs/www/notification.js",
        "id": "org.apache.cordova.dialogs.notification",
        "merges": [
            "navigator.notification"
        ]
                  },{
                  "file": "plugins/com.native5.plugins.navbar/www/NavigationBar.js",
                  "id": "com.native5.plugins.navbar.navbar",
                  "clobbers": [
                               "window.navbar"
                               ]
                  },
                  {
                  "file": "plugins/ru.dextra.cordova.tabbar/www/TabBar.js",
                  "id": "ru.dextra.cordova.tabbar.tabbar",
                  "clobbers": [
                               "window.tabbar"
                               ]
                  },

    {
        "file": "plugins/plugin.http.request/www/http-request.js",
        "id": "plugin.http.request.phonegap-http-requst",
        "clobbers": [
            "cordova.plugins.http-request"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "plugin.google.maps": "1.1.4",
    "nl.x-services.plugins.toast": "2.0.1",
    "org.apache.cordova.dialogs": "0.2.10-dev",
    "plugin.http.request": "1.0.0",
    "com.googlemaps.ios": "1.8.1"
}
// BOTTOM OF METADATA
});