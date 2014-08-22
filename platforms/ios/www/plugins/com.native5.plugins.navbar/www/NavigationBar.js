cordova.define("com.native5.plugins.navbar.navbar",
               function(require, exports, module) {
               //            cordova.define("cordova/plugin/iOSNavigationBar",
               //            function(require, exports, module) {
               
               var NavigationBar = function() {
               this.leftButtonCallback = null;
               this.rightButtonCallback = null;
               this.rightButtonsCallback = {};
               }
               
               /**
                * Create a navigation bar.
                *
                * @param style: One of "BlackTransparent", "BlackOpaque", "Black" or "Default". The latter will be used if no style is given.
                */
               NavigationBar.prototype.create = function(style, options)
               {
               options = options || {};
               if(!("style" in options))
               options.style = style || "Default";
               cordova.exec(null, null, "NavigationBar", "create", [options]);
               };
               
               /**
                * Must be called before any other method in order to initialize the plugin.
                */
               NavigationBar.prototype.init = function()
               {
               cordova.exec(null, null, "NavigationBar", "init", []);
               };
               
               NavigationBar.prototype.resize = function() {
               cordova.exec(null, null, "NavigationBar", "resize", []);
               };
               
               /**
                * Assign either title or image to the left navigation bar button, and assign the tap callback
                */
               NavigationBar.prototype.setupLeftButton = function(title, image, onselect, options)
               {
               this.leftButtonCallback = onselect;
               cordova.exec(null, null, "NavigationBar", "setupLeftButton", [title || "", image || "", options || {}]);
               };
               
               /**
                * @param options: May contain the key "animated" (boolean)
                */
               NavigationBar.prototype.hideLeftButton = function(options)
               {
               options = options || {}
               if(!("animated" in options))
               options.animated = false
               
               cordova.exec(null, null, "NavigationBar", "hideLeftButton", [options])
               };
               
               NavigationBar.prototype.setLeftButtonEnabled = function(enabled)
               {
               cordova.exec(null, null, "NavigationBar", "setLeftButtonEnabled", [enabled])
               };
               
               NavigationBar.prototype.setLeftButtonTint = function(tintColorRgba)
               {
               cordova.exec(null, null, "NavigationBar", "setLeftButtonTint", [tintColorRgba])
               };
               
               NavigationBar.prototype.setLeftButtonTitle = function(title)
               {
               cordova.exec(null, null, "NavigationBar", "setLeftButtonTitle", [title])
               };
               
               NavigationBar.prototype.showLeftButton = function(options)
               {
               options = options || {}
               if(!("animated" in options))
               options.animated = false
               
               cordova.exec(null, null, "NavigationBar", "showLeftButton", [options])
               };
               
               /**
                * Internal function called by the plugin
                */
               NavigationBar.prototype.leftButtonTapped = function()
               {
               if(typeof(this.leftButtonCallback) === "function")
               this.leftButtonCallback()
               };
               
               /**
                * Assign either title or image to the right navigation bar button, and assign the tap callback
                */
               NavigationBar.prototype.setupRightButton = function(title, image, onselect, options)
               {
               this.rightButtonCallback = onselect;
               cordova.exec(null, null, "NavigationBar", "setupRightButton", [title || "", image || "", options || {}]);
               };
               
               /**
                * Assign either title or image to the right navigation bar buttons, and assign the tap callback
                */
               NavigationBar.prototype.setupRightButtons = function(title1, image1, title2, image2, onselect1, onselect2, options)
               {
               this.rightButtonsCallback[0] = onselect1;
               this.rightButtonsCallback[1] = onselect2;
               cordova.exec(null, null, "NavigationBar", "setupRightButtons", [title1 || "", image1 || "", title2 || "",image2 || "", options || {}]);
               };
               
               
               NavigationBar.prototype.hideRightButton = function(options)
               {
               options = options || {}
               if(!("animated" in options))
               options.animated = false
               
               cordova.exec(null, null, "NavigationBar", "hideRightButton", [options])
               };
               
               NavigationBar.prototype.setRightButtonEnabled = function(enabled)
               {
               cordova.exec(null, null, "NavigationBar", "setRightButtonEnabled", [enabled])
               };
               
               NavigationBar.prototype.setRightButtonTint = function(tintColorRgba)
               {
               cordova.exec(null, null, "NavigationBar", "setRightButtonTint", [tintColorRgba])
               };
               
               NavigationBar.prototype.setRightButtonTitle = function(title)
               {
               cordova.exec(null, null, "NavigationBar", "setRightButtonTitle", [title])
               };
               
               NavigationBar.prototype.showRightButton = function(options)
               {
               options = options || {}
               if(!("animated" in options))
               options.animated = false
               
               cordova.exec(null, null, "NavigationBar", "showRightButton", [options])
               };
               
               /**
                * Internal function called by the plugin
                */
               NavigationBar.prototype.rightButtonTapped = function()
               {
               if(typeof(this.rightButtonCallback) === "function")
               this.rightButtonCallback()
               };
               
               NavigationBar.prototype.rightButton1Tapped = function()
               {
               if(typeof(this.rightButtonsCallback[0]) === "function")
               this.rightButtonsCallback[0]()
               };
               
               NavigationBar.prototype.rightButton2Tapped = function()
               {
               if(typeof(this.rightButtonsCallback[1]) === "function")
               this.rightButtonsCallback[1]()
               };
               
               NavigationBar.prototype.setTitle = function(title)
               {
               cordova.exec(null, null, "NavigationBar", "setTitle", [title]);
               };
               
               NavigationBar.prototype.setLogo = function(imageURL)
               {
               cordova.exec(null, null, "NavigationBar", "setLogo", [imageURL]);
               };
               
               /**
                * Shows the navigation bar. Make sure you called create() first.
                */
               NavigationBar.prototype.show = function() {
               cordova.exec(null, null, "NavigationBar", "show", []);
               };
               
               /**
                * Hides the navigation bar. Make sure you called create() first.
                */
               NavigationBar.prototype.hide = function() {
               cordova.exec(null, null, "NavigationBar", "hide", []);
               };
               //});
               cordova.addConstructor(function() {
                                      if(!window.plugins)
                                      window.plugins = {};
                                      window.plugins.navBar = new NavigationBar();
                                      });
               });