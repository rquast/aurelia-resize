define(['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var ResizeCustomAttribute = (function () {
    function ResizeCustomAttribute(element) {
      _classCallCheck(this, _ResizeCustomAttribute);

      this.element = element;
      this.callback = null;
      this.erd = elementResizeDetectorMaker();
    }

    _createClass(ResizeCustomAttribute, [{
      key: 'createThrottler',
      value: function createThrottler(fn, delay) {
        var _arguments = arguments;

        var timeout = 0;
        return function () {
          var args = _arguments;
          if (timeout == 0) {
            timeout = setTimeout(function () {
              timeout = 0;
              return fn.apply(fn, args);
            }, delay());
          }
        };
      }
    }, {
      key: 'createDebouncer',
      value: function createDebouncer(fn, delay) {
        var timeout = 0;
        return function () {
          var args = arguments;
          timeout && clearTimeout(timeout);
          timeout = setTimeout(function () {
            return fn.apply(fn, args);
          }, delay());
        };
      }
    }, {
      key: 'bind',
      value: function bind() {
        if (this.handler == undefined) return;

        var self = this;
        var handler = this.handler;
        var element = this.element;

        this.callback = function () {
          var width = element.offsetWidth;
          var height = element.offsetHeight;
          handler(width, height);
        };

        if (this.throttle != undefined) this.callback = this.createThrottler(this.callback, function () {
          return self.throttle;
        });else if (this.debounce != undefined) this.callback = this.createDebouncer(this.callback, function () {
          return self.debounce;
        });

        this.erd.listenTo(this.element, this.callback);
      }
    }, {
      key: 'unbind',
      value: function unbind() {
        if (this.callback) this.erd.uninstall(this.element);
      }
    }]);

    var _ResizeCustomAttribute = ResizeCustomAttribute;
    ResizeCustomAttribute = (0, _aureliaFramework.bindable)('debounce')(ResizeCustomAttribute) || ResizeCustomAttribute;
    ResizeCustomAttribute = (0, _aureliaFramework.bindable)('throttle')(ResizeCustomAttribute) || ResizeCustomAttribute;
    ResizeCustomAttribute = (0, _aureliaFramework.bindable)('handler')(ResizeCustomAttribute) || ResizeCustomAttribute;
    ResizeCustomAttribute = (0, _aureliaFramework.customAttribute)('resize-event')(ResizeCustomAttribute) || ResizeCustomAttribute;
    ResizeCustomAttribute = (0, _aureliaFramework.inject)(Element)(ResizeCustomAttribute) || ResizeCustomAttribute;
    return ResizeCustomAttribute;
  })();

  exports.ResizeCustomAttribute = ResizeCustomAttribute;

  !(function (a) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = a();else if ("function" == typeof define && define.amd) define([], a);else {
      var b;b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, b.elementResizeDetectorMaker = a();
    }
  })(function () {
    return (function a(b, c, d) {
      function e(g, h) {
        if (!c[g]) {
          if (!b[g]) {
            var i = "function" == typeof require && require;if (!h && i) return i(g, !0);if (f) return f(g, !0);var j = new Error("Cannot find module '" + g + "'");throw (j.code = "MODULE_NOT_FOUND", j);
          }var k = c[g] = { exports: {} };b[g][0].call(k.exports, function (a) {
            var c = b[g][1][a];return e(c ? c : a);
          }, k, k.exports, a, b, c, d);
        }return c[g].exports;
      }for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);return e;
    })({ 1: [function (a, b, c) {
        "use strict";function d() {
          function a(a, b) {
            b || (b = a, a = 0), a > f ? f = a : g > a && (g = a), d[a] || (d[a] = []), d[a].push(b), e++;
          }function b() {
            for (var a = g; f >= a; a++) for (var b = d[a], c = 0; c < b.length; c++) {
              var e = b[c];e();
            }
          }function c() {
            return e;
          }var d = {},
              e = 0,
              f = 0,
              g = 0;return { add: a, process: b, size: c };
        }var e = a("./utils");b.exports = function (a) {
          function b(a, b) {
            !o && l && k && 0 === n.size() && g(), n.add(a, b);
          }function c() {
            for (o = !0; n.size();) {
              var a = n;n = d(), a.process();
            }o = !1;
          }function f(a) {
            o || (void 0 === a && (a = k), m && (h(m), m = null), a ? g() : c());
          }function g() {
            m = i(c);
          }function h(a) {
            var b = clearTimeout;return b(a);
          }function i(a) {
            var b = function b(a) {
              return setTimeout(a, 0);
            };return b(a);
          }a = a || {};var j = a.reporter,
              k = e.getOption(a, "async", !0),
              l = e.getOption(a, "auto", !0);l && !k && (j && j.warn("Invalid options combination. auto=true and async=false is invalid. Setting async=true."), k = !0);var m,
              n = d(),
              o = !1;return { add: b, force: f };
        };
      }, { "./utils": 2 }], 2: [function (a, b, c) {
        "use strict";function d(a, b, c) {
          var d = a[b];return void 0 !== d && null !== d || void 0 === c ? d : c;
        }var e = b.exports = {};e.getOption = d;
      }, {}], 3: [function (a, b, c) {
        "use strict";var d = b.exports = {};d.isIE = function (a) {
          function b() {
            var a = navigator.userAgent.toLowerCase();return -1 !== a.indexOf("msie") || -1 !== a.indexOf("trident") || -1 !== a.indexOf(" edge/");
          }if (!b()) return !1;if (!a) return !0;var c = (function () {
            var a,
                b = 3,
                c = document.createElement("div"),
                d = c.getElementsByTagName("i");do c.innerHTML = "<!--[if gt IE " + ++b + "]><i></i><![endif]-->"; while (d[0]);return b > 4 ? b : a;
          })();return a === c;
        }, d.isLegacyOpera = function () {
          return !!window.opera;
        };
      }, {}], 4: [function (a, b, c) {
        "use strict";var d = b.exports = {};d.forEach = function (a, b) {
          for (var c = 0; c < a.length; c++) {
            var d = b(a[c]);if (d) return d;
          }
        };
      }, {}], 5: [function (a, b, c) {
        "use strict";var d = a("../browser-detector");b.exports = function (a) {
          function b(a, b) {
            function c() {
              b(a);
            }if (!e(a)) throw new Error("Element is not detectable by this strategy.");if (d.isIE(8)) i(a).object = { proxy: c }, a.attachEvent("onresize", c);else {
              var f = e(a);f.contentDocument.defaultView.addEventListener("resize", c);
            }
          }function c(a, b, c) {
            function e(a, b) {
              function c() {
                function c() {
                  if ("static" === j.position) {
                    a.style.position = "relative";var b = function b(a, _b, c, d) {
                      function e(a) {
                        return a.replace(/[^-\d\.]/g, "");
                      }var f = c[d];"auto" !== f && "0" !== e(f) && (a.warn("An element that is positioned static has style." + d + "=" + f + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + d + " will be set to 0. Element: ", _b), _b.style[d] = 0);
                    };b(g, a, j, "top"), b(g, a, j, "right"), b(g, a, j, "bottom"), b(g, a, j, "left");
                  }
                }function h() {
                  function d(a, b) {
                    return a.contentDocument ? void b(a.contentDocument) : void setTimeout(function () {
                      d(a, b);
                    }, 100);
                  }f || c();var e = this;d(e, function (c) {
                    b(a);
                  });
                }"" !== j.position && (c(j), f = !0);var k = document.createElement("object");k.style.cssText = e, k.type = "text/html", k.onload = h, d.isIE() || (k.data = "about:blank"), a.appendChild(k), i(a).object = k, d.isIE() && (k.data = "about:blank");
              }var e = "display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; padding: 0; margin: 0; opacity: 0; z-index: -1000; pointer-events: none;",
                  f = !1,
                  j = getComputedStyle(a),
                  k = a.offsetWidth,
                  l = a.offsetHeight;i(a).startSize = { width: k, height: l }, h ? h.add(c) : c();
            }c || (c = b, b = a, a = null), a = a || {};a.debug;d.isIE(8) ? c(b) : e(b, c);
          }function e(a) {
            return i(a).object;
          }function f(a) {
            d.isIE(8) ? a.detachEvent("onresize", i(a).object.proxy) : a.removeChild(e(a)), delete i(a).object;
          }a = a || {};var g = a.reporter,
              h = a.batchProcessor,
              i = a.stateHandler.getState;if (!g) throw new Error("Missing required dependency: reporter.");return { makeDetectable: c, addListener: b, uninstall: f };
        };
      }, { "../browser-detector": 3 }], 6: [function (a, b, c) {
        "use strict";var d = a("../collection-utils").forEach;b.exports = function (a) {
          function b() {
            var a = 500,
                b = 500,
                c = document.createElement("div");c.style.cssText = "position: absolute; width: " + 2 * a + "px; height: " + 2 * b + "px; visibility: hidden;";var d = document.createElement("div");d.style.cssText = "position: absolute; width: " + a + "px; height: " + b + "px; overflow: scroll; visibility: none; top: " + 3 * -a + "px; left: " + 3 * -b + "px; visibility: hidden;", d.appendChild(c), document.body.insertBefore(d, document.body.firstChild);var e = a - d.clientWidth,
                f = b - d.clientHeight;return document.body.removeChild(d), { width: e, height: f };
          }function c(a, b) {
            function c(b, c) {
              c = c || function (a) {
                document.head.appendChild(a);
              };var d = document.createElement("style");return d.innerHTML = b, d.id = a, c(d), d;
            }if (!document.getElementById(a)) {
              var d = b + "_animation",
                  e = b + "_animation_active",
                  f = "/* Created by the element-resize-detector library. */\n";f += "." + b + " > div::-webkit-scrollbar { display: none; }\n\n", f += "." + e + " { -webkit-animation-duration: 0.1s; animation-duration: 0.1s; -webkit-animation-name: " + d + "; animation-name: " + d + "; }\n", f += "@-webkit-keyframes " + d + " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }\n", f += "@keyframes " + d + " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }", c(f);
            }
          }function e(a) {
            a.className += " " + o + "_animation_active";
          }function f(a, b) {
            var c = k(a).listeners;if (!c.push) throw new Error("Cannot add listener to an element that is not detectable.");k(a).listeners.push(b);
          }function g(a, b, c) {
            function f() {
              if (a.debug) {
                var c = Array.prototype.slice.call(arguments);if ((c.unshift(l.get(b), "Scroll: "), i.log.apply)) i.log.apply(null, c);else for (var d = 0; d < c.length; d++) i.log(c[d]);
              }
            }function g(a) {
              function b(a) {
                return a === a.ownerDocument.body || a.ownerDocument.body.contains(a);
              }return !b(a);
            }function h(a) {
              var b = k(a).container.childNodes[0];return -1 === getComputedStyle(b).width.indexOf("px");
            }function n() {
              var a = getComputedStyle(b),
                  c = {};return c.position = a.position, c.width = b.offsetWidth, c.height = b.offsetHeight, c.top = a.top, c.right = a.right, c.bottom = a.bottom, c.left = a.left, c.widthCSS = a.width, c.heightCSS = a.height, c;
            }function p() {
              var a = n();k(b).startSize = { width: a.width, height: a.height }, f("Element start size", k(b).startSize);
            }function q() {
              k(b).listeners = [];
            }function r() {
              f("storeStyle invoked.");var a = n();k(b).style = a;
            }function s(a, b, c) {
              k(a).lastWidth = b, k(a).lastHeight = c;
            }function t(a) {
              return k(a).container.childNodes[0].childNodes[0].childNodes[0];
            }function u(a) {
              return t(a).childNodes[0];
            }function v(a) {
              return k(a).container.childNodes[0].childNodes[0].childNodes[1];
            }function w() {
              return 2 * m.width + 1;
            }function x() {
              return 2 * m.height + 1;
            }function y(a) {
              return a + 10 + w();
            }function z(a) {
              return a + 10 + x();
            }function A(a) {
              return 2 * a + w();
            }function B(a) {
              return 2 * a + x();
            }function C(a, b, c) {
              var d = t(a),
                  e = v(a),
                  f = y(b),
                  g = z(c),
                  h = A(b),
                  i = B(c);d.scrollLeft = f, d.scrollTop = g, e.scrollLeft = h, e.scrollTop = i;
            }function D(a, b, c) {
              if (a.addEventListener) a.addEventListener(b, c);else {
                if (!a.attachEvent) return i.error("[scroll] Don't know how to add event listeners.");a.attachEvent("on" + b, c);
              }
            }function E() {
              var a = k(b).container;return a || (a = document.createElement("div"), a.className = o, a.style.cssText = "visibility: hidden; display: inline; width: 0px; height: 0px; z-index: -1; overflow: hidden;", k(b).container = a, e(a), b.appendChild(a), D(a, "animationstart", function () {
                k(b).onRendered && k(b).onRendered();
              })), a;
            }function F() {
              function a() {
                var a = k(b).style;if ("static" === a.position) {
                  b.style.position = "relative";var c = function c(a, b, _c, d) {
                    function e(a) {
                      return a.replace(/[^-\d\.]/g, "");
                    }var f = _c[d];"auto" !== f && "0" !== e(f) && (a.warn("An element that is positioned static has style." + d + "=" + f + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + d + " will be set to 0. Element: ", b), b.style[d] = 0);
                  };c(i, b, a, "top"), c(i, b, a, "right"), c(i, b, a, "bottom"), c(i, b, a, "left");
                }
              }function c(a, b, c, d) {
                return a = a ? a + "px" : "0", b = b ? b + "px" : "0", c = c ? c + "px" : "0", d = d ? d + "px" : "0", "left: " + a + "; top: " + b + "; right: " + d + "; bottom: " + c + ";";
              }f("Injecting elements"), a();var d = k(b).container;d || (d = E());var e = m.width,
                  g = m.height,
                  h = "position: absolute; overflow: hidden; z-index: -1; visibility: hidden; width: 100%; height: 100%; left: 0px; top: 0px;",
                  j = "position: absolute; overflow: hidden; z-index: -1; visibility: hidden; " + c(-(1 + e), -(1 + g), -g, -e),
                  l = "position: absolute; overflow: scroll; z-index: -1; visibility: hidden; width: 100%; height: 100%;",
                  n = "position: absolute; overflow: scroll; z-index: -1; visibility: hidden; width: 100%; height: 100%;",
                  p = "position: absolute; left: 0; top: 0;",
                  q = "position: absolute; width: 200%; height: 200%;",
                  r = document.createElement("div"),
                  s = document.createElement("div"),
                  t = document.createElement("div"),
                  u = document.createElement("div"),
                  v = document.createElement("div"),
                  w = document.createElement("div");r.style.cssText = h, r.className = o, s.className = o, s.style.cssText = j, t.style.cssText = l, u.style.cssText = p, v.style.cssText = n, w.style.cssText = q, t.appendChild(u), v.appendChild(w), s.appendChild(t), s.appendChild(v), r.appendChild(s), d.appendChild(r), D(t, "scroll", function () {
                k(b).onExpand && k(b).onExpand();
              }), D(v, "scroll", function () {
                k(b).onShrink && k(b).onShrink();
              });
            }function G() {
              function c(a, b, c) {
                var d = u(a),
                    e = y(b),
                    f = z(c);d.style.width = e + "px", d.style.height = f + "px";
              }function e(d) {
                var e = b.offsetWidth,
                    g = b.offsetHeight;f("Storing current size", e, g), s(b, e, g), j.add(0, function () {
                  if (a.debug) {
                    var d = b.offsetWidth,
                        f = b.offsetHeight;(d !== e || f !== g) && i.warn(l.get(b), "Scroll: Size changed before updating detector elements.");
                  }c(b, e, g);
                }), j.add(1, function () {
                  C(b, e, g);
                }), d && j.add(2, d);
              }function g() {
                function a() {
                  return void 0 === k(b).lastNotifiedWidth;
                }f("notifyListenersIfNeeded invoked");var c = k(b);return a() && c.lastWidth === c.startSize.width && c.lastHeight === c.startSize.height ? f("Not notifying: Size is the same as the start size, and there has been no notification yet.") : c.lastWidth === c.lastNotifiedWidth && c.lastHeight === c.lastNotifiedHeight ? f("Not notifying: Size already notified") : (f("Current size not notified, notifying..."), c.lastNotifiedWidth = c.lastWidth, c.lastNotifiedHeight = c.lastHeight, void d(k(b).listeners, function (a) {
                  a(b);
                }));
              }function m() {
                if ((f("startanimation triggered."), h(b))) return void f("Ignoring since element is still unrendered...");f("Element rendered.");var a = t(b),
                    c = v(b);(0 === a.scrollLeft || 0 === a.scrollTop || 0 === c.scrollLeft || 0 === c.scrollTop) && (f("Scrollbars out of sync. Updating detector elements..."), e(g));
              }function n() {
                if ((f("Scroll detected."), h(b))) return void f("Scroll event fired while unrendered. Ignoring...");var a = b.offsetWidth,
                    c = b.offsetHeight;a !== b.lastWidth || c !== b.lastHeight ? (f("Element size changed."), e(g)) : f("Element size has not changed (" + a + "x" + c + ").");
              }f("registerListenersAndPositionElements invoked."), k(b).onRendered = m, k(b).onExpand = n, k(b).onShrink = n;var o = k(b).style;c(b, o.width, o.height);
            }function H() {
              f("finalizeDomMutation invoked.");var a = k(b).style;s(b, a.width, a.height), C(b, a.width, a.height);
            }function I() {
              c(b);
            }function J() {
              f("Installing..."), q(), p(), j.add(0, r), j.add(1, F), j.add(2, G), j.add(3, H), j.add(4, I);
            }c || (c = b, b = a, a = null), a = a || {}, f("Making detectable..."), g(b) ? (f("Element is detached"), E(), f("Waiting until element is attached..."), k(b).onRendered = function () {
              f("Element is now attached"), J();
            }) : J();
          }function h(a) {
            var b = k(a);a.removeChild(b.container), delete b.container;
          }a = a || {};var i = a.reporter,
              j = a.batchProcessor,
              k = a.stateHandler.getState,
              l = a.idHandler;if (!j) throw new Error("Missing required dependency: batchProcessor");if (!i) throw new Error("Missing required dependency: reporter.");var m = b(),
              n = "erd_scroll_detection_scrollbar_style",
              o = "erd_scroll_detection_container";return c(n, o), { makeDetectable: g, addListener: f, uninstall: h };
        };
      }, { "../collection-utils": 4 }], 7: [function (a, b, c) {
        "use strict";function d(a, b, c) {
          var d = a[b];return void 0 !== d && null !== d || void 0 === c ? d : c;
        }var e = a("./collection-utils").forEach,
            f = a("./element-utils"),
            g = a("./listener-handler"),
            h = a("./id-generator"),
            i = a("./id-handler"),
            j = a("./reporter"),
            k = a("./browser-detector"),
            l = a("batch-processor"),
            m = a("./state-handler"),
            n = a("./detection-strategy/object.js"),
            o = a("./detection-strategy/scroll.js");b.exports = function (a) {
          function b(a, b, c) {
            function f(a) {
              var b = x.get(a);e(b, function (b) {
                b(a);
              });
            }function g(a, b, c) {
              x.add(b, c), a && c(b);
            }function h(a) {
              return Array.isArray(a) || void 0 !== a.length;
            }function i(a) {
              if (Array.isArray(a)) return a;var c = [];return e(b, function (a) {
                c.push(a);
              }), c;
            }function j(a) {
              return a && 1 === a.nodeType;
            }if ((c || (c = b, b = a, a = {}), !b)) throw new Error("At least one element required.");if (!c) throw new Error("Listener required.");if (j(b)) b = [b];else {
              if (!h(b)) return s.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");b = i(b);
            }var k = 0,
                l = d(a, "callOnAdd", v.callOnAdd),
                n = d(a, "onReady", function () {}),
                o = d(a, "debug", v.debug);e(b, function (a) {
              var d = p.get(a);return o && s.log("Attaching listener to element", d, a), y.isDetectable(a) ? (o && s.log(d, "Already detecable, adding listener."), g(l, a, c), void k++) : (o && s.log(d, "Not detectable."), y.isBusy(a) ? (o && s.log(d, "System busy making it detectable"), g(l, a, c), B[d] = B[d] || [], void B[d].push(function () {
                k++, k === b.length && n();
              })) : (o && s.log(d, "Making detectable..."), y.markBusy(a, !0), w.makeDetectable({ debug: o }, a, function (a) {
                if ((o && s.log(d, "onElementDetectable"), y.markAsDetectable(a), y.markBusy(a, !1), w.addListener(a, f), g(l, a, c), m.getState(a).startSize)) {
                  var h = a.offsetWidth,
                      i = a.offsetHeight;(m.getState(a).startSize.width !== h || m.getState(a).startSize.height !== i) && f(a);
                }k++, k === b.length && n(), B[d] && (e(B[d], function (a) {
                  a();
                }), delete B[d]);
              })));
            }), k === b.length && n();
          }function c(a) {
            x.removeAllListeners(a), w.uninstall(a), m.cleanState(a);
          }a = a || {};var p = a.idHandler;if (!p) {
            var q = h(),
                r = i({ idGenerator: q, stateHandler: m });p = r;
          }var s = a.reporter;if (!s) {
            var t = s === !1;s = j(t);
          }var u = d(a, "batchProcessor", l({ reporter: s })),
              v = {};v.callOnAdd = !!d(a, "callOnAdd", !0), v.debug = !!d(a, "debug", !1);var w,
              x = g(p),
              y = f({ stateHandler: m }),
              z = d(a, "strategy", "object"),
              A = { reporter: s, batchProcessor: u, stateHandler: m, idHandler: p };if (("scroll" === z && (k.isLegacyOpera() ? (s.warn("Scroll strategy is not supported on legacy Opera. Changing to object strategy."), z = "object") : k.isIE(9) && (s.warn("Scroll strategy is not supported on IE9. Changing to object strategy."), z = "object")), "scroll" === z)) w = o(A);else {
            if ("object" !== z) throw new Error("Invalid strategy name: " + z);w = n(A);
          }var B = {};return { listenTo: b, removeListener: x.removeListener, removeAllListeners: x.removeAllListeners, uninstall: c };
        };
      }, { "./browser-detector": 3, "./collection-utils": 4, "./detection-strategy/object.js": 5, "./detection-strategy/scroll.js": 6, "./element-utils": 8, "./id-generator": 9, "./id-handler": 10, "./listener-handler": 11, "./reporter": 12, "./state-handler": 13, "batch-processor": 1 }], 8: [function (a, b, c) {
        "use strict";b.exports = function (a) {
          function b(a) {
            return !!f(a).isDetectable;
          }function c(a) {
            f(a).isDetectable = !0;
          }function d(a) {
            return !!f(a).busy;
          }function e(a, b) {
            f(a).busy = !!b;
          }var f = a.stateHandler.getState;return { isDetectable: b, markAsDetectable: c, isBusy: d, markBusy: e };
        };
      }, {}], 9: [function (a, b, c) {
        "use strict";b.exports = function () {
          function a() {
            return b++;
          }var b = 1;return { generate: a };
        };
      }, {}], 10: [function (a, b, c) {
        "use strict";b.exports = function (a) {
          function b(a, b) {
            return b || d(a) || c(a), g(a).id;
          }function c(a) {
            var b = f.generate();return g(a).id = b, b;
          }function d(a) {
            return void 0 !== g(a).id;
          }function e(a) {
            delete g(a).id;
          }var f = a.idGenerator,
              g = a.stateHandler.getState;return { get: b, remove: e };
        };
      }, {}], 11: [function (a, b, c) {
        "use strict";b.exports = function (a) {
          function b(b) {
            return f[a.get(b)] || [];
          }function c(b, c) {
            var d = a.get(b);f[d] || (f[d] = []), f[d].push(c);
          }function d(a, c) {
            for (var d = b(a), e = 0, f = d.length; f > e; ++e) if (d[e] === c) {
              d.splice(e, 1);break;
            }
          }function e(b) {
            var c = f[a.get(b)];c && (c.length = 0);
          }var f = {};return { get: b, add: c, removeListener: d, removeAllListeners: e };
        };
      }, {}], 12: [function (a, b, c) {
        "use strict";b.exports = function (a) {
          function b() {}var c = { log: b, warn: b, error: b };if (!a && window.console) {
            var d = function d(a, b) {
              a[b] = function () {
                var a = console[b];if (a.apply) a.apply(console, arguments);else for (var c = 0; c < arguments.length; c++) a(arguments[c]);
              };
            };d(c, "log"), d(c, "warn"), d(c, "error");
          }return c;
        };
      }, {}], 13: [function (a, b, c) {
        "use strict";function d(a) {
          return a[g] = {}, e(a);
        }function e(a) {
          return a[g] || d(a);
        }function f(a) {
          delete a[g];
        }var g = "_erd";b.exports = { initState: d, getState: e, cleanState: f };
      }, {}] }, {}, [7])(7);
  });
});