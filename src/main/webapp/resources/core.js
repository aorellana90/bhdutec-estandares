/*
 * jQuery Browser Plugin 0.1.0
 * https://github.com/gabceb/jquery-browser-plugin
 *
 * Original jquery-browser code Copyright 2005, 2015 jQuery Foundation, Inc. and other contributors
 * http://jquery.org/license
 *
 * Modifications Copyright 2015 Gabriel Cebrian
 * https://github.com/gabceb
 *
 * Released under the MIT license
 *
 * Date: 05-07-2015
 */
/*global window: false */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], function ($) {
      return factory($);
    });
  } else if (typeof module === 'object' && typeof module.exports === 'object') {
    // Node-like environment
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(window.jQuery);
  }
}(function(jQuery) {
  "use strict";

  function uaMatch( ua ) {
    // If an UA is not provided, default to the current browser UA.
    if ( ua === undefined ) {
      ua = window.navigator.userAgent;
    }
    ua = ua.toLowerCase();

    var match = /(edge)\/([\w.]+)/.exec( ua ) ||
        /(opr)[\/]([\w.]+)/.exec( ua ) ||
        /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
        /(iemobile)[\/]([\w.]+)/.exec( ua ) ||
        /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
        /(msie) ([\w.]+)/.exec( ua ) ||
        ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec( ua ) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
        [];

    var platform_match = /(ipad)/.exec( ua ) ||
        /(ipod)/.exec( ua ) ||
        /(windows phone)/.exec( ua ) ||
        /(iphone)/.exec( ua ) ||
        /(kindle)/.exec( ua ) ||
        /(silk)/.exec( ua ) ||
        /(android)/.exec( ua ) ||
        /(win)/.exec( ua ) ||
        /(mac)/.exec( ua ) ||
        /(linux)/.exec( ua ) ||
        /(cros)/.exec( ua ) ||
        /(playbook)/.exec( ua ) ||
        /(bb)/.exec( ua ) ||
        /(blackberry)/.exec( ua ) ||
        [];

    var browser = {},
        matched = {
          browser: match[ 5 ] || match[ 3 ] || match[ 1 ] || "",
          version: match[ 2 ] || match[ 4 ] || "0",
          versionNumber: match[ 4 ] || match[ 2 ] || "0",
          platform: platform_match[ 0 ] || ""
        };

    if ( matched.browser ) {
      browser[ matched.browser ] = true;
      browser.version = matched.version;
      browser.versionNumber = parseInt(matched.versionNumber, 10);
    }

    if ( matched.platform ) {
      browser[ matched.platform ] = true;
    }

    // These are all considered mobile platforms, meaning they run a mobile browser
    if ( browser.android || browser.bb || browser.blackberry || browser.ipad || browser.iphone ||
      browser.ipod || browser.kindle || browser.playbook || browser.silk || browser[ "windows phone" ]) {
      browser.mobile = true;
    }

    // These are all considered desktop platforms, meaning they run a desktop browser
    if ( browser.cros || browser.mac || browser.linux || browser.win ) {
      browser.desktop = true;
    }

    // Chrome, Opera 15+ and Safari are webkit based browsers
    if ( browser.chrome || browser.opr || browser.safari ) {
      browser.webkit = true;
    }

    // IE11 has a new token so we will assign it msie to avoid breaking changes
    if ( browser.rv || browser.iemobile) {
      var ie = "msie";

      matched.browser = ie;
      browser[ie] = true;
    }

    // Edge is officially known as Microsoft Edge, so rewrite the key to match
    if ( browser.edge ) {
      delete browser.edge;
      var msedge = "msedge";

      matched.browser = msedge;
      browser[msedge] = true;
    }

    // Blackberry browsers are marked as Safari on BlackBerry
    if ( browser.safari && browser.blackberry ) {
      var blackberry = "blackberry";

      matched.browser = blackberry;
      browser[blackberry] = true;
    }

    // Playbook browsers are marked as Safari on Playbook
    if ( browser.safari && browser.playbook ) {
      var playbook = "playbook";

      matched.browser = playbook;
      browser[playbook] = true;
    }

    // BB10 is a newer OS version of BlackBerry
    if ( browser.bb ) {
      var bb = "blackberry";

      matched.browser = bb;
      browser[bb] = true;
    }

    // Opera 15+ are identified as opr
    if ( browser.opr ) {
      var opera = "opera";

      matched.browser = opera;
      browser[opera] = true;
    }

    // Stock Android browsers are marked as Safari on Android.
    if ( browser.safari && browser.android ) {
      var android = "android";

      matched.browser = android;
      browser[android] = true;
    }

    // Kindle browsers are marked as Safari on Kindle
    if ( browser.safari && browser.kindle ) {
      var kindle = "kindle";

      matched.browser = kindle;
      browser[kindle] = true;
    }

     // Kindle Silk browsers are marked as Safari on Kindle
    if ( browser.safari && browser.silk ) {
      var silk = "silk";

      matched.browser = silk;
      browser[silk] = true;
    }

    // Assign the name and platform variable
    browser.name = matched.browser;
    browser.platform = matched.platform;
    return browser;
  }

  // Run the matching process, also assign the function to the returned object
  // for manual, jQuery-free use if desired
  window.jQBrowser = uaMatch( window.navigator.userAgent );
  window.jQBrowser.uaMatch = uaMatch;

  // Only assign to jQuery.browser if jQuery is loaded
  if ( jQuery ) {
    jQuery.browser = window.jQBrowser;
  }

  return window.jQBrowser;
}));;/* js-cookie v3.0.0-rc.0 | MIT */
;
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, (function () {
    var current = global.Cookies;
    var exports = global.Cookies = factory();
    exports.noConflict = function () { global.Cookies = current; return exports; };
  }()));
}(this, (function () { 'use strict';

  function assign (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        target[key] = source[key];
      }
    }
    return target
  }

  var defaultConverter = {
    read: function (value) {
      return value.replace(/%3B/g, ';')
    },
    write: function (value) {
      return value.replace(/;/g, '%3B')
    }
  };

  function init (converter, defaultAttributes) {
    function set (key, value, attributes) {
      if (typeof document === 'undefined') {
        return
      }

      attributes = assign({}, defaultAttributes, attributes);

      if (typeof attributes.expires === 'number') {
        attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
      }
      if (attributes.expires) {
        attributes.expires = attributes.expires.toUTCString();
      }

      key = defaultConverter.write(key).replace(/=/g, '%3D');

      value = converter.write(String(value), key);

      var stringifiedAttributes = '';
      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue
        }

        stringifiedAttributes += '; ' + attributeName;

        if (attributes[attributeName] === true) {
          continue
        }

        stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
      }

      return (document.cookie = key + '=' + value + stringifiedAttributes)
    }

    function get (key) {
      if (typeof document === 'undefined' || (arguments.length && !key)) {
        return
      }

      // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all.
      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var jar = {};
      for (var i = 0; i < cookies.length; i++) {
        var parts = cookies[i].split('=');
        var value = parts.slice(1).join('=');
        var foundKey = defaultConverter.read(parts[0]).replace(/%3D/g, '=');
        jar[foundKey] = converter.read(value, foundKey);

        if (key === foundKey) {
          break
        }
      }

      return key ? jar[key] : jar
    }

    return Object.create(
      {
        set: set,
        get: get,
        remove: function (key, attributes) {
          set(
            key,
            '',
            assign({}, attributes, {
              expires: -1
            })
          );
        },
        withAttributes: function (attributes) {
          return init(this.converter, assign({}, this.attributes, attributes))
        },
        withConverter: function (converter) {
          return init(assign({}, this.converter, converter), this.attributes)
        }
      },
      {
        attributes: { value: Object.freeze(defaultAttributes) },
        converter: { value: Object.freeze(converter) }
      }
    )
  }

  var api = init(defaultConverter, { path: '/' });

  return api;

})));;(function(window) {

    if(window.PrimeFaces) {
        window.PrimeFaces.debug("PrimeFaces already loaded, ignoring duplicate execution.");
        return;
    }

    /**
     * This is the main global object for accessing the client-side API of PrimeFaces. Broadly speaking, it consists
     * of the following entries:
     *
     * - {@link PrimeFaces.ajax} The AJAX module with functionality for sending AJAX requests
     * - {@link PrimeFaces.clientwindow} The client window module for multiple window support in PrimeFaces applications.
     * - {@link PrimeFaces.csp} The  CSP module for the HTTP Content-Security-Policy (CSP) policy `script-src` directive.
     * - {@link PrimeFaces.dialog} The dialog module with functionality related to the dialog framework
     * - {@link PrimeFaces.env} The environment module with information about the current browser
     * - {@link PrimeFaces.expressions} The search expressions module with functionality for working with search expression
     * - {@link PrimeFaces.resources} The resources module with functionality for creating resource links
     * - {@link PrimeFaces.utils} The utility module with functionality that does not fit anywhere else
     * - {@link PrimeFaces.widget} The registry with all available widget classes
     * - {@link PrimeFaces.widgets} The registry with all currently instantiated widgets
     * - Several other utility methods defined directly on the `PrimeFaces` object, such as
     * {@link PrimeFaces.monitorDownload}, {@link PrimeFaces.getWidgetById}, or {@link PrimeFaces.escapeHTML}.
     *
     * @namespace {PrimeFaces}
     *
     * @interface {PrimeFaces.DeferredRender} DeferredRender Represents a deferred render added for a deferred widget.
     * Some widgets need to compute their dimensions based on their parent element(s). This requires that such widgets
     * are not rendered until they have become visible. A widget may not be visible, for example, when it is inside a
     * tab that is not shown when the page is rendered. PrimeFaces provides a global mechanism for widgets to render
     * once they are visible. This is done by keeping a list of widgets that need to be rendered, and checking on every
     * change (AJAX request, tab change etc.) whether any of those have become visible. A widgets should extend
     * `PrimeFaces.widget.DeferredWidget` to make use of this functionality.
     * @prop {string} DeferredRender.widget The ID of a deferred widget.
     * @prop {string} DeferredRender.container ID of the container that should be visible before the widget can be rendered.
     * @method DeferredRender.callback Callback that is invoked when the widget _may_ possibly have become visible.
     * Checks whether the widget can be rendered and if so, renders it.
     * @return {boolean} DeferredRender.callback `true` when the widget was rendered, or `false` when the widget still
     * needs to be rendered later.
     */
    var PrimeFaces = {

        /**
         * Creates an ID to a CSS ID selector that matches elements with that ID. For example:
         * ```
         * PrimeFaces.escapeClientId("form:input"); // => "#form\:input"
         * PrimeFaces.escapeClientId("form#input"); // => "#form#input"
         * ```
         *
         * __Please note that this method does not escape all characters that need to be escaped and will not work with arbitrary IDs__
         * @param {string} id ID to convert.
         * @return {string} A CSS ID selector for the given ID.
         */
        escapeClientId : function(id) {
            return "#" + id.replace(/:/g,"\\:");
        },

        /**
         * Registeres a listener that will be called as soon as the given element was loaded completely. Please note the
         * listener may be called synchronously (immediately) or asynchronously, depending on whether the element is
         * already loaded.
         * @param {JQuery} element Element to wait for
         * @param {() => void} listener Listener to call once the element is loaded
         */
        onElementLoad: function(element, listener) {
            if (element.prop('complete')) {
                listener();
            }
            else {
                element.on('load', listener);
            }
        },

        /**
         * Finds a widget in the current page with the given ID.
         * @param {string} id ID of the widget to retrieve.
         * @return {PrimeFaces.widget.BaseWidget | null} The widget with the given ID, of `null` if no such widget was
         * found.
         */
        getWidgetById : function(id) {
            for (var widgetVar in PrimeFaces.widgets) {
                var widget = PrimeFaces.widgets[widgetVar];
                if (widget && widget.id === id) {
                    return widget;
                }
            }

            return null;
        },

        /**
         * Finds all widgets in the current page that are of the given type.
         * @template {new(...args: never[]) => unknown} TWidget Type of the widgets of interest, e.g.
         * `PrimeFaces.widget.DataTable`.
         * @param {TWidget} type The (proto)type of the widgets of interest, e.g. `PrimeFaces.widget.DataTable`.
         * @return  {InstanceType<TWidget>[]} An array of widgets that are of the requested type. If no suitable widgets
         * are found on the current page, an empty array will be returned.
         */
        getWidgetsByType: function(type) {
            return $.map(this.widgets, function(widget, key) {
                return type.prototype.isPrototypeOf(widget) ? widget : null;
            });
        },

        /**
         * Gets the form by id or the closest form if the id is not a form itself.
         * In AJAX we also have a fallback for the first form in DOM, this should not be used here.
         *
         * @param {string} id ID of the component to get the closest form or if its a form itself
         * @return {JQuery} the form or NULL if no form found
         */
        getClosestForm: function(id) {
            var form = $(PrimeFaces.escapeClientId(id));
            if (!form.is('form')) {
                form = form.closest('form');
            }
            if (!form) {
                PrimeFaces.error('Form element could not be found for id: ' + id);
            }
            return form;
        },

        /**
         * Adds hidden input elements to the given form. For each key-value pair, a new hidden input element is created
         * with the given value and the key used as the name.
         * @param {string} parent The ID of a FORM element.
         * @param {Record<string, string>} params An object with key-value pairs.
         * @return {typeof PrimeFaces} This object for chaining.
         */
        addSubmitParam : function(parent, params) {
            var form = PrimeFaces.getClosestForm(parent);

            for(var key in params) {
                form.append("<input type=\"hidden\" name=\"" + PrimeFaces.escapeHTML(key) + "\" value=\"" + PrimeFaces.escapeHTML(params[key]) + "\" class=\"ui-submit-param\"></input>");
            }

            return this;
        },

        /**
         * Submits the given form, and clears all `ui-submit-param`s after that to prevent dom caching issues.
         *
         * If a target is given, it is set on the form temporarily before it is submitted. Afterwards, the original
         * target attribute of the form is restored.
         * @param {string} formId ID of the FORM element.
         * @param {string} [target] The target attribute to use on the form during the submit process.
         */
        submit : function(formId, target) {
            var form = PrimeFaces.getClosestForm(formId);
            var prevTarget;

            if (target) {
                prevTarget = form.attr('target');
                form.attr('target', target);
            }

            form.trigger('submit');
            form.children('input.ui-submit-param').remove();

            if (target) {
                if (prevTarget !== undefined) {
                    form.attr('target', prevTarget);
                } else {
                    form.removeAttr('target');
                }
            }
        },

        /**
         * Aborts all pending AJAX requests. This includes both requests that were already sent but did not receive a
         * response yet, as well as requests that are waiting in the queue and have not been sent yet.
         */
        abortXHRs : function() {
            PrimeFaces.ajax.Queue.abortAll();
        },

        /**
         * Attaches the given behaviors to the element. For each behavior, an event listener is registered on the
         * element. Then, when the event is triggered, the behavior callback is invoked.
         * @param {JQuery} element The element for which to attach the behaviors.
         * @param {Record<string, (this: JQuery, event: JQuery.TriggeredEvent) => void>} behaviors An object with an event name
         * as the key and event handlers for that event as the value. Each event handler is called with the given
         * element as the this context and the event that occurred as the first argument.
         */
        attachBehaviors : function(element, behaviors) {
            $.each(behaviors, function(event, fn) {
                element.on(event, function(e) {
                    fn.call(element, e);
                });
            });
        },

        /**
         * Fetches the value of a cookie by its name
         * @param {string} name Name of a cookie
         * @return {string | undefined} The value of the given cookie, or `undefined` if no such cookie exists
         */
        getCookie : function(name) {
            return Cookies.get(name);
        },

        /**
         * Sets the value of a given cookie.
         * It will set secure=true, if using HTTPS and session-config/cookie-config/secure is set to true in web.xml.
         * It will set sameSite, if secure=true, with the value of the primefaces.COOKIES_SAME_SITE parameter.
         * @param {string} name Name of the cookie to set
         * @param {string} value Value to set
         * @param {Partial<Cookies.CookieAttributes>} [cfg] Configuration for this cookie: when it expires, its
         * paths and domain and whether it is secure cookie.
         */
        setCookie : function(name, value, cfg) {
            if (location.protocol === 'https:' && PrimeFaces.settings.cookiesSecure) {
                cfg.secure = true;

                if (PrimeFaces.settings.cookiesSameSite) {
                    cfg.sameSite = PrimeFaces.settings.cookiesSameSite;
                }
            }
            Cookies.set(name, value, cfg);
        },

        /**
         * Deletes the given cookie.
         * @param {string} name Name of the cookie to delete
         * @param {Partial<Cookies.CookieAttributes>} [cfg] The cookie configuration used to set the cookie.
         */
        deleteCookie: function(name, cfg) {
            Cookies.remove(name, cfg);
        },

        /**
         * Checks whether cookies are enabled in the current browser.
         * @return {boolean} `true` if cookies are enabled and can be used, `false` otherwise.
         */
        cookiesEnabled: function() {
            var cookieEnabled = (navigator.cookieEnabled) ? true : false;

            if(typeof navigator.cookieEnabled === 'undefined' && !cookieEnabled) {
                document.cookie="testcookie";
                cookieEnabled = (document.cookie.indexOf("testcookie") !== -1) ? true : false;
            }

            return (cookieEnabled);
        },

        /**
         * Generates a unique key for using in HTML5 local storage by combining the context, view, id, and key.
         * @param {string} id ID of the component
         * @param {string} key a unique key name such as the component name
         * @param {boolean} global if global then do not include the view id
         * @return {string} the generated key comprising of context + view + id + key
         */
        createStorageKey : function(id, key, global) {
            var sk = PrimeFaces.settings.contextPath.replace(/\//g, '-')
                    + (global ? '' : PrimeFaces.settings.viewId.replace(/\//g, '-'))
                    + id + '-'
                    + key;
            return sk.toLowerCase();
        },

        /**
         * Updates the class of the given INPUT element to indicate whether the element contains data or not. Used for
         * example in floating labels.
         * @param {JQuery} input The text input to modify
         * @param {JQuery} parent The parent element of the input.
         */
        updateFilledState: function(input, parent) {
            var value = input.val();

            if (typeof(value) == 'undefined') {
                return;
            }

            if (value.length) {
                input.addClass('ui-state-filled');

                if(parent.is("span:not('.ui-float-label')")) {
                    parent.addClass('ui-inputwrapper-filled');
                }
            } else {
                input.removeClass('ui-state-filled');
                parent.removeClass('ui-inputwrapper-filled');
            }
        },

        /**
         * INPUT elements may have different states, such as `hovering` or `focused`. For each state, there is a
         * corresponding style class that is added to the input when it is in that state, such as `ui-state-hover` or
         * `ui-state-focus`. These classes are used by CSS rules for styling. This method sets up an input element so
         * that the classes are added correctly (by adding event listeners).
         * @param {JQuery} input INPUT element to skin
         * @return {typeof PrimeFaces} this for chaining
         */
        skinInput : function(input) {
            var parent = input.parent(),
            updateFilledStateOnBlur = function () {
                if(parent.hasClass('ui-inputwrapper-focus')) {
                    parent.removeClass('ui-inputwrapper-focus');
                }
                PrimeFaces.updateFilledState(input, parent);
            };

            PrimeFaces.updateFilledState(input, parent);

            input.on("mouseenter", function() {
                $(this).addClass('ui-state-hover');
            }).on("mouseleave", function() {
                $(this).removeClass('ui-state-hover');
            }).on("focus", function() {
                $(this).addClass('ui-state-focus');

                if(parent.is("span:not('.ui-float-label')")) {
                    parent.addClass('ui-inputwrapper-focus');
                }
            }).on("blur", function() {
                $(this).removeClass('ui-state-focus');

                if(input.hasClass('hasDatepicker')) {
                    setTimeout(function() {
                        updateFilledStateOnBlur();
                    }, 150);
                }
                else {
                    updateFilledStateOnBlur();
                }
            });

            if(input.is('textarea')) {
                input.attr('aria-multiline', true);
            }

            return this;
        },

        /**
         * BUTTON elements may have different states, such as `hovering` or `focused`. For each state, there is a
         * corresponding style class that is added to the button when it is in that state, such as `ui-state-hover` or
         * `ui-state-focus`. These classes are used by CSS rules for styling. This method sets up a button element so
         * that the classes are added correctly (by adding event listeners).
         * @param {JQuery} button BUTTON element to skin
         * @return {typeof PrimeFaces} this for chaining
         */
        skinButton : function(button) {
            button.on("mouseover", function(){
                var el = $(this);
                if(!button.prop('disabled')) {
                    el.addClass('ui-state-hover');
                }
            }).on("mouseout", function() {
                $(this).removeClass('ui-state-active ui-state-hover');
            }).on("mousedown", function() {
                var el = $(this);
                if(!button.prop('disabled')) {
                    el.addClass('ui-state-active').removeClass('ui-state-hover');
                }
            }).on("mouseup", function() {
                $(this).removeClass('ui-state-active').addClass('ui-state-hover');
            }).on("focus", function() {
                $(this).addClass('ui-state-focus');
            }).on("blur", function() {
                $(this).removeClass('ui-state-focus ui-state-active');
            }).on("keydown", function(e) {
                if(e.which === $.ui.keyCode.SPACE || e.which === $.ui.keyCode.ENTER) {
                    $(this).addClass('ui-state-active');
                }
            }).on("keyup", function() {
                $(this).removeClass('ui-state-active');
            });

            return this;
        },

        /**
         * SELECT elements may have different states, such as `hovering` or `focused`. For each state, there is a
         * corresponding style class that is added to the select when it is in that state, such as `ui-state-hover` or
         * `ui-state-focus`. These classes are used by CSS rules for styling. This method sets up a select element so
         * that the classes are added correctly (by adding event listeners).
         * @param {JQuery} select SELECT element to skin
         * @return {typeof PrimeFaces} this for chaining
         */
        skinSelect : function(select) {
            select.on("mouseover", function() {
                var el = $(this);
                if(!el.hasClass('ui-state-focus'))
                    el.addClass('ui-state-hover');
            }).on("mouseout", function() {
                $(this).removeClass('ui-state-hover');
            }).on("focus", function() {
                $(this).addClass('ui-state-focus').removeClass('ui-state-hover');
            }).on("blur", function() {
                $(this).removeClass('ui-state-focus ui-state-hover');
            });

            return this;
        },

        /**
         * Logs the given message at the `info` level.
         * @param {string} log Message to log
         */
        info: function(log) {
            if(this.logger) {
                this.logger.info(log);
            }
        },

        /**
         * Logs the given message at the `debug` level.
         * @param {string} log Message to log
         */
        debug: function(log) {
            if(this.logger) {
                this.logger.debug(log);
            }
        },

        /**
         * Logs the given message at the `warn` level.
         * @param {string} log Message to log
         */
        warn: function(log) {
            if(this.logger) {
                this.logger.warn(log);
            }

            if (PrimeFaces.isDevelopmentProjectStage() && window.console) {
                console.log(log);
            }
        },

        /**
         * Logs the given message at the `error` level.
         * @param {string} log Message to log
         */
        error: function(log) {
            if(this.logger) {
                this.logger.error(log);
            }

            if (PrimeFaces.isDevelopmentProjectStage() && window.console) {
                console.error(log);
            }
        },

        /**
         * Checks whether the current application is running in a development environment or a production environment.
         * @return {boolean} `true` if this is a development environment, `false` otherwise.
         */
        isDevelopmentProjectStage: function() {
            return PrimeFaces.settings.projectStage === 'Development';
        },

        /**
         * Checks whether the current application is running in a production environment.
         * @return {boolean} `true` if this is a production environment, `false` otherwise.
         */
        isProductionProjectStage: function() {
            return PrimeFaces.settings.projectStage === 'Production';
        },

        /**
         * Handles the error case when a widget was requested that is not available. Currently just logs an error
         * message.
         * @param {string} widgetVar Widget variables of a widget
         */
        widgetNotAvailable: function(widgetVar) {
           PrimeFaces.error("Widget for var '" + widgetVar + "' not available!");
        },

        /**
         * Takes an input or textarea element and sets the caret (text cursor) position to the end of the the text.
         * @param {JQuery} element An input or textarea element.
         */
        setCaretToEnd: function(element) {
            if(element) {
                element.trigger('focus');
                var length = element.value.length;

                if(length > 0) {
                    if(element.setSelectionRange) {
                        element.setSelectionRange(0, length);
                    }
                    else if (element.createTextRange) {
                      var range = element.createTextRange();
                      range.collapse(true);
                      range.moveEnd('character', 1);
                      range.moveStart('character', 1);
                      range.select();
                    }
                }
            }
        },

        /**
         * Gets the currently loaded PrimeFaces theme CSS link.
         * @return {string} The full URL to the theme CSS
         */
        getThemeLink : function() {
            var themeLink = $('link[href*="' + PrimeFaces.RESOURCE_IDENTIFIER + '/theme.css"]');
            // portlet
            if (themeLink.length === 0) {
                themeLink = $('link[href*="' + PrimeFaces.RESOURCE_IDENTIFIER + '=theme.css"]');
            }
            return themeLink;
        },

        /**
         * Gets the currently loaded PrimeFaces theme.
         * @return {string} The current theme, such as `omega` or `luna-amber`. Empty string when no theme is loaded.
         */
        getTheme : function() {
            return PrimeFaces.env.getTheme();
        },

        /**
         * Changes the current theme to the given theme (by exchanging CSS files). Requires that the theme was
         * installed and is available.
         * @param {string} newTheme The new theme, eg. `luna-amber`, `nova-dark`, or `omega`.
         */
        changeTheme: function(newTheme) {
            if(newTheme && newTheme !== '') {
                var themeLink = PrimeFaces.getThemeLink();

                var themeURL = themeLink.attr('href'),
                    plainURL = themeURL.split('&')[0],
                    oldTheme = plainURL.split('ln=')[1],
                    newThemeURL = themeURL.replace(oldTheme, 'primefaces-' + newTheme);

                themeLink.attr('href', newThemeURL);
            }
        },

        /**
         * Creates a regexp that matches the given text literal, and HTML-escapes that result.
         * @param {string} text The literal text to escape.
         * @return {string} A regexp that matches the given text, escaped to be used as a text-literal within an HTML
         * document.
         */
        escapeRegExp: function(text) {
            return this.escapeHTML(text.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"));
        },

        /**
         * Escapes the given value to be used as the content of an HTML element or attribute.
         * @param {string} value A string to be escaped
         * @return {string} The given value, escaped to be used as a text-literal within an HTML document.
         */
        escapeHTML: function(value) {
            return String(value).replace(/[&<>"'`=\/]/g, function (s) {
                return PrimeFaces.entityMap[s];
            });
        },

        /**
         * Clears the text selected by the user on the current page.
         */
        clearSelection: function() {
            if(window.getSelection) {
                if(window.getSelection().empty) {
                    window.getSelection().empty();
                } else if(window.getSelection().removeAllRanges && window.getSelection().rangeCount > 0 && window.getSelection().getRangeAt(0).getClientRects().length > 0) {
                    window.getSelection().removeAllRanges();
                }
            }
            else if(document.selection && document.selection.empty) {
                try {
                    document.selection.empty();
                } catch(error) {
                    //ignore IE bug
                }
            }
        },

        /**
         * Finds the text currently selected by the user on the current page.
         * @return {string | Selection} The text currently selected by the user on the current page.
         */
        getSelection: function() {
            var text = '';
            if (window.getSelection) {
                text = window.getSelection();
            } else if (document.getSelection) {
                text = document.getSelection();
            } else if (document.selection) {
                text = document.selection.createRange().text;
            }

            return text;
        },

        /**
         * Checks whether any text on the current page is selected by the user.
         * @return {boolean} `true` if text is selected, `false` otherwise.
         */
        hasSelection: function() {
            return this.getSelection().length > 0;
        },

        /**
         * A shortcut for {@link createWidget}.
         * @param {string} widgetName Name of the widget class, as registered in {@link PrimeFaces.widget}.
         * @param {string} widgetVar Widget variable of the widget
         * @param {PrimeFaces.widget.BaseWidgetCfg} cfg Configuration for the widget
         */
        cw : function(widgetName, widgetVar, cfg) {
            this.createWidget(widgetName, widgetVar, cfg);
        },

        /**
         * Deprecated, use {@link PrimeFaces.resources.getFacesResource} instead.
         * @deprecated
         * @param {string} name Name of the resource
         * @param {string} library Library of the resource
         * @param {string} version Version of the resource
         * @return {string} The URL for accessing the given resource.
         */
        getFacesResource : function(name, library, version) {
           return PrimeFaces.resources.getFacesResource(name, library, version);
        },

        /**
         * Creates a new widget of the given type and with the given configuration. Registers that widget in the widgets
         * registry {@link PrimeFaces.widgets}. If this method is called in response to an AJAX request and the method
         * exists already, it is refreshed.
         * @param {string} widgetName Name of the widget class, as registered in `PrimeFaces.widget`
         * @param {string} widgetVar Widget variable of the widget
         * @param {PrimeFaces.widget.BaseWidgetCfg} cfg Configuration for the widget
         */
        createWidget : function(widgetName, widgetVar, cfg) {
            cfg.widgetVar = widgetVar;

            if(this.widget[widgetName]) {
                var widget = this.widgets[widgetVar];

                //ajax update
                if(widget && (widget.constructor === this.widget[widgetName])) {
                    widget.refresh(cfg);
                    if (cfg.postRefresh) {
                        cfg.postRefresh.call(widget, widget);
                    }
                }
                //page init
                else {
		    var newWidget = new this.widget[widgetName](cfg);
                    this.widgets[widgetVar] = newWidget;
                    if(this.settings.legacyWidgetNamespace) {
                        window[widgetVar] = newWidget;
                    }
                    if (cfg.postConstruct) {
                       cfg.postConstruct.call(newWidget, newWidget);
                    }
                }
            }
            // widget script not loaded
            else {
                // should be loaded by our dynamic resource handling, log a error
                PrimeFaces.error("Widget class '" + widgetName + "' not found!");
            }
        },

        /**
         * Checks whether an items is contained in the given array. The items is compared against the array entries
         * via the `===` operator.
         * @template [T=unknown] Type of the array items
         * @param {T[]} arr An array with items
         * @param {T} item An item to check
         * @return {boolean} `true` if the given item is in the given array, `false` otherwise.
         */
        inArray: function(arr, item) {
            for(var i = 0; i < arr.length; i++) {
                if(arr[i] === item) {
                    return true;
                }
            }

            return false;
        },

        /**
         * Checks whether a value is of type `number` and is neither `Infinity` nor `NaN`.
         * @param {unknown} value A value to check
         * @return {boolean} `true` if the given value is a finite number (neither `NaN` nor +/- `Infinity`),
         * `false` otherwise.
         */
        isNumber: function(value) {
            return typeof value === 'number' && isFinite(value);
        },

        /**
         * Attempts to put focus an element:
         *
         * - When `id` is given, puts focus on the element with that `id`
         * - Otherwise, when `context` is given, puts focus on the first focusable element within that context
         * (container)
         * - Otherwise, puts focus on the first focusable element in the page.
         * @param {string} [id] ID of an element to focus.
         * @param {string} [context] The ID of a container with an element to focus
         */
        focus: function(id, context) {
            var selector = ':not(:submit):not(:button):input:visible:enabled[name]';

            setTimeout(function() {
                if(id) {
                    var jq = $(PrimeFaces.escapeClientId(id));

                    if(jq.is(selector)) {
                        jq.trigger('focus');
                    }
                    else {
                        var firstElement = jq.find(selector).eq(0);
                        PrimeFaces.focusElement(firstElement);
                    }
                }
                else if(context) {
                    var firstElement = $(PrimeFaces.escapeClientId(context)).find(selector).eq(0);
                    PrimeFaces.focusElement(firstElement);
                }
                else {
                    var elements = $(selector),
                    firstElement = elements.eq(0);
                    PrimeFaces.focusElement(firstElement);
                }
            }, 50);

            // remember that a custom focus has been rendered
            // this avoids to retain the last focus after ajax update
            PrimeFaces.customFocus = true;
        },

        /**
         * Puts focus on the given element.
         * @param {JQuery} el Element to focus
         */
        focusElement: function(el) {
            if(el.is(':radio')) {
                // github issue: #2582
                if(el.hasClass('ui-helper-hidden-accessible')) {
                    el.parent().trigger('focus');
                }
                else {
                    var checkedRadio = $(':radio[name="' + $.escapeSelector(el.attr('name')) + '"]').filter(':checked');
                    if(checkedRadio.length)
                        checkedRadio.trigger('focus');
                    else
                        el.trigger('focus');
                }
            }
            else {
                el.trigger('focus');
            }
        },

        /**
         * As a `<p:fileDownload>` process is implemented as a norma, non-AJAX request, `<p:ajaxStatus>` will not work.
         * Still, PrimeFaces provides a feature to monitor file downloads via this client-side function. This is done
         * by sending a cookie with the HTTP response of the file download request. On the client-side, polling is used
         * to check when the cookie is set.
         *
         * The example below displays a modal dialog when a download begins and hides it when the download is complete:
         *
         * Client-side callbacks:
         *
         * ```javascript
         * function showStatus() {
         *   PF('statusDialog').show();
         * }
         * function hideStatus() {
         *   PF('statusDialog').hide();
         * }
         * ```
         *
         * Server-side XHTML view:
         *
         * ```xml
         * <p:commandButton value="Download" ajax="false" onclick="PrimeFaces.monitorDownload(showStatus, hideStatus)">
         *   <p:fileDownload value="#{fileDownloadController.file}"/>
         * </p:commandButton>
         * ```
         * @param {() => void} start Callback that is invoked when the download starts.
         * @param {() => void} complete Callback that is invoked when the download ends.
         * @param {string} [monitorKey] Name of the cookie for monitoring the download. The cookie name defaults to
         * `primefaces.download` + the current viewId. When a monitor key is given, the name of the cookie will consist of a prefix and the
         * given monitor key.
         */
        monitorDownload: function(start, complete, monitorKey) {
            if(this.cookiesEnabled()) {
                if(start) {
                    start();
                }

                var cookieName = 'primefaces.download' + PrimeFaces.settings.viewId.replace(/\//g, '_');
                if (monitorKey && monitorKey !== '') {
                    cookieName += '_' + monitorKey;
                }

                var cookiePath = PrimeFaces.settings.contextPath;
                if (!cookiePath || cookiePath === '') {
                    cookiePath = '/';
                }

                window.downloadMonitor = setInterval(function() {
                    var downloadComplete = PrimeFaces.getCookie(cookieName);

                    if(downloadComplete === 'true') {
                        if(complete) {
                            complete();
                        }
                        clearInterval(window.downloadMonitor);
                        PrimeFaces.setCookie(cookieName, null, { path: cookiePath });
                    }
                }, 1000);
            }
        },

        /**
         *  Scrolls to a component with given client id
         * @param {string} id The ID of an element to scroll to.
         */
        scrollTo: function(id) {
            var offset = $(PrimeFaces.escapeClientId(id)).offset();
            var scrollBehavior = 'scroll-behavior';
            var target = $('html,body');
            var sbValue = target.css(scrollBehavior);
            target.css(scrollBehavior, 'auto');
            target.animate(
                    { scrollTop: offset.top, scrollLeft: offset.left },
                    1000,
                    'easeInCirc',
                    function(){ target.css(scrollBehavior, sbValue) }
            );
        },

        /**
         * Aligns container scrollbar to keep item in container viewport, algorithm copied from JQueryUI menu widget.
         * @param {JQuery} container The container with a scrollbar that contains the item.
         * @param {JQuery} item The item to scroll into view.
         */
        scrollInView: function(container, item) {
            if(item === null || item.length === 0) {
                return;
            }

            var borderTop = parseFloat(container.css('borderTopWidth')) || 0,
            paddingTop = parseFloat(container.css('paddingTop')) || 0,
            offset = item.offset().top - container.offset().top - borderTop - paddingTop,
            scroll = container.scrollTop(),
            elementHeight = container.height(),
            itemHeight = item.outerHeight(true);

            if(offset < 0) {
                container.scrollTop(scroll + offset);
            }
            else if((offset + itemHeight) > elementHeight) {
                container.scrollTop(scroll + offset - elementHeight + itemHeight);
            }
        },

        /**
         * Finds the width of the scrollbar that is used by the current browser, as scrollbar widths are different for
         * across different browsers.
         * @return {number} The width of the scrollbars of the current browser.
         */
        calculateScrollbarWidth: function() {
            if(!this.scrollbarWidth) {
                var $div = $('<div></div>')
                    .css({ width: '100px', height: '100px', overflow: 'auto', position: 'absolute', top: '-1000px', left: '-1000px' })
                    .prependTo('body').append('<div></div>').find('div')
                        .css({ width: '100%', height: '200px' });
                this.scrollbarWidth = 100 - $div.width();
                $div.parent().remove();
            }

            return this.scrollbarWidth;
        },

        /**
         * A function that is used as the handler function for HTML event tags (`onclick`, `onkeyup` etc.). When a
         * component has got an `onclick` etc attribute, the JavaScript for that attribute is called by this method.
         * @param {HTMLElement} element Element on which the event occurred.
         * @param {Event} event Event that occurred.
         * @param {((this: HTMLElement, event: Event) => boolean | undefined)[]} functions A list of callback
         * functions. If any returns `false`, the default action of the event is prevented.
         */
        bcn: function(element, event, functions) {
            if(functions) {
                for(var i = 0; i < functions.length; i++) {
                    var retVal = functions[i].call(element, event);
                    if(retVal === false) {
                        if(event.preventDefault) {
                            event.preventDefault();
                        }
                        else {
                            event.returnValue = false;
                        }

                        break;
                    }
                }
            }
        },

        /**
         * A function that is used as the handler function for AJAX behaviors. When a component has got an AJAX
         * behavior, the JavaScript that implements behavior's client-side logic is called by this method.
         * @param {Partial<PrimeFaces.ajax.ConfigurationExtender>} ext Additional options to override the current
         * options.
         * @param {Event} event Event that occurred.
         * @param {((this: typeof PrimeFaces, ext: Partial<PrimeFaces.ajax.ConfigurationExtender>, event: Event) => boolean | undefined)[]} fns
         * A list of callback functions. If any returns `false`, the other callbacks are not invoked.
         */
        bcnu: function(ext, event, fns) {
            if(fns) {
                for(var i = 0; i < fns.length; i++) {
                    var retVal = fns[i].call(this, ext, event);
                    if(retVal === false) {
                        break;
                    }
                }
            }
        },

    	/**
    	 * Deprecated, use `PrimeFaces.dialog.DialogHandler.openDialog` instead.
         * @deprecated
         * @param {PrimeFaces.dialog.DialogHandlerCfg} cfg Configuration of the dialog.
    	 */
        openDialog: function(cfg) {
        	PrimeFaces.dialog.DialogHandler.openDialog(cfg);
        },

        /**
    	 * Deprecated, use `PrimeFaces.dialog.DialogHandler.closeDialog` instead.
         * @deprecated
         * @param {PrimeFaces.dialog.DialogHandlerCfg} cfg Configuration of the dialog.
         */
        closeDialog: function(cfg) {
        	PrimeFaces.dialog.DialogHandler.closeDialog(cfg);
        },

        /**
    	 * Deprecated, use {@link PrimeFaces.dialog.DialogHandler.showMessageInDialog} instead.
         * @deprecated
         * @param {PrimeFaces.widget.ConfirmDialog.ConfirmDialogMessage} msg Message to show in a dialog.
         */
        showMessageInDialog: function(msg) {
        	PrimeFaces.dialog.DialogHandler.showMessageInDialog(msg);
        },

        /**
         * Displays dialog or popup according to the type of confirm component.
         * @deprecated Deprecated, use {@link PrimeFaces.dialog.DialogHandler.confirm} instead.
         * @param {PrimeFaces.dialog.ExtendedConfirmDialogMessage} msg Message to show with the confirm dialog or popup.
         */
        confirm: function(msg) {
            if (msg.type === 'popup' && PrimeFaces.confirmPopup) {
                PrimeFaces.confirmPopup.showMessage(msg);
            }
            else {
                PrimeFaces.dialog.DialogHandler.confirm(msg);
            }
        },

        /**
         * Some widgets need to compute their dimensions based on their parent element(s). This requires that such
         * widgets are not rendered until they have become visible. A widget may not be visible, for example, when it
         * is inside a tab that is not shown when the page is rendered. PrimeFaces provides a global mechanism for
         * widgets to render once they are visible. This is done by keeping a list of widgets that need to be rendered,
         * and checking on every change (AJAX request, tab change etc.) whether any of those have become visible. A
         * widgets should extend `PrimeFaces.widget.DeferredWidget` to make use of this functionality.
         *
         * This is the list of renders for widgets that are currently waiting to become visible.
         *
         * @type {PrimeFaces.DeferredRender[]}
         */
        deferredRenders: [],

        /**
         * Some widgets need to compute their dimensions based on their parent element(s). This requires that such
         * widgets are not rendered until they have become visible. A widget may not be visible, for example, when it
         * is inside a tab that is not shown when the page is rendered. PrimeFaces provides a global mechanism for
         * widgets to render once they are visible. This is done by keeping a list of widgets that need to be rendered,
         * and checking on every change (AJAX request, tab change etc.) whether any of those have become visible. A
         * widgets should extend `PrimeFaces.widget.DeferredWidget` to make use of this functionality.
         *
         * Adds a deferred render to the global list.
         *
         * @param {string} widgetId The ID of a deferred widget.
         * @param {string} containerId ID of the container that should be visible before the widget can be rendered.
         * @param {() => boolean} fn Callback that is invoked when the widget _may_ possibly have become visible. Should
         * return `true` when the widget was rendered, or `false` when the widget still needs to be rendered later.
         */
        addDeferredRender: function(widgetId, containerId, fn) {
            this.deferredRenders.push({widget: widgetId, container: containerId, callback: fn});
        },

        /**
         * Some widgets need to compute their dimensions based on their parent element(s). This requires that such
         * widgets are not rendered until they have become visible. A widget may not be visible, for example, when it
         * is inside a tab that is not shown when the page is rendered. PrimeFaces provides a global mechanism for
         * widgets to render once they are visible. This is done by keeping a list of widgets that need to be rendered,
         * and checking on every change (AJAX request, tab change etc.) whether any of those have become visible. A
         * widgets should extend `PrimeFaces.widget.DeferredWidget` to make use of this functionality.
         *
         * Removes a deferred render from the global list.
         *
         * @param {string} widgetId The ID of a deferred widget.
         */
        removeDeferredRenders: function(widgetId) {
            for(var i = (this.deferredRenders.length - 1); i >= 0; i--) {
                var deferredRender = this.deferredRenders[i];

                if(deferredRender.widget === widgetId) {
                    this.deferredRenders.splice(i, 1);
                }
            }
        },

        /**
         * Some widgets need to compute their dimensions based on their parent element(s). This requires that such
         * widgets are not rendered until they have become visible. A widget may not be visible, for example, when it
         * is inside a tab that is not shown when the page is rendered. PrimeFaces provides a global mechanism for
         * widgets to render once they are visible. This is done by keeping a list of widgets that need to be rendered,
         * and checking on every change (AJAX request, tab change etc.) whether any of those have become visible. A
         * widgets should extend `PrimeFaces.widget.DeferredWidget` to make use of this functionality.
         *
         * Invokes all deferred renders. This is usually called when an action was performed that _may_ have resulted
         * in a container now being visible. This includes actions such as an AJAX request request was made or a tab
         * change.
         *
         * @param {string} containerId ID of the container that _may_ have become visible.
         */
        invokeDeferredRenders: function(containerId) {
            var widgetsToRemove = [];
            for(var i = 0; i < this.deferredRenders.length; i++) {
                var deferredRender = this.deferredRenders[i];

                if(deferredRender.container === containerId) {
                    var rendered = deferredRender.callback.call();
                    if(rendered) {
                        widgetsToRemove.push(deferredRender.widget);
                    }
                }
            }

            for(var j = 0; j < widgetsToRemove.length; j++) {
                this.removeDeferredRenders(widgetsToRemove[j]);
            }
        },
        
         /**
         * Finds the current locale with the i18n keys and the associated translations. Uses the current language key
         * as specified by `PrimeFaces.settings.locale`. When no locale was found for the given locale, falls back to
         * the default English locale.
         * @param {string} [cfgLocale] optional configuration locale from the widget
         * @return {PrimeFaces.Locale} The current locale with the key-value pairs.
         */
        getLocaleSettings: function(cfgLocale) {
            var locale;
            if(cfgLocale) {
                // widget locale must not be cached since it can change per widget
                locale = PrimeFaces.locales[cfgLocale];
            }
            else {
                // global settings so return cached value if already loaded
                if(this.localeSettings) {
                   return this.localeSettings;
                }
                locale = PrimeFaces.locales[PrimeFaces.settings.locale];
            }

            // try and strip specific language from nl_BE to just nl
            if (!locale) {
                var localeKey = cfgLocale ? cfgLocale : PrimeFaces.settings.locale;
                locale = PrimeFaces.locales[localeKey.split('_')[0]];
            }

            // if all else fails default to US English
            if(!locale) {
                locale = PrimeFaces.locales['en_US'];
            }

            // cache default global settings
            if(!cfgLocale) {
                this.localeSettings = locale;
            }

            return locale;
        },

        /**
         * Some ARIA attributes have a value that depends on the current locale. This returns the localized version for
         * the given aria key.
         * @param {string} key An aria key
         * @return {string} The translation for the given aria key
         */
        getAriaLabel: function(key) {
            var ariaLocaleSettings = this.getLocaleSettings()['aria'];
            return (ariaLocaleSettings&&ariaLocaleSettings[key]) ? ariaLocaleSettings[key] : PrimeFaces.locales['en_US']['aria'][key];
        },

        /**
         * For 4.0 jQuery deprecated $.trim in favor of PrimeFaces.trim however that does not handle
         * NULL and jQuery did so this function allows a drop in replacement.
         *
         * @param {string} value the String to trim
         * @return {string} trimmed value or "" if it was NULL
         */
        trim: function(value) {
            if (!value) {
                return "";
            }

            if (typeof value === 'string' || value instanceof String) {
                return value.trim();
            }

            // return original value if it was not a string
            return value;
        },

        /**
         * Generate a RFC-4122 compliant UUID to be used as a unique identifier.
         *
         * See https://www.ietf.org/rfc/rfc4122.txt
         *
         * @return {string} A random UUID.
         */
        uuid: function() {
            var lut = [];
            for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
            var d0 = Math.random()*0xffffffff|0;
            var d1 = Math.random()*0xffffffff|0;
            var d2 = Math.random()*0xffffffff|0;
            var d3 = Math.random()*0xffffffff|0;
            return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
              lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
              lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
              lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
        },

        /**
         * Increment and return the next `z-index` for CSS as a string.
         * Note that jQuery will no longer accept numeric values in {@link JQuery.css | $.fn.css} as of version 4.0.
         *
         *  @return {string} the next `z-index` as a string.
         */
        nextZindex: function() {
            return String(++PrimeFaces.zindex);
        },

       /**
         * Converts a date into an ISO-8601 date without using the browser timezone offset.
         *
         * See https://stackoverflow.com/questions/10830357/javascript-toisostring-ignores-timezone-offset
         *
         * @param {Date} date the date to convert
         * @return {string} ISO-8601 version of the date
         */
        toISOString: function(date) {
            return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
        },

        /**
         * Reset any state variables on update="@all".
         */
        resetState: function() {
            PrimeFaces.ajax.Queue.abortAll();

            PrimeFaces.zindex = 1000;
            PrimeFaces.detachedWidgets = [];
            PrimeFaces.animationActive = false;
            PrimeFaces.customFocus = false;
            PrimeFaces.widgets = {};            
        },

        /**
         * Logs the current PrimeFaces and jQuery version to console.
         */
        version: function() {
            var version = 'PrimeFaces ' + PrimeFaces.VERSION + ' (jQuery ' + jQuery.fn.jquery + ' / UI ' + $.ui.version + ')';
            console.log(version);
        },

        /**
         * A tracker for the current z-index, used for example when creating multiple modal dialogs.
         * @type {number}
         */
        zindex : 1000,

        /**
         * Global flag for enabling or disabling both jQuery and CSS animations.
         * @type {boolean}
         */
        animationEnabled : true,

         /**
         * Flag for detecting whether animation is currently running. Similar to jQuery.active flag and is useful
         * for scripts or automation tests to determine if the animation is currently running.
         * @type {boolean}
         */
        animationActive : false,

        /**
         * Used to store whether a custom focus has been rendered. This avoids having to retain the last focused element
         * after AJAX update.
         * @type {boolean}
         */
        customFocus : false,

        /**
         * A list of widgets that were once instantiated, but are not removed from the DOM, such as due to the result
         * of an AJAX update request.
         * @type {PrimeFaces.widget.BaseWidget[]}
         * @readonly
         */
        detachedWidgets : [],

        /**
         * Name of the POST parameter that indicates whether the request is an AJAX request.
         * @type {string}
         * @readonly
         */
        PARTIAL_REQUEST_PARAM : "javax.faces.partial.ajax",

        /**
         * Name of the POST parameter that contains the list of components to be updated.
         * @type {string}
         * @readonly
         */
        PARTIAL_UPDATE_PARAM : "javax.faces.partial.render",

        /**
         * Name of the POST parameter that contains the list of components to process.
         * @type {string}
         * @readonly
         */
        PARTIAL_PROCESS_PARAM : "javax.faces.partial.execute",

        /**
         * Name of the POST parameter that indicates which element or component triggered the AJAX request.
         * @type {string}
         * @readonly
         */
        PARTIAL_SOURCE_PARAM : "javax.faces.source",

        /**
         * Name of the POST parameter that contains the name of the current behavior event.
         * @type {string}
         * @readonly
         */
        BEHAVIOR_EVENT_PARAM : "javax.faces.behavior.event",

        /**
         * Name of the POST parameter that contains the name of the current partial behavior event.
         * @type {string}
         * @readonly
         */
        PARTIAL_EVENT_PARAM : "javax.faces.partial.event",

        /**
         * Name of the POST parameter that indicates whether forms should have their values reset.
         * @type {string}
         * @readonly
         */
        RESET_VALUES_PARAM : "primefaces.resetvalues",

        /**
         * Name of the POST parameter that indicates whether `<p:autoUpdate>` tags should be ignored.
         * @type {string}
         * @readonly
         */
        IGNORE_AUTO_UPDATE_PARAM : "primefaces.ignoreautoupdate",

        /**
         * Name of the POST parameter that indicates whether children should be skipped.
         * @type {string}
         * @readonly
         */
        SKIP_CHILDREN_PARAM : "primefaces.skipchildren",

        /**
         * Name of the POST parameter that contains the current view state.
         * @type {string}
         * @readonly
         */
        VIEW_STATE : "javax.faces.ViewState",

        /**
         * Name of the POST parameter with the current client window.
         * @type {string}
         * @readonly
         */
        CLIENT_WINDOW : "javax.faces.ClientWindow",

        /**
         * Name of the POST parameter that contains the view root.
         * @type {string}
         * @readonly
         */
        VIEW_ROOT : "javax.faces.ViewRoot",

        /**
         * Name of the POST parameter with the current client ID
         * @type {string}
         * @readonly
         */
        CLIENT_ID_DATA : "primefaces.clientid",

        /**
         * Name of the faces resource servlet, eg. `javax.faces.resource`.
         * @type {string}
         * @readonly
         */
        RESOURCE_IDENTIFIER: 'javax.faces.resource',

        /**
         * The current version of PrimeFaces.
         * @type {string}
         * @readonly
         */
        VERSION: '12.0.0'
    };

    // PrimeFaces Namespaces

    /**
     * An object with some runtime settings, such as the current locale.
     * @namespace
     *
     * @prop {string} locale The current locale, such as `en`,`en_US`, or `ja`.
     * @readonly locale
     *
     * @prop {boolean} validateEmptyFields `true` if empty (input etc.) fields should be validated, or `false` otherwise.
     * @readonly validateEmptyFields
     *
     * @prop {boolean} considerEmptyStringNull `true` if the empty string and `null` should be treated the same way, or
     * `false` otherwise.
     * @readonly considerEmptyStringNull
     */
    PrimeFaces.settings = {};
    PrimeFaces.util = {};
    /**
     * A registry of all instantiated widgets that are available on the current page.
     * @type {Record<string, PrimeFaces.widget.BaseWidget>}
     */
    PrimeFaces.widgets = {};

    /**
     * A map with language specific translations. This is a map between the language keys and another map with the i18n
     * keys mapped to the translation.
     * @type {Record<string, PrimeFaces.Locale>}
     */
    PrimeFaces.locales = {
        'en_US': {
            closeText: 'Close',
            prevText: 'Previous',
            nextText: 'Next',
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dayNamesMin: ['S', 'M', 'T', 'W ', 'T', 'F ', 'S'],
            weekHeader: 'Week',
            weekNumberTitle: 'W',
            firstDay: 0,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix:'',
            timeOnlyTitle: 'Only Time',
            timeText: 'Time',
            hourText: 'Hour',
            minuteText: 'Minute',
            secondText: 'Second',
            millisecondText: 'Millisecond',
            currentText: 'Current Date',
            ampm: false,
            year: 'Year',
            month: 'Month',
            week: 'Week',
            day: 'Day',
            list: 'Agenda',
            allDayText: 'All Day',
            moreLinkText: 'More...',
            noEventsText: 'No Events',
            aria: {
                'paginator.PAGE': 'Page {0}',
                'calendar.BUTTON': 'Show Calendar',
                'datatable.sort.ASC': 'activate to sort column ascending',
                'datatable.sort.DESC': 'activate to sort column descending',
                'datatable.sort.NONE': 'activate to remove sorting on column',
                'columntoggler.CLOSE': 'Close',
                'overlaypanel.CLOSE': 'Close'
            }
        }

    };

    PrimeFaces.locales['en'] = PrimeFaces.locales['en_US'];

    /**
     * A map between some HTML entities and their HTML-escaped equivalent.
     * @type {Record<string, string>}
     */
    PrimeFaces.entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };

    /**
     * Finds and returns a widget
     *
     * Note to typescript users: You should define a method that takes a widget variables and widget constructor, and
     * check whether the widget is of the given type. If so, you can return the widget and cast it to the desired type:
     * ```typescript
     * function getWidget<T extends PrimeFaces.widget.BaseWidget>(widgetVar, widgetClass: new() => T): T | undefined {
     *   const widget = PrimeFaces.widget[widgetVar];
     *   return widget !== undefined && widget instanceof constructor ? widgetClass : undefined;
     * }
     * ```
     * @function
     * @param {string} widgetVar The widget variable of a widget.
     * @return {PrimeFaces.widget.BaseWidget | undefined} The widget instance, or `undefined` if no such widget exists
     * currently.
     */
    PF = function(widgetVar) {
    	var widgetInstance = PrimeFaces.widgets[widgetVar];

    	if (!widgetInstance) {
	        PrimeFaces.widgetNotAvailable(widgetVar);
    	}

        return widgetInstance;
    };

    //expose globally
    window.PrimeFaces = PrimeFaces;

})(window);
;if (!PrimeFaces.env) {

    /**
     * The object with functionality related to the browser environment, such as information about the current browser.
     * @namespace
     */
    PrimeFaces.env = {

        /**
         * `true` if the current browser is a mobile browser, `false` otherwise.
         * @type {boolean}
         */
        mobile : false,
        /**
         * `true` if the current browser supports touch, `false` otherwise.
         * @type {boolean}
         */
        touch : false,
        /**
         * `true` if the current browser is an IOS browser, `false` otherwise.
         * @type {boolean}
         */
        ios: false,
        /**
         * The current browser type.
         * @type {string}
         */
        browser : null,
        /**
         * `true` if the user's current OS setting prefers dark mode, `false` otherwise.
         * @type {boolean}
         */
        preferredColorSchemeDark : false,
        /**
         * `true` if the user's current OS setting prefers light mode, `false` otherwise.
         * @type {boolean}
         */
        preferredColorSchemeLight : false,

        /**
         * Initializes the environment by reading the browser environment.
         */
        init : function() {
            this.browser = $.browser;
            this.mobile = (this.browser.mobile) ? true : false;
            this.touch = 'ontouchstart' in window || window.navigator.msMaxTouchPoints || PrimeFaces.env.mobile;
            this.ios = /iPhone|iPad|iPod/i.test(window.navigator.userAgent) || (/mac/i.test(window.navigator.userAgent) && PrimeFaces.env.touch);
            this.preferredColorSchemeDark = PrimeFaces.env.evaluateMediaQuery('(prefers-color-scheme: dark)');
            this.preferredColorSchemeLight = !this.preferredColorSchemeDark;
        },

        /**
         * Checks whether the current browser is the Internet Explorer, and optionally also whether it is a certain
         * version of Internet Explorer.
         * @param {1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11} [version] Version of IE to check for. If not given,
         * checks for any version of Internet Explorer.
         * @return {boolean} `true` if the current browser is the given version Internet Explorer, or `false` otherwise.
         */
        isIE: function(version) {
            return (version === undefined) ? this.browser.msie: (this.browser.msie && parseInt(this.browser.version, 10) === version);
        },

        /**
         * Checks whether the current browser is the Internet Explorer, and whether its version is less than the given
         * version.
         * @param {1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11} version Version of IE to check for. If not given,
         * checks for any version of Internet Explorer.
         * @return {boolean} `true` if the current browser is the Internet Explorer and its version is less than the
         * given version.
         */
        isLtIE: function(version) {
            return (this.browser.msie) ? parseInt(this.browser.version, 10) < version : false;
        },

       /**
         * Gets the currently loaded PrimeFaces theme.
         * @return {string} The current theme, such as `omega` or `luna-amber`. Empty string when no theme is loaded.
         */
        getTheme : function() {
            var themeLink = PrimeFaces.getThemeLink();
            if (themeLink.length === 0) {
                return "";
            }

            var themeURL = themeLink.attr('href'),
                plainURL = themeURL.split('&')[0],
                oldTheme = plainURL.split('ln=primefaces-')[1];

            return oldTheme;
        },

        /**
         * A widget is touch enabled if the browser supports touch AND the widget has the touchable property enabled.
         * The default will be true if it widget status can't be determined.
         * 
         * @param {PrimeFaces.widget.BaseWidgetCfg} cfg the widget configuration
         * @return {boolean} true if touch is enabled, false if disabled
         */
        isTouchable: function(cfg) {
            var widgetTouchable = (cfg == undefined) || (cfg.touchable != undefined ? cfg.touchable : true);
            return PrimeFaces.env.touch && widgetTouchable;
        },

        /**
         * Gets the user's preferred color scheme set in their operating system.
         * 
         * @return {string} either 'dark' or 'light'
         */
        getOSPreferredColorScheme: function() {
            return PrimeFaces.env.preferredColorSchemeLight ? 'light' : 'dark';
        },

       /**
         * Based on the current PrimeFaces theme determine if light or dark contrast is being applied.
         * 
         * @return {string} either 'dark' or 'light'
         */
        getThemeContrast: function() {
            var theme = PrimeFaces.env.getTheme();
            var darkRegex = /(^(arya|vela|.+-(dim|dark))$)/gm;
            return darkRegex.test(theme) ? 'dark' : 'light';
        },
        
        /**
         * Evaluate a media query and return true/false if its a match.
         *
         * @param {string} mediaquery the media query to evaluate
         * @return {boolean} true if it matches the query false if not
         */
        evaluateMediaQuery: function(mediaquery) {
            return window.matchMedia && window.matchMedia(mediaquery).matches;
        },

        /**
         * Media query to determine if screen size is below pixel count.
         * @param {number} pixels the number of pixels to check
         * @return {boolean} true if screen is less than number of pixels
         */
        isScreenSizeLessThan: function(pixels) {
            return PrimeFaces.env.evaluateMediaQuery('(max-width: ' + pixels + 'px)');
        },

        /**
         * Media query to determine if screen size is above pixel count.
         * @param {number} pixels the number of pixels to check
         * @return {boolean} true if screen is greater than number of pixels
         */
        isScreenSizeGreaterThan: function(pixels) {
            return PrimeFaces.env.evaluateMediaQuery('(min-width: ' + pixels + 'px)');
        }
    };

    PrimeFaces.env.init();

};
;if (!PrimeFaces.ajax) {

    /**
     * A shortcut for `PrimeFaces.ajax.Request.handle(cfg, ext)`, with shorter option names. Sends an AJAX request to
     * the server and processes the response. You can use this method if you need more fine-grained control over which
     * components you want to update or process, or if you need to change some other AJAX options.
     * @function
     * @param {Partial<PrimeFaces.ajax.ShorthandConfiguration>} cfg Configuration for the AJAX request, with shorthand
     * options. The individual options are documented in `PrimeFaces.ajax.Configuration`.
     * @param {Partial<PrimeFaces.ajax.ConfigurationExtender>} [ext] Optional extender with additional options that
     * overwrite the options given in `cfg`.
     * @return {Promise<PrimeFaces.ajax.ResponseData>} A promise that resolves once the AJAX requests is done. Use this
     * to run custom JavaScript logic. When the AJAX request succeeds, the promise is fulfilled. Otherwise, when the
     * AJAX request fails, the promise is rejected. If the promise is rejected, the rejection handler receives an object
     * of type {@link PrimeFaces.ajax.FailedRequestData}.
     */
    PrimeFaces.ab = function(cfg, ext) {
        for (var option in cfg) {
            if (!cfg.hasOwnProperty(option)) {
                continue;
            }

            // just pass though if no mapping is available
            if (PrimeFaces.ajax.CFG_SHORTCUTS[option]) {
                cfg[PrimeFaces.ajax.CFG_SHORTCUTS[option]] = cfg[option];
                delete cfg[option];
            }
        }

        return PrimeFaces.ajax.Request.handle(cfg, ext);
    };

    /**
     * The object with functionality related to sending and receiving AJAX requests that are made by PrimeFaces. Each
     * request receives an XML response, which consists of one or multiple actions that are to be performed. This
     * includes creating new DOM elements, deleting or updating existing elements, or executing some JavaScript.
     *
     * @namespace
     */
    PrimeFaces.ajax = {

        /**
         * Name for the ID of the HEAD element, used in AJAX requests.
         * @type {string}
         * @readonly
         */
        VIEW_HEAD : "javax.faces.ViewHead",
        /**
         * Name for the ID of the BODY element, used in AJAX requests.
         * @type {string}
         * @readonly
         */
        VIEW_BODY : "javax.faces.ViewBody",
        /**
         * Name for the ID of a resource entry, used in AJAX requests.
         * @type {string}
         * @readonly
         */
        RESOURCE : "javax.faces.Resource",

        /**
         * Parameter shortcut mapping for the method `PrimeFaces.ab`.
         * @type {Record<string, string>}
         */
        CFG_SHORTCUTS : {
            's': 'source',
            'f': 'formId',
            'p': 'process',
            'u': 'update',
            'e': 'event',
            'a': 'async',
            'g': 'global',
            'd': 'delay',
            't': 'timeout',
            'sc': 'skipChildren',
            'iau': 'ignoreAutoUpdate',
            'ps': 'partialSubmit',
            'psf': 'partialSubmitFilter',
            'rv': 'resetValues',
            'fp': 'fragmentProcess',
            'fu': 'fragmentUpdate',
            'pa': 'params',
            'onst': 'onstart',
            'oner': 'onerror',
            'onsu': 'onsuccess',
            'onco': 'oncomplete'
        },

        /**
         * This object contains utility methods for AJAX requests, primarily used internally.
         * @interface {PrimeFaces.ajax.Utils} . The class for the object with the AJAX utility methods, used for
         * handling and working with AJAX requests and updates.
         * @type {PrimeFaces.ajax.Utils}
         * @readonly
         */
        Utils: {
            /**
             * Iterates over all immediate children of the given node and returns the concatenated content (`node value`)
             * of each such child node. For the document itself, the node value is `null`.
             * For text, comment, and CDATA nodes, the `node value` is the (text) content of the node.
             * For attribute nodes, the value of the attribute is used.
             * @param {HTMLElement} node An HTML node for which to retrieve the content.
             * @return {string} The content of all immediate child nodes, concatenated together.
             */
            getContent: function(node) {
                var content = '';

                for(var i = 0; i < node.childNodes.length; i++) {
                    content += node.childNodes[i].nodeValue;
                }

                return content;
            },

            /**
             * Resolves the URL which should be used for the POST request.
             * For portlets, a different URL is used.
             *
             * @param {JQuery} form The closest form of the request source.
             * @return {string} The POST url.
             */
            getPostUrl: function(form) {
                var postURL = form.attr('action');
                var encodedURLInput = form.children("input[name*='javax.faces.encodedURL']");

                if (encodedURLInput.length > 0) {
                    postURL = encodedURLInput.val();
                }

                return postURL;
            },

            /**
             * Gets a selector to resolve all forms which needs to be updated with a new ViewState.
             * This is required in portlets as the DOM contains forms of multiple JSF views / applications.
             *
             * @param {JQuery} form The closest form of the request source.
             * @param {string} parameterPrefix The portlet parameter prefix.
             * @return {string | null} The selector for the forms, or `null` when no forms need to be updated.
             */
            getPorletForms: function(form, parameterPrefix) {
                var encodedURLInput = form.children("input[name*='javax.faces.encodedURL']");

                if (encodedURLInput.length > 0) {
                    return 'form[id*="' + parameterPrefix + '"]';
                }

                return null;
            },

            /**
             * Get source ID from settings.
             *
             * @param {JQuery.AjaxSettings} settings containing source ID.
             * @return {string} The source ID from settings or `null` if settings does not contain a source.
             */
            getSourceId: function(settings) {
                if (settings && settings.source) {
                    return typeof settings.source === 'string' ? settings.source : settings.source.name;
                }
                return null;
            },

            /**
             * Checks whether the component ID from the provided widget equals the source ID from the provided
             * settings.
             *
             * @param {PrimeFaces.widget.BaseWidget} widget of the component to check for being the source.
             * @param {JQuery.AjaxSettings} settings containing source ID.
             * @returns {boolean} `true` if the component ID from the provided widget equals the source ID from the
             * provided settings.
             */
            isXhrSource: function(widget, settings) {
                return widget.id === PrimeFaces.ajax.Utils.getSourceId(settings);
            },

            /**
             * Updates the main hidden input element for each form.
             * @param {string} name Name of the hidden form input element, usually the same as the form.
             * @param {string} value Value to set on the hidden input element.
             * @param {PrimeFaces.ajax.pfXHR} [xhr] Optional XHR request with `pfSettings` or `pfArgs` with further
             * data, such as which forms should be updated.
             */
            updateFormStateInput: function(name, value, xhr) {
                var trimmedValue = PrimeFaces.trim(value);

                var forms = null;
                if (xhr && xhr.pfSettings && xhr.pfSettings.portletForms) {
                    forms = $(xhr.pfSettings.portletForms);
                }
                else {
                    forms = $('form');
                }

                var parameterPrefix = '';
                if (xhr && xhr.pfArgs && xhr.pfArgs.parameterPrefix) {
                    parameterPrefix = xhr.pfArgs.parameterPrefix;
                }

                for (var i = 0; i < forms.length; i++) {
                    var form = forms.eq(i);

                    if (form.attr('method') === 'post') {
                        var input = form.children("input[name='" + $.escapeSelector(parameterPrefix + name) + "']");

                        if (input.length > 0) {
                            input.val(trimmedValue);
                        } else {
                            form.append('<input type="hidden" name="' + parameterPrefix + name + '" value="' + trimmedValue + '" autocomplete="off"></input>');
                        }
                    }
                }
            },

            /**
             * Updates the HTML `head` element of the current document with the content received from an AJAX request.
             * @param {string} content The content of the changeset that was returned by an AJAX request.
             */
            updateHead: function(content) {
                var cache = $.ajaxSetup()['cache'];
                $.ajaxSetup()['cache'] = true;

                var headStartTag = new RegExp("<head[^>]*>", "gi").exec(content)[0];
                var headStartIndex = content.indexOf(headStartTag) + headStartTag.length;
                $('head').html(content.substring(headStartIndex, content.lastIndexOf("</head>")));

                $.ajaxSetup()['cache'] = cache;
            },

            /**
             * Updates the HTML `body` element of the current document with the content received from an AJAX request.
             * @param {string} content The content of the changeset that was returned by an AJAX request.
             */
            updateBody: function(content) {
                var bodyStartTag = new RegExp("<body[^>]*>", "gi").exec(content)[0];
                var bodyStartIndex = content.indexOf(bodyStartTag) + bodyStartTag.length;
                $('body').html(content.substring(bodyStartIndex, content.lastIndexOf("</body>")));
            },

            /**
             * Updates an element with the given ID by applying a change set that was returned by an AJAX request. This
             * involves replacing the HTML content of the element with the new content.
             * @param {string} id ID of the element that is to be updated.
             * @param {string} content The new content of the changeset as returned by an AJAX request.
             * @param {PrimeFaces.ajax.pfXHR} [xhr] Optional XHR request with `pfSettings` or `pfArgs` with further
             * data, such as which forms should be updated.
             */
            updateElement: function(id, content, xhr) {

                if (id.indexOf(PrimeFaces.VIEW_STATE) !== -1) {
                    PrimeFaces.ajax.Utils.updateFormStateInput(PrimeFaces.VIEW_STATE, content, xhr);
                }
                else if (id.indexOf(PrimeFaces.CLIENT_WINDOW) !== -1) {
                    PrimeFaces.ajax.Utils.updateFormStateInput(PrimeFaces.CLIENT_WINDOW, content, xhr);
                }
                // used by @all
                else if (id === PrimeFaces.VIEW_ROOT) {

                    // backup our utils, we reset it soon
                    var ajaxUtils = PrimeFaces.ajax.Utils;

                    // reset PrimeFaces JS state because the view is completely replaced with a new one
                    window.PrimeFaces.resetState();

                    ajaxUtils.updateHead(content);
                    ajaxUtils.updateBody(content);
                }
                else if (id === PrimeFaces.ajax.VIEW_HEAD) {
                    PrimeFaces.ajax.Utils.updateHead(content);
                }
                else if (id === PrimeFaces.ajax.VIEW_BODY) {
                    PrimeFaces.ajax.Utils.updateBody(content);
                }
                else if (id === PrimeFaces.ajax.RESOURCE) {
                    $('head').append(content);
                }
                else if (id === $('head')[0].id) {
                    PrimeFaces.ajax.Utils.updateHead(content);
                }
                else {
                    var target = $(PrimeFaces.escapeClientId(id));
                    if (target.length === 0) {
                        PrimeFaces.warn("DOM element with id '" + id + "' cant be found; skip update...");
                    }
                    else {
                        target.replaceWith(content);
                    }
                }
            }
        },

        /**
         * This object contains functionality related to queuing AJAX requests to ensure that they are (a) sent in the
         * proper order and (b) that each response is processed in the same order as the requests were sent.
         * @interface {PrimeFaces.ajax.Queue} . The interface for the object containing functionality related to queuing
         * AJAX requests. The queue ensures that requests are (a) sent in the order as they were issued, and (b) that
         * each response is processed in the same order as the requests were sent.
         * @type {PrimeFaces.ajax.Queue}
         * @readonly
         */
        Queue: {

            /**
             * A map between the source ID and  the timeout IDs (as returned by `setTimeout`). Used for AJAX requests
             * with a specified delay (such as remote commands that have a delay set).
             * @type {Record<string, number>}
             */
            delays: {},

            /**
             * A list of requests that are waiting to be sent.
             * @type {Partial<PrimeFaces.ajax.Configuration>[]}
             */
            requests: new Array(),

            /**
             * A list of sent AJAX requests, i.e. HTTP requests that were already started. This is used, for example, to
             * abort requests that were sent already when that becomes necessary.
             *
             * @type {PrimeFaces.ajax.pfXHR[]}
             */
            xhrs: new Array(),

            /**
             * Offers an AJAX request to this queue. The request is sent once all other requests in this queue have
             * been sent. If a delay is set on the request configuration, the request is not sent before the specified
             * delay has elapsed.
             * @param {Partial<PrimeFaces.ajax.Configuration>} request The request to send.
             */
            offer: function(request) {
                if(request.delay) {
                    var sourceId = null,
                    $this = this,
                    sourceId = (typeof(request.source) === 'string') ? request.source: $(request.source).attr('id'),
                    createTimeout = function() {
                            return setTimeout(function() {
                                $this.requests.push(request);

                                if($this.requests.length === 1) {
                                    PrimeFaces.ajax.Request.send(request);
                                }
                            }, request.delay);
                    };

                    if(this.delays[sourceId]) {
                        clearTimeout(this.delays[sourceId].timeout);
                        this.delays[sourceId].timeout = createTimeout();
                    }
                    else {
                        this.delays[sourceId] = {
                            timeout: createTimeout()
                        };
                    }
                }
                else {
                    this.requests.push(request);

                    if(this.requests.length === 1) {
                        PrimeFaces.ajax.Request.send(request);
                    }
                }
            },

            /**
             * Removes the topmost request (the requests that was just sent) from this queue; and starts the second
             * topmost request.
             * @return {Partial<PrimeFaces.ajax.Configuration> | null} The topmost request in this queue, or `null` if this queue
             * is empty.
             */
            poll: function() {
                if(this.isEmpty()) {
                    return null;
                }

                var processed = this.requests.shift(),
                next = this.peek();

                if(next) {
                    PrimeFaces.ajax.Request.send(next);
                }

                return processed;
            },

            /**
             * Returns the request that is scheduled to be sent next, but does not modify the queue in any way.
             * @return {Partial<PrimeFaces.ajax.Configuration> | null} The topmost request in this queue that is to be sent next,
             * or `null` when this queue is empty.
             */
            peek: function() {
                if(this.isEmpty()) {
                    return null;
                }

                return this.requests[0];
            },

            /**
             * Checks whether this queue contains any scheduled AJAX requests.
             * @return {boolean} `true` if this queue contains no scheduled requests, `false` otherwise.
             */
            isEmpty: function() {
                return this.requests.length === 0;
            },

            /**
             * Adds a newly sent XHR request to the list of sent requests (`PrimeFaces.ajax.xhrs`).
             * @param {PrimeFaces.ajax.pfXHR} xhr XHR request to add.
             */
            addXHR: function(xhr) {
                this.xhrs.push(xhr);
            },

            /**
             * Removes an XHR request from the list of sent requests (`PrimeFaces.ajax.xhrs`). Usually called once the
             * AJAX request is done, having resulted in either a success or an error.
             * @param {PrimeFaces.ajax.pfXHR} xhr XHR request to remove.
             */
            removeXHR: function(xhr) {
                var index = $.inArray(xhr, this.xhrs);
                if(index > -1) {
                    this.xhrs.splice(index, 1);
                }
            },

            /**
             * Aborts all requests that were already sent, but have not yet received an answer from the server. Also
             * removes all requests that are waiting in the queue and have not been sent yet.
             */
            abortAll: function() {
                // clear out any pending requests
                this.requests = new Array();

                // abort any in-flight that are not DONE(4)
                for(var i = 0; i < this.xhrs.length; i++) {
                    var xhr = this.xhrs[i];
                    if (xhr.readyState !== 4) {
                        xhr.abort();
                    }
                }

                this.xhrs = new Array();
            }
        },

        /**
         * The interface for the object containing low-level functionality related to sending AJAX requests.
         * @interface {PrimeFaces.ajax.Request}. The interface for the object containing functionality related to
         * sending AJAX requests.
         * @type {PrimeFaces.ajax.Request}
         * @readonly
         */
        Request: {

            /**
             * Handles the given AJAX request, either by sending it immediately (if `async` is set to `true`), or by
             * adding it to the AJAX queue otherwise. The AJAX queue ensures that requests are sent and handled in the
             * order they were started. See also {@link jsf.ajax.request}.
             * @param {Partial<PrimeFaces.ajax.Configuration>} cfg Configuration for the AJAX request to send, such as
             * the HTTP method, the URL, and the content of the request.
             * @param {Partial<PrimeFaces.ajax.ConfigurationExtender>} [ext] Optional extender with additional options
             * that overwrite the options given in `cfg`.
             * @return {Promise<PrimeFaces.ajax.ResponseData>} A promise that resolves once the AJAX requests is done.
             * Use this to run custom JavaScript logic. When the AJAX request succeeds, the promise is fulfilled.
             * Otherwise, when the AJAX request fails, the promise is rejected. If the promise is rejected, the
             * rejection handler receives an object of type {@link PrimeFaces.ajax.FailedRequestData}.
             */
            handle: function(cfg, ext) {
                cfg.ext = ext;
                cfg.promise = cfg.promise || $.Deferred();

                if (PrimeFaces.settings.earlyPostParamEvaluation) {
                    cfg.earlyPostParams = PrimeFaces.ajax.Request.collectEarlyPostParams(cfg);
                }

                if(cfg.async) {
                    PrimeFaces.ajax.Request.send(cfg);
                }
                else {
                    PrimeFaces.ajax.Queue.offer(cfg);
                }

                return cfg.promise.promise();
            },

            /**
             * Performs the early collection of post parameters (form element values) if the request is configured that
             * way. See: https://github.com/primefaces/primefaces/issues/109
             *
             * @param {Partial<PrimeFaces.ajax.Configuration>} cfg Configuration for the AJAX request to send, such as
             * the HTTP method, the URL, and the content of the request.
             * @return {PrimeFaces.ajax.RequestParameter[]} The collected form element values to be sent with the request.
             */
            collectEarlyPostParams: function(cfg) {

                var earlyPostParams;

                var sourceElement;
                if (typeof(cfg.source) === 'string') {
                    sourceElement = $(PrimeFaces.escapeClientId(cfg.source));
                }
                else {
                    sourceElement = $(cfg.source);
                }
                if (sourceElement.is(':input') && sourceElement.is(':not(:button)')) {
                    earlyPostParams = [];

                    if (sourceElement.is(':checkbox')) {
                        var checkboxPostParams = $("input[name='" + $.escapeSelector(sourceElement.attr('name')) + "']")
                                .filter(':checked').serializeArray();
                        $.merge(earlyPostParams, checkboxPostParams);
                    }
                    else {
                        earlyPostParams.push({
                            name: sourceElement.attr('name'),
                            value: sourceElement.val()
                        });
                    }
                }
                else {
                    earlyPostParams = sourceElement.serializeArray();
                }

                return earlyPostParams;
            },

            /**
             * Starts the given AJAX request immediately by sending the data to the server. Contrast with
             * {@link handle}, which may queue AJAX requests, depending on how they are configured.
             * @param {Partial<PrimeFaces.ajax.Configuration>} cfg Configuration for the AJAX request to send, such as
             * the HTTP method, the URL, and the content of the request.
             * @return {boolean|undefined} `false` if the AJAX request is to be canceled, `true` or `undefined`
             * otherwise.
             */
            send: function(cfg) {
                PrimeFaces.debug('Initiating ajax request.');

                PrimeFaces.customFocus = false;

                var global = (cfg.global === true || cfg.global === undefined) ? true : false,
                form = null,
                sourceId = null,
                retVal = null;

                if(cfg.onstart) {
                    retVal = cfg.onstart.call(this, cfg);
                }
                if(cfg.ext && cfg.ext.onstart) {
                    retVal = cfg.ext.onstart.call(this, cfg);
                }

                if(retVal === false) {
                    PrimeFaces.debug('AJAX request cancelled by onstart callback.');

                    //remove from queue
                    if(!cfg.async) {
                        PrimeFaces.ajax.Queue.poll();
                    }

                    if (cfg.promise) {
                        cfg.promise.reject({ textStatus: 'error', errorThrown: 'AJAX request cancelled by onstart callback.' });
                    }

                    return false;  //cancel request
                }

                if(global) {
                    $(document).trigger('pfAjaxStart');
                }

                //source can be a client id or an element defined by this keyword
                if(typeof(cfg.source) === 'string') {
                    sourceId = cfg.source;
                } else {
                    sourceId = $(cfg.source).attr('id');
                }

                if(cfg.formId) {
                    //Explicit form is defined
                    form = PrimeFaces.expressions.SearchExpressionFacade.resolveComponentsAsSelector(cfg.formId);
                }
                else {
                    var $source = $(PrimeFaces.escapeClientId(sourceId));
                    //look for a parent of source
                    form = $source.closest('form');

                    //source has no parent form so use first form in document
                    if (form.length === 0) {
                        form = $('form').eq(0);
                    }
                }

                PrimeFaces.debug('Form to post ' + form.attr('id') + '.');

                var formData;
                var scanForFiles;
                var multipart = form.attr('enctype') === 'multipart/form-data';
                if (multipart) {
                    formData = new FormData();
                    scanForFiles = $();
                }

                var postURL = PrimeFaces.ajax.Utils.getPostUrl(form);
                var postParams = [];

                // See #6857 - parameter namespace for Portlets
                var parameterPrefix = PrimeFaces.ajax.Request.extractParameterNamespace(form);

                PrimeFaces.debug('URL to post ' + postURL + '.');

                //partial ajax
                PrimeFaces.ajax.Request.addParam(postParams, PrimeFaces.PARTIAL_REQUEST_PARAM, true, parameterPrefix);

                //source
                PrimeFaces.ajax.Request.addParam(postParams, PrimeFaces.PARTIAL_SOURCE_PARAM, sourceId, parameterPrefix);

                //resetValues
                if (cfg.resetValues) {
                    PrimeFaces.ajax.Request.addParam(postParams, PrimeFaces.RESET_VALUES_PARAM, true, parameterPrefix);
                }

                //ignoreAutoUpdate
                if (cfg.ignoreAutoUpdate) {
                    PrimeFaces.ajax.Request.addParam(postParams, PrimeFaces.IGNORE_AUTO_UPDATE_PARAM, true, parameterPrefix);
                }

                //skip children
                if (cfg.skipChildren === false) {
                    PrimeFaces.ajax.Request.addParam(postParams, PrimeFaces.SKIP_CHILDREN_PARAM, false, parameterPrefix);
                }

                //process
                var processArray = PrimeFaces.ajax.Request.resolveComponentsForAjaxCall(cfg, 'process');
                if(cfg.fragmentProcess) {
                    processArray.push(cfg.fragmentProcess);
                }
                // default == @none
                var processIds = '@none';
                // use defined process + resolved keywords (@widget, PFS)?
                if (processArray.length > 0) {
                    processIds = processArray.join(' ');
                }
                // fallback to @all if no process was defined by the user
                else {
                    var definedProcess = PrimeFaces.ajax.Request.resolveComponentsForAjaxCall(cfg, 'process');
                    if (definedProcess === undefined || definedProcess.length === 0) {
                        processIds = '@all';
                    }
                }
                if (!processIds.includes('@none')) {
                    PrimeFaces.ajax.Request.addParam(postParams, PrimeFaces.PARTIAL_PROCESS_PARAM, processIds, parameterPrefix);
                }

                //update
                var updateArray = PrimeFaces.ajax.Request.resolveComponentsForAjaxCall(cfg, 'update');
                if(cfg.fragmentUpdate) {
                    updateArray.push(cfg.fragmentUpdate);
                }
                if(updateArray.length > 0) {
                    PrimeFaces.ajax.Request.addParam(postParams, PrimeFaces.PARTIAL_UPDATE_PARAM, updateArray.join(' '), parameterPrefix);
                }

                //behavior event
                if(cfg.event) {
                    PrimeFaces.ajax.Request.addParam(postParams, PrimeFaces.BEHAVIOR_EVENT_PARAM, cfg.event, parameterPrefix);

                    var domEvent = cfg.event;

                    if(cfg.event === 'valueChange')
                        domEvent = 'change';
                    else if(cfg.event === 'action')
                        domEvent = 'click';

                    PrimeFaces.ajax.Request.addParam(postParams, PrimeFaces.PARTIAL_EVENT_PARAM, domEvent, parameterPrefix);
                }
                else {
                    PrimeFaces.ajax.Request.addParam(postParams, sourceId, sourceId, parameterPrefix);
                }

                //params
                if(cfg.params) {
                    PrimeFaces.ajax.Request.addParams(postParams, cfg.params, parameterPrefix);
                }
                if(cfg.ext && cfg.ext.params) {
                    PrimeFaces.ajax.Request.addParams(postParams, cfg.ext.params, parameterPrefix);
                }

                // try to get partialSubmit from global config
                if (cfg.partialSubmit === undefined) {
                    cfg.partialSubmit = PrimeFaces.settings.partialSubmit;
                }
                // check for overwrite
                if (cfg.ext && cfg.ext.partialSubmit) {
                    cfg.partialSubmit = cfg.ext.partialSubmit;
                }

                /**
                 * Only add params of process components and their children
                 * if partial submit is enabled and there are components to process partially
                 */
                if(cfg.partialSubmit && processIds.indexOf('@all') === -1) {
                    var formProcessed = false;

                    if (processIds.indexOf('@none') === -1) {
                        var partialSubmitFilter = cfg.partialSubmitFilter||':input';
                        for (var i = 0; i < processArray.length; i++) {
                            var jqProcess = $(PrimeFaces.escapeClientId(processArray[i]));
                            var componentPostParams = null;

                            if(jqProcess.is('form')) {
                                componentPostParams = jqProcess.serializeArray();
                                formProcessed = true;
                                if (multipart) {
                                    scanForFiles = scanForFiles.add(jqProcess);
                                }
                            }
                            else if(jqProcess.is(':input')) {
                                componentPostParams = jqProcess.serializeArray();
                                if (multipart) {
                                    scanForFiles = scanForFiles.add(jqProcess);
                                }
                            }
                            else {
                                var filtered = jqProcess.find(partialSubmitFilter);
                                componentPostParams = filtered.serializeArray();
                                if (multipart) {
                                    scanForFiles = scanForFiles.add(filtered);
                                }
                            }

                            postParams = PrimeFaces.ajax.Request.arrayCompare(componentPostParams, postParams);

                            if (cfg.ext && cfg.ext.partialSubmitParameterFilter) {
                                var filteredParams = cfg.ext.partialSubmitParameterFilter.call(this, componentPostParams);
                                $.merge(postParams, filteredParams);
                            }
                            else {
                                $.merge(postParams, componentPostParams);
                            }
                        }
                    }

                    //add form state if necessary
                    if (!formProcessed) {
                        PrimeFaces.ajax.Request.addParamFromInput(postParams, PrimeFaces.VIEW_STATE, form, parameterPrefix);
                        PrimeFaces.ajax.Request.addParamFromInput(postParams, PrimeFaces.CLIENT_WINDOW, form, parameterPrefix);
                        PrimeFaces.ajax.Request.addParamFromInput(postParams, PrimeFaces.csp.NONCE_INPUT, form, parameterPrefix);
                        PrimeFaces.ajax.Request.addParamFromInput(postParams, 'dsPostWindowId', form, parameterPrefix);
                        PrimeFaces.ajax.Request.addParamFromInput(postParams, 'dspwid', form, parameterPrefix);
                    }

                }
                else {
                    $.merge(postParams, form.serializeArray());
                    if (multipart) {
                        scanForFiles = scanForFiles.add(form);
                    }
                }

                // remove postParam if already available in earlyPostParams
                // we can skip files here, they likely wont change during that time
                if (PrimeFaces.settings.earlyPostParamEvaluation && cfg.earlyPostParams) {
                    postParams = PrimeFaces.ajax.Request.arrayCompare(cfg.earlyPostParams, postParams);

                    $.merge(postParams, cfg.earlyPostParams);
                }

                // scan for files and append to formData
                if (multipart) {
                    var fileInputs = $();
                    scanForFiles.each(function(index, value) {
                        var $value = $(value);
                        if ($value.is(':input[type="file"]')) {
                            fileInputs = fileInputs.add($value);
                        }
                        else {
                            fileInputs = fileInputs.add($value.find('input[type="file"]'));
                        }
                    });

                    fileInputs.each(function(index, value) {
                        for (var i = 0; i < value.files.length; i++) {
                            formData.append(value.id, value.files[i]);
                        }
                    });
                }

                var xhrOptions = {
                    url : postURL,
                    type : "POST",
                    cache : false,
                    dataType : "xml",
                    portletForms: PrimeFaces.ajax.Utils.getPorletForms(form, parameterPrefix),
                    source: cfg.source,
                    global: false,
                    beforeSend: function(xhr, settings) {
                        xhr.setRequestHeader('Faces-Request', 'partial/ajax');
                        xhr.pfSettings = settings;
                        xhr.pfArgs = {}; // default should be an empty object

                        if(global) {
                            $(document).trigger('pfAjaxSend', [xhr, this]);
                        }
                    }
                };

                // #6360 respect form enctype multipart/form-data
                if (multipart) {
                    $.each(postParams, function(index, value) {
                        formData.append(value.name, value.value);
                    });

                    xhrOptions.data = formData;
                    xhrOptions.enctype = 'multipart/form-data';
                    xhrOptions.processData = false;
                    xhrOptions.contentType = false;
                }
                else {
                    var postData = $.param(postParams);

                    PrimeFaces.debug('Post Data:' + postData);

                    xhrOptions.data = postData;
                }

                var nonce = form.children("input[name='" + $.escapeSelector(PrimeFaces.csp.NONCE_INPUT) + "']");
                if (nonce.length > 0) {
                    xhrOptions.nonce = nonce.val();
                }

                if (cfg.timeout) {
                    xhrOptions['timeout'] = cfg.timeout;
                }

                var jqXhr = $.ajax(xhrOptions)
                    .fail(function(xhr, status, errorThrown) {
                        if (cfg.promise) {
                            cfg.promise.reject({jqXHR: xhr, textStatus: status, errorThrown: errorThrown});
                        }

                        var location = xhr.getResponseHeader("Location");
                        if (xhr.status === 401 && location) {
                            PrimeFaces.debug('Unauthorized status received. Redirecting to ' + location);
                            window.location = location;
                            return;
                        }
                        if(cfg.onerror) {
                            cfg.onerror.call(this, xhr, status, errorThrown);
                        }
                        if(cfg.ext && cfg.ext.onerror) {
                            cfg.ext.onerror.call(this, xhr, status, errorThrown);
                        }

                        $(document).trigger('pfAjaxError', [xhr, this, errorThrown]);

                        PrimeFaces.error('Request return with error:' + status + '.');
                    })
                    .done(function(data, status, xhr) {
                        PrimeFaces.debug('Response received successfully.');
                        try {
                            var parsed;

                            // Resolve promise for custom JavaScript handler
                            // Promise handlers are called asynchronously so they are run after the response was handled
                            if (cfg.promise) {
                                cfg.promise.resolve({document: data, textStatus: status, jqXHR: xhr});
                            }

                            //call user callback
                            if(cfg.onsuccess) {
                                parsed = cfg.onsuccess.call(this, data, status, xhr);
                            }

                            //extension callback that might parse response
                            if(cfg.ext && cfg.ext.onsuccess && !parsed) {
                                parsed = cfg.ext.onsuccess.call(this, data, status, xhr);
                            }

                            if(global) {
                                $(document).trigger('pfAjaxSuccess', [xhr, this]);
                            }

                            //do not execute default handler as response already has been parsed
                            if(parsed) {
                                return;
                            }
                            else {
                                PrimeFaces.ajax.Response.handle(data, status, xhr);
                            }
                        }
                        catch(err) {
                            PrimeFaces.error(err);
                        }

                        if(global) {
                            $(document).trigger('pfAjaxUpdated', [xhr, this]);
                        }

                        PrimeFaces.debug('DOM is updated.');
                    })
                    .always(function(data, status, xhr) {
                        // first call the extension callback (e.g. datatable paging)
                        if(cfg.ext && cfg.ext.oncomplete) {
                            cfg.ext.oncomplete.call(this, xhr, status, xhr.pfArgs, data);
                        }

                        // after that, call the end user's callback, which should be called when everything is ready
                        if(cfg.oncomplete) {
                            cfg.oncomplete.call(this, xhr, status, xhr.pfArgs, data);
                        }

                        if(global) {
                            $(document).trigger('pfAjaxComplete', [xhr, this]);
                        }

                        PrimeFaces.debug('Response completed.');

                        PrimeFaces.ajax.Queue.removeXHR(xhr);

                        if(!cfg.async) {
                            PrimeFaces.ajax.Queue.poll();
                        }
                    });

                PrimeFaces.ajax.Queue.addXHR(jqXhr);
            },

            /**
             * Collects all `process` or `update` search expressions from the given AJAX call configuration and returns
             * them as one search expression.
             * @param {Partial<PrimeFaces.ajax.Configuration>} cfg An AJAX call configuration.
             * @param {"process" | "update"} type Whether to resolve the `process` or `update` expressions.
             * @return {string} All process or update search expression from the given configuration.
             */
            resolveExpressionsForAjaxCall: function(cfg, type) {
                var expressions = '';

                if (cfg[type]) {
                    expressions += cfg[type];
                }

                if (cfg.ext && cfg.ext[type]) {
                    expressions += " " + cfg.ext[type];
                }

                return expressions;
            },

            /**
             * Given an AJAX call configuration, resolves the components for the `process` or `update` search
             * expressions given by the configurations. Resolves the search expressions to the actual components and
             * returns a list of their IDs.
             * @param {Partial<PrimeFaces.ajax.Configuration>} cfg An AJAX call configuration.
             * @param {"process" | "update"} type Whether to resolve the `process` or `update` expressions.
             * @return {string[]} A list of IDs with the components to which the process or update expressions refer.
             */
            resolveComponentsForAjaxCall: function(cfg, type) {
                var expressions = PrimeFaces.ajax.Request.resolveExpressionsForAjaxCall(cfg, type);
                return PrimeFaces.expressions.SearchExpressionFacade.resolveComponents(expressions);
            },

            /**
             * Appends a request parameter to the given list of parameters.
             * Optionally add a prefix to the name, this is used for portlet namespacing.
             * @template [TValue=unknown] Type of the parameter value.
             * @param {PrimeFaces.ajax.RequestParameter<string, TValue>[]} params List of parameters to which a new
             * parameter is added.
             * @param {string} name Name of the new parameter to add.
             * @param {TValue} value Value of the parameter to add.
             * @param {string} [parameterPrefix] Optional prefix that is added in front of the name.
             */
            addParam: function(params, name, value, parameterPrefix) {
                // add namespace if not available
                if (parameterPrefix || !name.indexOf(parameterPrefix) === 0) {
                    params.push({ name:parameterPrefix + name, value:value });
                }
                else {
                    params.push({ name:name, value:value });
                }

            },

            /**
             * Appends a request parameter to the given list of parameters.
             * Optionally add a prefix to the name, this is used for portlet namespacing.
             * @param {FormData} formData the form data to add to the form.
             * @param {string} name Name of the new parameter to add.
             * @param {string | Blob} value Value of the parameter to add.
             * @param {string} [parameterPrefix] Optional prefix that is added in front of the name.
             */
            addFormData: function(formData, name, value, parameterPrefix) {
                // add namespace if not available
                if (parameterPrefix || !name.indexOf(parameterPrefix) === 0) {
                    formData.append(parameterPrefix + name, value);
                }
                else {
                    formData.append(name, value);
                }
            },

            /**
             * Adds a list of callback parameters to the given list. Optionally prepends a prefix to the name of each
             * added parameter.
             * @template [TValue=unknown] Type of the parameter values.
             * @param {PrimeFaces.ajax.RequestParameter<string, TValue>[]} params List of callback parameters to which
             * parameters are added.
             * @param {PrimeFaces.ajax.RequestParameter<string, TValue>[]} paramsToAdd List of callback parameters to
             * add.
             * @param {string} [parameterPrefix] Optional prefix that is added in front of the name of the added
             * callback parameters.
             */
            addParams: function(params, paramsToAdd, parameterPrefix) {

                for (var i = 0; i < paramsToAdd.length; i++) {
                    var param = paramsToAdd[i];
                    // add namespace if not available
                    if (parameterPrefix && !param.name.indexOf(parameterPrefix) === 0) {
                        param.name = parameterPrefix + param.name;
                    }

                    params.push(param);
                }
            },

            /**
             * Adds a new request parameter to the given list. The value of the parameter is taken from the input
             * element of the given form. The input element must have the same name as the name of the parameter to add.
             * Optionally add a prefix to the name, which used for portlet namespacing.
             * @param {PrimeFaces.ajax.RequestParameter[]} params List of request parameters to the new
             * parameter is added.
             * @param {string} name Name of the new parameter to add
             * @param {JQuery} form An HTML FORM element that contains an INPUT element with the given name.
             * @param {string} [parameterPrefix] Optional prefix that is added in front of the name.
             */
            addParamFromInput: function(params, name, form, parameterPrefix) {
                var input = null,
                    escapedName = $.escapeSelector(name);
                if (parameterPrefix) {
                    input = form.children("input[name*='" + escapedName + "']");
                }
                else {
                    input = form.children("input[name='" + escapedName + "']");
                }

                if (input && input.length > 0) {
                    var value = input.val();
                    PrimeFaces.ajax.Request.addParam(params, name, value, parameterPrefix);
                }
            },


            /**
             * Adds a new request parameter to the given FormData. The value of the parameter is taken from the input
             * element of the given form. The input element must have the same name as the name of the parameter to add.
             * Optionally add a prefix to the name, which used for portlet namespacing.
             * @param {FormData} formData The FormData.
             * @param {string} name Name of the new parameter to add
             * @param {JQuery} form An HTML FORM element that contains an INPUT element with the given name.
             * @param {string} [parameterPrefix] Optional prefix that is added in front of the name.
             */
            addFormDataFromInput: function(formData, name, form, parameterPrefix) {
                var input = null,
                    escapedName = $.escapeSelector(name);
                if (parameterPrefix) {
                    input = form.children("input[name*='" + escapedName + "']");
                }
                else {
                    input = form.children("input[name='" + escapedName + "']");
                }

                if (input && input.length > 0) {
                    var value = input.val();
                    PrimeFaces.ajax.Request.addFormData(formData, name, value, parameterPrefix);
                }
            },

            /**
             * Finds the namespace (prefix) for the parameters of the given form.
             * This is required for Porlets as a Portlet contains multiple JSF views and we must only process and update the forms/inputs of the current view / application.
             * Later the namespace is used for all post params.
             * @param {JQuery} form An HTML FORM element.
             * @return {string | null} The namespace for the parameters of the given form, or `null` when the form does
             * not specifiy a namespace.
             */
            extractParameterNamespace: function(form) {
                var input = form.children("input[name*='" + PrimeFaces.VIEW_STATE + "']");
                if (input && input.length > 0) {
                    var name = input[0].name;
                    if (name.length > PrimeFaces.VIEW_STATE.length) {
                        return name.substring(0, name.indexOf(PrimeFaces.VIEW_STATE));
                    }
                }

                return null;
            },

            /**
             * Creates a new array with all parameters from the second array that are not in the first array. That is,
             * removes all parameters from the second array whose name is equal to one of the parameters in the first
             * array. The given input array are not modified.
             * @template [TValue=unknown] Type of the parameter values.
             * @param {PrimeFaces.ajax.RequestParameter<string, TValue>[]} arr1 A list of parameters for comparison.
             * @param {PrimeFaces.ajax.RequestParameter<string, TValue>[]} arr2 A list of additional parameters.
             * @return {PrimeFaces.ajax.RequestParameter<string, TValue>[]} An list of parameters that are in the second
             * array, but not in the first.
             */
            arrayCompare: function(arr1, arr2) {
                // loop arr1 params
                $.each(arr1, function(index1, param1) {
                    // loop arr2 params and remove it, if it's the same param as the arr1 param
                    arr2 = $.grep(arr2, function(param2, index2) {
                        if (param2.name === param1.name) {
                            return false;
                        }
                        return true;
                    });
                });

                return arr2;
            },

            /**
             * Creates a FormData which can be used for a Faces AJAX request on the current view.
             * It already contains all required parameters like ViewState or ClientWindow.
             *
             * @param {JQuery} form The closest form of the request source.
             * @param {string} parameterPrefix The Portlet parameter namespace.
             * @param {string} source The id of the request source.
             * @param {string} [process] A comma separated list of components which should be processed.
             * @param {string} [update] A comma separated list of components which should be updated.
             * @return {FormData} The newly created form data.
             */
            createFacesAjaxFormData: function(form, parameterPrefix, source, process, update) {
                var formData = new FormData();

                PrimeFaces.ajax.Request.addFormData(formData, PrimeFaces.PARTIAL_REQUEST_PARAM, true, parameterPrefix);
                PrimeFaces.ajax.Request.addFormData(formData, PrimeFaces.PARTIAL_SOURCE_PARAM, source, parameterPrefix);
                if (process) {
                    PrimeFaces.ajax.Request.addFormData(formData, PrimeFaces.PARTIAL_PROCESS_PARAM, process, parameterPrefix);
                }
                if (update) {
                    PrimeFaces.ajax.Request.addFormData(formData, PrimeFaces.PARTIAL_UPDATE_PARAM, update, parameterPrefix);
                }

                PrimeFaces.ajax.Request.addFormDataFromInput(formData, PrimeFaces.VIEW_STATE, form, parameterPrefix);
                PrimeFaces.ajax.Request.addFormDataFromInput(formData, PrimeFaces.CLIENT_WINDOW, form, parameterPrefix);
                PrimeFaces.ajax.Request.addFormDataFromInput(formData, PrimeFaces.csp.NONCE_INPUT, form, parameterPrefix);
                PrimeFaces.ajax.Request.addFormDataFromInput(formData, 'dsPostWindowId', form, parameterPrefix);
                PrimeFaces.ajax.Request.addFormDataFromInput(formData, 'dspwid', form, parameterPrefix);

                return formData;
            }
        },

        /**
         * The interface for the object containing low-level functionality related to handling AJAX responses. Note that
         * the different types of AJAX actions are handles by the `PrimeFaces.ResponseProcessor`.
         * @interface {PrimeFaces.ajax.Response} . The interface for the object containing functionality related to
         * handling AJAX responses
         * @type {PrimeFaces.ajax.Response}
         * @readonly
         */
        Response: {

            /**
             * Handles the response of an AJAX request. The response consists of one or more actions such as executing a
             * script or updating a DOM element. See also {@link jsf.ajax.response}.
             *
             * Also updates the specified components if any and synchronizes the client side JSF state. DOM updates are
             * implemented using jQuery which uses a very algorithm.
             *
             * @template {PrimeFaces.widget.BaseWidget} [TWidget=PrimeFaces.widget.BaseWidget] Type of the widget which
             * triggered the AJAX request.
             * @param {XMLDocument} xml The XML that was returned by the AJAX request.
             * @param {JQuery.Ajax.SuccessTextStatus} status Text status of the request.
             * @param {PrimeFaces.ajax.pfXHR} xhr The XHR request to which a response was received.
             * @param {PrimeFaces.ajax.UpdateHandler<TWidget>} [updateHandler] Optional handler for `update` actions.
             */
            handle: function(xml, status, xhr, updateHandler) {
                if (xml === undefined || xml === null) {
                    return;
                }

                var partialResponseNode = xml.getElementsByTagName("partial-response")[0];

                for (var i = 0; i < partialResponseNode.childNodes.length; i++) {
                    var currentNode = partialResponseNode.childNodes[i];

                    switch (currentNode.nodeName) {
                        case "redirect":
                            PrimeFaces.ajax.ResponseProcessor.doRedirect(currentNode);
                            break;

                        case "changes":
                            var activeElement = $(document.activeElement);
                            var activeElementId = activeElement.attr('id');
                            var activeElementSelection;
                            if (activeElement.length > 0 && activeElement.is('input') && typeof $.fn.getSelection === "function") {
                                activeElementSelection = activeElement.getSelection();
                            }

                            for (var j = 0; j < currentNode.childNodes.length; j++) {
                                var currentChangeNode = currentNode.childNodes[j];
                                switch (currentChangeNode.nodeName) {
                                    case "update":
                                        PrimeFaces.ajax.ResponseProcessor.doUpdate(currentChangeNode, xhr, updateHandler);
                                        break;
                                    case "delete":
                                        PrimeFaces.ajax.ResponseProcessor.doDelete(currentChangeNode);
                                        break;
                                    case "insert":
                                        PrimeFaces.ajax.ResponseProcessor.doInsert(currentChangeNode);
                                        break;
                                    case "attributes":
                                        PrimeFaces.ajax.ResponseProcessor.doAttributes(currentChangeNode);
                                        break;
                                    case "eval":
                                        PrimeFaces.ajax.ResponseProcessor.doEval(currentChangeNode, xhr);
                                        break;
                                    case "extension":
                                        PrimeFaces.ajax.ResponseProcessor.doExtension(currentChangeNode, xhr);
                                        break;
                                }
                            }

                            PrimeFaces.ajax.Response.handleReFocus(activeElementId, activeElementSelection);
                            PrimeFaces.ajax.Response.destroyDetachedWidgets();
                            break;

                        case "eval":
                            PrimeFaces.ajax.ResponseProcessor.doEval(currentNode);
                            break;

                        case "extension":
                            PrimeFaces.ajax.ResponseProcessor.doExtension(currentNode, xhr);
                            break;

                        case "error":
                            PrimeFaces.ajax.ResponseProcessor.doError(currentNode, xhr);
                            break;
                    }
                }
            },

            /**
             * Puts focus on the given element if necessary.
             * @param {string} activeElementId ID of the active to refocus.
             * @param {PrimeFaces.ajax.ActiveElementSelection} [activeElementSelection] The range to select, for INPUT
             * and TEXTAREA elements.
             */
            handleReFocus : function(activeElementId, activeElementSelection) {
                // skip when customFocus is active
                if (PrimeFaces.customFocus === true) {
                    PrimeFaces.customFocus = false;
                    return;
                }

                // no active element remembered
                if (!activeElementId) {
                    return;
                }

                var elementToFocus = $(PrimeFaces.escapeClientId(activeElementId));
                if (elementToFocus.length > 0) {

                    var refocus = function() {
                        // already focussed?
                        if (activeElementId !== $(document.activeElement).attr('id')) {
                            // focus
                            elementToFocus.trigger('focus');

                            // reapply cursor / selection
                            if (activeElementSelection) {
                                elementToFocus.setSelection(activeElementSelection.start, activeElementSelection.end);
                            }
                        }
                    };

                    refocus();

                    // double check it - required for IE
                    if (PrimeFaces.env.isIE()) {
                        setTimeout(function() {
                            refocus();
                        }, 50);
                    }
                }
            },

            /**
             * Destroys all widgets that are not part of the DOM anymore, usually because they were removed by an AJAX
             * update. Calls the `destroy` method on the widget and removes the widget from the global widget registry.
             */
            destroyDetachedWidgets : function() {
                // destroy detached widgets
                for (var i = 0; i < PrimeFaces.detachedWidgets.length; i++) {
                    var widgetVar = PrimeFaces.detachedWidgets[i];

                    var widget = PF(widgetVar);
                    if (widget && widget.isDetached() === true) {
                        widget.destroy();

                        try {
                            delete PrimeFaces.widgets[widgetVar];
                            delete widget;
                        } catch (e) { }
                    }
                }

                PrimeFaces.detachedWidgets = [];
            }
        },

        /**
         * The interface for the object containing low-level functionality related to processing the different types
         * of actions from AJAX responses.
         * @interface {PrimeFaces.ajax.ResponseProcessor} . The interface for the object containing functionality related to
         * processing the different types of actions from AJAX responses.
         * @type {PrimeFaces.ajax.ResponseProcessor}
         * @readonly
         */
        ResponseProcessor: {

            /**
             * Handles a `redirect` AJAX action by performing a redirect to the target URL.
             * @param {Node} node The XML node of the `redirect` action.
             */
            doRedirect : function(node) {
                try {
                    window.location.assign(node.getAttribute('url'));
                } catch (error) {
                    PrimeFaces.warn('Error redirecting to URL: ' + node.getAttribute('url'));
                }
            },

            /**
             * Handles an `update` AJAX action by calling the given update handler. When no update handler is given,
             * replaces the HTML content of the element with the new content.
             * @template {PrimeFaces.widget.BaseWidget} [TWidget=PrimeFaces.widget.BaseWidget] Type of the widget which
             * triggered the AJAX request.
             * @param {Node} node The XML node of the `update` action.
             * @param {PrimeFaces.ajax.pfXHR} xhr The XHR request to which a response was received.
             * @param {PrimeFaces.ajax.UpdateHandler<TWidget>} [updateHandler] Optional handler for the update.
             */
            doUpdate : function(node, xhr, updateHandler) {
                var id = node.getAttribute('id'),
                content = PrimeFaces.ajax.Utils.getContent(node);

                if (updateHandler && updateHandler.widget && updateHandler.widget.id === id) {
                    updateHandler.handle.call(updateHandler.widget, content);
                } else {
                    PrimeFaces.ajax.Utils.updateElement(id, content, xhr);
                }
            },

            /**
             * Handles an `eval` AJAX action by evaluating the returned JavaScript.
             * @param {Node} node The XML node of the `eval` action.
             * @param {PrimeFaces.ajax.pfXHR} xhr The XHR request to which a response was received.
             */
            doEval : function(node, xhr) {
                var textContent = node.textContent || node.innerText || node.text;

                var nonce;
                if (xhr && xhr.pfSettings && xhr.pfSettings.nonce) {
                    nonce = xhr.pfSettings.nonce;
                }
                PrimeFaces.csp.eval(textContent, nonce);
            },

            /**
             * Handles an `extension` AJAX action by extending the `pfArgs` property on the jQuery XHR object.
             * @param {Node} node The XML node of the `extension` action.
             * @param {PrimeFaces.ajax.pfXHR} xhr The XHR request to which a response was received.
             */
            doExtension : function(node, xhr) {
                if (xhr) {
                    if (node.getAttribute("ln") === "primefaces" && node.getAttribute("type") === "args") {
                        var textContent = node.textContent || node.innerText || node.text;
                        // it's possible that pfArgs are already defined e.g. if Portlet parameter namespacing is enabled
                        // the "parameterPrefix" will be encoded on document start
                        // the other parameters will be encoded on document end
                        // --> see PrimePartialResponseWriter
                        if (xhr.pfArgs) {
                            var json = JSON.parse(textContent);
                            for (var name in json) {
                                xhr.pfArgs[name] = json[name];
                            }
                        }
                        else {
                            xhr.pfArgs = JSON.parse(textContent);
                        }
                    }
                }
            },

            /**
             * Handles an `error` AJAX action by doing nothing currently.
             * @param {Node} node The XML node of the `error` action.
             * @param {PrimeFaces.ajax.pfXHR} xhr The XHR request to which a response was received.
             */
            doError : function(node, xhr) {
                // currently nothing...
            },

            /**
             * Handles a `delete` AJAX action by remove the DOM element.
             * @param {Node} node The XML node of the `delete` action.
             */
            doDelete : function(node) {
                var id = node.getAttribute('id');
                $(PrimeFaces.escapeClientId(id)).remove();
            },

            /**
             * Handles an `insert` AJAX action by inserting a newly creating DOM element.
             * @param {Node} node The XML node of the `insert` action.
             * @return {boolean | undefined} `false` if the AJAX action could not be performed, `true` or `undefined`
             * otherwise.
             */
            doInsert : function(node) {
                if (!node.childNodes) {
                    return false;
                }

                for (var i = 0; i < node.childNodes.length; i++) {
                    var childNode = node.childNodes[i];
                    var id = childNode.getAttribute('id');
                    var jq = $(PrimeFaces.escapeClientId(id));
                    var content = PrimeFaces.ajax.Utils.getContent(childNode);

                    if (childNode.nodeName === "after") {
                        $(content).insertAfter(jq);
                    }
                    else if (childNode.nodeName === "before") {
                        $(content).insertBefore(jq);
                    }
                }
            },

            /**
             * Handles an `attributes` AJAX action by setting the attributes on the DOM element.
             * @param {Node} node The XML node of the `attributes` action.
             * @return {boolean | undefined} `false` if the AJAX action could not be performed, `true` or `undefined`
             * otherwise.
             */
            doAttributes : function(node) {
                if (!node.childNodes) {
                    return false;
                }

                var id = node.getAttribute('id');
                var jq = $(PrimeFaces.escapeClientId(id));

                for (var i = 0; i < node.childNodes.length; i++) {
                    var attrNode = node.childNodes[i];
                    var attrName = attrNode.getAttribute("name");
                    var attrValue = attrNode.getAttribute("value");

                    if (!attrName) {
                        return;
                    }

                    if (!attrValue || attrValue === null) {
                        attrValue = "";
                    }

                    jq.attr(attrName, attrValue);
                }
            }
        },

        /**
         * Only available for backward compatibility, do not use in new code.
         * @deprecated Use `PrimeFaces.ajax.Request.handle` instead.
         * @param {Partial<PrimeFaces.ajax.Configuration>} cfg Configuration for the AJAX request to send, such as
         * the HTTP method, the URL, and the content of the request.
         * @param {Partial<PrimeFaces.ajax.ConfigurationExtender>} [ext] Optional extender with additional options
         * that overwrite the options given in `cfg`.
         * @return {undefined} Always returns `undefined`.
         */
        AjaxRequest: function(cfg, ext) {
            return PrimeFaces.ajax.Request.handle(cfg, ext);
        }
    };

    $(window).on('unload', function() {
        PrimeFaces.ajax.Queue.abortAll();
    });

};if (!PrimeFaces.csp) {

    /**
     * The object with functionality related to handling the `script-src` directive of the HTTP Content-Security-Policy
     * (CSP) policy. This makes use of a nonce (number used once). The server must generate a unique nonce value each
     * time it transmits a policy. 
     * @namespace
     */
    PrimeFaces.csp = {

        /**
         * Name of the POST parameter for transmitting the nonce.
         * @type {string}
         * @readonly
         */
        NONCE_INPUT : "primefaces.nonce",

        /**
         * The value of the nonce to be used.
         * @type {string}
         */
        NONCE_VALUE : "",

        /**
         * Map of currently registered CSP events on this page.
         * @type {Map<string,Map<string,boolean>>}
         */
        EVENT_REGISTRY : new Map(),

        /**
         * Sets the given nonce to all forms on the current page.
         * @param {string} nonce Nonce to set. This value is usually supplied by the server.
         */
        init : function(nonce) {
            PrimeFaces.csp.NONCE_VALUE = nonce;

            var forms = document.getElementsByTagName("form");
            for (var i = 0; i < forms.length; i++) {
                var form = forms[i];
                var input = form.elements[PrimeFaces.csp.NONCE_INPUT];
                if (!input) {
                    input = document.createElement("input");
                    input.setAttribute("name", PrimeFaces.csp.NONCE_INPUT);
                    input.setAttribute("type", "hidden");
                    form.appendChild(input);
                }
                input.setAttribute("value", nonce);
            }
        },

        /**
         * Registers an event listener for the given element.
         * @param {string} id ID of an element
         * @param {string} [event] Event to listen to, with the `on` prefix, such as `onclick` or `onblur`.
         * @param {() => boolean} [js] Callback that may return `false` to prevent the default behavior of the event.
         */
        register: function(id, event, js){
            if (event) {
                var shortenedEvent = event.substring(2, event.length),
                    element = document.getElementById(id),
                    jqEvent = shortenedEvent + '.' + id;

                // if the eventhandler return false, we must use preventDefault
                var jsWrapper = function(event) {
                    var retVal = js.call(element, event);
                    if (retVal === false && event.cancelable) {
                        event.preventDefault();
                    }
                };

                // #9002 body onload rewrite as window onload
                if (event === 'onload' && element instanceof HTMLBodyElement) {
                    element = window;
                }

                $(element).off(jqEvent).on(jqEvent, jsWrapper);

                //Collect some basic information about registered AJAXified event listeners
                if (!PrimeFaces.isProductionProjectStage()) {
                    if (!PrimeFaces.csp.EVENT_REGISTRY.has(id)) {
                        PrimeFaces.csp.EVENT_REGISTRY.set(id, new Map());
                    }
                    var script = js.toString();
                    var isAjaxified = (script.indexOf("PrimeFaces.ab(") >= 0) || 
                                      (script.indexOf("pf.ab(") >= 0) || 
                                      (script.indexOf("mojarra.ab(") >= 0) || 
                                      (script.indexOf("jsf.ajax.request") >= 0);
                    PrimeFaces.csp.EVENT_REGISTRY.get(id).set(jqEvent, isAjaxified);
                }
            }
        },

        /**
         * Does this component have a registered AJAX event.
         * @param {string} id ID of an element
         * @param {string} [event] Event to listen to, with the `on` prefix, such as `onclick` or `onblur`.
         * @return {boolean|undefined} true if component has this AJAX event
         */
        hasRegisteredAjaxifiedEvent: function(id, event) {
            if (PrimeFaces.isProductionProjectStage()) {
                console.error("PrimeFaces CSP registry may not be used in JSF Production mode.");
                return false;
            }
            if (PrimeFaces.csp.EVENT_REGISTRY.has(id)) {
                var shortenedEvent = event.substring(2, event.length),
                    jqEvent = shortenedEvent + '.' + id;
                return PrimeFaces.csp.EVENT_REGISTRY.get(id).get(jqEvent);
            }
            return false;
        },

        /**
         * Perform a CSP safe `eval()`.
         *
         * @param {string} js The JavaScript code to evaluate.
         * @param {string} [nonceValue] Nonce value. Leave out if not using CSP.
         */
        eval: function (js, nonceValue) {
            // assign the NONCE if necessary
            var options = {};
            if (nonceValue) {
                options = {nonce: nonceValue};
            } else if (PrimeFaces.csp.NONCE_VALUE) {
                options = {nonce: PrimeFaces.csp.NONCE_VALUE};
            }

            // evaluate the script
            $.globalEval(js, options);
        },
        
        /**
         * Perform a CSP safe `eval()` with a return result value.
         *
         * @param {string} js The JavaScript code to evaluate.
         * @return {unknown} The result of the evaluated JavaScript code.
         * @see https://stackoverflow.com/a/33945236/502366
         */
        evalResult: function (js) {
            var executeJs = "var cspResult = " + js;
            PrimeFaces.csp.eval(executeJs);
            return cspResult;
        },

        /**
         * CSP won't allow string-to-JavaScript methods like `eval()` and `new Function()`.
         * This method uses JQuery `globalEval` to safely evaluate the function if CSP is enabled.
         *
         * @param {HTMLElement} id The element executing the function (aka `this`).
         * @param {string} js The JavaScript code to evaluate. Two variables will be in scope for the code: (a) the
         * `this` context, which is set to the given `id`, and (b) the `event` variable, which is set to the given `e`.
         * @param {JQuery.TriggeredEvent} e The event from the caller to pass through.
         */
        executeEvent: function(id, js, e) {
            // create the wrapper function
            var scriptEval = 'var cspFunction = function(event){'+ js +'}';

            // evaluate JS into a function
            PrimeFaces.csp.eval(scriptEval, PrimeFaces.csp.NONCE_VALUE);

            // call the function
            cspFunction.call(id, e);
        },

        /**
         * GitHub #5790: When using jQuery to trigger a click event on a button while using CSP
         * we must set preventDefault or else it will trigger a non-ajax button click.
         * 
         * @return {JQuery.TriggeredEvent} the JQuery click event
         */
        clickEvent: function() {
            var clickEvent = $.Event( "click" );
            if (PrimeFaces.csp.NONCE_VALUE) {
                clickEvent.preventDefault();
            }
            return clickEvent;
        }

    };

};;if (!PrimeFaces.expressions) {

    /**
     * The object with functionality related to working with search expressions.
     * @namespace
     */
    PrimeFaces.expressions = {};

    /**
     * The interface of the object with all methods for working with search expressions.
     * @interface {PrimeFaces.expressions.SearchExpressionFacadeObject}
     * @constant {PrimeFaces.expressions.SearchExpressionFacade} . The object with all methods for working with search
     * expressions.
     */
    PrimeFaces.expressions.SearchExpressionFacade = {

        /**
         * Takes a search expression that may contain multiple components, separated by commas or whitespaces. Resolves
         * each search expression to the component it refers to and returns a JQuery object with the DOM elements of
         * the resolved components.
         * @param {string | HTMLElement | JQuery}  expressions A search expression with one or multiple components to resolve.
         * @return {JQuery} A list with the resolved components.
         */
        resolveComponentsAsSelector: function(expressions) {

            if (expressions instanceof $) {
                return expressions;
            }

            if (expressions instanceof HTMLElement) {
                return $(expressions);
            }

            var splittedExpressions = PrimeFaces.expressions.SearchExpressionFacade.splitExpressions(expressions);
            var elements = $();

            if (splittedExpressions) {
                for (var i = 0; i < splittedExpressions.length; ++i) {
                    var expression =  PrimeFaces.trim(splittedExpressions[i]);
                    if (expression.length > 0) {

                        // skip unresolvable keywords
                        if (expression == '@none' || expression == '@all' || expression.indexOf("@obs(") == 0) {
                            continue;
                        }

                        // just a id
                        if (expression.indexOf("@") == -1) {
                            elements = elements.add(
                                    $(document.getElementById(expression)));
                        }
                        // @widget
                        else if (expression.indexOf("@widgetVar(") == 0) {
                            var widgetVar = expression.substring(11, expression.length - 1);
                            var widget = PrimeFaces.widgets[widgetVar];

                            if (widget) {
                                elements = elements.add(
                                        $(document.getElementById(widget.id)));
                            } else {
                                PrimeFaces.widgetNotAvailable(widgetVar);
                            }
                        }
                        // PFS
                        else if (expression.indexOf("@(") == 0) {
                            //converts pfs to jq selector e.g. @(div.mystyle :input) to div.mystyle :input
                            elements = elements.add(
                                    $(expression.substring(2, expression.length - 1)));
                        }
                    }
                }
            }

            return elements;
        },

        /**
         * Takes a search expression that may contain multiple components, separated by commas or whitespaces. Resolves
         * each search expression to the component it refers to and returns a list of IDs of the resolved components.
         * @param {string} expressions A search expression with one or multiple components to resolve.
         * @return {string[]} A list of IDs with the resolved components.
         */
        resolveComponents: function(expressions) {
            var splittedExpressions = PrimeFaces.expressions.SearchExpressionFacade.splitExpressions(expressions),
            ids = [];

            if (splittedExpressions) {
                for (var i = 0; i < splittedExpressions.length; ++i) {
                    var expression =  PrimeFaces.trim(splittedExpressions[i]);
                    if (expression.length > 0) {

                        // just a id or passtrough keywords
                        if (expression.indexOf("@") == -1 || expression == '@none'
                                || expression == '@all' || expression.indexOf("@obs(") == 0) {
                            if (!PrimeFaces.inArray(ids, expression)) {
                                ids.push(expression);
                            }
                        }
                        // @widget
                        else if (expression.indexOf("@widgetVar(") == 0) {
                            var widgetVar = expression.substring(11, expression.length - 1),
                            widget = PrimeFaces.widgets[widgetVar];

                            if (widget) {
                                if (!PrimeFaces.inArray(ids, widget.id)) {
                                    ids.push(widget.id);
                                }
                            } else {
                                PrimeFaces.widgetNotAvailable(widgetVar);
                            }
                        }
                        // PFS
                        else if (expression.indexOf("@(") == 0) {
                            //converts pfs to jq selector e.g. @(div.mystyle :input) to div.mystyle :input
                            var elements = $(expression.substring(2, expression.length - 1));

                            for (var j = 0; j < elements.length; j++) {
                                var element = $(elements[j]),
                                clientId = element.data(PrimeFaces.CLIENT_ID_DATA) || element.attr('id');

                                if (clientId && !PrimeFaces.inArray(ids, clientId)) {
                                    ids.push(clientId);
                                }
                            }
                        }
                    }
                }
            }

            return ids;
        },

        /**
         * Splits the given search expression into its components. The components of a search expression are separated
         * by either a comman or a whitespace.
         * ```javascript
         * splitExpressions("") // => [""]
         * splitExpressions("form") // => ["form"]
         * splitExpressions("form,input") // => ["form", "input"]
         * splitExpressions("form input") // => ["form", "input"]
         * splitExpressions("form,@child(1,2)") // => ["form", "child(1,2)"]
         * ```
         * @param {string} expression A search expression to split.
         * @return {string[]} The individual components of the given search expression.
         */
        splitExpressions: function(expression) {

            var expressions = [];
            var buffer = '';

            var parenthesesCounter = 0;

            for (var i = 0; i < expression.length; i++) {
                var c = expression[i];

                if (c === '(') {
                    parenthesesCounter++;
                }

                if (c === ')') {
                    parenthesesCounter--;
                }

                if ((c === ' ' || c === ',') && parenthesesCounter === 0) {
                    // lets add token inside buffer to our tokens
                    expressions.push(buffer);
                    // now we need to clear buffer
                    buffer = '';
                } else {
                    buffer += c;
                }
            }

            // lets not forget about part after the separator
            expressions.push(buffer);

            return expressions;
        }
    };
};if (!PrimeFaces.utils) {

    /**
     * The object with various utilities needed by PrimeFaces.
     * @namespace
     */
    PrimeFaces.utils = {

        /**
         * Finds the element to which the overlay panel should be appended. If none is specified explicitly, append the
         * panel to the body.
         * @param {PrimeFaces.widget.DynamicOverlayWidget} widget A widget that has a panel to be appended.
         * @param {JQuery} [overlay] The DOM element for the overlay.
         * @return {string | null} The search expression for the element to which the overlay panel should be appended.
         */
        resolveAppendTo: function(widget, overlay) {
            if (widget && widget.jq[0]) {
                var dialog = widget.jq[0].closest('.ui-dialog');

                if (dialog && overlay && overlay.length) {
                    var $dialog = $(dialog);

                    //set position as fixed to scroll with dialog
                    if ($dialog.css('position') === 'fixed') {
                        overlay.css('position', 'fixed');
                    }

                    //append to body if not already appended by user choice
                    if(!overlay.parent().is(document.body)) {
                        widget.cfg.appendTo = "@(body)";
                        return widget.cfg.appendTo;
                    }
                }

                return widget.cfg.appendTo;
            }

            return null;
        },

        /**
         * Finds the container element to which an overlay widget should be appended. This is either the element
         * specified by the widget configurations's `appendTo` attribute, or the document BODY element otherwise.
         * @param {PrimeFaces.widget.DynamicOverlayWidget} widget A widget to be displayed as an overlay.
         * @return {JQuery} The container DOM element to which the overlay is to be appended.
         */
        resolveDynamicOverlayContainer: function(widget) {
            return widget.cfg.appendTo
                ? PrimeFaces.expressions.SearchExpressionFacade.resolveComponentsAsSelector(widget.cfg.appendTo)
                : $(document.body);
        },

        /**
         * Cleanup the `detached` overlay.
         *
         * If you update a component, the overlay is rendered as specified in the component tree (XHTML view), but moved
         * to a different container via JavaScript.
         *
         * This means that after an AJAX update, we now have 2 overlays with the same id:
         *
         * 1. The newly rendered overlay, as a child of the element specified by the component tree (XHTML view)
         * 1. The old, detached overlay, as a child of the element specified by `appendTo` attribute
         *
         * We now need to remove the detached overlay. This is done by this function.
         * @param {PrimeFaces.widget.DynamicOverlayWidget} widget The (old) overlay widget instance.
         * @param {JQuery} overlay The DOM element for the overlay.
         * @param {string} overlayId ID of the overlay, usually the widget ID.
         * @param {JQuery} appendTo The container to which the overlay is appended.
         */
        cleanupDynamicOverlay: function(widget, overlay, overlayId, appendTo) {
            if (widget.cfg.appendTo) {
                var overlays = $("[id='" + overlayId + "']");
                if (overlays.length > 1) {
                    appendTo.children("[id='" + overlayId + "']").remove();
                }
            }
        },

        /**
         * Removes the overlay from the overlay container as specified by the `appendTo` attribute.
         * @param {PrimeFaces.widget.DynamicOverlayWidget} widget The overlay widget instance.
         * @param {JQuery} overlay The (new) DOM element of the overlay.
         * @param {string} overlayId ID of the the overlay, usually the widget ID.
         * @param {JQuery} appendTo The container to which the overlay is appended.
         */
        removeDynamicOverlay: function(widget, overlay, overlayId, appendTo) {
            appendTo.children("[id='" +  overlayId + "']").not(overlay).remove();
        },

        /**
         * An overlay widget is moved in the DOM to the position as specified by the `appendTo` attribute. This function
         * moves the widget to its position in the DOM and removes old elements from previous AJAX updates.
         * @param {PrimeFaces.widget.BaseWidget} widget The overlay widget instance.
         * @param {JQuery} overlay The DOM element for the overlay.
         * @param {string} overlayId ID of the overlay, usually the widget ID.
         * @param {JQuery} appendTo The container to which the overlay is appended.
         */
        appendDynamicOverlay: function(widget, overlay, overlayId, appendTo) {
            var elementParent = overlay.parent();

            // skip when the parent currently is already the same
            // this likely happens when the dialog is updated directly instead of a container
            // as our ajax update mechanism just updates by id
            if (!elementParent.is(appendTo)
                    && !appendTo.is(overlay)) {

                PrimeFaces.utils.removeDynamicOverlay(widget, overlay, overlayId, appendTo);

                overlay.appendTo(appendTo);
            }
        },

        /**
         * Creates a new (empty) container for a modal overlay. A modal overlay is an overlay that blocks the content
         * below it. To remove the modal overlay, use `PrimeFaces.utils.removeModal`.
         * @param {PrimeFaces.widget.BaseWidget} widget An overlay widget instance.
         * @param {JQuery} overlay The modal overlay element should be a DIV.
         * @param {() => JQuery} tabbablesCallback A supplier function that return a list of tabbable elements. A
         * tabbable element is an element to which the user can navigate to via the tab key.
         * @return {JQuery} The DOM element for the newly added modal overlay container.
         */
        addModal: function(widget, overlay, tabbablesCallback) {
            var id = widget.id,
                zIndex = overlay.css('z-index') - 1;

            var role = widget instanceof PrimeFaces.widget.ConfirmDialog ? 'alertdialog' : 'dialog';
            overlay.attr({
                'role': role
                ,'aria-hidden': false
                ,'aria-modal': true
                ,'aria-live': 'polite'
            });

            PrimeFaces.utils.preventTabbing(id, zIndex, tabbablesCallback);

            if (widget.cfg.blockScroll) {
                PrimeFaces.utils.preventScrolling();
            }

            var modalId = id + '_modal';
            var modalOverlay = $('<div id="' + modalId + '" class="ui-widget-overlay ui-dialog-mask"></div>');
            modalOverlay.appendTo($(document.body));
            modalOverlay.css('z-index' , String(zIndex));

            return modalOverlay;
        },

        /**
         * Given a modal overlay, prevents navigating via the tab key to elements outside of that modal overlay. Use
         * `PrimeFaces.utils.enableTabbing` to restore the original behavior.
         * @param {string} id ID of a modal overlay widget.
         * @param {number} zIndex The z-index of the modal overlay.
         * @param {() => JQuery} tabbablesCallback A supplier function that return a list of tabbable elements. A
         * tabbable element is an element to which the user can navigate to via the tab key.
         */
        preventTabbing: function(id, zIndex, tabbablesCallback) {
            //Disable tabbing out of modal and stop events from targets outside of the overlay element
            var $document = $(document);
            $document.on('focus.' + id + ' mousedown.' + id + ' mouseup.' + id, function(event) {
                var target = $(event.target);
                if (!target.is(document.body) && (target.zIndex() < zIndex && target.parent().zIndex() < zIndex)) {
                    event.preventDefault();
                }
            });
            $document.on('keydown.' + id, function(event) {
                var target = $(event.target);
                if (event.which === $.ui.keyCode.TAB) {
                    var tabbables = tabbablesCallback();
                    if (tabbables.length) {
                        var first = tabbables.filter(':first'),
                        last = tabbables.filter(':last'),
                        focusingRadioItem = null;

                        if(first.is(':radio')) {
                            focusingRadioItem = tabbables.filter('[name="' + $.escapeSelector(first.attr('name')) + '"]').filter(':checked');
                            if(focusingRadioItem.length > 0) {
                                first = focusingRadioItem;
                            }
                        }

                        if(last.is(':radio')) {
                            focusingRadioItem = tabbables.filter('[name="' + $.escapeSelector(last.attr('name')) + '"]').filter(':checked');
                            if(focusingRadioItem.length > 0) {
                                last = focusingRadioItem;
                            }
                        }

                        if(target.is(document.body)) {
                            first.focus(1);
                            event.preventDefault();
                        }
                        else if(event.target === last[0] && !event.shiftKey) {
                            first.focus(1);
                            event.preventDefault();
                        }
                        else if (event.target === first[0] && event.shiftKey) {
                            last.focus(1);
                            event.preventDefault();
                        }
                    }
                }
                else if (event.ctrlKey) { 
                    // #8965 allow cut, copy, paste
                    return;
                }
                else if (!target.is(document.body) && (target.zIndex() < zIndex && target.parent().zIndex() < zIndex)) {
                    event.preventDefault();
                }
            });
        },

        /**
         * Given a modal overlay widget, removes the modal overlay element from the DOM. This reverts the changes as
         * made by `PrimeFaces.utils.addModal`.
         * @param {PrimeFaces.widget.BaseWidget} widget A modal overlay widget instance.
         * @param {JQuery | null} [overlay] The modal overlay element should be a DIV.
         */
        removeModal: function(widget, overlay) {
            var id = widget.id;
            var modalId = id + '_modal';

            if (overlay) {
                overlay.attr({
                    'aria-hidden': true
                    ,'aria-modal': false
                    ,'aria-live': 'off'
                });
            }

            // if the id contains a ':'
            $(PrimeFaces.escapeClientId(modalId)).remove();

            // if the id does NOT contain a ':'
            $(document.body).children("[id='" + modalId + "']").remove();

            if (widget.cfg.blockScroll) {
                PrimeFaces.utils.enableScrolling();
            }
            PrimeFaces.utils.enableTabbing(id);
        },

        /**
         * Enables navigating to an element via the tab key outside an overlay widget. Usually called when a modal
         * overlay is removed. This reverts the changes as made by `PrimeFaces.utils.preventTabbing`.
         * @param {string} id ID of a modal overlay, usually the widget ID.
         */
        enableTabbing: function(id) {
            $(document).off('focus.' + id + ' mousedown.' + id + ' mouseup.' + id + ' keydown.' + id);
        },

        /**
         * Checks if a modal with the given ID is currently displayed.
         * @param {string} id The base ID of a modal overlay, usually the widget ID.
         * @return {boolean} Whether the modal with the given ID is displayed.
         */
        isModalActive: function(id) {
            var modalId = id + '_modal';

            return $(PrimeFaces.escapeClientId(modalId)).length === 1
                || $(document.body).children("[id='" + modalId + "']").length === 1;
        },

        /**
         * Is this scrollable parent a type that should be bound to the window element.
         *
         * @param {JQuery | undefined | null} jq An element to check if should be bound to window scroll. 
         * @return {boolean} true this this JQ should be bound to the window scroll event
         */
        isScrollParentWindow: function(jq) {
            return jq && (jq.is('body') || jq.is('html') || jq[0].nodeType === 9); // nodeType 9 is for document element;
        },

        /**
         * Registers a callback on the document that is invoked when the user clicks on an element outside the overlay
         * widget.
         *
         * @param {PrimeFaces.widget.BaseWidget} widget An overlay widget instance.
         * @param {string} hideNamespace A click event with a namespace to listen to, such as `mousedown.widgetId`.
         * @param {JQuery} overlay The DOM element for the overlay.
         * @param {((event: JQuery.TriggeredEvent) => JQuery) | undefined} resolveIgnoredElementsCallback The callback which
         * resolves the elements to ignore when the user clicks outside the overlay. The `hideCallback` is not invoked
         * when the user clicks on one those elements.
         * @param {(event: JQuery.TriggeredEvent, eventTarget: JQuery) => void} hideCallback A callback that is invoked when the
         * user clicks on an element outside the overlay widget.
         * @return {PrimeFaces.UnbindCallback} Unbind callback handler
         */
        registerHideOverlayHandler: function(widget, hideNamespace, overlay, resolveIgnoredElementsCallback, hideCallback) {

            widget.addDestroyListener(function() {
                $(document).off(hideNamespace);
            });

            $(document).off(hideNamespace).on(hideNamespace, function(e) {
                if (overlay.is(':hidden') || overlay.css('visibility') === 'hidden') {
                    return;
                }

                var $eventTarget = $(e.target);

                // do nothing when the element should be ignored
                if (resolveIgnoredElementsCallback) {
                    var elementsToIgnore = resolveIgnoredElementsCallback(e);
                    if (elementsToIgnore) {
                        if (elementsToIgnore.is($eventTarget) || elementsToIgnore.has($eventTarget).length > 0) {
                            return;
                        }
                    }
                }

                hideCallback(e, $eventTarget);
            });

            return {
                unbind: function() {
                    $(document).off(hideNamespace);
                }
            };
        },

        /**
         * Registers a callback that is invoked when the window is resized.
         * @param {PrimeFaces.widget.BaseWidget} widget A widget instance for which to register a resize handler.
         * @param {string} resizeNamespace A resize event with a namespace to listen to, such as `resize.widgetId`.
         * @param {JQuery | undefined} element An element that prevents the callback from being invoked when it is not
         * visible, usually a child element of the widget.
         * @param {(event: JQuery.TriggeredEvent) => void} resizeCallback A callback that is invoked when the window is resized.
         * @param {string} [params] Optional CSS selector. If given, the callback is invoked only when the resize event
         * is triggered on an element the given selector.
         * @return {PrimeFaces.UnbindCallback} Unbind callback handler
         */
        registerResizeHandler: function(widget, resizeNamespace, element, resizeCallback, params) {

            widget.addDestroyListener(function() {
                $(window).off(resizeNamespace);
            });

            $(window).off(resizeNamespace).on(resizeNamespace, params||null, function(e) {
                if (element && (element.is(":hidden") || element.css('visibility') === 'hidden')) {
                    return;
                }

                resizeCallback(e);
            });

            return {
                unbind: function() {
                    $(window).off(resizeNamespace);
                }
            };
        },

        /**
         * Sets up an overlay widget. Appends the overlay widget to the element as specified by the `appendTo`
         * attribute. Also makes sure the overlay widget is handled properly during AJAX updates.
         * @param {PrimeFaces.widget.DynamicOverlayWidget} widget An overlay widget instance.
         * @param {JQuery} overlay The DOM element for the overlay.
         * @param {string} overlayId The ID of the overlay, usually the widget ID.
         * @return {JQuery} The overlay that was passed to this function.
         */
        registerDynamicOverlay: function(widget, overlay, overlayId) {

            if (widget.cfg.appendTo) {
                var appendTo = PrimeFaces.utils.resolveDynamicOverlayContainer(widget);
                PrimeFaces.utils.appendDynamicOverlay(widget, overlay, overlayId, appendTo);

                widget.addDestroyListener(function() {
                    var appendTo = PrimeFaces.utils.resolveDynamicOverlayContainer(widget);
                    // pass null as overlay - as every! overlay with this overlayId can be removed on destroying the whole widget
                    PrimeFaces.utils.removeDynamicOverlay(widget, null, overlayId, appendTo);
                });

                widget.addRefreshListener(function() {
                    var appendTo = PrimeFaces.utils.resolveDynamicOverlayContainer(widget);
                    PrimeFaces.utils.cleanupDynamicOverlay(widget, overlay, overlayId, appendTo);
                });
            }

            return overlay;
        },

        /**
         * Registers a callback that is invoked when a scroll event is triggered on the DOM element for the widget.
         * @param {PrimeFaces.widget.BaseWidget} widget A widget instance for which to register a scroll handler.
         * @param {string} scrollNamespace A scroll event with a namespace, such as `scroll.widgetId`.
         * @param {(event: JQuery.TriggeredEvent) => void} scrollCallback A callback that is invoked when a scroll event
         * occurs on the widget.
         * @return {PrimeFaces.UnbindCallback} unbind callback handler
         */
        registerScrollHandler: function(widget, scrollNamespace, scrollCallback) {
            var scrollParent;
            var widgetJq = widget.getJQ();
            if (widgetJq && typeof widgetJq.scrollParent === 'function') {
                scrollParent = widgetJq.scrollParent();
            }
            if (!scrollParent || PrimeFaces.utils.isScrollParentWindow(scrollParent)) {
                scrollParent = $(window);
            }

            widget.addDestroyListener(function() {
                scrollParent.off(scrollNamespace);
            });

            scrollParent.off(scrollNamespace).on(scrollNamespace, function(e) {
                scrollCallback(e);
            });

            return {
                unbind: function() {
                    scrollParent.off(scrollNamespace);
                }
            };
        },

        /**
         * Registers a callback that is invoked when a scroll event is triggered on The DOM element for the widget that
         * has a connected overlay.
         * @param {PrimeFaces.widget.BaseWidget} widget A widget instance for which to register a scroll handler.
         * @param {string} scrollNamespace A scroll event with a namespace, such as `scroll.widgetId`.
         * @param {JQuery | undefined} element A DOM element used to find scrollable parents.
         * @param {(event: JQuery.TriggeredEvent) => void} scrollCallback A callback that is invoked when a scroll event
         * occurs on the widget.
         * @return {PrimeFaces.UnbindCallback} unbind callback handler
         */
        registerConnectedOverlayScrollHandler: function(widget, scrollNamespace, element, scrollCallback) {
            var scrollableParents = PrimeFaces.utils.getScrollableParents((element || widget.getJQ()).get(0));

            for (var i = 0; i < scrollableParents.length; i++) {
                var scrollParent = $(scrollableParents[i]);

                widget.addDestroyListener(function() {
                    scrollParent.off(scrollNamespace);
                });

                scrollParent.off(scrollNamespace).on(scrollNamespace, function(e) {
                    scrollCallback(e);
                });
            }

            return {
                unbind: function() {
                    for (var i = 0; i < scrollableParents.length; i++) {
                        $(scrollableParents[i]).off(scrollNamespace);
                    }
                }
            };
        },

        /**
         * Finds scrollable parents (not  the document).
         * @param {Element} element An element used to find its scrollable parents.
         * @return {Element[]} the list of scrollable parents.
         */
        getScrollableParents: function(element) {
            var scrollableParents = [];
            var getParents = function(element, parents) {
                return element['parentNode'] == null ? parents : getParents(element.parentNode, parents.concat([element.parentNode]));
            };

            var addScrollableParent = function(node) {
                if (PrimeFaces.utils.isScrollParentWindow($(node))) {
                    scrollableParents.push(window);
                } else {
                    scrollableParents.push(node);
                }
            };

            if (element) {
                var parents = getParents(element, []);
                var overflowRegex = /(auto|scroll)/;
                var overflowCheck = function(node) {
                    var styleDeclaration = window['getComputedStyle'](node, null);
                    return overflowRegex.test(styleDeclaration.getPropertyValue('overflow')) || overflowRegex.test(styleDeclaration.getPropertyValue('overflowX')) || overflowRegex.test(styleDeclaration.getPropertyValue('overflowY'));
                };

                for (var i = 0; i < parents.length; i++) {
                    var parent = parents[i];
                    var scrollSelectors = parent.nodeType === 1 && parent.dataset['scrollselectors'];
                    if (scrollSelectors) {
                        var selectors = scrollSelectors.split(',');
                        for (var j = 0; j < selectors.length; j++) {
                            var selector = selectors[j];
                            var el = parent.querySelector(selector);
                            if (el && overflowCheck(el)) {
                                addScrollableParent(el);
                            }
                        }
                    }

                    if (parent.nodeType !== 9 && overflowCheck(parent)) {
                        addScrollableParent(parent);
                    }
                }
            }

            // if no parents make it the window
            if (scrollableParents.length === 0) {
                scrollableParents.push(window);
            }

            return scrollableParents;
        },

        /**
         * Removes a scroll handler as registered by `PrimeFaces.utils.registerScrollHandler`.
         * @param {PrimeFaces.widget.BaseWidget} widget A widget instance for which a scroll handler was registered.
         * @param {string} scrollNamespace A scroll event with a namespace, such as `scroll.widgetId`.
         */
        unbindScrollHandler: function(widget, scrollNamespace) {
            var scrollParent = widget.getJQ().scrollParent();
            if (PrimeFaces.utils.isScrollParentWindow(scrollParent)) {
                scrollParent = $(window);
            }

            scrollParent.off(scrollNamespace);
        },

        /**
         * Prevents the user from scrolling the document BODY element. You can enable scrolling again via
         * `PrimeFaces.utils.enableScrolling`.
         */
        preventScrolling: function() {
            $(document.body).addClass('ui-overflow-hidden');
        },

        /**
         * Enables scrolling again if previously disabled via `PrimeFaces.utils.preventScrolling`.
         */
        enableScrolling: function() {
            $(document.body).removeClass('ui-overflow-hidden');
        },

        /**
         * Calculates an element offset relative to the current scroll position of the window.
         * @param {JQuery} element An element for which to calculate the scroll position.
         * @return {JQuery.Coordinates} The offset of the given element, relative to the current scroll position of the
         * window.
         */
        calculateRelativeOffset: function (element) {
            var result = {
                left : 0,
                top : 0
            };
            var offset = element.offset();
            var scrollTop = $(window).scrollTop();
            var scrollLeft = $(window).scrollLeft();
            result.top = offset.top - scrollTop;
            result.left = offset.left - scrollLeft;
            return result;
        },

        /**
         * Blocks the enter key for an event like `keyup` or `keydown`. Useful in filter input events in many
         * components.
         * @param {JQuery.TriggeredEvent} e The key event that occurred.
         */
        blockEnterKey: function(e) {
            var key = e.which,
            keyCode = $.ui.keyCode;

            if((key === keyCode.ENTER)) {
                e.preventDefault();
            }
        },

        /**
         * Ignores certain keys on filter input text box. Useful in filter input events in many components.
         * @param {JQuery.TriggeredEvent} e The key event that occurred.
         * @return {boolean} `true` if the one of the keys to ignore was pressed, or `false` otherwise.
         */
        ignoreFilterKey: function(e) {
            var key = e.which,
            keyCode = $.ui.keyCode,
            ignoredKeys = [
                keyCode.END,
                keyCode.HOME,
                keyCode.LEFT,
                keyCode.RIGHT,
                keyCode.UP,
                keyCode.DOWN,
                keyCode.TAB,
                16/*Shift*/,
                17/*Ctrl*/,
                18/*Alt*/,
                91, 92, 93/*left/right Win/Cmd*/,
                keyCode.ESCAPE,
                keyCode.PAGE_UP,
                keyCode.PAGE_DOWN,
                19/*pause/break*/,
                20/*caps lock*/,
                44/*print screen*/,
                144/*num lock*/,
                145/*scroll lock*/];

            if (ignoredKeys.indexOf(key) > -1) {
                return true;
            }
            return false;
        },

        /**
         * Exclude elements such as buttons, links, inputs from being touch swiped.  Users can always add
         * `class="noSwipe"` to any element to exclude it as well.
         * @return {string} A CSS selector for the elements to be excluded from being touch swiped.
         */
        excludedSwipeElements: function() {
            return ":button:enabled, :input:enabled, a, [role='combobox'], .noSwipe";
        },

        /**
         * Helper to open a new URL and if CTRL is held down open in new browser tab.
         *
         * @param {JQuery.TriggeredEvent} event The click event that occurred.
         * @param {JQuery} link The URL anchor link that was clicked.
         */
        openLink: function(event, link) {
            var href = link.attr('href');
            var win;
            if(href && href !== '#') {
                if (event.ctrlKey) {
                    win = window.open(href, '_blank');
                } else {
                    var target = link.attr('target') || '_self';
                    win = window.open(href, target);
                }
                if (win) {
                    win.focus();
                }
            }
            event.preventDefault();
        },

        /**
         * Enables a widget for editing and sets it style as enabled.
         *
         * @param {JQuery} jq a required jQuery element to enable
         * @param {JQuery | undefined | null} input an optional jQuery input to enable (will use jq if null)
         */
        enableInputWidget: function(jq, input) {
            if(!input) {
                input = jq;
            }
            if (input.is(':disabled')) {
                input.prop('disabled', false);
                jq.removeClass('ui-state-disabled');
            }
        },

        /**
         * Disables a widget from editing and sets it style as disabled.
         *
         * @param {JQuery} jq a required jQuery element to disable
         * @param {JQuery | undefined | null} input an optional jQuery input to disable (will use jq if null)
         */
        disableInputWidget: function(jq, input) {
            if(!input) {
                input = jq;
            }
            if (!input.is(':disabled')) {
                input.prop('disabled', true);
                jq.addClass('ui-state-disabled');
            }
        },

        /**
         * Enables a button.
         *
         * @param {JQuery} jq a required jQuery element to enable
         */
        enableButton: function(jq) {
            if (jq) {
                jq.removeClass('ui-state-disabled')
                  .prop( "disabled", false)
                  .removeAttr('aria-disabled');
            }
        },

        /**
         * Disables a button from being clicked.
         *
         * @param {JQuery} jq a required jQuery button to disable
         */
        disableButton: function(jq) {
            if (jq) {
                jq.removeClass('ui-state-hover ui-state-focus ui-state-active')
                  .addClass('ui-state-disabled')
                  .attr('disabled', 'disabled')
                  .attr('aria-disabled', 'true');
            }
        },

        /**
         * Enables CSS and jQuery animation.
         */
        enableAnimations: function() {
            $.fx.off = false;
            PrimeFaces.animationEnabled = true;
        },

        /**
         * Disables CSS and jQuery animation.
         */
        disableAnimations: function() {
            $.fx.off = true;
            PrimeFaces.animationEnabled = false;
        },

        /**
         * CSS Transition method for overlay panels such as SelectOneMenu/SelectCheckboxMenu/Datepicker's panel etc.
         * @param {JQuery | undefined | null} element An element for which to execute the transition.
         * @param {string | undefined | null} className Class name used for transition phases.
         * @return {PrimeFaces.CssTransitionHandler | null} Two handlers named `show` and `hide` that should be invoked
         * when the element gets shown and hidden. If the given element or className property is `undefined` or `null`,
         * this function returns `null`.
         */
        registerCSSTransition: function(element, className) {
            if (element && className != null) {
                var classNameStates = {
                   'enter': className + '-enter',
                   'enterActive': className + '-enter-active',
                   'enterDone': className + '-enter-done',
                   'exit': className + '-exit',
                   'exitActive': className + '-exit-active',
                   'exitDone': className + '-exit-done'
                };
                var callTransitionEvent = function(callbacks, key, param) {
                    if (callbacks != null && callbacks[key] != null) {
                        callbacks[key].call(param);
                    }
                };

                return {
                    show: function(callbacks) {
                        //clear exit state classes
                        element.removeClass([classNameStates.exit, classNameStates.exitActive, classNameStates.exitDone]);

                        if (element.is(':hidden')) {
                            if (PrimeFaces.animationEnabled) {
                                PrimeFaces.animationActive = true;
                                element.css('display', 'block').addClass(classNameStates.enter);
                                callTransitionEvent(callbacks, 'onEnter');

                                requestAnimationFrame(function() {
                                    setTimeout(function() {
                                        element.addClass(classNameStates.enterActive);
                                    }, 0);

                                    element.one('transitionrun.css-transition-show', function(event) {
                                        callTransitionEvent(callbacks, 'onEntering', event);
                                    }).one('transitioncancel.css-transition-show', function() {
                                        element.removeClass([classNameStates.enter, classNameStates.enterActive, classNameStates.enterDone]);
                                        PrimeFaces.animationActive = false;
                                    }).one('transitionend.css-transition-show', function(event) {
                                        element.removeClass([classNameStates.enterActive, classNameStates.enter]).addClass(classNameStates.enterDone);
                                        callTransitionEvent(callbacks, 'onEntered', event);
                                        PrimeFaces.animationActive = false;
                                    });
                                });
                            }
                            else {
                                // animation globally disabled still call downstream callbacks
                                element.css('display', 'block');
                                callTransitionEvent(callbacks, 'onEnter');
                                callTransitionEvent(callbacks, 'onEntering');
                                callTransitionEvent(callbacks, 'onEntered');
                            }
                        }
                    },
                    hide: function(callbacks) {
                        //clear enter state classes
                        element.removeClass([classNameStates.enter, classNameStates.enterActive, classNameStates.enterDone]);

                        if (element.is(':visible')) {
                            if (PrimeFaces.animationEnabled) {
                                PrimeFaces.animationActive = true;
                                element.addClass(classNameStates.exit);
                                callTransitionEvent(callbacks, 'onExit');

                                setTimeout(function() {
                                    element.addClass(classNameStates.exitActive);
                                }, 0);

                                element.one('transitionrun.css-transition-hide', function(event) {
                                    callTransitionEvent(callbacks, 'onExiting', event);
                                }).one('transitioncancel.css-transition-hide', function() {
                                    element.removeClass([classNameStates.exit, classNameStates.exitActive, classNameStates.exitDone]);
                                    PrimeFaces.animationActive = false;
                                }).one('transitionend.css-transition-hide', function(event) {
                                    element.css('display', 'none').removeClass([classNameStates.exitActive, classNameStates.exit]).addClass(classNameStates.exitDone);
                                    callTransitionEvent(callbacks, 'onExited', event);
                                    PrimeFaces.animationActive = false;
                                });
                            }
                            else {
                                // animation globally disabled still call downstream callbacks
                                callTransitionEvent(callbacks, 'onExit');
                                callTransitionEvent(callbacks, 'onExiting');
                                callTransitionEvent(callbacks, 'onExited');
                                element.css('display', 'none');
                            }
                        }
                    }
                };
            }

            return null;
        },
        /**
         * Count the bytes of the inputtext.
         * borrowed from the ckeditor wordcount plugin
         * @private
         * @param {string} text Text to count bytes from.
         * @return {number} the byte count
         */
        countBytes: function(text) {
            var count = 0, stringLength = text.length, i;
            text = String(text || "");
            for (i = 0; i < stringLength; i++) {
                var partCount = encodeURI(text[i]).split("%").length;
                count += partCount === 1 ? 1 : partCount - 1;
            }
            return count;
        },
        /**
         * This method concatenates the classes into a string according to the condition of the arguments and returns it.
         * @private
         * @return {string} class
         */
        styleClass: function() {
            var args = Array.prototype.slice.call(arguments);

            if (args) {
                var classes = [];

                for (var i = 0; i < args.length; i++) {
                    var className = args[i];

                    if (!className) continue;

                    var type = typeof className;

                    if (type === 'string' || type === 'number') {
                        classes.push(className);
                    }
                    else if (type === 'object') {
                        var _classes = Array.isArray(className) ? className : Object.keys(className).map(function(key) { return !!className[key] ? key : null });

                        classes = _classes.length ? classes.concat(_classes.filter(function(c) { return !!c })) : classes;
                    }
                }

                return classes.join(' ');
            }

            return undefined;
        },

        /**
         * When configuring numeric value like 'showDelay' and the user wants '0' we can't treat 0 as Falsey 
         * so we make the value 0.  Otherwise Falsey returns the default value.
         *
         * @param {number|undefined} value the original value
         * @param {number} defaultValue the required default value if value is not set
         * @return {number} the calculated value
         */
        defaultNumeric: function(value, defaultValue) {
            if (value === 0) {
                return 0;
            }
            return value || defaultValue;
        },

        /**
         * Is this component wrapped in a float label?
         *
         * @param {JQuery | undefined | null} jq An element to check if wrapped in float label. 
         * @return {boolean} true this this JQ has a float label parent
         */
        hasFloatLabel: function(jq) {
            if (!jq || !jq.parent()) {
                return false;
            }
            return jq.parent().hasClass('ui-float-label');
        },

        /**
         * Handles floating label CSS if wrapped in a floating label.
         * @private
         * @param {JQuery | undefined} element the to add the CSS classes to
         * @param {JQuery | undefined} input the input to check if filled
         * @param {boolean | undefined} hasFloatLabel true if this is wrapped in a floating label
         */
        updateFloatLabel: function(element, input, hasFloatLabel) {
            if (!element || !input || !hasFloatLabel) {
                return;
            }
            if (input.val() !== '' || element.find('.ui-chips-token').length !== 0) {
                element.addClass('ui-inputwrapper-filled');
            }
            else {
                element.removeClass('ui-inputwrapper-filled');
            }
        },

        /**
         * Decode escaped XML into regular string.
         *
         * @param {string | undefined} input the input to check if filled
         * @return {string | undefined} either the original string or escaped XML
         */
        decodeXml: function(input) {
            if (/&amp;|&quot;|&#39;|'&lt;|&gt;/.test(input)) {
                var doc = new DOMParser().parseFromString(input, "text/html");
                return doc.documentElement.textContent;
            }
            return input;
        }
    };

}
;/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
  // The base Class implementation (does nothing)
  this.Class = function(){};

  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;

    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;

            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];

            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);
            this._super = tmp;

            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }

    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;

    return Class;
  };
})();

if (!PrimeFaces.widget) {

    /**
     * This object contains the  widget classes that are currently available. The key is the name of the widget, the
     * value the class (constructor) of the widget. Please note that widgets are usually created by the PrimeFaces
     * framework and should not be created manually.
     *
     * There are a few base classes defined by PrimeFaces that you can use when writing the client-side part of your
     * custom widget:
     *
     * - {@link BaseWidget}: Base class that you should extend if you do not required any advanced functionality.
     * - {@link DeferredWidget}: When you widget needs to be initialized on the client in a way does required the
     * element to be visible, you can use this class as a base. A widget may not be visible, for example, when it is
     * inside a dialog or tab. The deferred widget provides the the method {@link DeferredWidget.addDeferredRender}
     * (to register a listener) and {@link DeferredWidget.renderDeferred} (to render the widget once it is visible).
     * - {@link DynamicOverlayWidget}: When your widget is an overlay with dynamically loaded content, you can use this
     * base class.
     *
     * Note to TypeScript users: you could use these widget classes to check whether a widget instance is of a certain
     * type:
     *
     * <details>
     *
     * <summary>Click to view</summary>
     *
     * ```typescript
     * type Constructor<T> = new (...args: any) => T;
     *
     * function getWidgetName(
     *   widgetType:
     *     PrimeFaces.widget.BaseWidget
     *     | Constructor<PrimeFaces.widget.BaseWidget>
     * ): string {
     *   if (typeof widgetType === "function") {
     *     for (const [name, type] of Object.entries(PrimeFaces.widget)) {
     *       if (type === widgetType) {
     *         return name;
     *       }
     *     }
     *   }
     *   else {
     *     const widgetClass = Object.getPrototypeOf(widgetType);
     *     for (const [name, type] of Object.entries(PrimeFaces.widget)) {
     *       if (
     *         "prototype" in type && widgetClass === type.prototype
     *         || widgetClass === type
     *       ) {
     *         return name;
     *       }
     *     }
     *   }
     *   return "BaseWidget";
     * }
     *
     * function getWidgetOfType<
     *   C extends Constructor<any> = Constructor<PrimeFaces.widget.BaseWidget>
     * >(widgetVar: string, widgetType: C): InstanceType<C> | undefined {
     *   const widget = PF(widgetVar);
     *   if (widget !== undefined && widget !== null) {
     *     if (widget instanceof widgetType) {
     *       // @ts-ignore
     *       return widget;
     *     }
     *     else {
     *       PrimeFaces.error([
     *         `Widget for var '${widgetVar}' of type '${getWidgetName(widget)}'`,
     *         `was found, but expected type '${getWidgetName(widgetType)}'!`
     *       ].join(" "));
     *       return undefined;
     *     }
     *   }
     *   else {
     *     return undefined;
     *   }
     * }
     * ```
     *
     * </details>
     *
     * This function could then be called like this:
     *
     * ```typescript
     * // Automatically inferred to be of type "PrimeFaces.widget.Chart | undefined"
     * const chart = getWidgetByVar("charWidgetVar", PrimeFaces.widget.Chart);
     * ```
     *
     * @namespace
     */
    PrimeFaces.widget = {};

    /**
     * __PrimeFaces Base Widget__
     *
     * BaseWidget for the PrimeFaces widgets framework.
     *
     * It provides some common functionality for other widgets. All widgets should inherit from this class, or an
     * appropriate sub class in the following manner:
     *
     * ```javascript
     * class MyWidget extends PrimeFaces.widget.BaseWidget {
     *
     *   init(cfg) {
     *     super.init(cfg);
     *     // custom initialization
     *   }
     *
     *   // more methods required by your widget
     *
     * }
     * ```
     *
     * Or, alternatively, if you need to support old browsers and do not wish to transpile your code:
     *
     * ```javascript
     * PrimeFaces.widget.MyWidget = PrimeFaces.widget.BaseWidget.extend({
     *   init: function(cfg) {
     *     this._super(cfg);
     *   }
     * });
     * ```
     *
     * If your widget needs to be visible before it can be rendered, consider using the {@link DeferredWidget} as a
     * base class instead.
     *
     * @typedef PrimeFaces.widget.RefreshListener A refresh listener for a PrimeFaces widget. It is invoked when the
     * widget is reloaded, such as during AJAX updates. Use {@link BaseWidget.addRefreshListener} to add a refresh
     * listener.
     * @template PrimeFaces.widget.RefreshListener.TWidget The type of the widget that is being refreshed.
     * @this {TWidget} PrimeFaces.widget.RefreshListener
     * @param {TWidget} PrimeFaces.widget.RefreshListener.widget The widget that is being refreshed.
     *
     * @typedef PrimeFaces.widget.DestroyListener A destroy listener for a PrimeFaces widget. It is invoked when the
     * widget is removed, such as during AJAX updates. Use {@link BaseWidget.addDestroyListener} to add a destroy
     * listener.
     * @template PrimeFaces.widget.DestroyListener.TWidget The type of the widget that is being destroyed.
     * @this {TWidget} PrimeFaces.widget.DestroyListener
     * @param {TWidget} PrimeFaces.widget.DestroyListener.widget The widget that is being destroyed.

     * @typedef PrimeFaces.widget.PostConstructCallback A callback for a PrimeFaces widget. An optional callback that is
     * invoked after a widget was created successfully, at the end of the {@link BaseWidget.init | init} method. This is
     * usually specified via the `widgetPostConstruct` attribute on the JSF component. Note that this is also called
     * during a `refresh` (AJAX update).
     * @this {BaseWidget} PrimeFaces.widget.PostConstructCallback
     * @param {BaseWidget} PrimeFaces.widget.PostConstructCallback.widget The widget that was constructed.
     * 
     * @typedef PrimeFaces.widget.PostRefreshCallback An optional callback that is invoked after a widget was refreshed
     * after an AJAX update, at the end of the {@link BaseWidget.refresh | refresh} method. This is usually specified
     * via the `widgetPostRefresh` attribute on the JSF component.
     * @this {BaseWidget} PrimeFaces.widget.PostRefreshCallback
     * @param {BaseWidget} PrimeFaces.widget.PostRefreshCallback.widget The widget that was refreshed.
     * 
     * @typedef PrimeFaces.widget.PreDestroyCallback An optional callback that is invoked before a widget is about to be
     * destroyed, e.g. when the component was removed at the end of an AJAX update. This is called at the beginning
     * of the {@link BaseWidget.destroy | destroy} method. This is usually specified via the `widgetPreDestroy`
     * attribute on the JSF component.
     * @this {BaseWidget} PrimeFaces.widget.PreDestroyCallback
     * @param {BaseWidget} PrimeFaces.widget.PreDestroyCallback.widget The widget that is about to be destroyed.
     * 
     * @template {PrimeFaces.widget.BaseWidgetCfg} [TCfg=PrimeFaces.widget.BaseWidgetCfg] Type of the configuration
     * object for this widget.
     *
     * @prop {PrimeFaces.PartialWidgetCfg<TCfg>} cfg The configuration of this widget instance. Please note that
     * no property is guaranteed to be present, you should always check for `undefined` before accessing a property.
     * This is partly because the value of a property is not transmitted from the server to the client when it equals
     * the default.
     * @prop {PrimeFaces.widget.DestroyListener<BaseWidget>[]} destroyListeners Array of registered listeners invoked
     * when this widget is destroyed. You should normally not use modify this directly, use {@link addDestroyListener}
     * instead.
     * @prop {string | string[]} id The client-side ID of this widget, with all parent naming containers, such as
     * `myForm:myWidget`. This is also the ID of the container HTML element for this widget. In case the widget needs
     * multiple container elements (such as {@link Paginator}), this may also be an array if IDs.
     * @prop {JQuery} jq The jQuery instance of the container element of this widget. In case {@link id} is an array, it
     * will contain multiple elements. Please note that some widgets have got not DOM elements at all, in this case this
     * will be an empty jQuery instance.
     * @prop {string} jqId A CSS selector for the container element (or elements, in case {@link id} is an array) of
     * this widget, This is usually an ID selector (that is properly escaped). You can select the container element or
     * elements like this: `$(widget.jqId)`.
     * @prop {PrimeFaces.widget.RefreshListener<BaseWidget>[]} refreshListeners Array of registered listeners invoked
     * when this widget is refreshed. You should normally not use modify this directly, use {@link addRefreshListener}
     * instead.
     * @prop {string} widgetVar The name of the widget variables of this widget. The widget variable can be used to
     * access a widget instance by calling `PF('myWidgetVar')`.
     * 
     * @method constructor Creates a new instance of this widget. Please note that you should __NOT__ override this
     * constructor. Instead, override the {@link init} method, which is called at the end of the constructor once the
     * instance is created.
     * @constructor constructor
     * @param {PrimeFaces.PartialWidgetCfg<TCfg>} constructor.cfg The widget configuration to be used for this widget
     * instance. This widget configuration is usually created on the server by the `javax.faces.render.Renderer` for
     * this component.
     *
     * @interface {PrimeFaces.widget.BaseWidgetCfg} cfg The configuration for the {@link  BaseWidget| BaseWidget widget}.
     * You can access this configuration via {@link PrimeFaces.widget.BaseWidget.cfg|BaseWidget.cfg}. Please note that this
     * configuration is usually meant to be read-only and should not be modified. This configuration is
     * always accessible via the `cfg` property of a widget and consists of key-value pairs. Please note that, in order
     * to save bandwidth, the server only sends a value for a given configuration key when the value differs from the
     * default value. That is, you must expect any configuration value to be absent and make sure you check for its
     * presence before accessing it.
     *
     * @prop {Record<string, PrimeFaces.Behavior>} cfg.behaviors A map with all behaviors that
     * were defined for this widget. The key is the name of the behavior, the value is the callback function that is
     * invoked when the behavior is called.
     * @prop {string} [cfg.formId] ID of the form to use for AJAX requests.
     * @prop {string | string[]} cfg.id The client-side ID of the widget, with all parent naming containers, such as
     * `myForm:myWidget`. This is also the ID of the container HTML element for this widget. In case the widget needs
     * multiple container elements (such as {@link Paginator}), this may also be an array if IDs.
     * @prop {PrimeFaces.widget.PostConstructCallback} cfg.postConstruct An optional callback that is invoked
     * after this widget was created successfully, at the end of the {@link BaseWidget.init | init} method. This is
     * usually specified via the `widgetPostConstruct` attribute on the JSF component. Note that this is also called
     * during a `refresh` (AJAX update).
     * @prop {PrimeFaces.widget.PostRefreshCallback} cfg.postRefresh An optional callback that is invoked after
     * this widget was refreshed after an AJAX update, at the end of the {@link BaseWidget.refresh | refresh} method.
     * This is usually specified via the `widgetPostRefresh` attribute on the JSF component.
     * @prop {PrimeFaces.widget.PreDestroyCallback} cfg.preDestroy An optional callback that is invoked before
     * this widget is about to be destroyed, e.g. when the component was removed at the end of an AJAX update. This is
     * called at the beginning of the {@link BaseWidget.destroy | destroy} method. This is usually specified via the
     * `widgetPreDestroy` attribute on the JSF component.
     * @prop {string} cfg.widgetVar The name of the widget variables of this widget. The widget variable can be used to
     * access a widget instance by calling `PF("myWidgetVar")`.
     */
    PrimeFaces.widget.BaseWidget = Class.extend({

        /**
         * A widget class should not declare an explicit constructor, the default constructor provided by this base
         * widget should be used. Instead, override this initialize method which is called after the widget instance
         * was constructed. You can use this method to perform any initialization that is required. For widgets that
         * need to create custom HTML on the client-side this is also the place where you should call your render
         * method.
         *
         * Please make sure to call the super method first before adding your own custom logic to the init method:
         *
         * ```javascript
         * PrimeFaces.widget.MyWidget = PrimeFaces.widget.BaseWidget.extend({
         *   init: function(cfg) {
         *     this._super(cfg);
         *     // custom initialization
         *   }
         * });
         * ```
         *
         * @param {PrimeFaces.PartialWidgetCfg<TCfg>} cfg The widget configuration to be used for this widget instance.
         * This widget configuration is usually created on the server by the `javax.faces.render.Renderer` for this
         * component.
         */
        init: function(cfg) {
            this.cfg = cfg;
            this.id = cfg.id;
            if (Array.isArray(this.id)) {
                this.jqId = $.map(this.id, function(id) {
                    return PrimeFaces.escapeClientId(id);
                }).join(",");
            }
            else {
                this.jqId = PrimeFaces.escapeClientId(this.id);
            }
            this.jq = $(this.jqId);
            this.widgetVar = cfg.widgetVar;
            this.destroyListeners = [];
            this.refreshListeners = [];

            //remove script tag
            this.removeScriptElement(this.id);

            if (this.widgetVar) {
                var $this = this;
                this.jq.on("remove", function() {
                    PrimeFaces.detachedWidgets.push($this.widgetVar);
                });
            }
        },

        /**
         * Used in ajax updates, reloads the widget configuration.
         *
         * When an AJAX call is made and this component is updated, the DOM element is replaced with the newly rendered
         * content. However, no new instance of the widget is created. Instead, after the DOM element was replaced, this
         * method is called with the new widget configuration from the server. This makes it possible to persist
         * client-side state during an update, such as the currently selected tab.
         *
         * Please note that instead of overriding this method, you should consider adding a refresh listener instead
         * via {@link addRefreshListener}. This has the advantage of letting you add multiple listeners, and makes it
         * possible to add additional listeners from code outside this widget.
         *
         * By default, this method calls all refresh listeners, then reinitializes the widget by calling the `init`
         * method.
         *
         * @param {PrimeFaces.PartialWidgetCfg<TCfg>} cfg The new widget configuration from the server.
         * @return {unknown} The value as returned by the `init` method, which is often `undefined`.
         */
        refresh: function(cfg) {
            this.destroyListeners = [];

            if (this.refreshListeners) {
                for (var i = 0; i < this.refreshListeners.length; i++) {
                    var refreshListener = this.refreshListeners[i];
                    refreshListener.call(this, this);
                }
            }
            this.refreshListeners = [];

            var returnValue = this.init(cfg);
            return returnValue;
        },

        /**
         * Will be called after an AJAX request if the widget container will be detached.
         *
         * When an AJAX call is made and this component is updated, the DOM element is replaced with the newly rendered
         * content. When the element is removed from the DOM by the update, the DOM element is detached from the DOM and
         * this method gets called.
         *
         * Please note that instead of overriding this method, you should consider adding a destroy listener instead
         * via {@link addDestroyListener}. This has the advantage of letting you add multiple listeners, and makes it
         * possible to add additional listeners from code outside this widget.
         *
         * By default, this method just calls all destroy listeners.
         */
        destroy: function() {
            if (this.cfg.preDestroy) {
                this.cfg.preDestroy.call(this, this);
            }

            PrimeFaces.debug("Destroyed detached widget: " + this.widgetVar);

            if (this.destroyListeners) {
                for (var i = 0; i < this.destroyListeners.length; i++) {
                    var destroyListener = this.destroyListeners[i];
                    destroyListener.call(this, this);
                }
            }
            this.destroyListeners = [];
        },

        /**
         * Checks if this widget is detached, ie whether the HTML element of this widget is currently contained within
         * the DOM (the HTML body element). A widget may become detached during an AJAX update, and it may remain
         * detached in case the update removed this component from the component tree.
         * @return {boolean} `true` if this widget is currently detached, or `false` otherwise.
         */
        isDetached: function() {
            var element = document.getElementById(this.id);
            if (typeof(element) !== 'undefined' && element !== null) {
                return false;
            }

            return true;
        },

        /**
         * Each widget has got a container element, this method returns that container. This container element is
         * usually also the element whose ID is the client-side ID of the JSF component.
         * @return {JQuery} The jQuery instance representing the main HTML container element of this widget.
         */
        getJQ: function(){
            return this.jq;
        },

        /**
         * Removes the widget's script block from the DOM. Currently, the ID of this script block consists of the
         * client-side ID of this widget with the prefix `_s`, but this is subject to change.
         *
         * @param {string | string[]} clientId The client-side ID of the widget.
         */
        removeScriptElement: function(clientId) {
            if (Array.isArray(clientId)) {
                $.each(clientId, function(_, id) {
                    $(PrimeFaces.escapeClientId(id) + '_s').remove();
                });
            }
            else {
                $(PrimeFaces.escapeClientId(clientId) + '_s').remove();
            }
        },

        /**
         * Each widget may have one or several behaviors attached to it. This method checks whether this widget has got
         * at least one behavior associated with given event name.
         *
         * A behavior is a way for associating client-side scripts with UI components that opens all sorts of
         * possibilities, including client-side validation, DOM and style manipulation, keyboard handling, and more.
         * When the behavior is triggered, the configured JavaScript gets executed.
         *
         * Behaviors are often, but not necessarily, AJAX behavior. When triggered, it initiates a request the server
         * and processes the response once it is received. This enables several features such as updating or replacing
         * elements dynamically. You can add an AJAX behavior via
         * `<p:ajax event="name" actionListener="#{...}" onstart="..." />`.
         *
         * @param {string} event The name of an event to check.
         * @return {boolean} `true` if this widget has the given behavior, `false` otherwise.
         */
        hasBehavior: function(event) {
            if(this.cfg.behaviors) {
                return this.cfg.behaviors[event] != undefined;
            }

            return false;
        },

        /**
         * Each widget may have one or several behaviors attached to it. This method calls all attached behaviors for
         * the given event name. In case no such behavior exists, this method does nothing and returns immediately.
         *
         * A behavior is a way for associating client-side scripts with UI components that opens all sorts of
         * possibilities, including client-side validation, DOM and style manipulation, keyboard handling, and more.
         * When the behavior is triggered, the configured JavaScript gets executed.
         *
         * Behaviors are often, but not necessarily, AJAX behavior. When triggered, it initiates a request the server
         * and processes the response once it is received. This enables several features such as updating or replacing
         * elements dynamically. You can add an AJAX behavior via
         * `<p:ajax event="name" actionListener="#{...}" onstart="..." />`.
         *
         * @param {string} event The name of an event to call.
         * @param {Partial<PrimeFaces.ajax.ConfigurationExtender>} [ext] Additional configuration that is passed to the
         * AJAX request for the server-side callback.
         * @since 7.0
         */
        callBehavior: function(event, ext) {
            if(this.hasBehavior(event)) {
                this.cfg.behaviors[event].call(this, ext);
            }
        },

        /**
         * Each widget may have one or several behaviors attached to it. This method returns the callback function for
         * the given event.
         *
         * __Note__: Do not call the method directly, the recommended way to invoke a behavior is via
         * {@link callBehavior}.
         *
         * A behavior is a way for associating client-side scripts with UI components that opens all sorts of
         * possibilities, including client-side validation, DOM and style manipulation, keyboard handling, and more.
         * When the behavior is triggered, the configured JavaScript gets executed.
         *
         * Behaviors are often, but not necessarily, AJAX behavior. When triggered, it initiates a request the server
         * and processes the response once it is received. This enables several features such as updating or replacing
         * elements dynamically. You can add an AJAX behavior via
         * `<p:ajax event="name" actionListener="#{...}" onstart="..." />`.
         *
         * @param {string} name The name of an event for which to retrieve the behavior.
         * @return {PrimeFaces.Behavior | null} The behavior with the given name, or `null` if no such behavior
         * exists.
         */
        getBehavior: function(name) {
            return this.cfg.behaviors ? this.cfg.behaviors[name] : null;
        },

        /**
         * Lets you register a listener that is called before the component is destroyed.
         *
         * When an AJAX call is made and this component is updated, the DOM element is replaced with the newly rendered
         * content. When the element is removed from the DOM by the update, the DOM element is detached from the DOM and
         * all destroy listeners are called. This makes it possible to add listeners from outside the widget code.
         *
         * If you call this method twice with the same listener, it will be registered twice and later also called
         * twice.
         *
         * Note that for this to work, you must not override the `destroy` method; or if you do, call `super`.
         *
         * Also, after this widget was detached is done, all destroy listeners will be unregistered.
         *
         * @param {PrimeFaces.widget.DestroyListener<this>} listener A destroy listener to be registered.
         * @since 7.0
         */
        addDestroyListener: function(listener) {
            if (!this.destroyListeners) {
                this.destroyListeners = [];
            }
            this.destroyListeners.push(listener);
        },

        /**
         * When an AJAX call is made and this component is updated, the DOM element is replaced with the newly rendered
         * content. However, no new instance of the widget is created. Instead, after the DOM element was replaced, all
         * refresh listeners are called. This makes it possible to add listeners from outside the widget code.
         *
         * If you call this method twice with the same listener, it will be registered twice and later also called
         * twice.
         *
         * Note that for this to work, you must not override the `refresh` method; or if you do, call `super`.
         *
         * Also, after the refresh is done, all refresh listeners will be deregistered. If you added the listeners from
         * within this widget, consider adding the refresh listeners not only in the `init` method, but also again in
         * the `refresh` method after calling `super`.
         *
         * @param {PrimeFaces.widget.RefreshListener<this>} listener A refresh listener to be registered.
         * @since 7.0.0
         */
        addRefreshListener: function(listener) {
            if (!this.refreshListeners) {
                this.refreshListeners = [];
            }
            this.refreshListeners.push(listener);
        },

        /**
         * Gets the closest parent form for this widget.
         *
         * @return {JQuery} A JQuery instance that either contains the form when found, or an empty JQuery instance when
         * the form could not be found.
         * @since 10.0.0
         */
        getParentForm: function() {
            return this.jq.closest('form');
        },

        /**
         * Gets the closest parent form ID for this widget lazily so it can be used in AJAX requests.
         *
         * @return {string | undefined} Either the form ID or `undefined` if no form can be found.
         * @since 10.0.0
         */
        getParentFormId: function() {
            if(this.cfg.formId) {
                return this.cfg.formId;
            }
            
            //look for a parent of source
            var form = this.getParentForm();
            if (form.length > 0) {
                this.cfg.formId = form.attr('id');
            }
            
            return this.cfg.formId;
        }
    });

    /**
     * __PrimeFaces DynamicOverlay Widget__
     *
     * Base class for widgets that are displayed as an overlay. At any given time, several overlays may be active. This
     * requires that the z-index of the overlays is managed globally. This base class takes care of that.
     *
     * @prop {string | null} appendTo The search expression for the element to which the overlay panel should be appended.
     * @prop {JQuery} modalOverlay The DOM element that is displayed as an overlay with the appropriate `z-index` and
     * `position`. It is usually a child of the `body` element.
     *
     * @interface {PrimeFaces.widget.DynamicOverlayWidgetCfg} cfg The configuration for the {@link  DynamicOverlayWidget| DynamicOverlayWidget widget}.
     * You can access this configuration via {@link PrimeFaces.widget.BaseWidget.cfg|BaseWidget.cfg}. Please note that this
     * configuration is usually meant to be read-only and should not be modified.
     * @extends {PrimeFaces.widget.BaseWidgetCfg} cfg
     *
     * @prop {boolean} cfg.blockScroll `true` to prevent the body from being scrolled, `false` otherwise.
     */
    PrimeFaces.widget.DynamicOverlayWidget = PrimeFaces.widget.BaseWidget.extend({

	    /**
	     * @override
    	 * @inheritdoc
         * @param {PrimeFaces.PartialWidgetCfg<TCfg>} cfg
    	 */
        init: function(cfg) {
            this._super(cfg);

            PrimeFaces.utils.registerDynamicOverlay(this, this.jq, this.id);
        },


        /**
         * @override
         * @inheritdoc
         * @param {PrimeFaces.PartialWidgetCfg<TCfg>} cfg
         */
        refresh: function(cfg) {
            PrimeFaces.utils.removeModal(this, this.modalOverlay);

            this.appendTo = null;
            this.modalOverlay = null;

            this._super(cfg);
        },

        /**
         * @override
         * @inheritdoc
         */
        destroy: function() {
            this._super();

            PrimeFaces.utils.removeModal(this);

            this.appendTo = null;
            this.modalOverlay = null;
        },

        /**
         * Enables modality for this widget and creates the modal overlay element, but does not change whether the
         * overlay is currently displayed.
         * @param {JQuery | null} [overlay] The target overlay, if not given default to
         * {@link PrimeFaces.widget.BaseWidget.jq | this.jq}.
         */
        enableModality: function(overlay) {
            var target = overlay||this.jq;
            this.modalOverlay = PrimeFaces.utils.addModal(this,
                target,
                $.proxy(function() {
                    return this.getModalTabbables();
                }, this));
        },

        /**
         * Disabled modality for this widget and removes the modal overlay element, but does not change whether the
         * overlay is currently displayed.
         * @param {JQuery | null} [overlay] The target overlay, if not given default to
         * {@link PrimeFaces.widget.BaseWidget.jq | this.jq}.
         */
        disableModality: function(overlay){
            var target = overlay||this.jq;
            PrimeFaces.utils.removeModal(this, target);
            this.modalOverlay = null;
        },

        /**
         * This class makes sure a user cannot tab out of the modal and it stops events from targets outside of the
         * overlay element. This requires that we switch back to the modal in case a user tabs out of it. What must
         * be returned by this method are the elements to which the user may switch via tabbing.
         * @protected
         * @return {JQuery} The DOM elements which are allowed to be focused via tabbing. May be an empty `jQuery`
         * instance when the modal contains no tabbable elements, but must not be `undefined`.
         */
        getModalTabbables: function(){
            return null;
        }
    });

    /**
     * __PrimeFaces Deferred Widget__
     *
     * Base class for widgets that require their container to be visible to initialize properly.
     *
     * For example, a widget may need to know the width and height of its container so that it can resize itself
     * properly.
     *
     * Do not call the {@link render} or {@link _render} method directly in the {@link init} method. Instead, call
     * {@link renderDeferred}. PrimeFaces will then check whether the widget is visible and call the {@link _render}
     * method once it is. Make sure you actually override the {@link _render} method, as the default implementation
     * throws an error.
     *
     * ```javascript
     * class MyWidget extends PrimeFaces.widget.DeferredWidget {
     *   init(cfg) {
     *     super.init(cfg);
     *
     *     // more code if needed
     *     // ...
     *
     *     // Render this widget once its container is visible.
     *     this.renderDeferred();
     *   }
     *
     *   _render() {
     *     // Perform your render logic here, create DOM elements etc.
     *   }
     * }
     * ```
     *
     * @interface {PrimeFaces.widget.DeferredWidgetCfg} cfg The configuration for the {@link  DeferredWidget| DeferredWidget widget}.
     * You can access this configuration via {@link PrimeFaces.widget.BaseWidget.cfg|BaseWidget.cfg}. Please note that
     * this configuration is usually meant to be read-only and should not be modified.
     * @extends {PrimeFaces.widget.BaseWidgetCfg} cfg
     */
    PrimeFaces.widget.DeferredWidget = PrimeFaces.widget.BaseWidget.extend({

        /**
         * Call this method in the {@link init} method if you want deferred rendering support. This method checks
         * whether the container of this widget is visible and call {@link _render} only once it is.
         */
        renderDeferred: function() {
            if(this.jq.is(':visible')) {
                this._render();
                this.postRender();
            }
            else if (this.jq[0]) {
                var container = this.jq[0].closest('.ui-hidden-container');
                if (container) {
                    var $container = $(container);
                    if($container.length) {
                        var $this = this;
                        this.addDeferredRender(this.id, $container, function() {
                            return $this.render();
                        });
                    }
                }
            }
        },

        /**
         * This render method to check whether the widget container is visible. Do not override this method, or the
         * deferred widget functionality may not work properly anymore.
         *
         * @return {PrimeFaces.ReturnOrVoid<boolean|undefined>} `true` if the widget container is visible, `false` or
         * `undefined` otherwise.
         */
        render: function() {
            if(this.jq.is(':visible')) {
                this._render();
                this.postRender();
                return true;
            }
            else {
                return false;
            }
        },

        /**
         * This render method is called by this deferred widget once the widget container has become visible. You may
         * now proceed with widget initialization.
         *
         * __Must be overridden__, or an error will be thrown.
         *
         * @include
         * @protected
         */
        _render: function() {
            throw 'Unsupported Operation';
        },

        /**
         * Called after the widget has become visible and after it was rendered. May be overridden, the default
         * implementation is a no-op.
         * @protected
         */
        postRender: function() {

        },

        /**
         * Cleans up deferred render tasks. When you extend this class and override this method, make sure to call
         * `super`.
         * @override
         */
        destroy: function() {
            this._super();
            PrimeFaces.removeDeferredRenders(this.id);
        },

        /**
         * Adds a deferred rendering task for the given widget to the queue.
         * @protected
         * @param {string} widgetId The ID of a deferred widget.
         * @param {JQuery} container The container element that should be visible.
         * @param {() => boolean} callback Callback that is invoked when the widget _may_ possibly have become visible.
         * Should return `true` when the widget was rendered, or `false` when the widget still needs to be rendered
         * later.
         */
        addDeferredRender: function(widgetId, container, callback) {
            PrimeFaces.addDeferredRender(widgetId, container.attr('id'), callback);

            if(container.is(':hidden')) {
                var parentContainer = this.jq.closest('.ui-hidden-container');

                if(parentContainer.length) {
                    this.addDeferredRender(widgetId, container.parent().closest('.ui-hidden-container'), callback);
                }
            }
        }
    });
}
;if (!PrimeFaces.resources) {

   /**
    * The object with functionality related to handling resources on the server, such as CSS and JavaScript files.
    * 
    * @namespace
    */
    PrimeFaces.resources = {
          /**
           * Builds a JSF resource URL for given resource.
           * 
           * ```javascript
           * getFacesResource("main.css", "pf", "4.2.0") // => "https://www.primefaces.org/showcase/javax.faces.resource/main.css.xhtml?ln=pf&v=4.2.0"
           * ```
           *
           * @param {string} name The name of the resource, such as `primefaces.js`.
           * @param {string} library The library of the resource, such as `primefaces`.
           * @param {string} version The version of the library, such as `5.1`.
           * @return {string} The JSF resource URL for loading the resource.
           */
          getFacesResource : function(name, library, version) {
             // just get sure - name shoudln't start with a slash
             if (name.indexOf('/') === 0) {
                name = name.substring(1, name.length);
             }

             // find any JS served JSF resource
             var scriptURI = PrimeFaces.resources.getResourceScriptURI();
             var scriptName = PrimeFaces.resources.getResourceScriptName(scriptURI);

             // replace core.js with our custom name
             scriptURI = scriptURI.replace(scriptName, name);

             // find the library like ln=primefaces
             var libraryRegex = new RegExp('[?&]([^&=]*)ln=(.*?)(&|$)');

             // find library to replace e.g. 'ln=primefaces'
             var currentLibraryName = 'ln=' + libraryRegex.exec(scriptURI)[2];

             // In a portlet environment, url parameters may be namespaced.
             var namespace = '';
             var urlParametersAreNamespaced = !(scriptURI.indexOf('?' + currentLibraryName) > -1 || 
                   scriptURI.indexOf('&'+ currentLibraryName) > -1);

             if (urlParametersAreNamespaced) {
                namespace = new RegExp('[?&]([^&=]+)' + currentLibraryName + '($|&)').exec(scriptURI)[1];
             }

             // If the parameters are namespaced, the namespace must be included
             // when replacing parameters.
             scriptURI = scriptURI.replace(namespace + currentLibraryName, namespace + 'ln=' + library);

             if (version) {
                var extractedVersion = new RegExp('[?&]' + namespace + 'v=([^&]*)').exec(scriptURI)[1];
                scriptURI = scriptURI.replace(namespace + 'v=' + extractedVersion, namespace + 'v=' + version);
             }

             var prefix = window.location.protocol + '//' + window.location.host;
             return scriptURI.indexOf(prefix) >= 0 ? scriptURI : prefix + scriptURI;
          },

          /**
           * Checks if the FacesServlet is mapped with an extension mapping. Common extension mapping are for example:
           * 
           * - .jsf
           * - .xhtml
           * 
           * @return {boolean} `true` if the FacesServlet is mapped with an extension mapping, `false` otherwise.
           */
          isExtensionMapping : function() {
             if (!PrimeFaces.resources.IS_EXTENSION_MAPPING) {
                var scriptURI = PrimeFaces.resources.getResourceScriptURI();
                var scriptName = PrimeFaces.resources.getResourceScriptName(scriptURI);
                PrimeFaces.resources.IS_EXTENSION_MAPPING = scriptURI.charAt(scriptURI.indexOf(scriptName) + scriptName.length) === '.';
             }

             return PrimeFaces.IS_EXTENSION_MAPPING;
          },

          /**
           * Finds the URL extension of currently included resources, such as `jsf` or `xhtml`.
           * 
           * This should only be used if extensions mapping is used, see `PrimeFaces.isExtensionMapping`.
           * 
           * @return {string} The URL extension.
           */
          getResourceUrlExtension : function() {
             if (!PrimeFaces.resources.RESOURCE_URL_EXTENSION) {
                var scriptURI = PrimeFaces.resources.getResourceScriptURI();
                var scriptName = PrimeFaces.resources.getResourceScriptName(scriptURI);
                PrimeFaces.resources.RESOURCE_URL_EXTENSION = RegExp(scriptName + '.([^?]*)').exec(scriptURI)[1];
             }

             return PrimeFaces.resources.RESOURCE_URL_EXTENSION;
          },

          /**
           * Given a URI, find the name of the script, such as `primefaces-extensions.js`.
           * 
           * @param {string} scriptURI The URI of a script
           * @return {string} The name of the script.
           */
          getResourceScriptName : function(scriptURI) {
             // find script...normal is '/core.js' and portlets are '=core.js'
             var scriptRegex = new RegExp('\\/?' + PrimeFaces.RESOURCE_IDENTIFIER + '(\\/|=)(.*?)\\.js');
             return scriptRegex.exec(scriptURI)[2] + '.js';
          },

          /**
           * Gets the resource URI of the first Javascript JS file served as a JSF resource.
           * 
           * @return {string} The first JavasScript resource URI.
           */
          getResourceScriptURI : function() {
             if (!PrimeFaces.resources.SCRIPT_URI) {
                PrimeFaces.resources.SCRIPT_URI =
                   $('script[src*="/' + PrimeFaces.RESOURCE_IDENTIFIER + '/"]').first().attr('src');

                // portlet
                if (!PrimeFaces.resources.SCRIPT_URI) {
                   PrimeFaces.resources.SCRIPT_URI = $('script[src*="' + PrimeFaces.RESOURCE_IDENTIFIER + '="]').first().attr('src');
                }
             }
             return PrimeFaces.resources.SCRIPT_URI;
          }
    };

};if (!PrimeFaces.clientwindow) {

    /**
     * The object with functionality related to multiple window support in PrimeFaces applications.
     * 
     * @namespace
     */
    PrimeFaces.clientwindow = {

        /**
         * The name of the URL parameter holding the client window ID.
         * @type {string}
         * @readonly
         */
        CLIENT_WINDOW_URL_PARAM : "jfwid",

        /**
         * The key for the session storage entry holding the client window ID.
         * @type {string}
         * @readonly
         */
        CLIENT_WINDOW_SESSION_STORAGE : "pf.windowId",

        /**
         * The value of the temporary client window ID, used for requesting a new ID, see
         * {@link requestNewClientWindowId}.
         * @type {string}
         * @readonly
         */
        TEMP_CLIENT_WINDOW_ID : "temp",

        /**
         * The number of characters of the client window ID. Each client window ID must be of this length, or it is
         * invalid.
         * @type {number}
         * @readonly
         */
        LENGTH_CLIENT_WINDOW_ID : 5,

        /**
         * Whether the {@link init} function was called already.
         * @type {boolean}
         */
        initialized : false,

        /**
         * The current window ID, as received from the server. May be `null` when to ID was provided.
         * @type {null | string}
         */
        clientWindowId : null,

        /**
         * Whether the currently loaded page is from the first redirect.
         * @type {boolean}
         */
        initialRedirect : false,

        /**
         * Initializes the client window feature. Usually invoked on page load. This method should only be called once
         * per page.
         * @param {string} clientWindowId The current client window ID.
         * @param {boolean} initialRedirect Whether the currently loaded page is from the first redirect.
         */
        init: function(clientWindowId, initialRedirect) {
            if (PrimeFaces.clientwindow.initialized === true) {
                return;
            }

            this.initialized = true;

            this.clientWindowId = clientWindowId;
            this.initialRedirect = initialRedirect;

            this.cleanupCookies();
            this.assertClientWindowId();
        },

        /**
         * Makes sure the temporary cookie for the client window ID is expired.
         */
        cleanupCookies : function() {
            var urlWindowId = this.getUrlParameter(window.location.href, this.CLIENT_WINDOW_URL_PARAM);
            if (urlWindowId) {
                this.expireCookie('pf.initialredirect-' + urlWindowId);
            }
        },

        /**
         * Checks whether the client window ID is valid. If not, requests a new client window ID from the server via
         * reloading the current page.
         */
        assertClientWindowId: function() {
            var urlClientWindowId = this.getUrlParameter(window.location.href, this.CLIENT_WINDOW_URL_PARAM);
            var sessionStorageClientWindowId = sessionStorage.getItem(this.CLIENT_WINDOW_SESSION_STORAGE);

            // session story empty -> "open in new tab/window" was used
            if (sessionStorageClientWindowId === null) {
                // initial redirect
                // -> the windowId is valid - we don't need to a second request
                if (this.initialRedirect && urlClientWindowId === this.clientWindowId) {
                    sessionStorage.setItem(this.CLIENT_WINDOW_SESSION_STORAGE, this.clientWindowId);
                }
                // != initial redirect
                // -> request a new windowId to avoid multiple tabs with the same windowId
                else {
                    this.requestNewClientWindowId();
                }
            }
            else {
                // we triggered the windowId recreation last request
                if (sessionStorageClientWindowId === this.TEMP_CLIENT_WINDOW_ID) {
                    sessionStorage.setItem(this.CLIENT_WINDOW_SESSION_STORAGE, this.clientWindowId);
                }
                // security check length
                else if (sessionStorageClientWindowId.length !== this.LENGTH_CLIENT_WINDOW_ID) {
                    this.requestNewClientWindowId();
                }
                // session storage windowId doesn't match requested windowId
                // -> redirect to the same view with current windowId from the window name
                else if (sessionStorageClientWindowId !== urlClientWindowId || sessionStorageClientWindowId !== this.clientWindowId) {
                    window.location = this.replaceUrlParam(window.location.href, this.CLIENT_WINDOW_URL_PARAM, sessionStorageClientWindowId);
                }
            }
        },
        
        /**
         * Expires the current client window ID by replacing it with a temporary, invalid client window ID. Then reloads
         * the current page to request a new ID from the server.
         */
        requestNewClientWindowId : function() {
            sessionStorage.setItem(this.CLIENT_WINDOW_SESSION_STORAGE, this.TEMP_CLIENT_WINDOW_ID);
            
            // we remove the windowId if available and redirect to the same url again to create a new windowId
            window.location = this.replaceUrlParam(window.location.href, this.CLIENT_WINDOW_URL_PARAM, null);
        },

        /**
         * Returns the value of the URL parameter with the given name. When the URL contains multiple URL parameters
         * with the same name, the value of the first URL parameter is returned.
         * @param {string} uri An URL from which to extract an URL parameter.
         * @param {string} name Name of the URL parameter to retrieve.
         * @return {string | null} The value of the given URL parameter. Returns the empty string when the URL parameter
         * is present, but has no value. Returns `null` when no URL parameter with the given name exists.
         */
        getUrlParameter : function(uri, name) {
             // create an anchor object with the uri and let the browser parse it
             var a = document.createElement('a');
             a.href = uri;

             // check if a query string is available
             var queryString = a.search;
             if (queryString && queryString.length > 0) {
                 // create an array of query parameters - substring(1) removes the ? at the beginning of the query
                 var queryParameters = queryString.substring(1).split("&");
                 for (var i = 0; i < queryParameters.length; i++) {
                     var queryParameter = queryParameters[i].split("=");
                     if (queryParameter[0] === name) {
                         return queryParameter.length > 1 ? decodeURIComponent(queryParameter[1]) : "";
                     }
                 }
             }

             return null;
        },

        /**
         * Given a URL, removes all URL parameters with the given name, adds a new URL parameter with the given value,
         * and returns the new URL with the replaced parameter. If the URL contains multiple URL parameters with the
         * same name, they are all removed.
         * @param {string} uri The URL for which to change an URL parameter.
         * @param {string} parameterName Name of the URL parameter to change.
         * @param {string | null} [parameterValue] New value for the URL parameter. If `null` or not given, the empty
         * string is used.
         * @return {string} The given URL, but with value of the given URL parameter changed to the new value.
         */
        replaceUrlParam : function(uri, parameterName, parameterValue) {
            var a = document.createElement('a');
            a.href = uri;

            // set empty string as value if not defined or empty
            if (!parameterValue || parameterValue.replace(/^\s+|\s+$/g, '').length === 0) {
                parameterValue = '';
            }

            // check if value is empty
            if (parameterValue.length === 0) {

                // both value and query string is empty (or doesn't contain the param), don't touch the url
                if (a.search.length === 0 || a.search.indexOf(parameterName + "=") === -1) {
                    return a.href;
                }
            }

            // query string is empty, just append our new parameter
            if (a.search.length === 0) {
                a.search = '?' + encodeURIComponent(parameterName) + "=" + encodeURIComponent(parameterValue);

                return a.href;
            }

            var oldParameters = a.search.substring(1).split('&');
            var newParameters = [];
            newParameters.push(parameterName + "=" + encodeURIComponent(parameterValue));

            // loop old parameters, remove empty ones and remove the parameter with the same name as the new one
            for (var i = 0; i < oldParameters.length; i++) {
                var oldParameterPair = oldParameters[i];

                if (oldParameterPair.length > 0) {
                    var oldParameterName = oldParameterPair.split('=')[0];
                    var oldParameterValue = oldParameterPair.split('=')[1];

                    // don't add empty parameters again
                    if (oldParameterValue && oldParameterValue.replace(/^\s+|\s+$/g, '').length > 0) {
                        // skip the the old parameter if it's the same as the new parameter
                        if (oldParameterName !== parameterName) {
                            newParameters.push(oldParameterName + "=" + oldParameterValue);
                        }
                    }
                }
            }

            // join new parameters
            a.search = '?' + newParameters.join('&');

            return a.href;
        },

        /**
         * Expires the cookie with the given name by setting a cookie with the appropriate `max-age` and `expires`
         * settings.
         * @param {string} cookieName Name of the cookie to expire.
         */
        expireCookie : function(cookieName) {
            PrimeFaces.setCookie(cookieName, 'true', { path: '/', expires: -10, 'max-age': '0' });
        }
    };
}	
;if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        var el = this;
        do {
            if (el.matches(s))
                return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
      'use strict';

      if (search instanceof RegExp) {
        throw TypeError('first argument must not be a RegExp');
      }
      if (start === undefined) { start = 0; }
      return this.indexOf(search, start) !== -1;
    };
}

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(search, this_len) {
    if (this_len === undefined || this_len > this.length) {
      this_len = this.length;
    }
    return this.substring(this_len - search.length, this_len) === search;
  };
}

if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
        value: function(searchElement, fromIndex) {
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);
            var len = o.length >>> 0;

            if (len === 0) {
                return false;
            }

            var n = fromIndex | 0;
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            while (k < len) {
                if (o[k] === searchElement) {
                    return true;
                }
                k++;
            }

            return false;
        }
    });
}

if (!('remove' in Element.prototype)) {
    Element.prototype['remove'] = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}

;// polyfill for String.prototype.replaceall
// minified version of https://github.com/es-shims/String.prototype.replaceAll
!function(){return function t(e,r,n){function o(a,c){if(!r[a]){if(!e[a]){var p="function"==typeof require&&require;if(!c&&p)return p(a,!0);if(i)return i(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var l=r[a]={exports:{}};e[a][0].call(l.exports,function(t){return o(e[a][1][t]||t)},l,l.exports,t,e,r,n)}return r[a].exports}for(var i="function"==typeof require&&require,a=0;a<n.length;a++)o(n[a]);return o}}()({1:[function(t,e,r){t("string.prototype.replaceall").shim()},{"string.prototype.replaceall":40}],2:[function(t,e,r){},{}],3:[function(t,e,r){"use strict";var n=t("get-intrinsic"),o=t("./"),i=o(n("String.prototype.indexOf"));e.exports=function(t,e){var r=n(t,!!e);return"function"==typeof r&&i(t,".prototype.")>-1?o(r):r}},{"./":4,"get-intrinsic":29}],4:[function(t,e,r){"use strict";var n=t("function-bind"),o=t("get-intrinsic"),i=o("%Function.prototype.apply%"),a=o("%Function.prototype.call%"),c=o("%Reflect.apply%",!0)||n.call(a,i),p=o("%Object.getOwnPropertyDescriptor%",!0),u=o("%Object.defineProperty%",!0),l=o("%Math.max%");if(u)try{u({},"a",{value:1})}catch(t){u=null}e.exports=function(t){var e=c(n,a,arguments);p&&u&&(p(e,"length").configurable&&u(e,"length",{value:1+l(0,t.length-(arguments.length-1))}));return e};var f=function(){return c(n,i,arguments)};u?u(e.exports,"apply",{value:f}):e.exports.apply=f},{"function-bind":28,"get-intrinsic":29}],5:[function(t,e,r){"use strict";var n=t("object-keys"),o="function"==typeof Symbol&&"symbol"==typeof Symbol("foo"),i=Object.prototype.toString,a=Array.prototype.concat,c=Object.defineProperty,p=c&&function(){var t={};try{for(var e in c(t,"x",{enumerable:!1,value:t}),t)return!1;return t.x===t}catch(t){return!1}}(),u=function(t,e,r,n){var o;e in t&&("function"!=typeof(o=n)||"[object Function]"!==i.call(o)||!n())||(p?c(t,e,{configurable:!0,enumerable:!1,value:r,writable:!0}):t[e]=r)},l=function(t,e){var r=arguments.length>2?arguments[2]:{},i=n(e);o&&(i=a.call(i,Object.getOwnPropertySymbols(e)));for(var c=0;c<i.length;c+=1)u(t,i[c],e[i[c]],r[i[c]])};l.supportsDescriptors=!!p,e.exports=l},{"object-keys":37}],6:[function(t,e,r){"use strict";var n=t("get-intrinsic"),o=t("call-bind/callBound"),i=n("%TypeError%"),a=t("./IsArray"),c=n("%Reflect.apply%",!0)||o("%Function.prototype.apply%");e.exports=function(t,e){var r=arguments.length>2?arguments[2]:[];if(!a(r))throw new i("Assertion failed: optional `argumentsList`, if provided, must be a List");return c(t,e,r)}},{"./IsArray":11,"call-bind/callBound":3,"get-intrinsic":29}],7:[function(t,e,r){"use strict";var n=t("get-intrinsic")("%TypeError%"),o=t("object-inspect"),i=t("./IsPropertyKey"),a=t("./Type");e.exports=function(t,e){if("Object"!==a(t))throw new n("Assertion failed: Type(O) is not Object");if(!i(e))throw new n("Assertion failed: IsPropertyKey(P) is not true, got "+o(e));return t[e]}},{"./IsPropertyKey":14,"./Type":18,"get-intrinsic":29,"object-inspect":35}],8:[function(t,e,r){"use strict";var n=t("get-intrinsic")("%TypeError%"),o=t("./GetV"),i=t("./IsCallable"),a=t("./IsPropertyKey");e.exports=function(t,e){if(!a(e))throw new n("Assertion failed: IsPropertyKey(P) is not true");var r=o(t,e);if(null!=r){if(!i(r))throw new n(e+"is not a function");return r}}},{"./GetV":10,"./IsCallable":12,"./IsPropertyKey":14,"get-intrinsic":29}],9:[function(t,e,r){"use strict";var n=t("get-intrinsic")("%TypeError%"),o=t("call-bind/callBound"),i=t("../helpers/regexTester"),a=t("../helpers/every"),c=o("String.prototype.charAt"),p=o("String.prototype.slice"),u=o("String.prototype.indexOf"),l=parseInt,f=i(/^[0-9]$/),y=t("object-inspect"),s=t("./Get"),b=t("./IsArray"),g=t("./IsInteger"),d=t("./ToObject"),h=t("./ToString"),v=t("./Type"),m=0 in[void 0],S=function(t,e,r){return"String"===v(t)||(m?!(e in r):"Undefined"===v(t))};e.exports=function(t,e,r,o,i,m){if("String"!==v(t))throw new n("Assertion failed: `matched` must be a String");var j=t.length;if("String"!==v(e))throw new n("Assertion failed: `str` must be a String");var A=e.length;if(!g(r)||r<0||r>A)throw new n("Assertion failed: `position` must be a nonnegative integer, and less than or equal to the length of `string`, got "+y(r));if(!b(o)||!a(o,S))throw new n("Assertion failed: `captures` must be a List of Strings, got "+y(o));if("String"!==v(m))throw new n("Assertion failed: `replacement` must be a String");var O=r+j,w=o.length;"Undefined"!==v(i)&&(i=d(i));for(var P="",x=0;x<m.length;x+=1){var I=c(m,x),E=x+1>=m.length,F=x+2>=m.length;if("$"!==I||E)P+=c(m,x);else{var R=c(m,x+1);if("$"===R)P+="$",x+=1;else if("&"===R)P+=t,x+=1;else if("`"===R)P+=0===r?"":p(e,0,r-1),x+=1;else if("'"===R)P+=O>=A?"":p(e,O),x+=1;else{var T=F?null:c(m,x+2);if(!f(R)||"0"===R||!F&&f(T))if(f(R)&&(F||f(T))){var k=R+T,U=l(k,10)-1;P+=k<=w&&"Undefined"===v(o[U])?"":o[U],x+=2}else if("<"===R)if("Undefined"===v(i))P+="$<",x+=2;else{var N=u(m,">",x);if(N>-1){var $=p(m,x+"$<".length,N),M=s(i,$);"Undefined"!==v(M)&&(P+=h(M)),x+=("<"+$+">").length}}else P+="$";else{var B=l(R,10);P+=B<=w&&"Undefined"===v(o[B-1])?"":o[B-1],x+=1}}}}return P}},{"../helpers/every":23,"../helpers/regexTester":26,"./Get":7,"./IsArray":11,"./IsInteger":13,"./ToObject":16,"./ToString":17,"./Type":18,"call-bind/callBound":3,"get-intrinsic":29,"object-inspect":35}],10:[function(t,e,r){"use strict";var n=t("get-intrinsic")("%TypeError%"),o=t("./IsPropertyKey"),i=t("./ToObject");e.exports=function(t,e){if(!o(e))throw new n("Assertion failed: IsPropertyKey(P) is not true");return i(t)[e]}},{"./IsPropertyKey":14,"./ToObject":16,"get-intrinsic":29}],11:[function(t,e,r){"use strict";var n=t("get-intrinsic")("%Array%"),o=!n.isArray&&t("call-bind/callBound")("Object.prototype.toString");e.exports=n.isArray||function(t){return"[object Array]"===o(t)}},{"call-bind/callBound":3,"get-intrinsic":29}],12:[function(t,e,r){"use strict";e.exports=t("is-callable")},{"is-callable":33}],13:[function(t,e,r){"use strict";var n=t("./abs"),o=t("./floor"),i=t("../helpers/isNaN"),a=t("../helpers/isFinite");e.exports=function(t){if("number"!=typeof t||i(t)||!a(t))return!1;var e=n(t);return o(e)===e}},{"../helpers/isFinite":24,"../helpers/isNaN":25,"./abs":19,"./floor":20}],14:[function(t,e,r){"use strict";e.exports=function(t){return"string"==typeof t||"symbol"==typeof t}},{}],15:[function(t,e,r){"use strict";e.exports=t("../5/CheckObjectCoercible")},{"../5/CheckObjectCoercible":21}],16:[function(t,e,r){"use strict";var n=t("get-intrinsic")("%Object%"),o=t("./RequireObjectCoercible");e.exports=function(t){return o(t),n(t)}},{"./RequireObjectCoercible":15,"get-intrinsic":29}],17:[function(t,e,r){"use strict";var n=t("get-intrinsic"),o=n("%String%"),i=n("%TypeError%");e.exports=function(t){if("symbol"==typeof t)throw new i("Cannot convert a Symbol value to a string");return o(t)}},{"get-intrinsic":29}],18:[function(t,e,r){"use strict";var n=t("../5/Type");e.exports=function(t){return"symbol"==typeof t?"Symbol":"bigint"==typeof t?"BigInt":n(t)}},{"../5/Type":22}],19:[function(t,e,r){"use strict";var n=t("get-intrinsic")("%Math.abs%");e.exports=function(t){return n(t)}},{"get-intrinsic":29}],20:[function(t,e,r){"use strict";var n=Math.floor;e.exports=function(t){return n(t)}},{}],21:[function(t,e,r){"use strict";var n=t("get-intrinsic")("%TypeError%");e.exports=function(t,e){if(null==t)throw new n(e||"Cannot call method on "+t);return t}},{"get-intrinsic":29}],22:[function(t,e,r){"use strict";e.exports=function(t){return null===t?"Null":void 0===t?"Undefined":"function"==typeof t||"object"==typeof t?"Object":"number"==typeof t?"Number":"boolean"==typeof t?"Boolean":"string"==typeof t?"String":void 0}},{}],23:[function(t,e,r){"use strict";e.exports=function(t,e){for(var r=0;r<t.length;r+=1)if(!e(t[r],r,t))return!1;return!0}},{}],24:[function(t,e,r){"use strict";var n=Number.isNaN||function(t){return t!=t};e.exports=Number.isFinite||function(t){return"number"==typeof t&&!n(t)&&t!==1/0&&t!==-1/0}},{}],25:[function(t,e,r){"use strict";e.exports=Number.isNaN||function(t){return t!=t}},{}],26:[function(t,e,r){"use strict";var n=t("get-intrinsic")("RegExp.prototype.test"),o=t("call-bind");e.exports=function(t){return o(n,t)}},{"call-bind":4,"get-intrinsic":29}],27:[function(t,e,r){"use strict";var n=Array.prototype.slice,o=Object.prototype.toString;e.exports=function(t){var e=this;if("function"!=typeof e||"[object Function]"!==o.call(e))throw new TypeError("Function.prototype.bind called on incompatible "+e);for(var r,i=n.call(arguments,1),a=Math.max(0,e.length-i.length),c=[],p=0;p<a;p++)c.push("$"+p);if(r=Function("binder","return function ("+c.join(",")+"){ return binder.apply(this,arguments); }")(function(){if(this instanceof r){var o=e.apply(this,i.concat(n.call(arguments)));return Object(o)===o?o:this}return e.apply(t,i.concat(n.call(arguments)))}),e.prototype){var u=function(){};u.prototype=e.prototype,r.prototype=new u,u.prototype=null}return r}},{}],28:[function(t,e,r){"use strict";var n=t("./implementation");e.exports=Function.prototype.bind||n},{"./implementation":27}],29:[function(t,e,r){"use strict";var n=SyntaxError,o=Function,i=TypeError,a=function(t){try{return o('"use strict"; return ('+t+").constructor;")()}catch(t){}},c=Object.getOwnPropertyDescriptor;if(c)try{c({},"")}catch(t){c=null}var p=function(){throw new i},u=c?function(){try{return arguments.callee,p}catch(t){try{return c(arguments,"callee").get}catch(t){return p}}}():p,l=t("has-symbols")(),f=Object.getPrototypeOf||function(t){return t.__proto__},y={},s="undefined"==typeof Uint8Array?void 0:f(Uint8Array),b={"%AggregateError%":"undefined"==typeof AggregateError?void 0:AggregateError,"%Array%":Array,"%ArrayBuffer%":"undefined"==typeof ArrayBuffer?void 0:ArrayBuffer,"%ArrayIteratorPrototype%":l?f([][Symbol.iterator]()):void 0,"%AsyncFromSyncIteratorPrototype%":void 0,"%AsyncFunction%":y,"%AsyncGenerator%":y,"%AsyncGeneratorFunction%":y,"%AsyncIteratorPrototype%":y,"%Atomics%":"undefined"==typeof Atomics?void 0:Atomics,"%BigInt%":"undefined"==typeof BigInt?void 0:BigInt,"%Boolean%":Boolean,"%DataView%":"undefined"==typeof DataView?void 0:DataView,"%Date%":Date,"%decodeURI%":decodeURI,"%decodeURIComponent%":decodeURIComponent,"%encodeURI%":encodeURI,"%encodeURIComponent%":encodeURIComponent,"%Error%":Error,"%eval%":eval,"%EvalError%":EvalError,"%Float32Array%":"undefined"==typeof Float32Array?void 0:Float32Array,"%Float64Array%":"undefined"==typeof Float64Array?void 0:Float64Array,"%FinalizationRegistry%":"undefined"==typeof FinalizationRegistry?void 0:FinalizationRegistry,"%Function%":o,"%GeneratorFunction%":y,"%Int8Array%":"undefined"==typeof Int8Array?void 0:Int8Array,"%Int16Array%":"undefined"==typeof Int16Array?void 0:Int16Array,"%Int32Array%":"undefined"==typeof Int32Array?void 0:Int32Array,"%isFinite%":isFinite,"%isNaN%":isNaN,"%IteratorPrototype%":l?f(f([][Symbol.iterator]())):void 0,"%JSON%":"object"==typeof JSON?JSON:void 0,"%Map%":"undefined"==typeof Map?void 0:Map,"%MapIteratorPrototype%":"undefined"!=typeof Map&&l?f((new Map)[Symbol.iterator]()):void 0,"%Math%":Math,"%Number%":Number,"%Object%":Object,"%parseFloat%":parseFloat,"%parseInt%":parseInt,"%Promise%":"undefined"==typeof Promise?void 0:Promise,"%Proxy%":"undefined"==typeof Proxy?void 0:Proxy,"%RangeError%":RangeError,"%ReferenceError%":ReferenceError,"%Reflect%":"undefined"==typeof Reflect?void 0:Reflect,"%RegExp%":RegExp,"%Set%":"undefined"==typeof Set?void 0:Set,"%SetIteratorPrototype%":"undefined"!=typeof Set&&l?f((new Set)[Symbol.iterator]()):void 0,"%SharedArrayBuffer%":"undefined"==typeof SharedArrayBuffer?void 0:SharedArrayBuffer,"%String%":String,"%StringIteratorPrototype%":l?f(""[Symbol.iterator]()):void 0,"%Symbol%":l?Symbol:void 0,"%SyntaxError%":n,"%ThrowTypeError%":u,"%TypedArray%":s,"%TypeError%":i,"%Uint8Array%":"undefined"==typeof Uint8Array?void 0:Uint8Array,"%Uint8ClampedArray%":"undefined"==typeof Uint8ClampedArray?void 0:Uint8ClampedArray,"%Uint16Array%":"undefined"==typeof Uint16Array?void 0:Uint16Array,"%Uint32Array%":"undefined"==typeof Uint32Array?void 0:Uint32Array,"%URIError%":URIError,"%WeakMap%":"undefined"==typeof WeakMap?void 0:WeakMap,"%WeakRef%":"undefined"==typeof WeakRef?void 0:WeakRef,"%WeakSet%":"undefined"==typeof WeakSet?void 0:WeakSet},g={"%ArrayBufferPrototype%":["ArrayBuffer","prototype"],"%ArrayPrototype%":["Array","prototype"],"%ArrayProto_entries%":["Array","prototype","entries"],"%ArrayProto_forEach%":["Array","prototype","forEach"],"%ArrayProto_keys%":["Array","prototype","keys"],"%ArrayProto_values%":["Array","prototype","values"],"%AsyncFunctionPrototype%":["AsyncFunction","prototype"],"%AsyncGenerator%":["AsyncGeneratorFunction","prototype"],"%AsyncGeneratorPrototype%":["AsyncGeneratorFunction","prototype","prototype"],"%BooleanPrototype%":["Boolean","prototype"],"%DataViewPrototype%":["DataView","prototype"],"%DatePrototype%":["Date","prototype"],"%ErrorPrototype%":["Error","prototype"],"%EvalErrorPrototype%":["EvalError","prototype"],"%Float32ArrayPrototype%":["Float32Array","prototype"],"%Float64ArrayPrototype%":["Float64Array","prototype"],"%FunctionPrototype%":["Function","prototype"],"%Generator%":["GeneratorFunction","prototype"],"%GeneratorPrototype%":["GeneratorFunction","prototype","prototype"],"%Int8ArrayPrototype%":["Int8Array","prototype"],"%Int16ArrayPrototype%":["Int16Array","prototype"],"%Int32ArrayPrototype%":["Int32Array","prototype"],"%JSONParse%":["JSON","parse"],"%JSONStringify%":["JSON","stringify"],"%MapPrototype%":["Map","prototype"],"%NumberPrototype%":["Number","prototype"],"%ObjectPrototype%":["Object","prototype"],"%ObjProto_toString%":["Object","prototype","toString"],"%ObjProto_valueOf%":["Object","prototype","valueOf"],"%PromisePrototype%":["Promise","prototype"],"%PromiseProto_then%":["Promise","prototype","then"],"%Promise_all%":["Promise","all"],"%Promise_reject%":["Promise","reject"],"%Promise_resolve%":["Promise","resolve"],"%RangeErrorPrototype%":["RangeError","prototype"],"%ReferenceErrorPrototype%":["ReferenceError","prototype"],"%RegExpPrototype%":["RegExp","prototype"],"%SetPrototype%":["Set","prototype"],"%SharedArrayBufferPrototype%":["SharedArrayBuffer","prototype"],"%StringPrototype%":["String","prototype"],"%SymbolPrototype%":["Symbol","prototype"],"%SyntaxErrorPrototype%":["SyntaxError","prototype"],"%TypedArrayPrototype%":["TypedArray","prototype"],"%TypeErrorPrototype%":["TypeError","prototype"],"%Uint8ArrayPrototype%":["Uint8Array","prototype"],"%Uint8ClampedArrayPrototype%":["Uint8ClampedArray","prototype"],"%Uint16ArrayPrototype%":["Uint16Array","prototype"],"%Uint32ArrayPrototype%":["Uint32Array","prototype"],"%URIErrorPrototype%":["URIError","prototype"],"%WeakMapPrototype%":["WeakMap","prototype"],"%WeakSetPrototype%":["WeakSet","prototype"]},d=t("function-bind"),h=t("has"),v=d.call(Function.call,Array.prototype.concat),m=d.call(Function.apply,Array.prototype.splice),S=d.call(Function.call,String.prototype.replace),j=d.call(Function.call,String.prototype.slice),A=/[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,O=/\\(\\)?/g,w=function(t,e){var r,o=t;if(h(g,o)&&(o="%"+(r=g[o])[0]+"%"),h(b,o)){var c=b[o];if(c===y&&(c=function t(e){var r;if("%AsyncFunction%"===e)r=a("async function () {}");else if("%GeneratorFunction%"===e)r=a("function* () {}");else if("%AsyncGeneratorFunction%"===e)r=a("async function* () {}");else if("%AsyncGenerator%"===e){var n=t("%AsyncGeneratorFunction%");n&&(r=n.prototype)}else if("%AsyncIteratorPrototype%"===e){var o=t("%AsyncGenerator%");o&&(r=f(o.prototype))}return b[e]=r,r}(o)),void 0===c&&!e)throw new i("intrinsic "+t+" exists, but is not available. Please file an issue!");return{alias:r,name:o,value:c}}throw new n("intrinsic "+t+" does not exist!")};e.exports=function(t,e){if("string"!=typeof t||0===t.length)throw new i("intrinsic name must be a non-empty string");if(arguments.length>1&&"boolean"!=typeof e)throw new i('"allowMissing" argument must be a boolean');var r=function(t){var e=j(t,0,1),r=j(t,-1);if("%"===e&&"%"!==r)throw new n("invalid intrinsic syntax, expected closing `%`");if("%"===r&&"%"!==e)throw new n("invalid intrinsic syntax, expected opening `%`");var o=[];return S(t,A,function(t,e,r,n){o[o.length]=r?S(n,O,"$1"):e||t}),o}(t),o=r.length>0?r[0]:"",a=w("%"+o+"%",e),p=a.name,u=a.value,l=!1,f=a.alias;f&&(o=f[0],m(r,v([0,1],f)));for(var y=1,s=!0;y<r.length;y+=1){var g=r[y],d=j(g,0,1),P=j(g,-1);if(('"'===d||"'"===d||"`"===d||'"'===P||"'"===P||"`"===P)&&d!==P)throw new n("property names with quotes must have matching quotes");if("constructor"!==g&&s||(l=!0),h(b,p="%"+(o+="."+g)+"%"))u=b[p];else if(null!=u){if(!(g in u)){if(!e)throw new i("base intrinsic for "+t+" exists, but the property is not available.");return}if(c&&y+1>=r.length){var x=c(u,g);u=(s=!!x)&&"get"in x&&!("originalValue"in x.get)?x.get:u[g]}else s=h(u,g),u=u[g];s&&!l&&(b[p]=u)}}return u}},{"function-bind":28,has:32,"has-symbols":30}],30:[function(t,e,r){"use strict";var n="undefined"!=typeof Symbol&&Symbol,o=t("./shams");e.exports=function(){return"function"==typeof n&&("function"==typeof Symbol&&("symbol"==typeof n("foo")&&("symbol"==typeof Symbol("bar")&&o())))}},{"./shams":31}],31:[function(t,e,r){"use strict";e.exports=function(){if("function"!=typeof Symbol||"function"!=typeof Object.getOwnPropertySymbols)return!1;if("symbol"==typeof Symbol.iterator)return!0;var t={},e=Symbol("test"),r=Object(e);if("string"==typeof e)return!1;if("[object Symbol]"!==Object.prototype.toString.call(e))return!1;if("[object Symbol]"!==Object.prototype.toString.call(r))return!1;for(e in t[e]=42,t)return!1;if("function"==typeof Object.keys&&0!==Object.keys(t).length)return!1;if("function"==typeof Object.getOwnPropertyNames&&0!==Object.getOwnPropertyNames(t).length)return!1;var n=Object.getOwnPropertySymbols(t);if(1!==n.length||n[0]!==e)return!1;if(!Object.prototype.propertyIsEnumerable.call(t,e))return!1;if("function"==typeof Object.getOwnPropertyDescriptor){var o=Object.getOwnPropertyDescriptor(t,e);if(42!==o.value||!0!==o.enumerable)return!1}return!0}},{}],32:[function(t,e,r){"use strict";var n=t("function-bind");e.exports=n.call(Function.call,Object.prototype.hasOwnProperty)},{"function-bind":28}],33:[function(t,e,r){"use strict";var n,o,i=Function.prototype.toString,a="object"==typeof Reflect&&null!==Reflect&&Reflect.apply;if("function"==typeof a&&"function"==typeof Object.defineProperty)try{n=Object.defineProperty({},"length",{get:function(){throw o}}),o={},a(function(){throw 42},null,n)}catch(t){t!==o&&(a=null)}else a=null;var c=/^\s*class\b/,p=function(t){try{var e=i.call(t);return c.test(e)}catch(t){return!1}},u=Object.prototype.toString,l="function"==typeof Symbol&&"symbol"==typeof Symbol.toStringTag,f="object"==typeof document&&void 0===document.all&&void 0!==document.all?document.all:{};e.exports=a?function(t){if(t===f)return!0;if(!t)return!1;if("function"!=typeof t&&"object"!=typeof t)return!1;if("function"==typeof t&&!t.prototype)return!0;try{a(t,null,n)}catch(t){if(t!==o)return!1}return!p(t)}:function(t){if(t===f)return!0;if(!t)return!1;if("function"!=typeof t&&"object"!=typeof t)return!1;if("function"==typeof t&&!t.prototype)return!0;if(l)return function(t){try{return!p(t)&&(i.call(t),!0)}catch(t){return!1}}(t);if(p(t))return!1;var e=u.call(t);return"[object Function]"===e||"[object GeneratorFunction]"===e}},{}],34:[function(t,e,r){"use strict";var n,o,i,a,c=t("call-bind/callBound"),p=t("has-symbols/shams")()&&!!Symbol.toStringTag;if(p){n=c("Object.prototype.hasOwnProperty"),o=c("RegExp.prototype.exec"),i={};var u=function(){throw i};a={toString:u,valueOf:u},"symbol"==typeof Symbol.toPrimitive&&(a[Symbol.toPrimitive]=u)}var l=c("Object.prototype.toString"),f=Object.getOwnPropertyDescriptor;e.exports=p?function(t){if(!t||"object"!=typeof t)return!1;var e=f(t,"lastIndex");if(!(e&&n(e,"value")))return!1;try{o(t,a)}catch(t){return t===i}}:function(t){return!(!t||"object"!=typeof t&&"function"!=typeof t)&&"[object RegExp]"===l(t)}},{"call-bind/callBound":3,"has-symbols/shams":31}],35:[function(t,e,r){var n="function"==typeof Map&&Map.prototype,o=Object.getOwnPropertyDescriptor&&n?Object.getOwnPropertyDescriptor(Map.prototype,"size"):null,i=n&&o&&"function"==typeof o.get?o.get:null,a=n&&Map.prototype.forEach,c="function"==typeof Set&&Set.prototype,p=Object.getOwnPropertyDescriptor&&c?Object.getOwnPropertyDescriptor(Set.prototype,"size"):null,u=c&&p&&"function"==typeof p.get?p.get:null,l=c&&Set.prototype.forEach,f="function"==typeof WeakMap&&WeakMap.prototype?WeakMap.prototype.has:null,y="function"==typeof WeakSet&&WeakSet.prototype?WeakSet.prototype.has:null,s="function"==typeof WeakRef&&WeakRef.prototype?WeakRef.prototype.deref:null,b=Boolean.prototype.valueOf,g=Object.prototype.toString,d=Function.prototype.toString,h=String.prototype.match,v="function"==typeof BigInt?BigInt.prototype.valueOf:null,m=Object.getOwnPropertySymbols,S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?Symbol.prototype.toString:null,j="function"==typeof Symbol&&"object"==typeof Symbol.iterator,A=Object.prototype.propertyIsEnumerable,O=("function"==typeof Reflect?Reflect.getPrototypeOf:Object.getPrototypeOf)||([].__proto__===Array.prototype?function(t){return t.__proto__}:null),w=t("./util.inspect").custom,P=w&&R(w)?w:null,x="function"==typeof Symbol&&void 0!==Symbol.toStringTag?Symbol.toStringTag:null;function I(t,e,r){var n="double"===(r.quoteStyle||e)?'"':"'";return n+t+n}function E(t){return String(t).replace(/"/g,"&quot;")}function F(t){return!("[object Array]"!==U(t)||x&&"object"==typeof t&&x in t)}function R(t){if(j)return t&&"object"==typeof t&&t instanceof Symbol;if("symbol"==typeof t)return!0;if(!t||"object"!=typeof t||!S)return!1;try{return S.call(t),!0}catch(t){}return!1}e.exports=function t(e,r,n,o){var c=r||{};if(k(c,"quoteStyle")&&"single"!==c.quoteStyle&&"double"!==c.quoteStyle)throw new TypeError('option "quoteStyle" must be "single" or "double"');if(k(c,"maxStringLength")&&("number"==typeof c.maxStringLength?c.maxStringLength<0&&c.maxStringLength!==1/0:null!==c.maxStringLength))throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');var p=!k(c,"customInspect")||c.customInspect;if("boolean"!=typeof p)throw new TypeError('option "customInspect", if provided, must be `true` or `false`');if(k(c,"indent")&&null!==c.indent&&"\t"!==c.indent&&!(parseInt(c.indent,10)===c.indent&&c.indent>0))throw new TypeError('options "indent" must be "\\t", an integer > 0, or `null`');if(void 0===e)return"undefined";if(null===e)return"null";if("boolean"==typeof e)return e?"true":"false";if("string"==typeof e)return function t(e,r){if(e.length>r.maxStringLength){var n=e.length-r.maxStringLength,o="... "+n+" more character"+(n>1?"s":"");return t(e.slice(0,r.maxStringLength),r)+o}var i=e.replace(/(['\\])/g,"\\$1").replace(/[\x00-\x1f]/g,$);return I(i,"single",r)}(e,c);if("number"==typeof e)return 0===e?1/0/e>0?"0":"-0":String(e);if("bigint"==typeof e)return String(e)+"n";var g=void 0===c.depth?5:c.depth;if(void 0===n&&(n=0),n>=g&&g>0&&"object"==typeof e)return F(e)?"[Array]":"[Object]";var m=function(t,e){var r;if("\t"===t.indent)r="\t";else{if(!("number"==typeof t.indent&&t.indent>0))return null;r=Array(t.indent+1).join(" ")}return{base:r,prev:Array(e+1).join(r)}}(c,n);if(void 0===o)o=[];else if(N(o,e)>=0)return"[Circular]";function A(e,r,i){if(r&&(o=o.slice()).push(r),i){var a={depth:c.depth};return k(c,"quoteStyle")&&(a.quoteStyle=c.quoteStyle),t(e,a,n+1,o)}return t(e,c,n+1,o)}if("function"==typeof e){var w=function(t){if(t.name)return t.name;var e=h.call(d.call(t),/^function\s*([\w$]+)/);if(e)return e[1];return null}(e),T=G(e,A);return"[Function"+(w?": "+w:" (anonymous)")+"]"+(T.length>0?" { "+T.join(", ")+" }":"")}if(R(e)){var _=j?String(e).replace(/^(Symbol\(.*\))_[^)]*$/,"$1"):S.call(e);return"object"!=typeof e||j?_:M(_)}if(function(t){if(!t||"object"!=typeof t)return!1;if("undefined"!=typeof HTMLElement&&t instanceof HTMLElement)return!0;return"string"==typeof t.nodeName&&"function"==typeof t.getAttribute}(e)){for(var D="<"+String(e.nodeName).toLowerCase(),q=e.attributes||[],L=0;L<q.length;L++)D+=" "+q[L].name+"="+I(E(q[L].value),"double",c);return D+=">",e.childNodes&&e.childNodes.length&&(D+="..."),D+="</"+String(e.nodeName).toLowerCase()+">"}if(F(e)){if(0===e.length)return"[]";var V=G(e,A);return m&&!function(t){for(var e=0;e<t.length;e++)if(N(t[e],"\n")>=0)return!1;return!0}(V)?"["+W(V,m)+"]":"[ "+V.join(", ")+" ]"}if(function(t){return!("[object Error]"!==U(t)||x&&"object"==typeof t&&x in t)}(e)){var K=G(e,A);return 0===K.length?"["+String(e)+"]":"{ ["+String(e)+"] "+K.join(", ")+" }"}if("object"==typeof e&&p){if(P&&"function"==typeof e[P])return e[P]();if("function"==typeof e.inspect)return e.inspect()}if(function(t){if(!i||!t||"object"!=typeof t)return!1;try{i.call(t);try{u.call(t)}catch(t){return!0}return t instanceof Map}catch(t){}return!1}(e)){var z=[];return a.call(e,function(t,r){z.push(A(r,e,!0)+" => "+A(t,e))}),C("Map",i.call(e),z,m)}if(function(t){if(!u||!t||"object"!=typeof t)return!1;try{u.call(t);try{i.call(t)}catch(t){return!0}return t instanceof Set}catch(t){}return!1}(e)){var J=[];return l.call(e,function(t){J.push(A(t,e))}),C("Set",u.call(e),J,m)}if(function(t){if(!f||!t||"object"!=typeof t)return!1;try{f.call(t,f);try{y.call(t,y)}catch(t){return!0}return t instanceof WeakMap}catch(t){}return!1}(e))return B("WeakMap");if(function(t){if(!y||!t||"object"!=typeof t)return!1;try{y.call(t,y);try{f.call(t,f)}catch(t){return!0}return t instanceof WeakSet}catch(t){}return!1}(e))return B("WeakSet");if(function(t){if(!s||!t||"object"!=typeof t)return!1;try{return s.call(t),!0}catch(t){}return!1}(e))return B("WeakRef");if(function(t){return!("[object Number]"!==U(t)||x&&"object"==typeof t&&x in t)}(e))return M(A(Number(e)));if(function(t){if(!t||"object"!=typeof t||!v)return!1;try{return v.call(t),!0}catch(t){}return!1}(e))return M(A(v.call(e)));if(function(t){return!("[object Boolean]"!==U(t)||x&&"object"==typeof t&&x in t)}(e))return M(b.call(e));if(function(t){return!("[object String]"!==U(t)||x&&"object"==typeof t&&x in t)}(e))return M(A(String(e)));if(!function(t){return!("[object Date]"!==U(t)||x&&"object"==typeof t&&x in t)}(e)&&!function(t){return!("[object RegExp]"!==U(t)||x&&"object"==typeof t&&x in t)}(e)){var H=G(e,A),X=O?O(e)===Object.prototype:e instanceof Object||e.constructor===Object,Y=e instanceof Object?"":"null prototype",Q=!X&&x&&Object(e)===e&&x in e?U(e).slice(8,-1):Y?"Object":"",Z=(X||"function"!=typeof e.constructor?"":e.constructor.name?e.constructor.name+" ":"")+(Q||Y?"["+[].concat(Q||[],Y||[]).join(": ")+"] ":"");return 0===H.length?Z+"{}":m?Z+"{"+W(H,m)+"}":Z+"{ "+H.join(", ")+" }"}return String(e)};var T=Object.prototype.hasOwnProperty||function(t){return t in this};function k(t,e){return T.call(t,e)}function U(t){return g.call(t)}function N(t,e){if(t.indexOf)return t.indexOf(e);for(var r=0,n=t.length;r<n;r++)if(t[r]===e)return r;return-1}function $(t){var e=t.charCodeAt(0),r={8:"b",9:"t",10:"n",12:"f",13:"r"}[e];return r?"\\"+r:"\\x"+(e<16?"0":"")+e.toString(16).toUpperCase()}function M(t){return"Object("+t+")"}function B(t){return t+" { ? }"}function C(t,e,r,n){return t+" ("+e+") {"+(n?W(r,n):r.join(", "))+"}"}function W(t,e){if(0===t.length)return"";var r="\n"+e.prev+e.base;return r+t.join(","+r)+"\n"+e.prev}function G(t,e){var r=F(t),n=[];if(r){n.length=t.length;for(var o=0;o<t.length;o++)n[o]=k(t,o)?e(t[o],t):""}var i,a="function"==typeof m?m(t):[];if(j){i={};for(var c=0;c<a.length;c++)i["$"+a[c]]=a[c]}for(var p in t)k(t,p)&&(r&&String(Number(p))===p&&p<t.length||j&&i["$"+p]instanceof Symbol||(/[^\w$]/.test(p)?n.push(e(p,t)+": "+e(t[p],t)):n.push(p+": "+e(t[p],t))));if("function"==typeof m)for(var u=0;u<a.length;u++)A.call(t,a[u])&&n.push("["+e(a[u])+"]: "+e(t[a[u]],t));return n}},{"./util.inspect":2}],36:[function(t,e,r){"use strict";var n;if(!Object.keys){var o=Object.prototype.hasOwnProperty,i=Object.prototype.toString,a=t("./isArguments"),c=Object.prototype.propertyIsEnumerable,p=!c.call({toString:null},"toString"),u=c.call(function(){},"prototype"),l=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],f=function(t){var e=t.constructor;return e&&e.prototype===t},y={$applicationCache:!0,$console:!0,$external:!0,$frame:!0,$frameElement:!0,$frames:!0,$innerHeight:!0,$innerWidth:!0,$onmozfullscreenchange:!0,$onmozfullscreenerror:!0,$outerHeight:!0,$outerWidth:!0,$pageXOffset:!0,$pageYOffset:!0,$parent:!0,$scrollLeft:!0,$scrollTop:!0,$scrollX:!0,$scrollY:!0,$self:!0,$webkitIndexedDB:!0,$webkitStorageInfo:!0,$window:!0},s=function(){if("undefined"==typeof window)return!1;for(var t in window)try{if(!y["$"+t]&&o.call(window,t)&&null!==window[t]&&"object"==typeof window[t])try{f(window[t])}catch(t){return!0}}catch(t){return!0}return!1}();n=function(t){var e=null!==t&&"object"==typeof t,r="[object Function]"===i.call(t),n=a(t),c=e&&"[object String]"===i.call(t),y=[];if(!e&&!r&&!n)throw new TypeError("Object.keys called on a non-object");var b=u&&r;if(c&&t.length>0&&!o.call(t,0))for(var g=0;g<t.length;++g)y.push(String(g));if(n&&t.length>0)for(var d=0;d<t.length;++d)y.push(String(d));else for(var h in t)b&&"prototype"===h||!o.call(t,h)||y.push(String(h));if(p)for(var v=function(t){if("undefined"==typeof window||!s)return f(t);try{return f(t)}catch(t){return!1}}(t),m=0;m<l.length;++m)v&&"constructor"===l[m]||!o.call(t,l[m])||y.push(l[m]);return y}}e.exports=n},{"./isArguments":38}],37:[function(t,e,r){"use strict";var n=Array.prototype.slice,o=t("./isArguments"),i=Object.keys,a=i?function(t){return i(t)}:t("./implementation"),c=Object.keys;a.shim=function(){Object.keys?function(){var t=Object.keys(arguments);return t&&t.length===arguments.length}(1,2)||(Object.keys=function(t){return o(t)?c(n.call(t)):c(t)}):Object.keys=a;return Object.keys||a},e.exports=a},{"./implementation":36,"./isArguments":38}],38:[function(t,e,r){"use strict";var n=Object.prototype.toString;e.exports=function(t){var e=n.call(t),r="[object Arguments]"===e;return r||(r="[object Array]"!==e&&null!==t&&"object"==typeof t&&"number"==typeof t.length&&t.length>=0&&"[object Function]"===n.call(t.callee)),r}},{}],39:[function(t,e,r){"use strict";var n=t("es-abstract/2020/Call"),o=t("es-abstract/2020/GetMethod"),i=t("es-abstract/2020/GetSubstitution"),a=t("es-abstract/2020/IsCallable"),c=t("es-abstract/2020/IsInteger"),p=t("es-abstract/2020/RequireObjectCoercible"),u=t("es-abstract/2020/ToString"),l=t("es-abstract/2020/Type"),f=t("get-intrinsic"),y=t("call-bind/callBound"),s=t("has-symbols")(),b=t("is-regex"),g=f("%Math.max%"),d=f("%TypeError%"),h=y("Array.prototype.push"),v=y("String.prototype.slice"),m=y("String.prototype.indexOf"),S=y("String.prototype.replace");function j(t,e,r){if("String"!==l(t)||"String"!==l(e))throw new d("Assertion failed: string and searchValue must both be Strings");if(!c(r)||r<0)throw new d("Assertion failed: fromIndex must be a nonnegative integer");var n=t.length;if(""===e&&r<=n)return r;var o=e.length;if(r>n)return-1;for(var i=r;i<n;i+=1)if(""===e||v(t,i,i+o)===e)return i;return-1}e.exports=function(t,e){var r=p(this),c=b(t);if(c&&-1===m(v(t,t.source.length+2),"g"))throw new TypeError("use .replace for a non-global regex. NOTE: this may be allowed in the future.");if(s&&Symbol.replace){if(null!=t){var f=o(t,Symbol.replace);if(void 0!==f)return n(f,t,[r,e])}}else if(c)return S(r,t,e);var y=u(r),A=u(t),O=a(e);O||(e=u(e));for(var w=A.length,P=g(1,w),x=[],I=j(y,A,0);-1!==I;)h(x,I),I=j(y,A,I+P);for(var E=0,F="",R=0;R<x.length;R+=1){var T;if(O)T=u(n(e,void 0,[A,x[R],y]));else{if("String"!==l(e))throw new d("Assertion failed: `replaceValue` should be a string at this point");T=i(A,y,x[R],[],void 0,e)}F+=v(y,E,x[R])+T,E=x[R]+w}return E<y.length&&(F+=v(y,E)),F}},{"call-bind/callBound":3,"es-abstract/2020/Call":6,"es-abstract/2020/GetMethod":8,"es-abstract/2020/GetSubstitution":9,"es-abstract/2020/IsCallable":12,"es-abstract/2020/IsInteger":13,"es-abstract/2020/RequireObjectCoercible":15,"es-abstract/2020/ToString":17,"es-abstract/2020/Type":18,"get-intrinsic":29,"has-symbols":30,"is-regex":34}],40:[function(t,e,r){"use strict";var n=t("call-bind"),o=t("define-properties"),i=t("./implementation"),a=t("./polyfill"),c=t("./shim"),p=n(i);o(p,{getPolyfill:a,implementation:i,shim:c}),e.exports=p},{"./implementation":39,"./polyfill":41,"./shim":42,"call-bind":4,"define-properties":5}],41:[function(t,e,r){"use strict";var n=t("./implementation");e.exports=function(){return String.prototype.replaceAll||n}},{"./implementation":39}],42:[function(t,e,r){"use strict";var n=t("define-properties"),o=t("./polyfill");e.exports=function(){var t=o();return n(String.prototype,{replaceAll:t},{replaceAll:function(){return String.prototype.replaceAll!==t}}),t}},{"./polyfill":41,"define-properties":5}]},{},[1]);
;/**
 * __PrimeFaces AjaxStatus Widget__
 * 
 * AjaxStatus is a global notifier for AJAX requests.
 * 
 * For the callbacks that can be set via the `onstart`, `onsuccess`, `onerror` and `oncomplete` attributes, see
 * {@link PfAjaxStartCallback}, {@link PfAjaxSuccessCallback}, {@link PfAjaxErrorCallback}, and
 * {@link PfAjaxCompleteCallback}.
 * 
 * @typedef {"start" | "success" | "error" | "complete"} PrimeFaces.widget.AjaxStatus.AjaxStatusEventType Available
 * types of AJAX related events to which you can listen.
 * 
 * @typedef PrimeFaces.widget.AjaxStatus.PfAjaxStartCallback Callback for when an AJAX request starts. Usually set via
 * `<p:ajaxStatus onstart="..."/>`. This callback applies when `<p:ajax />` is used.
 * @this {Document} PrimeFaces.widget.AjaxStatus.PfAjaxStartCallback
 * 
 * @typedef PrimeFaces.widget.AjaxStatus.PfAjaxErrorCallback Callback for when an AJAX request fails. Usually set via
 * `<p:ajaxStatus onerror="..."/>`. This callback applies when `<p:ajax />` is used.
 * @this {Document} PrimeFaces.widget.AjaxStatus.PfAjaxErrorCallback
 * @param {JQuery.jqXHR} PrimeFaces.widget.AjaxStatus.PfAjaxErrorCallback.xhr The request that failed.
 * @param {JQuery.AjaxSettings} PrimeFaces.widget.AjaxStatus.PfAjaxErrorCallback.settings The settings of the jQuery
 * AJAX request.
 * @param {string} PrimeFaces.widget.AjaxStatus.PfAjaxErrorCallback.errorThrown The error that cause the request to
 * fail.

 * @typedef PrimeFaces.widget.AjaxStatus.PfAjaxSuccessCallback Callback for when an AJAX request succeeds. Usually set
 * via `<p:ajaxStatus onsuccess="..."/>`. This callback applies when `<p:ajax />` is used.
 * @this {Document} PrimeFaces.widget.AjaxStatus.PfAjaxSuccessCallback
 * @param {JQuery.jqXHR} PrimeFaces.widget.AjaxStatus.PfAjaxSuccessCallback.xhr The request that succeeded.
 * @param {JQuery.AjaxSettings} PrimeFaces.widget.AjaxStatus.PfAjaxSuccessCallback.settings The settings of the jQuery
 * AJAX request.
 * 
 * @typedef PrimeFaces.widget.AjaxStatus.PfAjaxCompleteCallback Callback for when an AJAX request completes, either
 * successfully or with an error. Usually set via `<p:ajaxStatus oncomplete="..."/>`. This callback applies when
 * `<p:ajax />` is used.
 * @this {Document} PrimeFaces.widget.AjaxStatus.PfAjaxCompleteCallback
 * @param {JQuery.jqXHR} PrimeFaces.widget.AjaxStatus.PfAjaxCompleteCallback.xhr The request that succeeded.
 * @param {JQuery.AjaxSettings} PrimeFaces.widget.AjaxStatus.PfAjaxCompleteCallback.settings The settings of the jQuery
 * AJAX request.
 * 
 * @interface {PrimeFaces.widget.AjaxStatus.EventToCallbackMap} EventToCallbackMap Maps between the
 * {@link AjaxStatusEventType} and the corresponding event handlers. Used by the {@link AjaxStatus} component.
 * @prop {PrimeFaces.widget.AjaxStatus.PfAjaxCompleteCallback | jsf.ajax.OnEventCallback | jsf.ajax.OnErrorCallback} EventToCallbackMap.complete
 * Callback for when an AJAX request completes, either successfully or with an error. Usually set via
 * `<p:ajaxStatus oncomplete="..."/>`.
 * @prop {PrimeFaces.widget.AjaxStatus.PfAjaxErrorCallback | jsf.ajax.OnErrorCallback} EventToCallbackMap.error Callback
 * for when an AJAX request fails. Usually set via `<p:ajaxStatus onerror="..."/>`.
 * @prop {PrimeFaces.widget.AjaxStatus.PfAjaxStartCallback | jsf.ajax.OnEventCallback} EventToCallbackMap.start Callback
 * for when an AJAX request starts. Usually set via `<p:ajaxStatus onstart="..."/>`.
 * @prop {PrimeFaces.widget.AjaxStatus.PfAjaxSuccessCallback | jsf.ajax.OnEventCallback} EventToCallbackMap.success
 * Callback for when an AJAX request succeeds. Usually set via `<p:ajaxStatus onsuccess="..."/>`.
 * 
 * @prop {number | null} timeout The set-timeout timer ID for the timer of the delay before the AJAX status is
 * triggered.
 * 
 * @interface {PrimeFaces.widget.AjaxStatusCfg} cfg The configuration for the {@link  AjaxStatus| AjaxStatus widget}.
 * You can access this configuration via {@link PrimeFaces.widget.BaseWidget.cfg|BaseWidget.cfg}. Please note that this
 * configuration is usually meant to be read-only and should not be modified.
 * @extends {PrimeFaces.widget.BaseWidgetCfg} cfg
 * 
 * @prop {PrimeFaces.widget.AjaxStatus.PfAjaxCompleteCallback | jsf.ajax.OnEventCallback | jsf.ajax.OnErrorCallback} cfg.complete
 * Client-side callback for when the AJAX behavior completes, i.e. when the request finishes, irrespective of whether it
 * succeeded or failed. 
 * @prop {PrimeFaces.widget.AjaxStatus.PfAjaxErrorCallback | jsf.ajax.OnErrorCallback} cfg.error Client-side callback
 * for when the AJAX behavior fails, i.e. when the request fails.
 * @prop {number} cfg.delay Delay in milliseconds before displaying the AJAX status. Default is `0`, meaning immediate.
 * @prop {PrimeFaces.widget.AjaxStatus.PfAjaxStartCallback | jsf.ajax.OnEventCallback} cfg.start Client-side callback
 * for when the AJAX behavior starts, i.e. the request is about to be sent.
 * @prop {PrimeFaces.widget.AjaxStatus.PfAjaxSuccessCallback | jsf.ajax.OnEventCallback} cfg.success Client-side
 * callback for when the AJAX  behavior completes successfully, i.e. when the request succeeds.
 */
PrimeFaces.widget.AjaxStatus = PrimeFaces.widget.BaseWidget.extend({

	/**
	 * @override
	 * @inheritdoc
     * @param {PrimeFaces.PartialWidgetCfg<TCfg>} cfg
	 */
    init: function(cfg) {
        this._super(cfg);

        this.bind();
    },

    /**
     * Listen to the relevant events on the document element.
     * @private
     */
    bind: function() {
        var doc = $(document),
        $this = this;

        doc.on('pfAjaxStart', function() {
            var delay = $this.cfg.delay;
            if (delay > 0 ) {
                $this.timeout = setTimeout(function () {
                    $this.trigger('start', arguments);
                }, delay);
            } else {
                $this.trigger('start', arguments);
            }
        })
        .on('pfAjaxError', function() {
            $this.trigger('error', arguments);
        })
        .on('pfAjaxSuccess', function() {
            $this.trigger('success', arguments);
        })
        .on('pfAjaxComplete', function() {
            if($this.timeout) {
                $this.deleteTimeout();
            }
            $this.trigger('complete', arguments);
        });

        // also bind to JSF (f:ajax) events
        // NOTE: PF always fires "complete" as last event, whereas JSF last events are either "success" or "error"
        if (window.jsf && jsf.ajax) {
            jsf.ajax.addOnEvent(function(data) {
                if(data.status === 'begin') {
                    var delay = $this.cfg.delay;
                    if (delay > 0 ) {
                        $this.timeout = setTimeout(function () {
                            $this.trigger('start', arguments);
                        }, delay);
                    } else {
                        $this.trigger('start', arguments);
                    }
                }
                else if(data.status === 'complete') {

                }
                else if(data.status === 'success') {
                    if($this.timeout) {
                        $this.deleteTimeout();
                    }
                    $this.trigger('success', arguments);
                    $this.trigger('complete', arguments);
                }
            });

            jsf.ajax.addOnError(function(data) {
                if($this.timeout) {
                    $this.deleteTimeout();
                }
                $this.trigger('error', arguments);
                $this.trigger('complete', arguments);
            });
        }
    },

    /**
     * Triggers the given event by invoking the event handler, usually defined on the `<p:ajaxStatus/>` tag.
     * @template {PrimeFaces.widget.AjaxStatus.AjaxStatusEventType} K A name of one of the supported events that should
     * be triggered.
     * @param {K} event A name of one of the supported events that should
     * be triggered.
     * @param {Parameters<PrimeFaces.widget.AjaxStatus.EventToCallbackMap[K]>} args Arguments that are passed to the
     * event handler.
     */
    trigger: function(event, args) {
        var callback = this.cfg[event];
        if(callback) {
            callback.apply(document, args);
        }

        if (event !== 'complete' || this.jq.children().filter(this.toFacetId('complete')).length) {
            this.jq.children().hide().filter(this.toFacetId(event)).show();
        }
    },

    /**
     * Finds the facet ID of the given event.
     * @private
     * @param {PrimeFaces.widget.AjaxStatus.AjaxStatusEventType} event One of the supported event
     * @return {string} The ID of the facet element for the given event
     */
    toFacetId: function(event) {
        return this.jqId + '_' + event;
    },

    /**
     * Clears the ste-timeout timer for the delay.
     * @private
     */
    deleteTimeout: function() {
        clearTimeout(this.timeout);
        this.timeout = null;
    }

});;/**
 * __PrimeFaces Poll Widget__
 * 
 * Poll is an ajax component that has the ability to send periodical ajax requests.
 * 
 * @typedef {"millisecond" | "second"} PrimeFaces.widget.Poll.IntervalType Time unit for the polling interval.
 * 
 * @typedef {() => void} PrimeFaces.widget.Poll.PollingAction Callback that performs the polling action. See also
 * {@link PollCfg.fn}.
 * 
 * @prop {boolean} active Whether polling is currently active.
 * @prop {number} timer The set-interval timer ID of the timer used for polling.
 * 
 * @interface {PrimeFaces.widget.PollCfg} cfg The configuration for the {@link  Poll| Poll widget}.
 * You can access this configuration via {@link PrimeFaces.widget.BaseWidget.cfg|BaseWidget.cfg}. Please note that this
 * configuration is usually meant to be read-only and should not be modified.
 * @extends {PrimeFaces.widget.BaseWidgetCfg} cfg
 * 
 * @prop {boolean} cfg.autoStart In auto start mode, polling starts automatically on page load. To start polling on
 * demand set to false.
 * @prop {PrimeFaces.widget.Poll.IntervalType} cfg.intervalType Time unit for the frequency.
 * @prop {number} cfg.frequency Duration between two successive AJAX poll request, either in milliseconds or seconds,
 * depending on the configure `intervalType`.
 * @prop {PrimeFaces.widget.Poll.PollingAction} cfg.fn Callback that performs the polling action.
 */
PrimeFaces.widget.Poll = PrimeFaces.widget.BaseWidget.extend({

    /**
     * @override
     * @inheritdoc
     * @param {PrimeFaces.PartialWidgetCfg<TCfg>} cfg
     */
    init: function(cfg) {
        this._super(cfg);

        this.active = false;

        if(this.cfg.autoStart) {
            this.start();
        }
    },

    /**
     * @override
     * @inheritdoc
     * @param {PrimeFaces.PartialWidgetCfg<TCfg>} cfg
     */
    refresh: function(cfg) {
        this.stop();

        this._super(cfg);
    },

    /**
     * @override
     * @inheritdoc
     */
    destroy: function() {
        this._super();

        this.stop();
    },

    /**
     * Starts the polling, sending AJAX requests in periodic intervals.
     */
    start: function() {
        if (!this.active) {
            var frequency = this.cfg.intervalType == 'millisecond' ? this.cfg.frequency : (this.cfg.frequency * 1000);
            this.timer = setInterval(this.cfg.fn, frequency);
            this.active = true;
        }
    },

    /**
     * Stops the polling so that no more AJAX requests are made.
     */
    stop: function() {
        if (this.active) {
            clearInterval(this.timer);
            this.active = false;
        }
    },

    /**
     * Checks whether polling is active or whether it was stopped.
     * @return {boolean} `true` if polling is currently active, or `false` otherwise.
     */
    isActive: function() {
        return this.active;
    }
});