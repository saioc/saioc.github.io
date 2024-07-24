/*!
 * vConsole v3.4.0 (https://github.com/Tencent/vConsole)
 *
 * Tencent is pleased to support the open source community by making vConsole available.
 * Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
 * http://opensource.org/licenses/MIT
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
      ? define("VConsole", [], t)
      : "object" == typeof exports
        ? (exports.VConsole = t())
        : (e.VConsole = t());
})(window, function () {
  return (function (e) {
    var t = {};
    function n(o) {
      if (t[o]) return t[o].exports;
      var r = (t[o] = { i: o, l: !1, exports: {} });
      return e[o].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
    }
    return (
      (n.m = e),
      (n.c = t),
      (n.d = function (e, t, o) {
        n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o });
      }),
      (n.r = function (e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (n.t = function (e, t) {
        if ((1 & t && (e = n(e)), 8 & t)) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var o = Object.create(null);
        if (
          (n.r(o),
          Object.defineProperty(o, "default", { enumerable: !0, value: e }),
          2 & t && "string" != typeof e)
        )
          for (var r in e)
            n.d(
              o,
              r,
              function (t) {
                return e[t];
              }.bind(null, r),
            );
        return o;
      }),
      (n.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return n.d(t, "a", t), t;
      }),
      (n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (n.p = ""),
      n((n.s = 6))
    );
  })([
    function (e, t, n) {
      var o, r, i;
      "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof self && self,
        (r = [t]),
        void 0 ===
          (i =
            "function" ==
            typeof (o = function (e) {
              "use strict";
              function t(e) {
                return (t =
                  "function" == typeof Symbol &&
                  "symbol" == typeof Symbol.iterator
                    ? function (e) {
                        return typeof e;
                      }
                    : function (e) {
                        return e &&
                          "function" == typeof Symbol &&
                          e.constructor === Symbol &&
                          e !== Symbol.prototype
                          ? "symbol"
                          : typeof e;
                      })(e);
              }
              function n(e) {
                return "[object Number]" == Object.prototype.toString.call(e);
              }
              function o(e) {
                return "[object String]" == Object.prototype.toString.call(e);
              }
              function r(e) {
                return "[object Array]" == Object.prototype.toString.call(e);
              }
              function i(e) {
                return "[object Boolean]" == Object.prototype.toString.call(e);
              }
              function a(e) {
                return void 0 === e;
              }
              function l(e) {
                return null === e;
              }
              function c(e) {
                return "[object Symbol]" == Object.prototype.toString.call(e);
              }
              function s(e) {
                return !(
                  "[object Object]" != Object.prototype.toString.call(e) &&
                  (n(e) || o(e) || i(e) || r(e) || l(e) || u(e) || a(e) || c(e))
                );
              }
              function u(e) {
                return "[object Function]" == Object.prototype.toString.call(e);
              }
              function d(e) {
                var t = Object.prototype.toString.call(e);
                return (
                  "[object global]" == t ||
                  "[object Window]" == t ||
                  "[object DOMWindow]" == t
                );
              }
              function f(e) {
                if (!s(e) && !r(e)) return [];
                var t = [];
                for (var n in e) t.push(n);
                return t.sort();
              }
              Object.defineProperty(e, "__esModule", { value: !0 }),
                (e.getDate = function (e) {
                  var t = e > 0 ? new Date(e) : new Date(),
                    n = t.getDate() < 10 ? "0" + t.getDate() : t.getDate(),
                    o =
                      t.getMonth() < 9
                        ? "0" + (t.getMonth() + 1)
                        : t.getMonth() + 1,
                    r = t.getFullYear(),
                    i = t.getHours() < 10 ? "0" + t.getHours() : t.getHours(),
                    a =
                      t.getMinutes() < 10
                        ? "0" + t.getMinutes()
                        : t.getMinutes(),
                    l =
                      t.getSeconds() < 10
                        ? "0" + t.getSeconds()
                        : t.getSeconds(),
                    c =
                      t.getMilliseconds() < 10
                        ? "0" + t.getMilliseconds()
                        : t.getMilliseconds();
                  return (
                    c < 100 && (c = "0" + c),
                    {
                      time: +t,
                      year: r,
                      month: o,
                      day: n,
                      hour: i,
                      minute: a,
                      second: l,
                      millisecond: c,
                    }
                  );
                }),
                (e.isNumber = n),
                (e.isString = o),
                (e.isArray = r),
                (e.isBoolean = i),
                (e.isUndefined = a),
                (e.isNull = l),
                (e.isSymbol = c),
                (e.isObject = s),
                (e.isFunction = u),
                (e.isElement = function (e) {
                  return "object" ===
                    ("undefined" == typeof HTMLElement
                      ? "undefined"
                      : t(HTMLElement))
                    ? e instanceof HTMLElement
                    : e &&
                        "object" === t(e) &&
                        null !== e &&
                        1 === e.nodeType &&
                        "string" == typeof e.nodeName;
                }),
                (e.isWindow = d),
                (e.isPlainObject = function (e) {
                  var n,
                    o = Object.prototype.hasOwnProperty;
                  if (!e || "object" !== t(e) || e.nodeType || d(e)) return !1;
                  try {
                    if (
                      e.constructor &&
                      !o.call(e, "constructor") &&
                      !o.call(e.constructor.prototype, "isPrototypeOf")
                    )
                      return !1;
                  } catch (e) {
                    return !1;
                  }
                  for (n in e);
                  return void 0 === n || o.call(e, n);
                }),
                (e.htmlEncode = function (e) {
                  return document
                    .createElement("a")
                    .appendChild(document.createTextNode(e)).parentNode
                    .innerHTML;
                }),
                (e.JSONStringify = function (e) {
                  if (!s(e) && !r(e)) return JSON.stringify(e);
                  var t = "{",
                    n = "}";
                  r(e) && ((t = "["), (n = "]"));
                  for (var o = t, i = f(e), a = 0; a < i.length; a++) {
                    var l = i[a],
                      d = e[l];
                    try {
                      r(e) ||
                        (s(l) || r(l) || c(l)
                          ? (o += Object.prototype.toString.call(l))
                          : (o += l),
                        (o += ": ")),
                        r(d)
                          ? (o += "Array[" + d.length + "]")
                          : s(d) || c(d) || u(d)
                            ? (o += Object.prototype.toString.call(d))
                            : (o += JSON.stringify(d)),
                        a < i.length - 1 && (o += ", ");
                    } catch (e) {
                      continue;
                    }
                  }
                  return (o += n);
                }),
                (e.getObjAllKeys = f),
                (e.getObjName = function (e) {
                  return Object.prototype.toString
                    .call(e)
                    .replace("[object ", "")
                    .replace("]", "");
                }),
                (e.setStorage = function (e, t) {
                  window.localStorage &&
                    ((e = "vConsole_" + e), localStorage.setItem(e, t));
                }),
                (e.getStorage = function (e) {
                  if (window.localStorage)
                    return (e = "vConsole_" + e), localStorage.getItem(e);
                });
            })
              ? o.apply(t, r)
              : o) || (e.exports = i);
    },
    function (e, t, n) {
      var o, r, i;
      "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof self && self,
        (r = [t, n(0), n(10)]),
        void 0 ===
          (i =
            "function" ==
            typeof (o = function (n, o, r) {
              "use strict";
              var i;
              Object.defineProperty(n, "__esModule", { value: !0 }),
                (n.default = void 0),
                (r = (i = r) && i.__esModule ? i : { default: i });
              var a = {
                one: function (e, t) {
                  try {
                    return (t || document).querySelector(e) || void 0;
                  } catch (e) {
                    return;
                  }
                },
                all: function (e, t) {
                  try {
                    var n = (t || document).querySelectorAll(e);
                    return [].slice.call(n);
                  } catch (e) {
                    return [];
                  }
                },
                addClass: function (e, t) {
                  if (e) {
                    (0, o.isArray)(e) || (e = [e]);
                    for (var n = 0; n < e.length; n++) {
                      var r = (e[n].className || "").split(" ");
                      r.indexOf(t) > -1 ||
                        (r.push(t), (e[n].className = r.join(" ")));
                    }
                  }
                },
                removeClass: function (e, t) {
                  if (e) {
                    (0, o.isArray)(e) || (e = [e]);
                    for (var n = 0; n < e.length; n++) {
                      for (
                        var r = e[n].className.split(" "), i = 0;
                        i < r.length;
                        i++
                      )
                        r[i] == t && (r[i] = "");
                      e[n].className = r.join(" ").trim();
                    }
                  }
                },
                hasClass: function (e, t) {
                  return !(!e || !e.classList) && e.classList.contains(t);
                },
                bind: function (e, t, n, r) {
                  e &&
                    ((0, o.isArray)(e) || (e = [e]),
                    e.forEach(function (e) {
                      e.addEventListener(t, n, !!r);
                    }));
                },
                delegate: function (e, t, n, o) {
                  e &&
                    e.addEventListener(
                      t,
                      function (t) {
                        var r = a.all(n, e);
                        if (r)
                          e: for (var i = 0; i < r.length; i++)
                            for (var l = t.target; l; ) {
                              if (l == r[i]) {
                                o.call(l, t);
                                break e;
                              }
                              if ((l = l.parentNode) == e) break;
                            }
                      },
                      !1,
                    );
                },
              };
              a.render = r.default;
              var l = a;
              (n.default = l), (e.exports = t.default);
            })
              ? o.apply(t, r)
              : o) || (e.exports = i);
    },
    function (e, t, n) {
      var o, r, i;
      "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof self && self,
        (r = [t]),
        void 0 ===
          (i =
            "function" ==
            typeof (o = function (n) {
              "use strict";
              function o(e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              }
              function r(e, t) {
                for (var n = 0; n < t.length; n++) {
                  var o = t[n];
                  (o.enumerable = o.enumerable || !1),
                    (o.configurable = !0),
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o);
                }
              }
              Object.defineProperty(n, "__esModule", { value: !0 }),
                (n.default = void 0);
              var i = (function () {
                function e(t) {
                  var n =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : "newPlugin";
                  o(this, e),
                    (this.id = t),
                    (this.name = n),
                    (this.isReady = !1),
                    (this.eventList = {});
                }
                var t, n, i;
                return (
                  (t = e),
                  (n = [
                    {
                      key: "on",
                      value: function (e, t) {
                        return (this.eventList[e] = t), this;
                      },
                    },
                    {
                      key: "trigger",
                      value: function (e, t) {
                        if ("function" == typeof this.eventList[e])
                          this.eventList[e].call(this, t);
                        else {
                          var n = "on" + e.charAt(0).toUpperCase() + e.slice(1);
                          "function" == typeof this[n] && this[n].call(this, t);
                        }
                        return this;
                      },
                    },
                    {
                      key: "id",
                      get: function () {
                        return this._id;
                      },
                      set: function (e) {
                        if (!e) throw "Plugin ID cannot be empty";
                        this._id = e.toLowerCase();
                      },
                    },
                    {
                      key: "name",
                      get: function () {
                        return this._name;
                      },
                      set: function (e) {
                        if (!e) throw "Plugin name cannot be empty";
                        this._name = e;
                      },
                    },
                    {
                      key: "vConsole",
                      get: function () {
                        return this._vConsole || void 0;
                      },
                      set: function (e) {
                        if (!e) throw "vConsole cannot be empty";
                        this._vConsole = e;
                      },
                    },
                  ]) && r(t.prototype, n),
                  i && r(t, i),
                  e
                );
              })();
              (n.default = i), (e.exports = t.default);
            })
              ? o.apply(t, r)
              : o) || (e.exports = i);
    },
    function (e, t, n) {
      var o, r, i;
      "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof self && self,
        (r = [t, n(0), n(1), n(2), n(18), n(19), n(20)]),
        void 0 ===
          (i =
            "function" ==
            typeof (o = function (n, o, r, i, a, l, c) {
              "use strict";
              function s(e) {
                return e && e.__esModule ? e : { default: e };
              }
              function u() {
                if ("function" != typeof WeakMap) return null;
                var e = new WeakMap();
                return (
                  (u = function () {
                    return e;
                  }),
                  e
                );
              }
              function d(e) {
                return (d =
                  "function" == typeof Symbol &&
                  "symbol" == typeof Symbol.iterator
                    ? function (e) {
                        return typeof e;
                      }
                    : function (e) {
                        return e &&
                          "function" == typeof Symbol &&
                          e.constructor === Symbol &&
                          e !== Symbol.prototype
                          ? "symbol"
                          : typeof e;
                      })(e);
              }
              function f(e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              }
              function v(e, t) {
                for (var n = 0; n < t.length; n++) {
                  var o = t[n];
                  (o.enumerable = o.enumerable || !1),
                    (o.configurable = !0),
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o);
                }
              }
              function p(e, t) {
                return (p =
                  Object.setPrototypeOf ||
                  function (e, t) {
                    return (e.__proto__ = t), e;
                  })(e, t);
              }
              function b(e) {
                var t = (function () {
                  if ("undefined" == typeof Reflect || !Reflect.construct)
                    return !1;
                  if (Reflect.construct.sham) return !1;
                  if ("function" == typeof Proxy) return !0;
                  try {
                    return (
                      Date.prototype.toString.call(
                        Reflect.construct(Date, [], function () {}),
                      ),
                      !0
                    );
                  } catch (e) {
                    return !1;
                  }
                })();
                return function () {
                  var n,
                    o = m(e);
                  if (t) {
                    var r = m(this).constructor;
                    n = Reflect.construct(o, arguments, r);
                  } else n = o.apply(this, arguments);
                  return h(this, n);
                };
              }
              function h(e, t) {
                return !t || ("object" !== d(t) && "function" != typeof t)
                  ? (function (e) {
                      if (void 0 === e)
                        throw new ReferenceError(
                          "this hasn't been initialised - super() hasn't been called",
                        );
                      return e;
                    })(e)
                  : t;
              }
              function m(e) {
                return (m = Object.setPrototypeOf
                  ? Object.getPrototypeOf
                  : function (e) {
                      return e.__proto__ || Object.getPrototypeOf(e);
                    })(e);
              }
              Object.defineProperty(n, "__esModule", { value: !0 }),
                (n.default = void 0),
                (o = (function (e) {
                  if (e && e.__esModule) return e;
                  if (
                    null === e ||
                    ("object" !== d(e) && "function" != typeof e)
                  )
                    return { default: e };
                  var t = u();
                  if (t && t.has(e)) return t.get(e);
                  var n = {},
                    o =
                      Object.defineProperty && Object.getOwnPropertyDescriptor;
                  for (var r in e)
                    if (Object.prototype.hasOwnProperty.call(e, r)) {
                      var i = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                      i && (i.get || i.set)
                        ? Object.defineProperty(n, r, i)
                        : (n[r] = e[r]);
                    }
                  return (n.default = e), t && t.set(e, n), n;
                })(o)),
                (r = s(r)),
                (i = s(i)),
                (a = s(a)),
                (l = s(l)),
                (c = s(c));
              var g = [],
                y = {},
                _ = (function (e) {
                  !(function (e, t) {
                    if ("function" != typeof t && null !== t)
                      throw new TypeError(
                        "Super expression must either be null or a function",
                      );
                    (e.prototype = Object.create(t && t.prototype, {
                      constructor: { value: e, writable: !0, configurable: !0 },
                    })),
                      t && p(e, t);
                  })(u, e);
                  var t,
                    n,
                    i,
                    s = b(u);
                  function u() {
                    var e;
                    f(this, u);
                    for (
                      var t = arguments.length, n = new Array(t), o = 0;
                      o < t;
                      o++
                    )
                      n[o] = arguments[o];
                    return (
                      (e = s.call.apply(s, [this].concat(n))),
                      g.push(e.id),
                      (e.tplTabbox = ""),
                      (e.allowUnformattedLog = !0),
                      (e.isReady = !1),
                      (e.isShow = !1),
                      (e.$tabbox = null),
                      (e.console = {}),
                      (e.logList = []),
                      (e.isInBottom = !0),
                      (e.maxLogNumber = 1e3),
                      (e.logNumber = 0),
                      e.mockConsole(),
                      e
                    );
                  }
                  return (
                    (t = u),
                    (n = [
                      {
                        key: "onInit",
                        value: function () {
                          (this.$tabbox = r.default.render(this.tplTabbox, {})),
                            this.updateMaxLogNumber();
                        },
                      },
                      {
                        key: "onRenderTab",
                        value: function (e) {
                          e(this.$tabbox);
                        },
                      },
                      {
                        key: "onAddTopBar",
                        value: function (e) {
                          for (
                            var t = this,
                              n = ["All", "Log", "Info", "Warn", "Error"],
                              o = [],
                              i = 0;
                            i < n.length;
                            i++
                          )
                            o.push({
                              name: n[i],
                              data: { type: n[i].toLowerCase() },
                              className: "",
                              onClick: function () {
                                if (r.default.hasClass(this, "vc-actived"))
                                  return !1;
                                t.showLogType(this.dataset.type || "all");
                              },
                            });
                          (o[0].className = "vc-actived"), e(o);
                        },
                      },
                      {
                        key: "onAddTool",
                        value: function (e) {
                          var t = this;
                          e([
                            {
                              name: "Clear",
                              global: !1,
                              onClick: function () {
                                t.clearLog(),
                                  t.vConsole.triggerEvent("clearLog");
                              },
                            },
                          ]);
                        },
                      },
                      {
                        key: "onReady",
                        value: function () {
                          var e = this;
                          e.isReady = !0;
                          var t = r.default.all(".vc-subtab", e.$tabbox);
                          r.default.bind(t, "click", function (n) {
                            if (
                              (n.preventDefault(),
                              r.default.hasClass(this, "vc-actived"))
                            )
                              return !1;
                            r.default.removeClass(t, "vc-actived"),
                              r.default.addClass(this, "vc-actived");
                            var o = this.dataset.type,
                              i = r.default.one(".vc-log", e.$tabbox);
                            r.default.removeClass(i, "vc-log-partly-log"),
                              r.default.removeClass(i, "vc-log-partly-info"),
                              r.default.removeClass(i, "vc-log-partly-warn"),
                              r.default.removeClass(i, "vc-log-partly-error"),
                              "all" == o
                                ? r.default.removeClass(i, "vc-log-partly")
                                : (r.default.addClass(i, "vc-log-partly"),
                                  r.default.addClass(i, "vc-log-partly-" + o));
                          });
                          var n = r.default.one(".vc-content");
                          r.default.bind(n, "scroll", function (t) {
                            e.isShow &&
                              (n.scrollTop + n.offsetHeight >= n.scrollHeight
                                ? (e.isInBottom = !0)
                                : (e.isInBottom = !1));
                          });
                          for (var o = 0; o < e.logList.length; o++)
                            e.printLog(e.logList[o]);
                          e.logList = [];
                        },
                      },
                      {
                        key: "onRemove",
                        value: function () {
                          (window.console.log = this.console.log),
                            (window.console.info = this.console.info),
                            (window.console.warn = this.console.warn),
                            (window.console.debug = this.console.debug),
                            (window.console.error = this.console.error),
                            (window.console.time = this.console.time),
                            (window.console.timeEnd = this.console.timeEnd),
                            (window.console.clear = this.console.clear),
                            (this.console = {});
                          var e = g.indexOf(this.id);
                          e > -1 && g.splice(e, 1);
                        },
                      },
                      {
                        key: "onShow",
                        value: function () {
                          (this.isShow = !0),
                            1 == this.isInBottom && this.autoScrollToBottom();
                        },
                      },
                      {
                        key: "onHide",
                        value: function () {
                          this.isShow = !1;
                        },
                      },
                      {
                        key: "onShowConsole",
                        value: function () {
                          1 == this.isInBottom && this.autoScrollToBottom();
                        },
                      },
                      {
                        key: "onUpdateOption",
                        value: function () {
                          this.vConsole.option.maxLogNumber !=
                            this.maxLogNumber &&
                            (this.updateMaxLogNumber(), this.limitMaxLogs());
                        },
                      },
                      {
                        key: "updateMaxLogNumber",
                        value: function () {
                          (this.maxLogNumber =
                            this.vConsole.option.maxLogNumber || 1e3),
                            (this.maxLogNumber = Math.max(
                              1,
                              this.maxLogNumber,
                            ));
                        },
                      },
                      {
                        key: "limitMaxLogs",
                        value: function () {
                          if (this.isReady)
                            for (; this.logNumber > this.maxLogNumber; ) {
                              var e = r.default.one(".vc-item", this.$tabbox);
                              if (!e) break;
                              e.parentNode.removeChild(e), this.logNumber--;
                            }
                        },
                      },
                      {
                        key: "showLogType",
                        value: function (e) {
                          var t = r.default.one(".vc-log", this.$tabbox);
                          r.default.removeClass(t, "vc-log-partly-log"),
                            r.default.removeClass(t, "vc-log-partly-info"),
                            r.default.removeClass(t, "vc-log-partly-warn"),
                            r.default.removeClass(t, "vc-log-partly-error"),
                            "all" == e
                              ? r.default.removeClass(t, "vc-log-partly")
                              : (r.default.addClass(t, "vc-log-partly"),
                                r.default.addClass(t, "vc-log-partly-" + e));
                        },
                      },
                      {
                        key: "autoScrollToBottom",
                        value: function () {
                          this.vConsole.option.disableLogScrolling ||
                            this.scrollToBottom();
                        },
                      },
                      {
                        key: "scrollToBottom",
                        value: function () {
                          var e = r.default.one(".vc-content");
                          e && (e.scrollTop = e.scrollHeight - e.offsetHeight);
                        },
                      },
                      {
                        key: "mockConsole",
                        value: function () {
                          var e = this,
                            t = this,
                            n = ["log", "info", "warn", "debug", "error"];
                          window.console
                            ? (n.map(function (e) {
                                t.console[e] = window.console[e];
                              }),
                              (t.console.time = window.console.time),
                              (t.console.timeEnd = window.console.timeEnd),
                              (t.console.clear = window.console.clear))
                            : (window.console = {}),
                            n.map(function (t) {
                              window.console[t] = function () {
                                for (
                                  var n = arguments.length,
                                    o = new Array(n),
                                    r = 0;
                                  r < n;
                                  r++
                                )
                                  o[r] = arguments[r];
                                e.printLog({ logType: t, logs: o });
                              };
                            });
                          var o = {};
                          (window.console.time = function (e) {
                            o[e] = Date.now();
                          }),
                            (window.console.timeEnd = function (e) {
                              var t = o[e];
                              t
                                ? (console.log(e + ":", Date.now() - t + "ms"),
                                  delete o[e])
                                : console.log(e + ": 0ms");
                            }),
                            (window.console.clear = function () {
                              t.clearLog();
                              for (
                                var e = arguments.length,
                                  n = new Array(e),
                                  o = 0;
                                o < e;
                                o++
                              )
                                n[o] = arguments[o];
                              t.console.clear.apply(window.console, n);
                            });
                        },
                      },
                      {
                        key: "clearLog",
                        value: function () {
                          (r.default.one(".vc-log", this.$tabbox).innerHTML =
                            ""),
                            (this.logNumber = 0),
                            (y = {});
                        },
                      },
                      {
                        key: "printOriginLog",
                        value: function (e) {
                          "function" == typeof this.console[e.logType] &&
                            this.console[e.logType].apply(
                              window.console,
                              e.logs,
                            );
                        },
                      },
                      {
                        key: "printLog",
                        value: function (e) {
                          var t = e.logs || [];
                          if (t.length || e.content) {
                            t = [].slice.call(t || []);
                            var n = /^\[(\w+)\]$/i,
                              r = "",
                              i = !1;
                            if (o.isString(t[0])) {
                              var a = t[0].match(n);
                              null !== a &&
                                a.length > 0 &&
                                ((r = a[1].toLowerCase()),
                                (i = g.indexOf(r) > -1));
                            }
                            if (
                              r === this.id ||
                              (!0 !== i && "default" === this.id)
                            )
                              if (
                                (e._id ||
                                  (e._id =
                                    "__vc_" +
                                    Math.random().toString(36).substring(2, 8)),
                                e.date || (e.date = +new Date()),
                                this.isReady)
                              ) {
                                o.isString(t[0]) &&
                                  i &&
                                  ((t[0] = t[0].replace(n, "")),
                                  "" === t[0] && t.shift());
                                for (
                                  var l = {
                                      _id: e._id,
                                      logType: e.logType,
                                      logText: [],
                                      hasContent: !!e.content,
                                      count: 1,
                                    },
                                    c = 0;
                                  c < t.length;
                                  c++
                                )
                                  o.isFunction(t[c])
                                    ? l.logText.push(t[c].toString())
                                    : o.isObject(t[c]) || o.isArray(t[c])
                                      ? l.logText.push(o.JSONStringify(t[c]))
                                      : l.logText.push(t[c]);
                                (l.logText = l.logText.join(" ")),
                                  l.hasContent ||
                                  y.logType !== l.logType ||
                                  y.logText !== l.logText
                                    ? (this.printNewLog(e, t), (y = l))
                                    : this.printRepeatLog(),
                                  this.isInBottom &&
                                    this.isShow &&
                                    this.autoScrollToBottom(),
                                  e.noOrigin || this.printOriginLog(e);
                              } else this.logList.push(e);
                            else e.noOrigin || this.printOriginLog(e);
                          }
                        },
                      },
                      {
                        key: "printRepeatLog",
                        value: function () {
                          var e = r.default.one("#" + y._id),
                            t = r.default.one(".vc-item-repeat", e);
                          t ||
                            (((t = document.createElement("i")).className =
                              "vc-item-repeat"),
                            e.insertBefore(t, e.lastChild)),
                            y.count,
                            y.count++,
                            (t.innerHTML = y.count);
                        },
                      },
                      {
                        key: "printNewLog",
                        value: function (e, t) {
                          var n = r.default.render(a.default, {
                              _id: e._id,
                              logType: e.logType,
                              style: e.style || "",
                            }),
                            i = /(\%c )|( \%c)/g,
                            l = [];
                          if (o.isString(t[0]) && i.test(t[0])) {
                            for (
                              var c = t[0].split(i).filter(function (e) {
                                  return (
                                    void 0 !== e &&
                                    "" !== e &&
                                    !/ ?\%c ?/.test(e)
                                  );
                                }),
                                s = t[0].match(i),
                                u = 0;
                              u < s.length;
                              u++
                            )
                              o.isString(t[u + 1]) && l.push(t[u + 1]);
                            for (var f = s.length + 1; f < t.length; f++)
                              c.push(t[f]);
                            t = c;
                          }
                          for (
                            var v = r.default.one(".vc-item-content", n), p = 0;
                            p < t.length;
                            p++
                          ) {
                            var b = void 0;
                            try {
                              if ("" === t[p]) continue;
                              b = o.isFunction(t[p])
                                ? "<span> " + t[p].toString() + "</span>"
                                : o.isObject(t[p]) || o.isArray(t[p])
                                  ? this.getFoldedLine(t[p])
                                  : (l[p]
                                      ? '<span style="'.concat(l[p], '"> ')
                                      : "<span> ") +
                                    o.htmlEncode(t[p]).replace(/\n/g, "<br/>") +
                                    "</span>";
                            } catch (e) {
                              b = "<span> [" + d(t[p]) + "]</span>";
                            }
                            b &&
                              ("string" == typeof b
                                ? v.insertAdjacentHTML("beforeend", b)
                                : v.insertAdjacentElement("beforeend", b));
                          }
                          o.isObject(e.content) &&
                            v.insertAdjacentElement("beforeend", e.content),
                            this.formatLine && (n = this.formatLine(n)),
                            r.default
                              .one(".vc-log", this.$tabbox)
                              .insertAdjacentElement("beforeend", n),
                            this.logNumber++,
                            this.limitMaxLogs();
                        },
                      },
                      {
                        key: "getFoldedLine",
                        value: function (e, t) {
                          var n = this;
                          if (!t) {
                            var i = o.JSONStringify(e),
                              a = i.substr(0, 36);
                            (t = o.getObjName(e)),
                              i.length > 36 && (a += "..."),
                              (t += " " + a);
                          }
                          var s = r.default.render(l.default, {
                            outer: t,
                            lineType: "obj",
                          });
                          return (
                            r.default.bind(
                              r.default.one(".vc-fold-outer", s),
                              "click",
                              function (t) {
                                t.preventDefault(),
                                  t.stopPropagation(),
                                  r.default.hasClass(s, "vc-toggle")
                                    ? (r.default.removeClass(s, "vc-toggle"),
                                      r.default.removeClass(
                                        r.default.one(".vc-fold-inner", s),
                                        "vc-toggle",
                                      ),
                                      r.default.removeClass(
                                        r.default.one(".vc-fold-outer", s),
                                        "vc-toggle",
                                      ))
                                    : (r.default.addClass(s, "vc-toggle"),
                                      r.default.addClass(
                                        r.default.one(".vc-fold-inner", s),
                                        "vc-toggle",
                                      ),
                                      r.default.addClass(
                                        r.default.one(".vc-fold-outer", s),
                                        "vc-toggle",
                                      ));
                                var i = r.default.one(".vc-fold-inner", s);
                                return (
                                  setTimeout(function () {
                                    if (0 == i.children.length && e) {
                                      for (
                                        var t = o.getObjAllKeys(e), a = 0;
                                        a < t.length;
                                        a++
                                      ) {
                                        var s = void 0,
                                          u = "undefined",
                                          d = "";
                                        try {
                                          s = e[t[a]];
                                        } catch (e) {
                                          continue;
                                        }
                                        o.isString(s)
                                          ? ((u = "string"),
                                            (s = '"' + s + '"'))
                                          : o.isNumber(s)
                                            ? (u = "number")
                                            : o.isBoolean(s)
                                              ? (u = "boolean")
                                              : o.isNull(s)
                                                ? ((u = "null"), (s = "null"))
                                                : o.isUndefined(s)
                                                  ? ((u = "undefined"),
                                                    (s = "undefined"))
                                                  : o.isFunction(s)
                                                    ? ((u = "function"),
                                                      (s = "function()"))
                                                    : o.isSymbol(s) &&
                                                      (u = "symbol");
                                        var f = void 0;
                                        if (o.isArray(s)) {
                                          var v =
                                            o.getObjName(s) +
                                            "[" +
                                            s.length +
                                            "]";
                                          f = n.getFoldedLine(
                                            s,
                                            r.default.render(
                                              c.default,
                                              {
                                                key: t[a],
                                                keyType: d,
                                                value: v,
                                                valueType: "array",
                                              },
                                              !0,
                                            ),
                                          );
                                        } else if (o.isObject(s)) {
                                          var p = o.getObjName(s);
                                          f = n.getFoldedLine(
                                            s,
                                            r.default.render(
                                              c.default,
                                              {
                                                key: o.htmlEncode(t[a]),
                                                keyType: d,
                                                value: p,
                                                valueType: "object",
                                              },
                                              !0,
                                            ),
                                          );
                                        } else {
                                          e.hasOwnProperty &&
                                            !e.hasOwnProperty(t[a]) &&
                                            (d = "private");
                                          var b = {
                                            lineType: "kv",
                                            key: o.htmlEncode(t[a]),
                                            keyType: d,
                                            value: o.htmlEncode(s),
                                            valueType: u,
                                          };
                                          f = r.default.render(l.default, b);
                                        }
                                        i.insertAdjacentElement("beforeend", f);
                                      }
                                      if (o.isObject(e)) {
                                        var h,
                                          m = e.__proto__;
                                        (h = o.isObject(m)
                                          ? n.getFoldedLine(
                                              m,
                                              r.default.render(
                                                c.default,
                                                {
                                                  key: "__proto__",
                                                  keyType: "private",
                                                  value: o.getObjName(m),
                                                  valueType: "object",
                                                },
                                                !0,
                                              ),
                                            )
                                          : r.default.render(c.default, {
                                              key: "__proto__",
                                              keyType: "private",
                                              value: "null",
                                              valueType: "null",
                                            })),
                                          i.insertAdjacentElement(
                                            "beforeend",
                                            h,
                                          );
                                      }
                                    }
                                  }),
                                  !1
                                );
                              },
                            ),
                            s
                          );
                        },
                      },
                    ]) && v(t.prototype, n),
                    i && v(t, i),
                    u
                  );
                })(i.default);
              _.AddedLogID = [];
              var w = _;
              (n.default = w), (e.exports = t.default);
            })
              ? o.apply(t, r)
              : o) || (e.exports = i);
    },
    function (e, t, n) {
      "use strict";
      var o,
        r = function () {
          return (
            void 0 === o &&
              (o = Boolean(window && document && document.all && !window.atob)),
            o
          );
        },
        i = (function () {
          var e = {};
          return function (t) {
            if (void 0 === e[t]) {
              var n = document.querySelector(t);
              if (
                window.HTMLIFrameElement &&
                n instanceof window.HTMLIFrameElement
              )
                try {
                  n = n.contentDocument.head;
                } catch (e) {
                  n = null;
                }
              e[t] = n;
            }
            return e[t];
          };
        })(),
        a = [];
      function l(e) {
        for (var t = -1, n = 0; n < a.length; n++)
          if (a[n].identifier === e) {
            t = n;
            break;
          }
        return t;
      }
      function c(e, t) {
        for (var n = {}, o = [], r = 0; r < e.length; r++) {
          var i = e[r],
            c = t.base ? i[0] + t.base : i[0],
            s = n[c] || 0,
            u = "".concat(c, " ").concat(s);
          n[c] = s + 1;
          var d = l(u),
            f = { css: i[1], media: i[2], sourceMap: i[3] };
          -1 !== d
            ? (a[d].references++, a[d].updater(f))
            : a.push({ identifier: u, updater: h(f, t), references: 1 }),
            o.push(u);
        }
        return o;
      }
      function s(e) {
        var t = document.createElement("style"),
          o = e.attributes || {};
        if (void 0 === o.nonce) {
          var r = n.nc;
          r && (o.nonce = r);
        }
        if (
          (Object.keys(o).forEach(function (e) {
            t.setAttribute(e, o[e]);
          }),
          "function" == typeof e.insert)
        )
          e.insert(t);
        else {
          var a = i(e.insert || "head");
          if (!a)
            throw new Error(
              "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.",
            );
          a.appendChild(t);
        }
        return t;
      }
      var u,
        d =
          ((u = []),
          function (e, t) {
            return (u[e] = t), u.filter(Boolean).join("\n");
          });
      function f(e, t, n, o) {
        var r = n
          ? ""
          : o.media
            ? "@media ".concat(o.media, " {").concat(o.css, "}")
            : o.css;
        if (e.styleSheet) e.styleSheet.cssText = d(t, r);
        else {
          var i = document.createTextNode(r),
            a = e.childNodes;
          a[t] && e.removeChild(a[t]),
            a.length ? e.insertBefore(i, a[t]) : e.appendChild(i);
        }
      }
      function v(e, t, n) {
        var o = n.css,
          r = n.media,
          i = n.sourceMap;
        if (
          (r ? e.setAttribute("media", r) : e.removeAttribute("media"),
          i &&
            "undefined" != typeof btoa &&
            (o += "\n/*# sourceMappingURL=data:application/json;base64,".concat(
              btoa(unescape(encodeURIComponent(JSON.stringify(i)))),
              " */",
            )),
          e.styleSheet)
        )
          e.styleSheet.cssText = o;
        else {
          for (; e.firstChild; ) e.removeChild(e.firstChild);
          e.appendChild(document.createTextNode(o));
        }
      }
      var p = null,
        b = 0;
      function h(e, t) {
        var n, o, r;
        if (t.singleton) {
          var i = b++;
          (n = p || (p = s(t))),
            (o = f.bind(null, n, i, !1)),
            (r = f.bind(null, n, i, !0));
        } else
          (n = s(t)),
            (o = v.bind(null, n, t)),
            (r = function () {
              !(function (e) {
                if (null === e.parentNode) return !1;
                e.parentNode.removeChild(e);
              })(n);
            });
        return (
          o(e),
          function (t) {
            if (t) {
              if (
                t.css === e.css &&
                t.media === e.media &&
                t.sourceMap === e.sourceMap
              )
                return;
              o((e = t));
            } else r();
          }
        );
      }
      e.exports = function (e, t) {
        (t = t || {}).singleton ||
          "boolean" == typeof t.singleton ||
          (t.singleton = r());
        var n = c((e = e || []), t);
        return function (e) {
          if (
            ((e = e || []),
            "[object Array]" === Object.prototype.toString.call(e))
          ) {
            for (var o = 0; o < n.length; o++) {
              var r = l(n[o]);
              a[r].references--;
            }
            for (var i = c(e, t), s = 0; s < n.length; s++) {
              var u = l(n[s]);
              0 === a[u].references && (a[u].updater(), a.splice(u, 1));
            }
            n = i;
          }
        };
      };
    },
    function (e, t, n) {
      "use strict";
      e.exports = function (e) {
        var t = [];
        return (
          (t.toString = function () {
            return this.map(function (t) {
              var n = (function (e, t) {
                var n = e[1] || "",
                  o = e[3];
                if (!o) return n;
                if (t && "function" == typeof btoa) {
                  var r =
                      ((a = o),
                      (l = btoa(
                        unescape(encodeURIComponent(JSON.stringify(a))),
                      )),
                      (c =
                        "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(
                          l,
                        )),
                      "/*# ".concat(c, " */")),
                    i = o.sources.map(function (e) {
                      return "/*# sourceURL="
                        .concat(o.sourceRoot || "")
                        .concat(e, " */");
                    });
                  return [n].concat(i).concat([r]).join("\n");
                }
                var a, l, c;
                return [n].join("\n");
              })(t, e);
              return t[2] ? "@media ".concat(t[2], " {").concat(n, "}") : n;
            }).join("");
          }),
          (t.i = function (e, n, o) {
            "string" == typeof e && (e = [[null, e, ""]]);
            var r = {};
            if (o)
              for (var i = 0; i < this.length; i++) {
                var a = this[i][0];
                null != a && (r[a] = !0);
              }
            for (var l = 0; l < e.length; l++) {
              var c = [].concat(e[l]);
              (o && r[c[0]]) ||
                (n &&
                  (c[2]
                    ? (c[2] = "".concat(n, " and ").concat(c[2]))
                    : (c[2] = n)),
                t.push(c));
            }
          }),
          t
        );
      };
    },
    function (e, t, n) {
      var o, r, i;
      "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof self && self,
        (r = [t, n(7)]),
        void 0 ===
          (i =
            "function" ==
            typeof (o = function (n, o) {
              "use strict";
              Object.defineProperty(n, "__esModule", { value: !0 }),
                (n.default = void 0);
              var r,
                i = ((r = o), (o = r && r.__esModule ? r : { default: r }))
                  .default;
              (n.default = i), (e.exports = t.default);
            })
              ? o.apply(t, r)
              : o) || (e.exports = i);
    },
    
    function (e, t) {
      !(function (e) {
        "use strict";
        var t = function (e, t) {
          (this.element = e), (this.type = t);
        };
        t.prototype = {
          add: function (e) {
            (this.callback = e),
              this.element.addEventListener(this.type, this.callback, !1);
          },
          remove: function () {
            this.element.removeEventListener(this.type, this.callback, !1);
          },
        };
        var n = function (e) {
          (this.element = e),
            (this.transitionEnd = this.whichTransitionEnd()),
            (this.event = new t(this.element, this.transitionEnd));
        };
        n.prototype = {
          whichTransitionEnd: function () {
            var e = {
              WebkitTransition: "webkitTransitionEnd",
              MozTransition: "transitionend",
              OTransition: "oTransitionEnd otransitionend",
              transition: "transitionend",
            };
            for (var t in e) if (void 0 !== this.element.style[t]) return e[t];
          },
          bind: function (e) {
            this.event.add(e);
          },
          unbind: function () {
            this.event.remove();
          },
        };
        var o = {
          list: [],
          getPosition: function (e) {
            if (Array.prototype.indexOf) return this.list.indexOf(e);
            for (var t = 0, n = this.list.length; t < n; t++)
              if (this.list[t] === e) return t;
            return -1;
          },
          insert: function (e) {
            var t = this.getPosition(e);
            return (
              -1 !== t ||
                (this.list.push(e),
                this.list.push(new n(e)),
                (t = this.getPosition(e))),
              this.list[t + 1]
            );
          },
        };
        e.transitionEnd = function (e) {
          if (!e) throw "You need to pass an element as parameter!";
          var t = e[0] || e;
          return o.insert(t);
        };
      })(window);
    },
    function (e) {
      e.exports = JSON.parse(
        '{"name":"vconsole","version":"3.4.0","description":"A lightweight, extendable front-end developer tool for mobile web page.","homepage":"https://github.com/Tencent/vConsole","main":"dist/vconsole.min.js","typings":"dist/vconsole.min.d.ts","scripts":{"test":"mocha","build":"webpack","dev":"webpack-dev-server --config webpack.dev.config"},"keywords":["console","debug","mobile"],"repository":{"type":"git","url":"git+https://github.com/Tencent/vConsole.git"},"dependencies":{"mutation-observer":"^1.0.3","transitionEnd":"^1.0.2"},"devDependencies":{"@babel/core":"^7.12.10","@babel/plugin-proposal-class-properties":"^7.12.1","@babel/plugin-proposal-export-namespace-from":"^7.12.1","@babel/plugin-proposal-object-rest-spread":"^7.12.1","@babel/preset-env":"^7.12.11","babel-loader":"^8.2.2","babel-plugin-add-module-exports":"^1.0.4","chai":"^4.2.0","copy-webpack-plugin":"^5.1.2","css-loader":"^3.6.0","html-loader":"^0.5.5","jsdom":"^15.2.1","json-loader":"^0.5.7","less":"^3.13.1","less-loader":"^5.0.0","mocha":"^5.2.0","style-loader":"^1.3.0","webpack":"^4.44.2","webpack-cli":"^3.3.12","webpack-dev-server":"^3.11.0","webpack-merge":"^4.2.2"},"author":"Tencent","license":"MIT"}',
      );
    },
    function (e, t, n) {
      var o, r, i;
      "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof self && self,
        (r = [t]),
        void 0 ===
          (i =
            "function" ==
            typeof (o = function (n) {
              "use strict";
              function o(e, t) {
                var n;
                if (
                  "undefined" == typeof Symbol ||
                  null == e[Symbol.iterator]
                ) {
                  if (
                    Array.isArray(e) ||
                    (n = (function (e, t) {
                      if (e) {
                        if ("string" == typeof e) return r(e, t);
                        var n = Object.prototype.toString.call(e).slice(8, -1);
                        return (
                          "Object" === n &&
                            e.constructor &&
                            (n = e.constructor.name),
                          "Map" === n || "Set" === n
                            ? Array.from(e)
                            : "Arguments" === n ||
                                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                  n,
                                )
                              ? r(e, t)
                              : void 0
                        );
                      }
                    })(e)) ||
                    (t && e && "number" == typeof e.length)
                  ) {
                    n && (e = n);
                    var o = 0,
                      i = function () {};
                    return {
                      s: i,
                      n: function () {
                        return o >= e.length
                          ? { done: !0 }
                          : { done: !1, value: e[o++] };
                      },
                      e: function (e) {
                        throw e;
                      },
                      f: i,
                    };
                  }
                  throw new TypeError(
                    "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                  );
                }
                var a,
                  l = !0,
                  c = !1;
                return {
                  s: function () {
                    n = e[Symbol.iterator]();
                  },
                  n: function () {
                    var e = n.next();
                    return (l = e.done), e;
                  },
                  e: function (e) {
                    (c = !0), (a = e);
                  },
                  f: function () {
                    try {
                      l || null == n.return || n.return();
                    } finally {
                      if (c) throw a;
                    }
                  },
                };
              }
              function r(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n];
                return o;
              }
              Object.defineProperty(n, "__esModule", { value: !0 }),
                (n.default = function (e, t, n) {
                  var r = /\{\{([^\}]+)\}\}/g,
                    i = "",
                    a = "",
                    l = 0,
                    c = [],
                    s = function (e, t) {
                      "" !== e &&
                        (t
                          ? e.match(/^ ?else/g)
                            ? (i += "} " + e + " {\n")
                            : e.match(/\/(if|for|switch)/g)
                              ? (i += "}\n")
                              : e.match(/^ ?if|for|switch/g)
                                ? (i += e + " {\n")
                                : e.match(/^ ?(break|continue) ?$/g)
                                  ? (i += e + ";\n")
                                  : e.match(/^ ?(case|default)/g)
                                    ? (i += e + ":\n")
                                    : (i += "arr.push(" + e + ");\n")
                          : (i +=
                              'arr.push("' + e.replace(/"/g, '\\"') + '");\n'));
                    };
                  for (
                    window.__mito_data = t,
                      window.__mito_code = "",
                      window.__mito_result = "",
                      e = (e = e.replace(
                        /(\{\{ ?switch(.+?)\}\})[\r\n\t ]+\{\{/g,
                        "$1{{",
                      ))
                        .replace(/^[\r\n]/, "")
                        .replace(/\n/g, "\\\n")
                        .replace(/\r/g, "\\\r"),
                      a = "(function(){\n",
                      i = "var arr = [];\n";
                    (c = r.exec(e));

                  )
                    s(e.slice(l, c.index), !1),
                      s(c[1], !0),
                      (l = c.index + c[0].length);
                  s(e.substr(l, e.length - l), !1),
                    (a += i =
                      "with (__mito_data) {\n" +
                      (i += '__mito_result = arr.join("");') +
                      "\n}"),
                    (a += "})();");
                  var u,
                    d = "",
                    f = o(document.getElementsByTagName("script"));
                  try {
                    for (f.s(); !(u = f.n()).done; ) {
                      var v = u.value;
                      if (v.nonce) {
                        d = v.nonce;
                        break;
                      }
                    }
                  } catch (e) {
                    f.e(e);
                  } finally {
                    f.f();
                  }
                  var p = document.createElement("SCRIPT");
                  (p.innerHTML = a),
                    p.setAttribute("nonce", d),
                    document.documentElement.appendChild(p);
                  var b = __mito_result;
                  if ((document.documentElement.removeChild(p), !n)) {
                    var h = document.createElement("DIV");
                    (h.innerHTML = b), (b = h.children[0]);
                  }
                  return b;
                }),
                (e.exports = t.default);
            })
              ? o.apply(t, r)
              : o) || (e.exports = i);
    },


    
   
   
    
    

  ]);
});
