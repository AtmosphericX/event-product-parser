var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve5, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve5(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// node_modules/ltx/lib/escape.js
var require_escape = __commonJS({
  "node_modules/ltx/lib/escape.js"(exports2) {
    "use strict";
    var escapeXMLTable = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&apos;"
    };
    function escapeXMLReplace(match) {
      return escapeXMLTable[match];
    }
    var unescapeXMLTable = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&apos;": "'"
    };
    function unescapeXMLReplace(match) {
      if (match[1] === "#") {
        const num = match[2] === "x" ? parseInt(match.slice(3), 16) : parseInt(match.slice(2), 10);
        if (num === 9 || num === 10 || num === 13 || num >= 32 && num <= 55295 || num >= 57344 && num <= 65533 || num >= 65536 && num <= 1114111) {
          return String.fromCodePoint(num);
        }
        throw new Error("Illegal XML character 0x" + num.toString(16));
      }
      if (unescapeXMLTable[match]) {
        return unescapeXMLTable[match] || match;
      }
      throw new Error("Illegal XML entity " + match);
    }
    function escapeXML2(s) {
      return s.replace(/["&'<>]/g, escapeXMLReplace);
    }
    function unescapeXML2(s) {
      let result = "";
      let start = -1;
      let end = -1;
      let previous = 0;
      while ((start = s.indexOf("&", previous)) !== -1 && (end = s.indexOf(";", start + 1)) !== -1) {
        result = result + s.slice(previous, start) + unescapeXMLReplace(s.slice(start, end + 1));
        previous = end + 1;
      }
      if (previous === 0) return s;
      result = result + s.substring(previous);
      return result;
    }
    function escapeXMLText2(s) {
      return s.replace(/[&<>]/g, escapeXMLReplace);
    }
    function unescapeXMLText2(s) {
      return s.replace(/&(amp|#38|lt|#60|gt|#62);/g, unescapeXMLReplace);
    }
    exports2.escapeXML = escapeXML2;
    exports2.escapeXMLText = escapeXMLText2;
    exports2.unescapeXML = unescapeXML2;
    exports2.unescapeXMLText = unescapeXMLText2;
  }
});

// node_modules/ltx/lib/Element.js
var require_Element = __commonJS({
  "node_modules/ltx/lib/Element.js"(exports2, module2) {
    "use strict";
    var escape2 = require_escape();
    var Element3 = class _Element {
      constructor(name, attrs) {
        this.name = name;
        this.parent = null;
        this.children = [];
        this.attrs = {};
        this.setAttrs(attrs);
      }
      /* Accessors */
      /**
       * if (element.is('message', 'jabber:client')) ...
       **/
      is(name, xmlns) {
        return this.getName() === name && (!xmlns || this.getNS() === xmlns);
      }
      /* without prefix */
      getName() {
        const idx = this.name.indexOf(":");
        return idx >= 0 ? this.name.slice(idx + 1) : this.name;
      }
      /**
       * retrieves the namespace of the current element, upwards recursively
       **/
      getNS() {
        const idx = this.name.indexOf(":");
        if (idx >= 0) {
          const prefix = this.name.slice(0, idx);
          return this.findNS(prefix);
        }
        return this.findNS();
      }
      /**
       * find the namespace to the given prefix, upwards recursively
       **/
      findNS(prefix) {
        if (!prefix) {
          if (this.attrs.xmlns) {
            return this.attrs.xmlns;
          } else if (this.parent) {
            return this.parent.findNS();
          }
        } else {
          const attr = "xmlns:" + prefix;
          if (this.attrs[attr]) {
            return this.attrs[attr];
          } else if (this.parent) {
            return this.parent.findNS(prefix);
          }
        }
      }
      /**
       * Recursiverly gets all xmlns defined, in the form of {url:prefix}
       **/
      getXmlns() {
        let namespaces = {};
        if (this.parent) {
          namespaces = this.parent.getXmlns();
        }
        for (const attr in this.attrs) {
          const m = attr.match("xmlns:?(.*)");
          if (this.attrs.hasOwnProperty(attr) && m) {
            namespaces[this.attrs[attr]] = m[1];
          }
        }
        return namespaces;
      }
      setAttrs(attrs) {
        if (typeof attrs === "string") {
          this.attrs.xmlns = attrs;
        } else if (attrs) {
          Object.assign(this.attrs, attrs);
        }
      }
      /**
       * xmlns can be null, returns the matching attribute.
       **/
      getAttr(name, xmlns) {
        if (!xmlns) {
          return this.attrs[name];
        }
        const namespaces = this.getXmlns();
        if (!namespaces[xmlns]) {
          return null;
        }
        return this.attrs[[namespaces[xmlns], name].join(":")];
      }
      /**
       * xmlns can be null
       **/
      getChild(name, xmlns) {
        return this.getChildren(name, xmlns)[0];
      }
      /**
       * xmlns can be null
       **/
      getChildren(name, xmlns) {
        const result = [];
        for (const child2 of this.children) {
          if (child2.getName && child2.getName() === name && (!xmlns || child2.getNS() === xmlns)) {
            result.push(child2);
          }
        }
        return result;
      }
      /**
       * xmlns and recursive can be null
       **/
      getChildByAttr(attr, val, xmlns, recursive) {
        return this.getChildrenByAttr(attr, val, xmlns, recursive)[0];
      }
      /**
       * xmlns and recursive can be null
       **/
      getChildrenByAttr(attr, val, xmlns, recursive) {
        let result = [];
        for (const child2 of this.children) {
          if (child2.attrs && child2.attrs[attr] === val && (!xmlns || child2.getNS() === xmlns)) {
            result.push(child2);
          }
          if (recursive && child2.getChildrenByAttr) {
            result.push(child2.getChildrenByAttr(attr, val, xmlns, true));
          }
        }
        if (recursive) {
          result = result.flat();
        }
        return result;
      }
      getChildrenByFilter(filter, recursive) {
        let result = [];
        for (const child2 of this.children) {
          if (filter(child2)) {
            result.push(child2);
          }
          if (recursive && child2.getChildrenByFilter) {
            result.push(child2.getChildrenByFilter(filter, true));
          }
        }
        if (recursive) {
          result = result.flat();
        }
        return result;
      }
      getText() {
        let text = "";
        for (const child2 of this.children) {
          if (typeof child2 === "string" || typeof child2 === "number") {
            text += child2;
          }
        }
        return text;
      }
      getChildText(name, xmlns) {
        const child2 = this.getChild(name, xmlns);
        return child2 ? child2.getText() : null;
      }
      /**
       * Return all direct descendents that are Elements.
       * This differs from `getChildren` in that it will exclude text nodes,
       * processing instructions, etc.
       */
      getChildElements() {
        return this.getChildrenByFilter((child2) => {
          return child2 instanceof _Element;
        });
      }
      /* Builder */
      /** returns uppermost parent */
      root() {
        if (this.parent) {
          return this.parent.root();
        }
        return this;
      }
      /** just parent or itself */
      up() {
        if (this.parent) {
          return this.parent;
        }
        return this;
      }
      /** create child node and return it */
      c(name, attrs) {
        return this.cnode(new _Element(name, attrs));
      }
      cnode(child2) {
        this.children.push(child2);
        if (typeof child2 === "object") {
          child2.parent = this;
        }
        return child2;
      }
      append(...nodes) {
        for (const node of nodes) {
          this.children.push(node);
          if (typeof node === "object") {
            node.parent = this;
          }
        }
      }
      prepend(...nodes) {
        for (const node of nodes) {
          this.children.unshift(node);
          if (typeof node === "object") {
            node.parent = this;
          }
        }
      }
      /** add text node and return element */
      t(text) {
        this.children.push(text);
        return this;
      }
      /* Manipulation */
      /**
       * Either:
       *   el.remove(childEl)
       *   el.remove('author', 'urn:...')
       */
      remove(el, xmlns) {
        const filter = typeof el === "string" ? (child2) => {
          return !(child2.is && child2.is(el, xmlns));
        } : (child2) => {
          return child2 !== el;
        };
        this.children = this.children.filter(filter);
        return this;
      }
      text(val) {
        if (val && this.children.length === 1) {
          this.children[0] = val;
          return this;
        }
        return this.getText();
      }
      attr(attr, val) {
        if (typeof val !== "undefined" || val === null) {
          if (!this.attrs) {
            this.attrs = {};
          }
          this.attrs[attr] = val;
          return this;
        }
        return this.attrs[attr];
      }
      /* Serialization */
      toString() {
        let s = "";
        this.write((c) => {
          s += c;
        });
        return s;
      }
      _addChildren(writer) {
        writer(">");
        for (const child2 of this.children) {
          if (child2 != null) {
            if (child2.write) {
              child2.write(writer);
            } else if (typeof child2 === "string") {
              writer(escape2.escapeXMLText(child2));
            } else if (child2.toString) {
              writer(escape2.escapeXMLText(child2.toString(10)));
            }
          }
        }
        writer("</");
        writer(this.name);
        writer(">");
      }
      write(writer) {
        writer("<");
        writer(this.name);
        for (const k in this.attrs) {
          const v = this.attrs[k];
          if (v != null) {
            writer(" ");
            writer(k);
            writer('="');
            writer(escape2.escapeXML(typeof v === "string" ? v : v.toString(10)));
            writer('"');
          }
        }
        if (this.children.length === 0) {
          writer("/>");
        } else {
          this._addChildren(writer);
        }
      }
    };
    Element3.prototype.tree = Element3.prototype.root;
    module2.exports = Element3;
  }
});

// node_modules/ltx/lib/createElement.js
var require_createElement = __commonJS({
  "node_modules/ltx/lib/createElement.js"(exports2, module2) {
    "use strict";
    var Element3 = require_Element();
    function append(el, child2) {
      if (Array.isArray(child2)) {
        for (const c of child2) append(el, c);
        return;
      }
      if (child2 === "" || child2 == null || child2 === true || child2 === false) {
        return;
      }
      el.cnode(child2);
    }
    function createElement2(name, attrs, ...children) {
      if (typeof attrs === "object" && attrs !== null) {
        delete attrs.__source;
        delete attrs.__self;
        for (const [key, value] of Object.entries(attrs)) {
          if (value == null) delete attrs[key];
          else attrs[key] = value.toString(10);
        }
      }
      const el = new Element3(name, attrs);
      for (const child2 of children) {
        append(el, child2);
      }
      return el;
    }
    module2.exports = createElement2;
  }
});

// node_modules/ltx/lib/parsers/ltx.js
var require_ltx = __commonJS({
  "node_modules/ltx/lib/parsers/ltx.js"(exports2, module2) {
    "use strict";
    var events3 = require("events");
    var escape2 = require_escape();
    var STATE_TEXT = 0;
    var STATE_IGNORE_COMMENT = 1;
    var STATE_IGNORE_INSTRUCTION = 2;
    var STATE_TAG_NAME = 3;
    var STATE_TAG = 4;
    var STATE_ATTR_NAME = 5;
    var STATE_ATTR_EQ = 6;
    var STATE_ATTR_QUOT = 7;
    var STATE_ATTR_VALUE = 8;
    var STATE_CDATA = 9;
    var STATE_IGNORE_CDATA = 10;
    var SaxLtx = class extends events3.EventEmitter {
      constructor() {
        super();
        let state = STATE_TEXT;
        let remainder;
        let parseRemainder;
        let tagName;
        let attrs;
        let endTag;
        let selfClosing;
        let attrQuote;
        let attrQuoteChar;
        let recordStart = 0;
        let attrName;
        this._handleTagOpening = function _handleTagOpening(endTag2, tagName2, attrs2) {
          if (!endTag2) {
            this.emit("startElement", tagName2, attrs2);
            if (selfClosing) {
              this.emit("endElement", tagName2, true);
            }
          } else {
            this.emit("endElement", tagName2, false);
          }
        };
        this.write = function write(data) {
          if (typeof data !== "string") {
            data = data.toString();
          }
          let pos = 0;
          if (remainder) {
            data = remainder + data;
            pos += !parseRemainder ? remainder.length : 0;
            parseRemainder = false;
            remainder = null;
          }
          function endRecording() {
            if (typeof recordStart === "number") {
              const recorded = data.slice(recordStart, pos);
              recordStart = void 0;
              return recorded;
            }
          }
          for (; pos < data.length; pos++) {
            switch (state) {
              case STATE_TEXT: {
                const lt = data.indexOf("<", pos);
                if (lt !== -1 && pos !== lt) {
                  pos = lt;
                }
                break;
              }
              case STATE_ATTR_VALUE: {
                const quot = data.indexOf(attrQuoteChar, pos);
                if (quot !== -1) {
                  pos = quot;
                }
                break;
              }
              case STATE_IGNORE_COMMENT: {
                const endcomment = data.indexOf("-->", pos);
                if (endcomment !== -1) {
                  pos = endcomment + 2;
                }
                break;
              }
              case STATE_IGNORE_CDATA: {
                const endCDATA = data.indexOf("]]>", pos);
                if (endCDATA !== -1) {
                  pos = endCDATA + 2;
                }
                break;
              }
            }
            const c = data.charCodeAt(pos);
            switch (state) {
              case STATE_TEXT:
                if (c === 60) {
                  const text = endRecording();
                  if (text) {
                    this.emit("text", escape2.unescapeXML(text));
                  }
                  state = STATE_TAG_NAME;
                  recordStart = pos + 1;
                  attrs = {};
                }
                break;
              case STATE_CDATA:
                if (c === 93) {
                  if (data.substr(pos + 1, 2) === "]>") {
                    const cData = endRecording();
                    if (cData) {
                      this.emit("text", cData);
                    }
                    state = STATE_TEXT;
                  } else if (data.length < pos + 2) {
                    parseRemainder = true;
                    pos = data.length;
                  }
                }
                break;
              case STATE_TAG_NAME:
                if (c === 47 && recordStart === pos) {
                  recordStart = pos + 1;
                  endTag = true;
                } else if (c === 33) {
                  if (data.substr(pos + 1, 7) === "[CDATA[") {
                    recordStart = pos + 8;
                    state = STATE_CDATA;
                  } else if (data.length < pos + 8 && "[CDATA[".startsWith(data.slice(pos + 1))) {
                    parseRemainder = true;
                    pos = data.length;
                  } else {
                    recordStart = void 0;
                    state = STATE_IGNORE_COMMENT;
                  }
                } else if (c === 63) {
                  recordStart = void 0;
                  state = STATE_IGNORE_INSTRUCTION;
                } else if (c <= 32 || c === 47 || c === 62) {
                  tagName = endRecording();
                  pos--;
                  state = STATE_TAG;
                }
                break;
              case STATE_IGNORE_COMMENT:
                if (c === 62) {
                  const prevFirst = data.charCodeAt(pos - 1);
                  const prevSecond = data.charCodeAt(pos - 2);
                  if (prevFirst === 45 && prevSecond === 45 || prevFirst === 93 && prevSecond === 93) {
                    state = STATE_TEXT;
                  }
                }
                break;
              case STATE_IGNORE_INSTRUCTION:
                if (c === 62) {
                  const prev = data.charCodeAt(pos - 1);
                  if (prev === 63) {
                    state = STATE_TEXT;
                  }
                }
                break;
              case STATE_TAG:
                if (c === 62) {
                  this._handleTagOpening(endTag, tagName, attrs);
                  tagName = void 0;
                  attrs = void 0;
                  endTag = void 0;
                  selfClosing = void 0;
                  state = STATE_TEXT;
                  recordStart = pos + 1;
                } else if (c === 47) {
                  selfClosing = true;
                } else if (c > 32) {
                  recordStart = pos;
                  state = STATE_ATTR_NAME;
                }
                break;
              case STATE_ATTR_NAME:
                if (c <= 32 || c === 61) {
                  attrName = endRecording();
                  pos--;
                  state = STATE_ATTR_EQ;
                }
                break;
              case STATE_ATTR_EQ:
                if (c === 61) {
                  state = STATE_ATTR_QUOT;
                }
                break;
              case STATE_ATTR_QUOT:
                if (c === 34 || c === 39) {
                  attrQuote = c;
                  attrQuoteChar = c === 34 ? '"' : "'";
                  state = STATE_ATTR_VALUE;
                  recordStart = pos + 1;
                }
                break;
              case STATE_ATTR_VALUE:
                if (c === attrQuote) {
                  const value = escape2.unescapeXML(endRecording());
                  attrs[attrName] = value;
                  attrName = void 0;
                  state = STATE_TAG;
                }
                break;
            }
          }
          if (typeof recordStart === "number" && recordStart <= data.length) {
            remainder = data.slice(recordStart);
            recordStart = 0;
          }
        };
      }
      end(data) {
        if (data) {
          this.write(data);
        }
        this.write = function write() {
        };
      }
    };
    module2.exports = SaxLtx;
  }
});

// node_modules/koa-compose/index.js
var require_koa_compose = __commonJS({
  "node_modules/koa-compose/index.js"(exports2, module2) {
    "use strict";
    module2.exports = compose2;
    function compose2(middleware2) {
      if (!Array.isArray(middleware2)) throw new TypeError("Middleware stack must be an array!");
      for (const fn of middleware2) {
        if (typeof fn !== "function") throw new TypeError("Middleware must be composed of functions!");
      }
      return function(context, next) {
        let index = -1;
        return dispatch(0);
        function dispatch(i) {
          if (i <= index) return Promise.reject(new Error("next() called multiple times"));
          index = i;
          let fn = middleware2[i];
          if (i === middleware2.length) fn = next;
          if (!fn) return Promise.resolve();
          try {
            return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
          } catch (err) {
            return Promise.reject(err);
          }
        }
      };
    }
  }
});

// node_modules/saslmechanisms/lib/factory.js
var require_factory = __commonJS({
  "node_modules/saslmechanisms/lib/factory.js"(exports2, module2) {
    (function(root, factory) {
      if (typeof exports2 === "object") {
        factory(exports2, module2);
      } else if (typeof define === "function" && define.amd) {
        define(["exports", "module"], factory);
      }
    })(exports2, function(exports3, module3) {
      function Factory() {
        this._mechs = [];
      }
      Factory.prototype.use = function(name, mech4) {
        if (!mech4) {
          mech4 = name;
          name = mech4.prototype.name;
        }
        this._mechs.push({ name, mech: mech4 });
        return this;
      };
      Factory.prototype.create = function(mechs) {
        for (var i = 0, len = this._mechs.length; i < len; i++) {
          for (var j2 = 0, jlen = mechs.length; j2 < jlen; j2++) {
            var entry = this._mechs[i];
            if (entry.name == mechs[j2]) {
              return new entry.mech();
            }
          }
        }
        return null;
      };
      exports3 = module3.exports = Factory;
    });
  }
});

// node_modules/saslmechanisms/main.js
var require_main = __commonJS({
  "node_modules/saslmechanisms/main.js"(exports2, module2) {
    (function(root, factory) {
      if (typeof exports2 === "object") {
        factory(
          exports2,
          module2,
          require_factory()
        );
      } else if (typeof define === "function" && define.amd) {
        define([
          "exports",
          "module",
          "./lib/factory"
        ], factory);
      }
    })(exports2, function(exports3, module3, Factory) {
      exports3 = module3.exports = Factory;
      exports3.Factory = Factory;
    });
  }
});

// node_modules/sasl-scram-sha-1/lib/bitops.js
var require_bitops = __commonJS({
  "node_modules/sasl-scram-sha-1/lib/bitops.js"(exports2) {
    exports2.XOR = function(a, b) {
      var res = [];
      if (a.length > b.length) {
        for (var i = 0; i < b.length; i++) {
          res.push(a[i] ^ b[i]);
        }
      } else {
        for (var j2 = 0; j2 < a.length; j2++) {
          res.push(a[j2] ^ b[j2]);
        }
      }
      return new Uint8Array(res);
    };
    exports2.H = function(text) {
      return __async(this, null, function* () {
        return new Uint8Array(
          yield crypto.subtle.digest("SHA-1", text)
        );
      });
    };
    exports2.HMAC = function(key, msg) {
      return __async(this, null, function* () {
        const hmac = yield crypto.subtle.importKey(
          "raw",
          key,
          // https://developer.mozilla.org/en-US/docs/Web/API/HmacImportParams
          { name: "HMAC", hash: "SHA-1" },
          false,
          // extractable
          ["sign"]
        );
        return new Uint8Array(yield crypto.subtle.sign(
          "HMAC",
          hmac,
          msg
        ));
      });
    };
    exports2.Hi = function(text, salt, iterations) {
      return __async(this, null, function* () {
        const key = new TextEncoder().encode(text);
        var concat = new Uint8Array(salt.length + 4);
        concat.set(salt);
        concat.set(new Uint8Array([0, 0, 0, 1]), salt.length);
        var ui1 = yield exports2.HMAC(key, concat);
        var ui = ui1;
        for (var i = 0; i < iterations - 1; i++) {
          ui1 = yield exports2.HMAC(key, ui1);
          ui = exports2.XOR(ui, ui1);
        }
        return ui;
      });
    };
  }
});

// node_modules/sasl-scram-sha-1/lib/utils.js
var require_utils = __commonJS({
  "node_modules/sasl-scram-sha-1/lib/utils.js"(exports2) {
    exports2.parse = function(chal) {
      var dtives = {};
      var tokens = chal.split(/,(?=(?:[^"]|"[^"]*")*$)/);
      for (var i = 0, len = tokens.length; i < len; i++) {
        var dtiv = /(\w+)=["]?([^"]+)["]?$/.exec(tokens[i]);
        if (dtiv) {
          dtives[dtiv[1]] = dtiv[2];
        }
      }
      return dtives;
    };
    exports2.saslname = function(name) {
      var escaped = [];
      var curr = "";
      for (var i = 0; i < name.length; i++) {
        curr = name[i];
        if (curr === ",") {
          escaped.push("=2C");
        } else if (curr === "=") {
          escaped.push("=3D");
        } else {
          escaped.push(curr);
        }
      }
      return escaped.join("");
    };
    exports2.genNonce = function(len) {
      const bytes = new Uint8Array((len || 32) / 2);
      crypto.getRandomValues(bytes);
      return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
    };
  }
});

// node_modules/sasl-scram-sha-1/index.js
var require_sasl_scram_sha_1 = __commonJS({
  "node_modules/sasl-scram-sha-1/index.js"(exports2, module2) {
    var bitops = require_bitops();
    var utils = require_utils();
    var RESP = {};
    var CLIENT_KEY = new TextEncoder().encode("Client Key");
    var SERVER_KEY = new TextEncoder().encode("Server Key");
    function base64decode(s) {
      if (atob) {
        return Uint8Array.from(atob(s), function(c) {
          return c.charCodeAt(0);
        });
      } else {
        return Uint8Array.from(Buffer.from(s, "base64"));
      }
    }
    function base64encode(s) {
      if (btoa) {
        return btoa(s);
      } else {
        return Buffer.from(s).toString("base64");
      }
    }
    function Mechanism2(options) {
      options = options || {};
      this._genNonce = options.genNonce || utils.genNonce;
      this._stage = "initial";
    }
    Mechanism2.Mechanism = Mechanism2;
    Mechanism2.prototype.name = "SCRAM-SHA-1";
    Mechanism2.prototype.clientFirst = true;
    Mechanism2.prototype.response = function(cred) {
      return RESP[this._stage](this, cred);
    };
    Mechanism2.prototype.challenge = function(chal) {
      var values = utils.parse(chal);
      this._salt = base64decode(values.s || "");
      this._iterationCount = parseInt(values.i, 10);
      this._nonce = values.r;
      this._verifier = values.v;
      this._error = values.e;
      this._challenge = chal;
      return this;
    };
    RESP.initial = function(mech4, cred) {
      mech4._cnonce = mech4._genNonce();
      var authzid = "";
      if (cred.authzid) {
        authzid = "a=" + utils.saslname(cred.authzid);
      }
      mech4._gs2Header = "n," + authzid + ",";
      var nonce = "r=" + mech4._cnonce;
      var username = "n=" + utils.saslname(cred.username || "");
      mech4._clientFirstMessageBare = username + "," + nonce;
      var result = mech4._gs2Header + mech4._clientFirstMessageBare;
      mech4._stage = "challenge";
      return result;
    };
    RESP.challenge = function(mech4, cred) {
      return __async(this, null, function* () {
        var gs2Header = base64encode(mech4._gs2Header);
        mech4._clientFinalMessageWithoutProof = "c=" + gs2Header + ",r=" + mech4._nonce;
        var saltedPassword, clientKey, serverKey;
        if (cred.salt && cred.salt.every(function(value, index) {
          return value === mech4._salt[index];
        })) {
          if (cred.clientKey && cred.serverKey) {
            clientKey = cred.clientKey;
            serverKey = cred.serverKey;
          } else if (cred.saltedPassword) {
            saltedPassword = cred.saltedPassword;
            clientKey = yield bitops.HMAC(saltedPassword, CLIENT_KEY);
            serverKey = yield bitops.HMAC(saltedPassword, SERVER_KEY);
          }
        } else {
          saltedPassword = yield bitops.Hi(cred.password || "", mech4._salt, mech4._iterationCount);
          clientKey = yield bitops.HMAC(saltedPassword, CLIENT_KEY);
          serverKey = yield bitops.HMAC(saltedPassword, SERVER_KEY);
        }
        var storedKey = yield bitops.H(clientKey);
        var authMessage = new TextEncoder().encode(mech4._clientFirstMessageBare + "," + mech4._challenge + "," + mech4._clientFinalMessageWithoutProof);
        var clientSignature = yield bitops.HMAC(storedKey, authMessage);
        var clientProof = base64encode(String.fromCharCode.apply(null, bitops.XOR(clientKey, clientSignature)));
        mech4._serverSignature = yield bitops.HMAC(serverKey, authMessage);
        var result = mech4._clientFinalMessageWithoutProof + ",p=" + clientProof;
        mech4._stage = "final";
        mech4.cache = {
          salt: mech4._salt,
          saltedPassword,
          clientKey,
          serverKey
        };
        return result;
      });
    };
    RESP.final = function() {
      return "";
    };
    module2.exports = Mechanism2;
  }
});

// node_modules/sasl-plain/lib/mechanism.js
var require_mechanism = __commonJS({
  "node_modules/sasl-plain/lib/mechanism.js"(exports2, module2) {
    (function(root, factory) {
      if (typeof exports2 === "object") {
        factory(exports2, module2);
      } else if (typeof define === "function" && define.amd) {
        define(["exports", "module"], factory);
      }
    })(exports2, function(exports3, module3) {
      function Mechanism2() {
      }
      Mechanism2.prototype.name = "PLAIN";
      Mechanism2.prototype.clientFirst = true;
      Mechanism2.prototype.response = function(cred) {
        var str = "";
        str += cred.authzid || "";
        str += "\0";
        str += cred.username;
        str += "\0";
        str += cred.password;
        return str;
      };
      Mechanism2.prototype.challenge = function(chal) {
        return this;
      };
      exports3 = module3.exports = Mechanism2;
    });
  }
});

// node_modules/sasl-plain/main.js
var require_main2 = __commonJS({
  "node_modules/sasl-plain/main.js"(exports2, module2) {
    (function(root, factory) {
      if (typeof exports2 === "object") {
        factory(
          exports2,
          module2,
          require_mechanism()
        );
      } else if (typeof define === "function" && define.amd) {
        define([
          "exports",
          "module",
          "./lib/mechanism"
        ], factory);
      }
    })(exports2, function(exports3, module3, Mechanism2) {
      exports3 = module3.exports = Mechanism2;
      exports3.Mechanism = Mechanism2;
    });
  }
});

// node_modules/sasl-anonymous/lib/mechanism.js
var require_mechanism2 = __commonJS({
  "node_modules/sasl-anonymous/lib/mechanism.js"(exports2, module2) {
    (function(root, factory) {
      if (typeof exports2 === "object") {
        factory(exports2, module2);
      } else if (typeof define === "function" && define.amd) {
        define(["exports", "module"], factory);
      }
    })(exports2, function(exports3, module3) {
      function Mechanism2() {
      }
      Mechanism2.prototype.name = "ANONYMOUS";
      Mechanism2.prototype.clientFirst = true;
      Mechanism2.prototype.response = function(cred) {
        return cred.trace || "";
      };
      Mechanism2.prototype.challenge = function(chal) {
      };
      exports3 = module3.exports = Mechanism2;
    });
  }
});

// node_modules/sasl-anonymous/main.js
var require_main3 = __commonJS({
  "node_modules/sasl-anonymous/main.js"(exports2, module2) {
    (function(root, factory) {
      if (typeof exports2 === "object") {
        factory(
          exports2,
          module2,
          require_mechanism2()
        );
      } else if (typeof define === "function" && define.amd) {
        define([
          "exports",
          "module",
          "./lib/mechanism"
        ], factory);
      }
    })(exports2, function(exports3, module3, Mechanism2) {
      exports3 = module3.exports = Mechanism2;
      exports3.Mechanism = Mechanism2;
    });
  }
});

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Database: () => database_default,
  EAS: () => eas_default,
  EventParser: () => events_default,
  HVtecParser: () => hvtec_default,
  Manager: () => Manager,
  PVtecParser: () => pvtec_default,
  StanzaParser: () => stanza_default,
  TextParser: () => text_default,
  UGCParser: () => ugc_default,
  Utils: () => utils_default,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// src/bootstrap.ts
var fs = __toESM(require("fs"));
var path = __toESM(require("path"));
var events2 = __toESM(require("events"));

// node_modules/@xmpp/client/index.js
var client_exports = {};
__export(client_exports, {
  client: () => client,
  jid: () => jid_default,
  xml: () => xml
});

// node_modules/@xmpp/xml/index.js
var import_Element2 = __toESM(require_Element(), 1);
var import_createElement = __toESM(require_createElement(), 1);
var import_escape = __toESM(require_escape(), 1);

// node_modules/@xmpp/xml/lib/Parser.js
var import_ltx = __toESM(require_ltx(), 1);
var import_Element = __toESM(require_Element(), 1);

// node_modules/@xmpp/events/index.js
var import_events = require("events");

// node_modules/@xmpp/events/lib/TimeoutError.js
var TimeoutError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "TimeoutError";
  }
};

// node_modules/@xmpp/events/lib/delay.js
function delay(ms) {
  let timeout2;
  const promise2 = new Promise((resolve5) => {
    timeout2 = setTimeout(resolve5, ms);
  });
  promise2.timeout = timeout2;
  return promise2;
}

// node_modules/@xmpp/events/lib/timeout.js
function timeout(promise2, ms) {
  const promiseDelay = delay(ms);
  function cancelDelay() {
    clearTimeout(promiseDelay.timeout);
  }
  const error = new TimeoutError();
  return Promise.race([
    promise2.finally(cancelDelay),
    promiseDelay.then(() => {
      throw error;
    })
  ]);
}

// node_modules/@xmpp/events/lib/onoff.js
var map = /* @__PURE__ */ new WeakMap();
function onoff(target) {
  var _a, _b, _c;
  let m = map.get(target);
  if (!m) {
    const on = ((_a = target.addEventListener) != null ? _a : target.addListener).bind(target);
    const off = ((_b = target.removeEventListener) != null ? _b : target.removeListener).bind(
      target
    );
    const once = ((_c = target.once) != null ? _c : ((event, handler) => target.addEventListener(event, handler, { once: true }))).bind(target);
    m = { on, off, once };
    map.set(target, m);
  }
  return m;
}

// node_modules/@xmpp/events/lib/promise.js
function promise(target, event, rejectEvent = "error", timeout2) {
  return new Promise((resolve5, reject) => {
    let timeoutId;
    const { off, once } = onoff(target);
    const cleanup = () => {
      clearTimeout(timeoutId);
      off(event, onEvent);
      off(rejectEvent, onError);
    };
    function onError(reason) {
      reject(reason);
      cleanup();
    }
    function onEvent(value) {
      resolve5(value);
      cleanup();
    }
    once(event, onEvent);
    if (rejectEvent) {
      once(rejectEvent, onError);
    }
    if (timeout2) {
      const error = new TimeoutError();
      timeoutId = setTimeout(() => {
        cleanup();
        reject(error);
      }, timeout2);
    }
  });
}

// node_modules/@xmpp/events/lib/Deferred.js
function Deferred() {
  this.promise = new Promise((resolve5, reject) => {
    this.resolve = resolve5;
    this.reject = reject;
  });
}

// node_modules/@xmpp/events/lib/procedure.js
function procedure(entity, stanza = null, handler) {
  return new Promise((resolve5, reject) => {
    function onError(err) {
      entity.removeListener("nonza", listener2);
      reject(err);
    }
    function done(...args) {
      entity.removeListener("nonza", listener2);
      resolve5(...args);
    }
    function listener2(element) {
      return __async(this, null, function* () {
        try {
          yield handler(element, done);
        } catch (err) {
          onError(err);
        }
      });
    }
    stanza && entity.send(stanza).catch(onError);
    entity.on("nonza", listener2);
  });
}

// node_modules/@xmpp/events/lib/listeners.js
function listeners(events3) {
  return {
    subscribe(target) {
      const { on } = onoff(target);
      for (const [event, handler] of Object.entries(events3)) {
        on(event, handler);
      }
    },
    unsubscribe(target) {
      const { off } = onoff(target);
      for (const [event, handler] of Object.entries(events3)) {
        off(event, handler);
      }
    }
  };
}

// node_modules/@xmpp/xml/lib/XMLError.js
var XMLError = class extends Error {
  constructor(...args) {
    super(...args);
    this.name = "XMLError";
  }
};

// node_modules/@xmpp/xml/lib/Parser.js
var Parser = class extends import_events.EventEmitter {
  constructor() {
    super();
    const parser = new import_ltx.default();
    this.root = null;
    this.cursor = null;
    parser.on("startElement", this.onStartElement.bind(this));
    parser.on("endElement", this.onEndElement.bind(this));
    parser.on("text", this.onText.bind(this));
    this.parser = parser;
  }
  onStartElement(name, attrs) {
    const element = new import_Element.default(name, attrs);
    const { root, cursor } = this;
    if (!root) {
      this.root = element;
      this.emit("start", element);
    } else if (cursor !== root) {
      cursor.append(element);
    }
    this.cursor = element;
  }
  onEndElement(name) {
    const { root, cursor } = this;
    if (name !== cursor.name) {
      this.emit("error", new XMLError(`${cursor.name} must be closed.`));
      return;
    }
    if (cursor === root) {
      this.emit("end", root);
      return;
    }
    if (!cursor.parent) {
      cursor.parent = root;
      this.emit("element", cursor);
      this.cursor = root;
      return;
    }
    this.cursor = cursor.parent;
  }
  onText(str) {
    const { cursor } = this;
    if (!cursor) {
      this.emit("error", new XMLError(`${str} must be a child.`));
      return;
    }
    cursor.t(str);
  }
  write(data) {
    this.parser.write(data);
  }
  end(data) {
    if (data) {
      this.parser.write(data);
    }
  }
};
Parser.XMLError = XMLError;
var Parser_default = Parser;

// node_modules/@xmpp/xml/index.js
function xml(...args) {
  return (0, import_createElement.default)(...args);
}
Object.assign(xml, {
  Element: import_Element2.default,
  createElement: import_createElement.default,
  Parser: Parser_default,
  escapeXML: import_escape.escapeXML,
  unescapeXML: import_escape.unescapeXML,
  escapeXMLText: import_escape.escapeXMLText,
  unescapeXMLText: import_escape.unescapeXMLText,
  XMLError,
  xml
});

// node_modules/@xmpp/jid/lib/escaping.js
function detect(local) {
  if (!local) {
    return false;
  }
  const tmp = local.replaceAll(String.raw`\20`, "").replaceAll(String.raw`\22`, "").replaceAll(String.raw`\26`, "").replaceAll(String.raw`\27`, "").replaceAll(String.raw`\2f`, "").replaceAll(String.raw`\3a`, "").replaceAll(String.raw`\3c`, "").replaceAll(String.raw`\3e`, "").replaceAll(String.raw`\40`, "").replaceAll(String.raw`\5c`, "");
  const search = tmp.search(/[ "&'/:<>@\\]/g);
  if (search === -1) {
    return false;
  }
  return true;
}
function escape(local) {
  if (local === null) {
    return null;
  }
  return local.replaceAll(/^\s+|\s+$/g, "").replaceAll("\\", String.raw`\5c`).replaceAll(" ", String.raw`\20`).replaceAll('"', String.raw`\22`).replaceAll("&", String.raw`\26`).replaceAll("'", String.raw`\27`).replaceAll("/", String.raw`\2f`).replaceAll(":", String.raw`\3a`).replaceAll("<", String.raw`\3c`).replaceAll(">", String.raw`\3e`).replaceAll("@", String.raw`\40`);
}
function unescape(local) {
  if (local === null) {
    return null;
  }
  return local.replaceAll(String.raw`\20`, " ").replaceAll(String.raw`\22`, '"').replaceAll(String.raw`\26`, "&").replaceAll(String.raw`\27`, "'").replaceAll(String.raw`\2f`, "/").replaceAll(String.raw`\3a`, ":").replaceAll(String.raw`\3c`, "<").replaceAll(String.raw`\3e`, ">").replaceAll(String.raw`\40`, "@").replaceAll(String.raw`\5c`, "\\");
}

// node_modules/@xmpp/jid/lib/JID.js
var JID = class _JID {
  constructor(local, domain, resource) {
    if (typeof domain !== "string" || !domain) {
      throw new TypeError(`Invalid domain.`);
    }
    this.setDomain(domain);
    this.setLocal(typeof local === "string" ? local : "");
    this.setResource(typeof resource === "string" ? resource : "");
  }
  [Symbol.toPrimitive](hint) {
    if (hint === "number") {
      return Number.NaN;
    }
    return this.toString();
  }
  toString(unescape2) {
    let s = this._domain;
    if (this._local) {
      s = this.getLocal(unescape2) + "@" + s;
    }
    if (this._resource) {
      s = s + "/" + this._resource;
    }
    return s;
  }
  /**
   * Convenience method to distinguish users
   * */
  bare() {
    if (this._resource) {
      return new _JID(this._local, this._domain, null);
    }
    return this;
  }
  /**
   * Comparison function
   * */
  equals(other) {
    return this._local === other._local && this._domain === other._domain && this._resource === other._resource;
  }
  /**
   * http://xmpp.org/rfcs/rfc6122.html#addressing-localpart
   * */
  setLocal(local, escape2) {
    escape2 = escape2 || detect(local);
    if (escape2) {
      local = escape(local);
    }
    this._local = local && local.toLowerCase();
    return this;
  }
  getLocal(unescape2 = false) {
    let local = null;
    local = unescape2 ? unescape(this._local) : this._local;
    return local;
  }
  /**
   * http://xmpp.org/rfcs/rfc6122.html#addressing-domain
   */
  setDomain(domain) {
    this._domain = domain.toLowerCase();
    return this;
  }
  getDomain() {
    return this._domain;
  }
  /**
   * http://xmpp.org/rfcs/rfc6122.html#addressing-resourcepart
   */
  setResource(resource) {
    this._resource = resource;
    return this;
  }
  getResource() {
    return this._resource;
  }
};
Object.defineProperty(JID.prototype, "local", {
  get: JID.prototype.getLocal,
  set: JID.prototype.setLocal
});
Object.defineProperty(JID.prototype, "domain", {
  get: JID.prototype.getDomain,
  set: JID.prototype.setDomain
});
Object.defineProperty(JID.prototype, "resource", {
  get: JID.prototype.getResource,
  set: JID.prototype.setResource
});
var JID_default = JID;

// node_modules/@xmpp/jid/lib/parse.js
function parse(s) {
  let local;
  let resource;
  const resourceStart = s.indexOf("/");
  if (resourceStart !== -1) {
    resource = s.slice(resourceStart + 1);
    s = s.slice(0, resourceStart);
  }
  const atStart = s.indexOf("@");
  if (atStart !== -1) {
    local = s.slice(0, atStart);
    s = s.slice(atStart + 1);
  }
  return new JID_default(local, s, resource);
}

// node_modules/@xmpp/jid/index.js
function equal(a, b) {
  return a.equals(b);
}
function jid(...args) {
  if (!args[1] && !args[2]) {
    return parse(...args);
  }
  return new JID_default(...args);
}
var j = jid.bind();
j.jid = jid;
j.JID = JID_default;
j.parse = parse;
j.equal = equal;
j.detectEscape = detect;
j.escapeLocal = escape;
j.unescapeLocal = unescape;
var jid_default = j;

// node_modules/@xmpp/error/index.js
var XMPPError = class extends Error {
  constructor(condition, text, application) {
    super(condition + (text ? ` - ${text}` : ""));
    this.name = "XMPPError";
    this.condition = condition;
    this.text = text;
    this.application = application;
  }
  static fromElement(element) {
    const [condition, second, third] = element.getChildElements();
    let text;
    let application;
    if (second) {
      if (second.is("text")) {
        text = second;
      } else if (second) {
        application = second;
      }
      if (third) application = third;
    }
    const error = new this(
      condition.name,
      text ? text.text() : "",
      application
    );
    error.element = element;
    return error;
  }
};
var error_default = XMPPError;

// node_modules/@xmpp/connection/lib/StreamError.js
var StreamError = class extends error_default {
  constructor(...args) {
    super(...args);
    this.name = "StreamError";
  }
};
var StreamError_default = StreamError;

// node_modules/@xmpp/connection/lib/util.js
function parseURI(URI) {
  let { port, hostname, protocol } = new URL(URI);
  if (hostname === "[::1]") {
    hostname = "::1";
  }
  return { port, hostname, protocol };
}
function parseHost(host) {
  const { port, hostname } = parseURI(`http://${host}`);
  return { port, hostname };
}
function parseService(service) {
  return service.includes("://") ? parseURI(service) : parseHost(service);
}

// node_modules/@xmpp/connection/index.js
var NS_STREAM = "urn:ietf:params:xml:ns:xmpp-streams";
var NS_JABBER_STREAM = "http://etherx.jabber.org/streams";
var _socketListeners, _parserListeners, _Connection_instances, onParserError_fn, onSocketClosed_fn, onStreamClosed_fn, _hooks, _hook_events, assertHookEventName_fn, runHooks_fn;
var Connection = class extends import_events.EventEmitter {
  constructor(options = {}) {
    super();
    __privateAdd(this, _Connection_instances);
    __privateAdd(this, _socketListeners, null);
    __privateAdd(this, _parserListeners, null);
    /* Experimental hooks */
    __privateAdd(this, _hooks, /* @__PURE__ */ new Map());
    __privateAdd(this, _hook_events, /* @__PURE__ */ new Set(["close"]));
    if (typeof options === "string") {
      options = { domain: options };
    }
    this.jid = null;
    this.timeout = options.timeout || 2e3;
    this.options = options;
    this.status = "offline";
    this.socket = null;
    this.parser = null;
    this.root = null;
  }
  isSecure() {
    var _a;
    return ((_a = this.socket) == null ? void 0 : _a.secure) === true;
  }
  _streamError(condition, children) {
    return __async(this, null, function* () {
      try {
        yield this.send(
          // prettier-ignore
          xml("stream:error", {}, [
            xml(condition, { xmlns: NS_STREAM }, children)
          ])
        );
      } catch (e) {
      }
      return this.disconnect();
    });
  }
  _onData(data) {
    const str = data.toString("utf8");
    this.parser.write(str);
  }
  _attachSocket(socket) {
    var _a;
    this.socket = socket;
    (_a = __privateGet(this, _socketListeners)) != null ? _a : __privateSet(this, _socketListeners, listeners({
      data: this._onData.bind(this),
      close: __privateMethod(this, _Connection_instances, onSocketClosed_fn).bind(this),
      connect: () => this._status("connect"),
      error: (error) => this.emit("error", error)
    }));
    __privateGet(this, _socketListeners).subscribe(this.socket);
  }
  _detachSocket() {
    var _a;
    this.socket && ((_a = __privateGet(this, _socketListeners)) == null ? void 0 : _a.unsubscribe(this.socket));
    this.socket = null;
  }
  _onElement(element) {
    const isStreamError = element.is("error", NS_JABBER_STREAM);
    if (isStreamError) {
      this._onStreamError(element);
    }
    this.emit("element", element);
    this.emit(this.isStanza(element) ? "stanza" : "nonza", element);
    if (isStreamError) {
      this.disconnect();
    }
  }
  // https://xmpp.org/rfcs/rfc6120.html#streams-error
  _onStreamError(element) {
    const error = StreamError_default.fromElement(element);
    if (error.condition === "see-other-host") {
      return this._onSeeOtherHost(error);
    }
    this.emit("error", error);
  }
  // https://xmpp.org/rfcs/rfc6120.html#streams-error-conditions-see-other-host
  _onSeeOtherHost(error) {
    return __async(this, null, function* () {
      const { protocol } = parseService(this.options.service);
      const host = error.element.getChildText("see-other-host");
      const { port } = parseHost(host);
      let service;
      service = port ? `${protocol || "xmpp:"}//${host}` : (protocol ? `${protocol}//` : "") + host;
      try {
        yield promise(this, "disconnect");
        const { domain, lang } = this.options;
        yield this.connect(service);
        yield this.open({ domain, lang });
      } catch (err) {
        this.emit("error", err);
      }
    });
  }
  _attachParser(parser) {
    var _a;
    this.parser = parser;
    (_a = __privateGet(this, _parserListeners)) != null ? _a : __privateSet(this, _parserListeners, listeners({
      element: this._onElement.bind(this),
      error: __privateMethod(this, _Connection_instances, onParserError_fn).bind(this),
      end: __privateMethod(this, _Connection_instances, onStreamClosed_fn).bind(this),
      start: (element) => this._status("open", element)
    }));
    __privateGet(this, _parserListeners).subscribe(this.parser);
  }
  _detachParser() {
    var _a;
    this.parser && ((_a = __privateGet(this, _parserListeners)) == null ? void 0 : _a.unsubscribe(this.parser));
    this.parser = null;
    this.root = null;
  }
  _jid(id2) {
    this.jid = jid_default(id2);
    return this.jid;
  }
  /*
  [
    "offline",
    // "disconnect",
    "connecting",
    "connected",
    "opening",
    "open",
    "online",
    "closing",
    "close",
    "disconnecting",
    "disconnect",
    "offline",
  ];
  */
  _status(status2, ...args) {
    if (this.status === status2) return;
    this.status = status2;
    this.emit("status", status2, ...args);
    this.emit(status2, ...args);
  }
  _ready(resumed = false) {
    if (resumed) {
      this.status = "online";
    } else {
      this._status("online", this.jid);
    }
  }
  disconnect() {
    return __async(this, null, function* () {
      let el;
      try {
        el = yield this._closeStream();
      } catch (err) {
        __privateMethod(this, _Connection_instances, onStreamClosed_fn).call(this, err);
      }
      try {
        yield this._closeSocket();
      } catch (err) {
        __privateMethod(this, _Connection_instances, onSocketClosed_fn).call(this, true, err);
      }
      return el;
    });
  }
  /**
   * Opens the socket then opens the stream
   */
  start() {
    return __async(this, null, function* () {
      if (this.status !== "offline") {
        throw new Error("Connection is not offline");
      }
      const { service, domain, lang } = this.options;
      yield this.connect(service);
      const promiseOnline = promise(this, "online");
      yield this.open({ domain, lang });
      return promiseOnline;
    });
  }
  /**
   * Connects the socket
   */
  connect(service) {
    return __async(this, null, function* () {
      this._status("connecting", service);
      const socket = new this.Socket();
      this._attachSocket(socket);
      socket.connect(this.socketParameters(service));
      return promise(socket, "connect");
    });
  }
  /**
   * Disconnects the socket
   * https://xmpp.org/rfcs/rfc6120.html#streams-close
   * https://tools.ietf.org/html/rfc7395#section-3.6
   */
  _closeSocket() {
    return __async(this, arguments, function* (timeout2 = this.timeout) {
      this._status("disconnecting");
      this.socket.end();
      yield promise(this.socket, "close", "error", timeout2);
    });
  }
  /**
   * Opens the stream
   */
  open(options) {
    return __async(this, null, function* () {
      this._status("opening");
      const { domain, lang } = options;
      const headerElement = this.headerElement();
      headerElement.attrs.to = domain;
      headerElement.attrs["xml:lang"] = lang;
      this.root = headerElement;
      this._attachParser(new this.Parser());
      yield this.write(this.header(headerElement));
      return promise(this, "open", "error", this.timeout);
    });
  }
  /**
   * Closes the stream then closes the socket
   * https://xmpp.org/rfcs/rfc6120.html#streams-close
   * https://tools.ietf.org/html/rfc7395#section-3.6
   */
  stop() {
    return __async(this, null, function* () {
      const el = yield this.disconnect();
      this._status("offline", el);
      return el;
    });
  }
  /**
   * Closes the stream and wait for the server to close it
   * https://xmpp.org/rfcs/rfc6120.html#streams-close
   * https://tools.ietf.org/html/rfc7395#section-3.6
   */
  _closeStream() {
    return __async(this, arguments, function* (timeout2 = this.timeout) {
      yield __privateMethod(this, _Connection_instances, runHooks_fn).call(this, "close");
      const fragment = this.footer(this.footerElement());
      yield this.write(fragment);
      this._status("closing");
      return promise(this.parser, "end", "error", timeout2);
    });
  }
  /**
   * Restart the stream
   * https://xmpp.org/rfcs/rfc6120.html#streams-negotiation-restart
   */
  restart() {
    return __async(this, null, function* () {
      this._detachParser();
      const { domain, lang } = this.options;
      return this.open({ domain, lang });
    });
  }
  send(element) {
    return __async(this, null, function* () {
      element.parent = this.root;
      yield this.write(element.toString());
      this.emit("send", element);
    });
  }
  sendReceive(element, timeout2 = this.timeout) {
    return Promise.all([
      this.send(element),
      promise(this, "element", "error", timeout2)
    ]).then(([, el]) => el);
  }
  write(string) {
    return __async(this, null, function* () {
      if (this.status === "closing") {
        throw new Error("Connection is closing");
      }
      return new Promise((resolve5, reject) => {
        this.socket.write(string, (err) => err ? reject(err) : resolve5());
      });
    });
  }
  isStanza(element) {
    const { name } = element;
    return name === "iq" || name === "message" || name === "presence";
  }
  isNonza(element) {
    return !this.isStanza(element);
  }
  // Override
  header(el) {
    return el.toString();
  }
  // Override
  headerElement() {
    return new xml.Element("", {
      version: "1.0",
      xmlns: this.NS
    });
  }
  // Override
  footer(el) {
    return el.toString();
  }
  // Override
  footerElement() {
  }
  // Override
  socketParameters() {
  }
  hook(event, handler) {
    __privateMethod(this, _Connection_instances, assertHookEventName_fn).call(this, event);
    if (!__privateGet(this, _hooks).has(event)) {
      __privateGet(this, _hooks).set(event, /* @__PURE__ */ new Set());
    }
    __privateGet(this, _hooks).get(event).add([handler]);
  }
  unhook(event, handler) {
    __privateMethod(this, _Connection_instances, assertHookEventName_fn).call(this, event);
    const handlers = __privateGet(this, _hooks).get("event");
    const item = [...handlers].find((item2) => item2.handler === handler);
    handlers.remove(item);
  }
};
_socketListeners = new WeakMap();
_parserListeners = new WeakMap();
_Connection_instances = new WeakSet();
onParserError_fn = function(error) {
  this._streamError("bad-format");
  this._detachParser();
  this.emit("error", error);
};
onSocketClosed_fn = function(dirty, reason) {
  this._detachSocket();
  this._status("disconnect", { clean: !dirty, reason });
};
onStreamClosed_fn = function(dirty, reason) {
  this._detachParser();
  this._status("close", { clean: !dirty, reason });
};
_hooks = new WeakMap();
_hook_events = new WeakMap();
assertHookEventName_fn = function(event) {
  if (!__privateGet(this, _hook_events).has(event)) {
    throw new Error(`Hook event name "${event}" is unknown.`);
  }
};
runHooks_fn = function(event, ...args) {
  return __async(this, null, function* () {
    __privateMethod(this, _Connection_instances, assertHookEventName_fn).call(this, event);
    const hooks = __privateGet(this, _hooks).get(event);
    if (!hooks) return;
    yield Promise.all(
      [...hooks].map((_0) => __async(this, [_0], function* ([handler]) {
        try {
          yield handler(...args);
        } catch (err) {
          this.emit("error", err);
        }
      }))
    );
  });
};
Connection.prototype.NS = "";
Connection.prototype.Socket = null;
Connection.prototype.Parser = null;
var connection_default = Connection;

// node_modules/@xmpp/client-core/lib/Client.js
var Client = class extends connection_default {
  constructor(options) {
    super(options);
    this.transports = [];
  }
  send(element, ...args) {
    return this.Transport.prototype.send.call(this, element, ...args);
  }
  sendMany(...args) {
    return this.Transport.prototype.sendMany.call(this, ...args);
  }
  _findTransport(service) {
    return this.transports.find((Transport) => {
      try {
        return Transport.prototype.socketParameters(service) !== void 0;
      } catch (e) {
        return false;
      }
    });
  }
  connect(service) {
    const Transport = this._findTransport(service);
    if (!Transport) {
      throw new Error("No compatible connection method found.");
    }
    this.Transport = Transport;
    this.Socket = Transport.prototype.Socket;
    this.Parser = Transport.prototype.Parser;
    return super.connect(service);
  }
  socketParameters(...args) {
    return this.Transport.prototype.socketParameters(...args);
  }
  header(headerElement, ...args) {
    var _a;
    const from = this.isSecure() && ((_a = this.jid) == null ? void 0 : _a.bare().toString());
    if (from) headerElement.attrs.from = from;
    return this.Transport.prototype.header(headerElement, ...args);
  }
  headerElement(...args) {
    return this.Transport.prototype.headerElement(...args);
  }
  footer(...args) {
    return this.Transport.prototype.footer(...args);
  }
  footerElement(...args) {
    return this.Transport.prototype.footerElement(...args);
  }
};
Client.prototype.NS = "jabber:client";
var Client_default = Client;

// node_modules/@xmpp/reconnect/index.js
var _onDisconnect;
var Reconnect = class extends import_events.EventEmitter {
  constructor(entity) {
    super();
    __privateAdd(this, _onDisconnect, () => {
      this.scheduleReconnect();
    });
    this.delay = 1e3;
    this.entity = entity;
    this._timeout = null;
  }
  scheduleReconnect() {
    const { entity, delay: delay2, _timeout } = this;
    clearTimeout(_timeout);
    this._timeout = setTimeout(() => __async(this, null, function* () {
      if (entity.status !== "disconnect") {
        return;
      }
      try {
        yield this.reconnect();
      } catch (e) {
      }
    }), delay2);
  }
  reconnect() {
    return __async(this, null, function* () {
      const { entity } = this;
      this.emit("reconnecting");
      const { service, domain, lang } = entity.options;
      yield entity.connect(service);
      yield entity.open({ domain, lang });
      this.emit("reconnected");
    });
  }
  start() {
    const { entity } = this;
    entity.on("disconnect", __privateGet(this, _onDisconnect));
  }
  stop() {
    const { entity, _timeout } = this;
    entity.removeListener("disconnect", __privateGet(this, _onDisconnect));
    clearTimeout(_timeout);
  }
};
_onDisconnect = new WeakMap();
function reconnect({ entity }) {
  const r = new Reconnect(entity);
  r.start();
  return r;
}

// node_modules/@xmpp/websocket/lib/Socket.js
var CODE = "ECONNERROR";
function isSecure(url) {
  const uri = parseURI(url);
  if (uri.protocol === "wss:") return true;
  if (["localhost", "127.0.0.1", "::1"].includes(uri.hostname)) return true;
  return false;
}
var _listeners;
var Socket = class extends import_events.EventEmitter {
  constructor() {
    super(...arguments);
    __privateAdd(this, _listeners, null);
    __publicField(this, "socket", null);
    __publicField(this, "url", null);
    __publicField(this, "secure", false);
  }
  connect(url) {
    this.url = url;
    this.secure = isSecure(url);
    this._attachSocket(new WebSocket(url, ["xmpp"]));
  }
  _attachSocket(socket) {
    var _a;
    this.socket = socket;
    (_a = __privateGet(this, _listeners)) != null ? _a : __privateSet(this, _listeners, listeners({
      open: () => this.emit("connect"),
      message: ({ data }) => this.emit("data", data),
      error: (event) => {
        const { url } = this;
        let { error } = event;
        if (!error) {
          error = new Error(event.message || `WebSocket ${CODE} ${url}`);
          error.errno = CODE;
          error.code = CODE;
        }
        error.event = event;
        error.url = url;
        this.emit("error", error);
      },
      close: (event) => {
        this._detachSocket();
        this.emit("close", !event.wasClean, event);
      }
    }));
    __privateGet(this, _listeners).subscribe(this.socket);
  }
  _detachSocket() {
    var _a;
    this.url = null;
    this.secure = false;
    this.socket && ((_a = __privateGet(this, _listeners)) == null ? void 0 : _a.unsubscribe(this.socket));
    this.socket = null;
  }
  end() {
    this.socket.close();
  }
  write(data, fn) {
    function done(err) {
      if (!fn) return;
      Promise.resolve().then(() => fn(err));
    }
    try {
      this.socket.send(data);
    } catch (err) {
      done(err);
      return;
    }
    done();
  }
};
_listeners = new WeakMap();

// node_modules/@xmpp/websocket/lib/FramedParser.js
var FramedParser = class extends Parser_default {
  onStartElement(name, attrs) {
    const element = new import_Element2.default(name, attrs);
    const { cursor } = this;
    if (cursor) {
      cursor.append(element);
    }
    this.cursor = element;
  }
  onEndElement(name) {
    const { cursor } = this;
    if (name !== cursor.name) {
      this.emit("error", new XMLError(`${cursor.name} must be closed.`));
      return;
    }
    if (cursor.parent) {
      this.cursor = cursor.parent;
      return;
    }
    if (cursor.is("open", "urn:ietf:params:xml:ns:xmpp-framing")) {
      this.emit("start", cursor);
    } else if (cursor.is("close", "urn:ietf:params:xml:ns:xmpp-framing")) {
      this.emit("end", cursor);
    } else {
      this.emit("element", cursor);
    }
    this.cursor = null;
  }
};

// node_modules/@xmpp/websocket/lib/Connection.js
var NS_FRAMING = "urn:ietf:params:xml:ns:xmpp-framing";
var ConnectionWebSocket = class extends connection_default {
  send(element, ...args) {
    var _a, _b;
    (_b = (_a = element.attrs).xmlns) != null ? _b : _a.xmlns = this.NS;
    return super.send(element, ...args);
  }
  sendMany(elements) {
    return __async(this, null, function* () {
      var _a, _b;
      for (const element of elements) {
        (_b = (_a = element.attrs).xmlns) != null ? _b : _a.xmlns = this.NS;
        element.parent = this.root;
        this.socket.write(element.toString());
        this.emit("send", element);
      }
    });
  }
  // https://tools.ietf.org/html/rfc7395#section-3.6
  footerElement() {
    return new xml.Element("close", {
      xmlns: NS_FRAMING
    });
  }
  // https://tools.ietf.org/html/rfc7395#section-3.4
  headerElement() {
    const el = super.headerElement();
    el.name = "open";
    el.attrs.xmlns = NS_FRAMING;
    return el;
  }
  socketParameters(service) {
    return /^wss?:\/\//.test(service) ? service : void 0;
  }
};
ConnectionWebSocket.prototype.Socket = Socket;
ConnectionWebSocket.prototype.NS = "jabber:client";
ConnectionWebSocket.prototype.Parser = FramedParser;
var Connection_default = ConnectionWebSocket;

// node_modules/@xmpp/websocket/index.js
function websocket({ entity }) {
  entity.transports.push(Connection_default);
}

// node_modules/@xmpp/connection-tcp/Socket.js
var import_node_net = require("net");
var Socket2 = class extends import_node_net.Socket {
  constructor() {
    super(...arguments);
    __publicField(this, "secure", false);
  }
};

// node_modules/@xmpp/connection-tcp/index.js
var NS_STREAM2 = "http://etherx.jabber.org/streams";
var ConnectionTCP = class extends connection_default {
  sendMany(elements) {
    return __async(this, null, function* () {
      let fragment = "";
      for (const element of elements) {
        element.parent = this.root;
        fragment += element.toString();
      }
      yield this.write(fragment);
      for (const element of elements) {
        this.emit("send", element);
      }
    });
  }
  socketParameters(service) {
    const { port, hostname, protocol } = parseURI(service);
    return protocol === "xmpp:" ? { port: port ? Number(port) : null, host: hostname } : void 0;
  }
  // https://xmpp.org/rfcs/rfc6120.html#streams-open
  headerElement() {
    const el = super.headerElement();
    el.name = "stream:stream";
    el.attrs["xmlns:stream"] = NS_STREAM2;
    return el;
  }
  // https://xmpp.org/rfcs/rfc6120.html#streams-open
  header(el) {
    return `<?xml version='1.0'?>${el.toString().slice(0, -2)}>`;
  }
  // https://xmpp.org/rfcs/rfc6120.html#streams-close
  footer() {
    return "</stream:stream>";
  }
};
ConnectionTCP.prototype.NS = NS_STREAM2;
ConnectionTCP.prototype.Socket = Socket2;
ConnectionTCP.prototype.Parser = Parser_default;
var connection_tcp_default = ConnectionTCP;

// node_modules/@xmpp/tcp/lib/Connection.js
var ConnectionTCP2 = class extends connection_tcp_default {
  socketParameters(service) {
    const params = super.socketParameters(service);
    if (!params) return params;
    params.port = params.port || 5222;
    return params;
  }
};
ConnectionTCP2.prototype.NS = "jabber:client";
var Connection_default2 = ConnectionTCP2;

// node_modules/@xmpp/tcp/index.js
function tcp({ entity }) {
  entity.transports.push(Connection_default2);
}

// node_modules/@xmpp/tls/lib/Socket.js
var import_node_tls = __toESM(require("tls"), 1);
var _listeners2;
var Socket3 = class extends import_events.EventEmitter {
  constructor() {
    super(...arguments);
    __publicField(this, "timeout", null);
    __privateAdd(this, _listeners2, null);
    __publicField(this, "socket", null);
    __publicField(this, "secure", true);
  }
  connect(...args) {
    this._attachSocket(import_node_tls.default.connect(...args));
  }
  _attachSocket(socket) {
    var _a;
    this.socket = socket;
    (_a = __privateGet(this, _listeners2)) != null ? _a : __privateSet(this, _listeners2, listeners({
      close: () => {
        this._detachSocket();
        this.emit("close");
      },
      data: (data) => {
        this.emit("data", data);
      },
      error: (err) => {
        this.emit("error", err);
      },
      secureConnect: () => {
        if (this.socket.getProtocol() !== "TLSv1.3") {
          return this.emit("connect");
        }
        this.timeout = setTimeout(() => {
          this.emit("connect");
        }, 1);
      }
    }));
    __privateGet(this, _listeners2).subscribe(this.socket);
  }
  _detachSocket() {
    __privateGet(this, _listeners2).unsubscribe(this.socket);
    this.socket = null;
  }
  end() {
    this.socket.end();
  }
  write(data, fn) {
    this.socket.write(data, fn);
  }
};
_listeners2 = new WeakMap();
var Socket_default = Socket3;

// node_modules/@xmpp/tls/lib/Connection.js
var ConnectionTLS = class extends connection_tcp_default {
  socketParameters(service) {
    const { port, hostname, protocol } = parseURI(service);
    return protocol === "xmpps:" ? {
      port: Number(port) || 5223,
      host: hostname
    } : void 0;
  }
};
ConnectionTLS.prototype.Socket = Socket_default;
ConnectionTLS.prototype.NS = "jabber:client";
var Connection_default3 = ConnectionTLS;

// node_modules/@xmpp/tls/index.js
function tls2({ entity }) {
  entity.transports.push(Connection_default3);
}

// node_modules/@xmpp/middleware/index.js
var import_koa_compose = __toESM(require_koa_compose(), 1);

// node_modules/@xmpp/middleware/lib/Context.js
var Context = class {
  constructor(entity, stanza) {
    this.stanza = stanza;
    this.entity = entity;
    const { name, attrs } = stanza;
    const { type, id: id2 } = attrs;
    this.name = name;
    this.id = id2 || "";
    if (name === "message") {
      this.type = type || "normal";
    } else if (name === "presence") {
      this.type = type || "available";
    } else {
      this.type = type || "";
    }
    this.from = null;
    this.to = null;
    this.local = "";
    this.domain = "";
    this.resource = "";
  }
};

// node_modules/@xmpp/middleware/lib/IncomingContext.js
var IncomingContext = class extends Context {
  constructor(entity, stanza) {
    var _a;
    super(entity, stanza);
    const { jid: jid2 } = entity;
    const { domain } = (_a = entity.options) != null ? _a : {};
    const to = stanza.attrs.to || (jid2 == null ? void 0 : jid2.toString());
    const from = stanza.attrs.from || domain;
    if (to) this.to = new jid_default(to);
    if (from) {
      this.from = new jid_default(from);
      this.local = this.from.local;
      this.domain = this.from.domain;
      this.resource = this.from.resource;
    }
  }
};

// node_modules/@xmpp/middleware/lib/OutgoingContext.js
var OutgoingContext = class extends Context {
  constructor(entity, stanza) {
    var _a;
    super(entity, stanza);
    const { jid: jid2 } = entity;
    const { domain } = (_a = entity.options) != null ? _a : {};
    const from = stanza.attrs.from || (jid2 == null ? void 0 : jid2.toString());
    const to = stanza.attrs.to || domain;
    if (from) this.from = new jid_default(from);
    if (to) {
      this.to = new jid_default(to);
      this.local = this.to.local;
      this.domain = this.to.domain;
      this.resource = this.to.resource;
    }
  }
};

// node_modules/@xmpp/middleware/index.js
function listener(entity, middleware2, Context2) {
  return (stanza) => {
    const ctx = new Context2(entity, stanza);
    return (0, import_koa_compose.default)(middleware2)(ctx);
  };
}
function errorHandler(entity) {
  return (ctx, next) => {
    next().then((reply) => reply && entity.send(reply)).catch((err) => entity.emit("error", err));
  };
}
function middleware({ entity }) {
  const incoming = [errorHandler(entity)];
  const outgoing = [];
  const incomingListener = listener(entity, incoming, IncomingContext);
  const outgoingListener = listener(entity, outgoing, OutgoingContext);
  entity.on("element", incomingListener);
  entity.on("send", outgoingListener);
  return {
    use(fn) {
      incoming.push(fn);
      return fn;
    },
    filter(fn) {
      outgoing.push(fn);
      return fn;
    }
  };
}

// node_modules/@xmpp/stream-features/index.js
function streamFeatures({ middleware: middleware2 }) {
  function use(name, xmlns, handler) {
    return middleware2.use((ctx, next) => {
      const { stanza } = ctx;
      if (!stanza.is("features", "http://etherx.jabber.org/streams"))
        return next();
      const feature = stanza.getChild(name, xmlns);
      if (!feature) return next();
      return handler(ctx, next, feature);
    });
  }
  return {
    use
  };
}

// node_modules/@xmpp/id/index.js
function id() {
  let i;
  while (!i) {
    i = Math.random().toString(36).slice(2, 12);
  }
  return i;
}

// node_modules/@xmpp/middleware/lib/StanzaError.js
var StanzaError = class extends error_default {
  constructor(condition, text, application, type) {
    super(condition, text, application);
    this.type = type;
    this.name = "StanzaError";
  }
  static fromElement(element) {
    const error = super.fromElement(element);
    error.type = element.attrs.type;
    return error;
  }
};
var StanzaError_default = StanzaError;

// node_modules/@xmpp/iq/caller.js
function isReply({ name, type }) {
  if (name !== "iq") return false;
  if (type !== "error" && type !== "result") return false;
  return true;
}
var IQCaller = class {
  constructor({ entity, middleware: middleware2 }) {
    this.handlers = /* @__PURE__ */ new Map();
    this.entity = entity;
    this.middleware = middleware2;
  }
  start() {
    this.middleware.use(this._route.bind(this));
  }
  _route({ type, name, id: id2, stanza }, next) {
    if (!isReply({ name, type })) return next();
    const deferred = this.handlers.get(id2);
    if (!deferred) {
      return next();
    }
    if (type === "error") {
      deferred.reject(StanzaError_default.fromElement(stanza.getChild("error")));
    } else {
      deferred.resolve(stanza);
    }
    this.handlers.delete(id2);
  }
  request(_0) {
    return __async(this, arguments, function* (stanza, timeout2 = 30 * 1e3) {
      if (!stanza.attrs.id) {
        stanza.attrs.id = id();
      }
      const deferred = new Deferred();
      this.handlers.set(stanza.attrs.id, deferred);
      try {
        yield this.entity.send(stanza);
        yield timeout(deferred.promise, timeout2);
      } catch (err) {
        this.handlers.delete(stanza.attrs.id);
        throw err;
      }
      return deferred.promise;
    });
  }
  _childRequest(type, element, to, ...args) {
    const {
      name,
      attrs: { xmlns }
    } = element;
    return this.request(xml("iq", { type, to }, element), ...args).then(
      (stanza) => stanza.getChild(name, xmlns)
    );
  }
  get(...args) {
    return __async(this, null, function* () {
      return this._childRequest("get", ...args);
    });
  }
  set(...args) {
    return __async(this, null, function* () {
      return this._childRequest("set", ...args);
    });
  }
};
function iqCaller(...args) {
  const iqCaller2 = new IQCaller(...args);
  iqCaller2.start();
  return iqCaller2;
}

// node_modules/@xmpp/iq/callee.js
var NS_STANZA = "urn:ietf:params:xml:ns:xmpp-stanzas";
function isQuery({ name, type }) {
  if (name !== "iq") return false;
  if (type === "error" || type === "result") return false;
  return true;
}
function isValidQuery({ type }, children, child2) {
  if (type !== "get" && type !== "set") return false;
  if (children.length !== 1) return false;
  if (!child2) return false;
  return true;
}
function buildReply({ stanza }) {
  return xml("iq", {
    to: stanza.attrs.from,
    from: stanza.attrs.to,
    id: stanza.attrs.id
  });
}
function buildReplyResult(ctx, child2) {
  const reply = buildReply(ctx);
  reply.attrs.type = "result";
  if (child2) {
    reply.append(child2);
  }
  return reply;
}
function buildReplyError(ctx, error, child2) {
  const reply = buildReply(ctx);
  reply.attrs.type = "error";
  if (child2) {
    reply.append(child2);
  }
  reply.append(error);
  return reply;
}
function buildError(type, condition) {
  return xml("error", { type }, xml(condition, NS_STANZA));
}
function iqHandler(entity) {
  return function iqHandler2(ctx, next) {
    return __async(this, null, function* () {
      if (!isQuery(ctx)) return next();
      const { stanza } = ctx;
      const children = stanza.getChildElements();
      const [child2] = children;
      if (!isValidQuery(ctx, children, child2)) {
        return buildReplyError(ctx, buildError("modify", "bad-request"), child2);
      }
      ctx.element = child2;
      let reply;
      try {
        reply = yield next();
      } catch (err) {
        entity.emit("error", err);
        reply = buildError("cancel", "internal-server-error");
      }
      if (!reply) {
        reply = buildError("cancel", "service-unavailable");
      }
      if (reply instanceof xml.Element && reply.is("error")) {
        return buildReplyError(ctx, reply, child2);
      }
      return buildReplyResult(
        ctx,
        reply instanceof xml.Element ? reply : void 0
      );
    });
  };
}
function route(type, ns, name, handler) {
  return (ctx, next) => {
    if (ctx.type !== type | !ctx.element || !ctx.element.is(name, ns))
      return next();
    return handler(ctx, next);
  };
}
function iqCallee({ middleware: middleware2, entity }) {
  middleware2.use(iqHandler(entity));
  return {
    get(ns, name, handler) {
      middleware2.use(route("get", ns, name, handler));
    },
    set(ns, name, handler) {
      middleware2.use(route("set", ns, name, handler));
    }
  };
}

// node_modules/@xmpp/resolve/lib/dns.js
var import_node_dns = __toESM(require("dns"), 1);
var IGNORE_CODES = ["ENOTFOUND", "ENODATA"];
function lookup(domain, options = {}) {
  options.all = true;
  return new Promise((resolve5, reject) => {
    import_node_dns.default.lookup(domain, options, (err, addresses) => {
      if (err) {
        return reject(err);
      }
      const result = [];
      for (const { family, address } of addresses) {
        const uri = `://${family === 4 ? address : "[" + address + "]"}:`;
        result.push(
          {
            family,
            address,
            uri: "xmpps" + uri + "5223"
          },
          {
            family,
            address,
            uri: "xmpp" + uri + "5222"
          }
        );
      }
      resolve5(result);
    });
  });
}
function resolveSrv(domain, { service, protocol }) {
  return new Promise((resolve5, reject) => {
    import_node_dns.default.resolveSrv(`_${service}._${protocol}.${domain}`, (err, records2) => {
      if (err && IGNORE_CODES.includes(err.code)) {
        resolve5([]);
      } else if (err) {
        reject(err);
      } else {
        resolve5(
          records2.map((record) => {
            return Object.assign(record, { service, protocol });
          })
        );
      }
    });
  });
}
function sortSrv(records2) {
  return records2.toSorted((a, b) => {
    const priority = a.priority - b.priority;
    if (priority !== 0) {
      return priority;
    }
    const weight = b.weight - a.weight;
    if (weight !== 0) {
      return weight;
    }
    return 0;
  });
}
function lookupSrvs(srvs, options) {
  const addresses = [];
  return Promise.all(
    srvs.map((srv) => __async(null, null, function* () {
      const srvAddresses = yield lookup(srv.name, options);
      for (const address of srvAddresses) {
        const { port, service } = srv;
        const addr = address.address;
        addresses.push(__spreadProps(__spreadValues(__spreadValues({}, address), srv), {
          uri: `${service.split("-")[0]}://${address.family === 6 ? "[" + addr + "]" : addr}:${port}`
        }));
      }
    }))
  ).then(() => addresses);
}
function resolve(domain, options = {}) {
  if (!options.srv) {
    options.srv = [
      {
        service: "xmpps-client",
        protocol: "tcp"
      },
      {
        service: "xmpp-client",
        protocol: "tcp"
      },
      {
        service: "xmpps-server",
        protocol: "tcp"
      },
      {
        service: "xmpp-server",
        protocol: "tcp"
      },
      {
        service: "stun",
        protocol: "tcp"
      },
      {
        service: "stun",
        protocol: "udp"
      },
      {
        service: "stuns ",
        protcol: "tcp"
      },
      {
        service: "turn",
        protocol: "tcp"
      },
      {
        service: "turn",
        protocol: "udp"
      },
      {
        service: "turns",
        protcol: "tcp"
      }
    ];
  }
  const family = { options };
  return lookup(domain, options).then((addresses) => {
    return Promise.all(
      options.srv.map((srv) => {
        return resolveSrv(domain, __spreadProps(__spreadValues({}, srv), { family })).then((records2) => {
          return lookupSrvs(records2, options);
        });
      })
    ).then((srvs) => [...sortSrv(srvs.flat()), ...addresses]);
  });
}

// node_modules/@xmpp/xml/lib/parse.js
function parse2(data) {
  const p = new Parser_default();
  let result = null;
  let error = null;
  p.on("start", (el) => {
    result = el;
  });
  p.on("element", (el) => {
    result.append(el);
  });
  p.on("error", (err) => {
    error = err;
  });
  p.write(data);
  p.end();
  if (error) {
    throw error;
  } else {
    return result;
  }
}

// node_modules/@xmpp/resolve/lib/alt-connections.js
function isSecure2(uri) {
  return uri.startsWith("https") || uri.startsWith("wss");
}
function compare(a, b) {
  let secure;
  if (isSecure2(a.uri) && !isSecure2(b.uri)) {
    secure = -1;
  } else if (!isSecure2(a.uri) && isSecure2(b.uri)) {
    secure = 1;
  } else {
    secure = 0;
  }
  if (secure !== 0) {
    return secure;
  }
  let method;
  if (a.method === b.method) {
    method = 0;
  } else if (a.method === "websocket") {
    method = -1;
  } else if (b.method === "websocket") {
    method = 1;
  } else if (a.method === "xbosh") {
    method = -1;
  } else if (b.method === "xbosh") {
    method = 1;
  } else if (a.method === "httppoll") {
    method = -1;
  } else if (b.method === "httppoll") {
    method = 1;
  } else {
    method = 0;
  }
  if (method !== 0) {
    return method;
  }
  return 0;
}

// node_modules/@xmpp/resolve/lib/http.js
function resolve2(domain) {
  return fetch(`https://${domain}/.well-known/host-meta`).then((res) => res.text()).then((res) => {
    return parse2(res).getChildren("Link").filter(
      (link) => [
        "urn:xmpp:alt-connections:websocket",
        "urn:xmpp:alt-connections:httppoll",
        "urn:xmpp:alt-connections:xbosh"
      ].includes(link.attrs.rel)
    ).map(({ attrs }) => ({
      rel: attrs.rel,
      href: attrs.href,
      method: attrs.rel.split(":").pop(),
      uri: attrs.href
    })).toSorted(compare);
  }).catch(() => {
    return [];
  });
}

// node_modules/@xmpp/resolve/resolve.js
function resolve3(...args) {
  return Promise.all([
    resolve ? resolve(...args) : Promise.resolve([]),
    resolve2(...args)
  ]).then(([records2, endpoints]) => [...records2, ...endpoints]);
}

// node_modules/@xmpp/resolve/index.js
function fetchURIs(domain) {
  return __async(this, null, function* () {
    const result = yield resolve3(domain, {
      srv: [
        {
          service: "xmpps-client",
          protocol: "tcp"
        },
        {
          service: "xmpp-client",
          protocol: "tcp"
        }
      ]
    });
    return [
      // Remove duplicates
      ...new Set(result.map((record) => record.uri))
    ];
  });
}
function filterSupportedURIs(entity, uris) {
  return uris.filter((uri) => entity._findTransport(uri));
}
function fallbackConnect(entity, uris) {
  return __async(this, null, function* () {
    if (uris.length === 0) {
      throw new Error("Couldn't connect");
    }
    const uri = uris.shift();
    const Transport = entity._findTransport(uri);
    if (!Transport) {
      return fallbackConnect(entity, uris);
    }
    entity._status("connecting", uri);
    const params = Transport.prototype.socketParameters(uri);
    const socket = new Transport.prototype.Socket();
    try {
      socket.connect(params);
      yield promise(socket, "connect");
    } catch (e) {
      return fallbackConnect(entity, uris);
    }
    entity._attachSocket(socket);
    socket.emit("connect");
    entity.Transport = Transport;
    entity.Socket = Transport.prototype.Socket;
    entity.Parser = Transport.prototype.Parser;
  });
}
function resolve4({ entity }) {
  const _connect = entity.connect;
  entity.connect = function connect(service) {
    return __async(this, null, function* () {
      if (!service || /:\/\//.test(service)) {
        return _connect.call(this, service);
      }
      const uris = filterSupportedURIs(entity, yield fetchURIs(service));
      if (uris.length === 0) {
        throw new Error("No compatible transport found.");
      }
      try {
        yield fallbackConnect(entity, uris);
      } catch (err) {
        yield entity.disconnect();
        entity._status("disconnect");
        throw err;
      }
    });
  };
}

// node_modules/@xmpp/starttls/starttls.js
var import_node_tls2 = __toESM(require("tls"), 1);
var import_node_net2 = __toESM(require("net"), 1);
function canUpgrade(socket) {
  return socket instanceof import_node_net2.default.Socket && !(socket instanceof import_node_tls2.default.TLSSocket);
}
function upgrade(_0) {
  return __async(this, arguments, function* (socket, options = {}) {
    const tlsSocket = new Socket_default();
    tlsSocket.connect(__spreadValues({ socket }, options));
    yield promise(tlsSocket, "connect");
    return tlsSocket;
  });
}

// node_modules/@xmpp/starttls/index.js
var NS = "urn:ietf:params:xml:ns:xmpp-tls";
function negotiate(entity) {
  return __async(this, null, function* () {
    const element = yield entity.sendReceive(xml("starttls", { xmlns: NS }));
    if (element.is("proceed", NS)) {
      return element;
    }
    throw new Error("STARTTLS_FAILURE");
  });
}
function starttls({ streamFeatures: streamFeatures2 }) {
  return streamFeatures2.use("starttls", NS, (_0, _1) => __async(null, [_0, _1], function* ({ entity }, next) {
    const { socket, options } = entity;
    if (!canUpgrade(socket)) {
      return next();
    }
    yield negotiate(entity);
    const tlsSocket = yield upgrade(socket, { host: options.domain });
    entity._attachSocket(tlsSocket);
    yield entity.restart();
  }));
}

// node_modules/@xmpp/base64/index.js
function encode(string) {
  return globalThis.btoa(string);
}
function decode(string) {
  return globalThis.atob(string);
}

// node_modules/@xmpp/sasl/lib/SASLError.js
var SASLError = class extends error_default {
  constructor(...args) {
    super(...args);
    this.name = "SASLError";
  }
};
var SASLError_default = SASLError;

// node_modules/@xmpp/sasl/index.js
var NS2 = "urn:ietf:params:xml:ns:xmpp-sasl";
function getAvailableMechanisms(element, NS8, saslFactory) {
  const offered = new Set(
    element.getChildren("mechanism", NS8).map((m) => m.text())
  );
  const supported = saslFactory._mechs.map(({ name }) => name);
  return supported.filter((mech4) => offered.has(mech4));
}
function authenticate(_0) {
  return __async(this, arguments, function* ({ saslFactory, entity, mechanism, credentials }) {
    const mech4 = saslFactory.create([mechanism]);
    if (!mech4) {
      throw new Error(`SASL: Mechanism ${mechanism} not found.`);
    }
    const { domain } = entity.options;
    const creds = __spreadValues({
      username: null,
      password: null,
      server: domain,
      host: domain,
      realm: domain,
      serviceType: "xmpp",
      serviceName: domain
    }, credentials);
    yield procedure(
      entity,
      mech4.clientFirst && xml(
        "auth",
        { xmlns: NS2, mechanism: mech4.name },
        encode(yield mech4.response(creds))
      ),
      (element, done) => __async(null, null, function* () {
        if (element.getNS() !== NS2) return;
        if (element.name === "challenge") {
          yield mech4.challenge(decode(element.text()));
          const resp = yield mech4.response(creds);
          yield entity.send(
            xml(
              "response",
              { xmlns: NS2, mechanism: mech4.name },
              typeof resp === "string" ? encode(resp) : ""
            )
          );
          return;
        }
        if (element.name === "failure") {
          throw SASLError_default.fromElement(element);
        }
        if (element.name === "success") {
          return done();
        }
      })
    );
  });
}
function sasl({ streamFeatures: streamFeatures2, saslFactory }, onAuthenticate) {
  streamFeatures2.use("mechanisms", NS2, (_0, _1, _2) => __async(null, [_0, _1, _2], function* ({ entity }, _next, element) {
    const mechanisms = getAvailableMechanisms(element, NS2, saslFactory);
    if (mechanisms.length === 0) {
      throw new SASLError_default("SASL: No compatible mechanism available.");
    }
    function done(credentials, mechanism) {
      return __async(this, null, function* () {
        yield authenticate({
          saslFactory,
          entity,
          mechanism,
          credentials
        });
      });
    }
    yield onAuthenticate(done, mechanisms, null, entity);
    yield entity.restart();
  }));
}

// node_modules/@xmpp/sasl2/index.js
var NS3 = "urn:xmpp:sasl:2";
function authenticate2(_0) {
  return __async(this, arguments, function* ({
    saslFactory,
    entity,
    mechanism,
    credentials,
    userAgent,
    streamFeatures: streamFeatures2,
    features
  }) {
    const mech4 = saslFactory.create([mechanism]);
    if (!mech4) {
      throw new Error(`SASL: Mechanism ${mechanism} not found.`);
    }
    const { domain } = entity.options;
    const creds = __spreadValues({
      username: null,
      password: null,
      server: domain,
      host: domain,
      realm: domain,
      serviceType: "xmpp",
      serviceName: domain
    }, credentials);
    yield procedure(
      entity,
      xml("authenticate", { xmlns: NS3, mechanism: mech4.name }, [
        mech4.clientFirst && xml("initial-response", {}, encode(yield mech4.response(creds))),
        userAgent,
        ...streamFeatures2
      ]),
      (element, done) => __async(null, null, function* () {
        var _a, _b;
        if (element.getNS() !== NS3) return;
        if (element.name === "challenge") {
          yield mech4.challenge(decode(element.text()));
          const resp = yield mech4.response(creds);
          yield entity.send(
            xml(
              "response",
              { xmlns: NS3, mechanism: mech4.name },
              typeof resp === "string" ? encode(resp) : ""
            )
          );
          return;
        }
        if (element.name === "failure") {
          throw SASLError_default.fromElement(element);
        }
        if (element.name === "continue") {
          throw new Error("SASL continue is not supported yet");
        }
        if (element.name === "success") {
          const additionalData = (_a = element.getChild("additional-data")) == null ? void 0 : _a.text();
          if (additionalData && mech4.final) {
            yield mech4.final(decode(additionalData));
          }
          const aid = element.getChildText("authorization-identifier");
          if (aid) {
            entity._jid(aid);
          }
          for (const child2 of element.getChildElements()) {
            const feature = features.get(child2.getNS());
            (_b = feature == null ? void 0 : feature[1]) == null ? void 0 : _b.call(feature, child2);
          }
          return done();
        }
      })
    );
  });
}
function sasl2({ streamFeatures: streamFeatures2, saslFactory }, onAuthenticate) {
  const features = /* @__PURE__ */ new Map();
  let fast2;
  streamFeatures2.use(
    "authentication",
    NS3,
    (_0, _1, _2) => __async(null, [_0, _1, _2], function* ({ entity }, _next, element) {
      const mechanisms = getAvailableMechanisms(element, NS3, saslFactory);
      const streamFeatures3 = yield getStreamFeatures({ element, features });
      const fast_available = !!(fast2 == null ? void 0 : fast2.mechanism);
      if (mechanisms.length === 0 && !fast_available) {
        throw new SASLError_default("SASL: No compatible mechanism available.");
      }
      yield onAuthenticate(
        done,
        mechanisms,
        fast_available ? fast2 : null,
        entity
      );
      function done(credentials, mechanism, userAgent) {
        return __async(this, null, function* () {
          const success = yield fast2.auth({
            authenticate: authenticate2,
            entity,
            userAgent,
            streamFeatures: streamFeatures3,
            features,
            credentials
          });
          if (success) return;
          yield authenticate2({
            entity,
            userAgent,
            streamFeatures: streamFeatures3,
            features,
            saslFactory,
            mechanism,
            credentials
          });
        });
      }
    })
  );
  return {
    use(ns, req, res) {
      features.set(ns, [req, res]);
    },
    setup({ fast: _fast }) {
      fast2 = _fast;
    }
  };
}
function getStreamFeatures(_0) {
  return __async(this, arguments, function* ({ element, features }) {
    const promises = [];
    const inline = element.getChild("inline");
    if (!inline) return promises;
    for (const element2 of inline.getChildElements()) {
      const xmlns = element2.getNS();
      const feature = features.get(xmlns);
      if (!feature) continue;
      promises.push(feature[0](element2));
    }
    return Promise.all(promises);
  });
}

// node_modules/@xmpp/resource-binding/index.js
var NS4 = "urn:ietf:params:xml:ns:xmpp-bind";
function makeBindElement(resource) {
  return xml("bind", { xmlns: NS4 }, resource && xml("resource", {}, resource));
}
function bind(entity, iqCaller2, resource) {
  return __async(this, null, function* () {
    const result = yield iqCaller2.set(makeBindElement(resource));
    const jid2 = result.getChildText("jid");
    entity._jid(jid2);
    entity._ready(false);
    return jid2;
  });
}
function route2({ iqCaller: iqCaller2 }, resource) {
  return (_0, _1) => __async(null, [_0, _1], function* ({ entity }, next) {
    resource = typeof resource === "function" ? yield resource() : resource;
    yield bind(entity, iqCaller2, resource);
    next();
  });
}
function resourceBinding({ streamFeatures: streamFeatures2, iqCaller: iqCaller2 }, resource) {
  streamFeatures2.use("bind", NS4, route2({ iqCaller: iqCaller2 }, resource));
}

// node_modules/@xmpp/time/index.js
function datetime(d = /* @__PURE__ */ new Date()) {
  if (typeof d === "string") {
    d = new Date(d);
  }
  return new Date(d).toISOString().split(".")[0] + "Z";
}

// node_modules/@xmpp/stream-management/bind2.js
function setupBind2({ bind2: bind22, sm, failed, enabled }) {
  bind22.use(
    NS5,
    // https://xmpp.org/extensions/xep-0198.html#inline-examples
    (_element) => {
      return makeEnableElement({ sm });
    },
    (element) => __async(null, null, function* () {
      if (element.is("enabled")) {
        enabled(element.attrs);
      } else if (element.is("failed")) {
        failed();
      }
    })
  );
}

// node_modules/@xmpp/stream-management/sasl2.js
function setupSasl2({ sasl2: sasl22, sm, failed, resumed }) {
  sasl22.use(
    NS5,
    (element) => {
      if (!element.is("sm")) return;
      if (sm.id) return makeResumeElement({ sm });
    },
    (element) => {
      if (element.is("resumed")) {
        resumed(element);
      } else if (element.is("failed")) {
        failed();
      }
    }
  );
}

// node_modules/@xmpp/stream-management/stream-feature.js
function setupStreamFeature({
  streamFeatures: streamFeatures2,
  sm,
  entity,
  resumed,
  failed,
  enabled
}) {
  streamFeatures2.use("sm", NS5, (context, next) => __async(null, null, function* () {
    if (sm.id) {
      try {
        const element = yield resume(entity, sm);
        yield resumed(element);
        return;
      } catch (e) {
        failed();
      }
    }
    yield next();
    const promiseEnable = enable(entity, sm);
    if (sm.outbound_q.length > 0) {
      throw new Error(
        "Stream Management assertion failure, queue should be empty after enable"
      );
    }
    sm.outbound = 0;
    try {
      const response2 = yield promiseEnable;
      enabled(response2.attrs);
    } catch (e) {
      sm.enabled = false;
      sm.enableSent = false;
    }
  }));
}
function enable(entity, sm) {
  return procedure(entity, makeEnableElement({ sm }), (element, done) => {
    if (element.is("enabled", NS5)) {
      return done(element);
    } else if (element.is("failed", NS5)) {
      throw error_default.fromElement(element);
    }
  });
}
function resume(entity, sm) {
  return __async(this, null, function* () {
    return procedure(entity, makeResumeElement({ sm }), (element, done) => {
      if (element.is("resumed", NS5)) {
        return done(element);
      } else if (element.is("failed", NS5)) {
        throw error_default.fromElement(element);
      }
    });
  });
}

// node_modules/@xmpp/stream-management/index.js
var NS5 = "urn:xmpp:sm:3";
function makeEnableElement({ sm }) {
  return xml("enable", {
    xmlns: NS5,
    max: sm.preferredMaximum,
    resume: "true"
  });
}
function makeResumeElement({ sm }) {
  return xml("resume", { xmlns: NS5, h: sm.inbound, previd: sm.id });
}
function streamManagement({
  streamFeatures: streamFeatures2,
  entity,
  middleware: middleware2,
  bind2: bind22,
  sasl2: sasl22
}) {
  let timeoutTimeout = null;
  let requestAckTimeout = null;
  let requestAckDebounce = null;
  const sm = new import_events.EventEmitter();
  Object.assign(sm, {
    preferredMaximum: null,
    enabled: false,
    enableSent: false,
    id: "",
    outbound_q: [],
    outbound: 0,
    inbound: 0,
    max: null,
    timeout: 6e4,
    requestAckInterval: 3e4,
    requestAckDebounce: 250
  });
  function sendAck() {
    return __async(this, null, function* () {
      try {
        yield entity.send(xml("a", { xmlns: NS5, h: sm.inbound }));
      } catch (e) {
      }
    });
  }
  entity.on("disconnect", () => {
    clearTimeout(timeoutTimeout);
    clearTimeout(requestAckTimeout);
    clearTimeout(requestAckDebounce);
    sm.enabled = false;
    sm.enableSent = false;
  });
  entity.hook("close", () => __async(null, null, function* () {
    if (!sm.enabled) return;
    yield sendAck();
  }));
  function resumed(resumed2) {
    return __async(this, null, function* () {
      sm.enabled = true;
      ackQueue(+resumed2.attrs.h);
      let q = sm.outbound_q;
      sm.outbound_q = [];
      yield entity.sendMany(q.map((item) => queueToStanza({ entity, item })));
      sm.emit("resumed");
      entity._ready(true);
      scheduleRequestAck();
    });
  }
  function failed() {
    sm.enabled = false;
    sm.enableSent = false;
    sm.id = "";
    failQueue();
  }
  function ackQueue(n) {
    const oldOutbound = sm.outbound;
    for (let i = 0; i < +n - oldOutbound; i++) {
      const item = sm.outbound_q.shift();
      sm.outbound++;
      sm.emit("ack", item.stanza);
    }
  }
  function failQueue() {
    let item;
    while (item = sm.outbound_q.shift()) {
      sm.emit("fail", item.stanza);
    }
    sm.outbound = 0;
  }
  function enabled({ id: id2, max }) {
    sm.enabled = true;
    sm.id = id2;
    sm.max = max;
    sm.inbound = 0;
    scheduleRequestAck();
  }
  entity.on("offline", () => {
    failQueue();
    sm.inbound = 0;
    sm.enabled = false;
    sm.enableSent = false;
    sm.id = "";
  });
  middleware2.use((context, next) => __async(null, null, function* () {
    const { stanza } = context;
    clearTimeout(timeoutTimeout);
    timeoutTimeout = null;
    if (["presence", "message", "iq"].includes(stanza.name)) {
      sm.inbound += 1;
    } else if (stanza.is("r", NS5)) {
      yield sendAck();
    } else if (stanza.is("a", NS5)) {
      ackQueue(+stanza.attrs.h);
    }
    scheduleRequestAck();
    return next();
  }));
  if (bind22) {
    setupBind2({ bind2: bind22, sm, failed, enabled });
  }
  if (sasl22) {
    setupSasl2({ sasl2: sasl22, sm, failed, resumed });
  }
  function scheduleRequestAck(timeout2 = sm.requestAckInterval) {
    clearTimeout(requestAckTimeout);
    if (!sm.enabled) return;
    if (!timeout2) return;
    requestAckTimeout = setTimeout(requestAck, timeout2);
  }
  function requestAck() {
    clearTimeout(requestAckTimeout);
    clearTimeout(requestAckDebounce);
    if (!sm.enabled) return;
    if (sm.timeout && !timeoutTimeout) {
      timeoutTimeout = setTimeout(() => {
        clearTimeout(requestAckTimeout);
        entity.disconnect().catch(() => {
        });
      }, sm.timeout);
    }
    entity.send(xml("r", { xmlns: NS5 })).catch(() => {
    });
    scheduleRequestAck();
  }
  middleware2.filter((context, next) => {
    const { stanza } = context;
    if (stanza.is("enable", NS5)) {
      sm.enableSent = true;
    }
    if (!sm.enabled && !sm.enableSent) return next();
    if (!["presence", "message", "iq"].includes(stanza.name)) return next();
    sm.outbound_q.push({ stanza, stamp: datetime() });
    clearTimeout(requestAckTimeout);
    clearTimeout(requestAckDebounce);
    requestAckDebounce = setTimeout(requestAck, sm.requestAckDebounce);
    return next();
  });
  if (streamFeatures2) {
    setupStreamFeature({
      streamFeatures: streamFeatures2,
      sm,
      entity,
      resumed,
      failed,
      enabled
    });
  }
  return sm;
}
function queueToStanza({ entity, item }) {
  const { stanza, stamp } = item;
  if (stanza.name === "message" && !stanza.getChild("delay", "urn:xmpp:delay")) {
    stanza.append(
      xml("delay", {
        xmlns: "urn:xmpp:delay",
        from: entity.jid.toString(),
        stamp
      })
    );
  }
  return stanza;
}

// node_modules/@xmpp/client-core/src/bind2/bind2.js
var NS6 = "urn:xmpp:bind:0";
function bind2({ sasl2: sasl22, entity }, tag) {
  const features = /* @__PURE__ */ new Map();
  sasl22.use(
    NS6,
    (element) => __async(null, null, function* () {
      if (!element.is("bind", NS6)) return;
      tag = typeof tag === "function" ? yield tag() : tag;
      const sessionFeatures = yield getSessionFeatures({ element, features });
      return xml(
        "bind",
        { xmlns: "urn:xmpp:bind:0" },
        tag && xml("tag", null, tag),
        ...sessionFeatures
      );
    }),
    (element) => {
      var _a;
      if (!element.is("bound")) return;
      entity._ready(false);
      for (const child2 of element.getChildElements()) {
        const feature = features.get(child2.getNS());
        (_a = feature == null ? void 0 : feature[1]) == null ? void 0 : _a.call(feature, child2);
      }
    }
  );
  return {
    use(ns, req, res) {
      features.set(ns, [req, res]);
    }
  };
}
function getSessionFeatures({ element, features }) {
  const promises = [];
  const inline = element.getChild("inline");
  if (!inline) return promises;
  for (const element2 of inline.getChildElements()) {
    const xmlns = element2.attrs.var;
    const feature = features.get(xmlns);
    if (!feature) continue;
    promises.push(feature[0](element2));
  }
  return Promise.all(promises);
}

// node_modules/@xmpp/client-core/src/fast/fast.js
var import_saslmechanisms = __toESM(require_main(), 1);
var NS7 = "urn:xmpp:fast:0";
function fast({ sasl2: sasl22, entity }) {
  const saslFactory = new import_saslmechanisms.default();
  let token;
  const fast2 = new import_events.EventEmitter();
  Object.assign(fast2, {
    mechanism: null,
    mechanisms: [],
    saveToken(t) {
      return __async(this, null, function* () {
        token = t;
      });
    },
    fetchToken() {
      return __async(this, null, function* () {
        return token;
      });
    },
    deleteToken() {
      return __async(this, null, function* () {
        token = null;
      });
    },
    save(token2) {
      return __async(this, null, function* () {
        try {
          yield this.saveToken(token2);
        } catch (err) {
          entity.emit("error", err);
        }
      });
    },
    fetch() {
      return __async(this, null, function* () {
        try {
          return this.fetchToken();
        } catch (err) {
          entity.emit("error", err);
        }
      });
    },
    delete() {
      return __async(this, null, function* () {
        try {
          yield this.deleteToken();
        } catch (err) {
          entity.emit("error", err);
        }
      });
    },
    saslFactory,
    auth(_0) {
      return __async(this, arguments, function* ({
        authenticate: authenticate3,
        entity: entity2,
        userAgent,
        credentials,
        streamFeatures: streamFeatures2,
        features
      }) {
        if (!fast2.mechanism) {
          return false;
        }
        const { token: token2 } = credentials;
        if (!isTokenValid(token2, fast2.mechanisms)) {
          return onInvalidToken();
        }
        try {
          yield authenticate3({
            saslFactory: fast2.saslFactory,
            mechanism: token2.mechanism,
            credentials: __spreadProps(__spreadValues({}, credentials), {
              password: token2.token
            }),
            streamFeatures: [
              ...streamFeatures2,
              xml("fast", {
                xmlns: NS7
              })
            ],
            entity: entity2,
            userAgent,
            features
          });
          return true;
        } catch (err) {
          if (err instanceof SASLError_default && ["not-authorized", "credentials-expired"].includes(err.condition)) {
            return onInvalidToken();
          }
          entity2.emit("error", err);
          return false;
        }
        function onInvalidToken() {
          return __async(this, null, function* () {
            yield fast2.delete();
            requestToken(streamFeatures2);
            return false;
          });
        }
      });
    }
  });
  function requestToken(streamFeatures2) {
    streamFeatures2.push(
      xml("request-token", {
        xmlns: NS7,
        mechanism: fast2.mechanism
      })
    );
  }
  function reset() {
    fast2.mechanism = null;
    fast2.mechanisms = [];
  }
  reset();
  sasl22.use(
    NS7,
    (element) => __async(null, null, function* () {
      if (!element.is("fast", NS7)) return reset();
      fast2.available = true;
      const mechanisms = getAvailableMechanisms(element, NS7, saslFactory);
      const mechanism = mechanisms[0];
      if (!mechanism) return reset();
      fast2.mechanisms = mechanisms;
      fast2.mechanism = mechanism;
    }),
    (element) => __async(null, null, function* () {
      if (element.is("token", NS7)) {
        yield fast2.save({
          // The token is bound by the mechanism
          // > Servers MUST bind tokens to the mechanism selected by the client in its original request, and reject attempts to use them with other mechanisms.
          mechanism: fast2.mechanism,
          token: element.attrs.token,
          expiry: element.attrs.expiry
        });
      }
    })
  );
  return fast2;
}
function isTokenValid(token, mechanisms) {
  if (!token) return false;
  if (!mechanisms.includes(token.mechanism)) {
    return false;
  }
  if (new Date(token.expiry) <= /* @__PURE__ */ new Date()) {
    return false;
  }
  return true;
}

// node_modules/@xmpp/client/index.js
var import_saslmechanisms2 = __toESM(require_main(), 1);

// node_modules/@xmpp/sasl-scram-sha-1/index.js
var import_sasl_scram_sha_1 = __toESM(require_sasl_scram_sha_1(), 1);
function saslScramSha1(sasl3) {
  sasl3.use(import_sasl_scram_sha_1.default);
}

// node_modules/@xmpp/sasl-plain/index.js
var import_sasl_plain = __toESM(require_main2(), 1);
function saslPlain(sasl3) {
  sasl3.use(import_sasl_plain.default);
}

// node_modules/@xmpp/sasl-anonymous/index.js
var import_sasl_anonymous = __toESM(require_main3(), 1);
function saslAnonymous(sasl3) {
  sasl3.use(import_sasl_anonymous.default);
}

// node_modules/@xmpp/sasl-ht-sha-256-none/index.js
function Mechanism() {
}
Mechanism.prototype.Mechanism = Mechanism;
Mechanism.prototype.name = "HT-SHA-256-NONE";
Mechanism.prototype.clientFirst = true;
Mechanism.prototype.response = function response(_0) {
  return __async(this, arguments, function* ({ username, password }) {
    this.key = yield crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(password),
      // https://developer.mozilla.org/en-US/docs/Web/API/HmacImportParams
      { name: "HMAC", hash: "SHA-256" },
      false,
      // extractable
      ["sign", "verify"]
    );
    const signature = yield crypto.subtle.sign(
      "HMAC",
      this.key,
      new TextEncoder().encode("Initiator")
    );
    return `${username}\0${String.fromCodePoint(...new Uint8Array(signature))}`;
  });
};
Mechanism.prototype.final = function final(data) {
  return __async(this, null, function* () {
    const signature = Uint8Array.from(data, (c) => c.codePointAt(0));
    const result = yield crypto.subtle.verify(
      "HMAC",
      this.key,
      signature,
      new TextEncoder().encode("Responder")
    );
    if (result !== true) {
      throw new Error("Responder message from server was wrong");
    }
  });
};
function saslHashedToken(sasl3) {
  sasl3.use(Mechanism);
}

// node_modules/@xmpp/client/lib/createOnAuthenticate.js
var ANONYMOUS = "ANONYMOUS";
var PLAIN = "PLAIN";
function createOnAuthenticate(credentials, userAgent) {
  return function onAuthenticate(...args) {
    return __async(this, null, function* () {
      var _a;
      if (typeof credentials === "function") {
        yield credentials(...args);
        return;
      }
      const [authenticate3, mechanisms, fast2, entity] = args;
      (_a = credentials.token) != null ? _a : credentials.token = yield fast2 == null ? void 0 : fast2.fetch();
      const mechanism = getMechanism({ mechanisms, entity, credentials });
      yield authenticate3(credentials, mechanism, userAgent);
    });
  };
}
function getMechanism({ mechanisms, entity, credentials }) {
  if (!(credentials == null ? void 0 : credentials.username) && !(credentials == null ? void 0 : credentials.password) && !(credentials == null ? void 0 : credentials.token) && mechanisms.includes(ANONYMOUS)) {
    return ANONYMOUS;
  }
  if (entity.isSecure()) return mechanisms[0];
  return mechanisms.find((mechanism) => mechanism !== PLAIN);
}

// node_modules/@xmpp/client/lib/getDomain.js
function getDomain(service) {
  const domain = service.split("://")[1] || service;
  return domain.split(":")[0].split("/")[0];
}

// node_modules/@xmpp/client/index.js
function client(options = {}) {
  let _a = options, { resource, credentials, username, password, userAgent } = _a, params = __objRest(_a, ["resource", "credentials", "username", "password", "userAgent"]);
  const { domain, service } = params;
  if (!domain && service) {
    params.domain = getDomain(service);
  }
  const entity = new Client_default(params);
  if (username && params.domain) {
    entity.jid = jid_default(username, params.domain);
  }
  const reconnect2 = reconnect({ entity });
  const websocket2 = websocket({ entity });
  const tcp2 = setupIfAvailable(tcp, { entity });
  const tls4 = setupIfAvailable(tls2, { entity });
  const middleware2 = middleware({ entity });
  const streamFeatures2 = streamFeatures({ middleware: middleware2 });
  const iqCaller2 = iqCaller({ middleware: middleware2, entity });
  const iqCallee2 = iqCallee({ middleware: middleware2, entity });
  const resolve5 = resolve4({ entity });
  const saslFactory = new import_saslmechanisms2.default();
  const mechanisms = Object.entries(__spreadProps(__spreadValues({}, typeof saslScramSha1 === "function" && { scramsha1: saslScramSha1 }), {
    plain: saslPlain,
    anonymous: saslAnonymous
  })).map(([k, v]) => ({ [k]: v(saslFactory) }));
  userAgent != null ? userAgent : userAgent = xml("user-agent", { id: globalThis.crypto.randomUUID() });
  const starttls2 = setupIfAvailable(starttls, { streamFeatures: streamFeatures2 });
  const sasl22 = sasl2(
    { streamFeatures: streamFeatures2, saslFactory },
    createOnAuthenticate(credentials != null ? credentials : { username, password }, userAgent)
  );
  const fast2 = fast({
    sasl2: sasl22,
    entity
  });
  sasl22.setup({ fast: fast2 });
  const bind22 = bind2({ sasl2: sasl22, entity }, resource);
  saslHashedToken(fast2.saslFactory);
  const sasl3 = sasl(
    { streamFeatures: streamFeatures2, saslFactory },
    createOnAuthenticate(credentials != null ? credentials : { username, password }, userAgent)
  );
  const streamManagement2 = streamManagement({
    streamFeatures: streamFeatures2,
    entity,
    middleware: middleware2,
    bind2: bind22,
    sasl2: sasl22
  });
  const resourceBinding2 = resourceBinding(
    { iqCaller: iqCaller2, streamFeatures: streamFeatures2 },
    resource
  );
  iqCallee2 == null ? void 0 : iqCallee2.get("urn:xmpp:ping", "ping", () => {
    return {};
  });
  return Object.assign(entity, {
    entity,
    reconnect: reconnect2,
    tcp: tcp2,
    websocket: websocket2,
    tls: tls4,
    middleware: middleware2,
    streamFeatures: streamFeatures2,
    iqCaller: iqCaller2,
    iqCallee: iqCallee2,
    resolve: resolve5,
    starttls: starttls2,
    saslFactory,
    sasl2: sasl22,
    sasl: sasl3,
    resourceBinding: resourceBinding2,
    streamManagement: streamManagement2,
    mechanisms,
    bind2: bind22,
    fast: fast2
  });
}
function setupIfAvailable(module2, ...args) {
  if (typeof module2 !== "function") {
    return void 0;
  }
  return module2(...args);
}

// src/bootstrap.ts
var shapefile = __toESM(require("shapefile"));
var xml2js = __toESM(require("xml2js"));
var jobs = __toESM(require("croner"));
var polygonClipping = __toESM(require("polygon-clipping"));
var import_better_sqlite3 = __toESM(require("better-sqlite3"));
var import_axios = __toESM(require("axios"));
var import_crypto = __toESM(require("crypto"));
var import_os = __toESM(require("os"));
var import_say = __toESM(require("say"));
var import_child_process = __toESM(require("child_process"));
var import_jszip = __toESM(require("jszip"));

// src/@dictionaries/events.ts
var events = {
  "AF": "Ashfall",
  "AS": "Air Stagnation",
  "BH": "Beach Hazard",
  "BW": "Brisk Wind",
  "BZ": "Blizzard",
  "CF": "Coastal Flood",
  "DF": "Debris Flow",
  "DS": "Dust Storm",
  "EC": "Extreme Cold",
  "EH": "Excessive Heat",
  "XH": "Extreme Heat",
  "EW": "Extreme Wind",
  "FA": "Areal Flood",
  "FF": "Flash Flood",
  "FG": "Dense Fog",
  "FL": "Flood",
  "FR": "Frost",
  "FW": "Fire Weather",
  "FZ": "Freeze",
  "GL": "Gale",
  "HF": "Hurricane Force Wind",
  "HT": "Heat",
  "HU": "Hurricane",
  "HW": "High Wind",
  "HY": "Hydrologic",
  "HZ": "Hard Freeze",
  "IS": "Ice Storm",
  "LE": "Lake Effect Snow",
  "LO": "Low Water",
  "LS": "Lakeshore Flood",
  "LW": "Lake Wind",
  "MA": "Special Marine",
  "EQ": "Earthquake",
  "MF": "Dense Fog",
  "MH": "Ashfall",
  "MS": "Dense Smoke",
  "RB": "Small Craft for Rough Bar",
  "RP": "Rip Current Risk",
  "SC": "Small Craft",
  "SE": "Hazardous Seas",
  "SI": "Small Craft for Winds",
  "SM": "Dense Smoke",
  "SQ": "Snow Squall",
  "SR": "Storm",
  "SS": "Storm Surge",
  "SU": "High Surf",
  "SV": "Severe Thunderstorm",
  "SW": "Small Craft for Hazardous Seas",
  "TO": "Tornado",
  "TR": "Tropical Storm",
  "TS": "Tsunami",
  "TY": "Typhoon",
  "SP": "Special Weather",
  "UP": "Heavy Freezing Spray",
  "WC": "Wind Chill",
  "WI": "Wind",
  "WS": "Winter Storm",
  "WW": "Winter Weather",
  "ZF": "Freezing Fog",
  "ZR": "Freezing Rain",
  "ZY": "Freezing Spray"
};
var offshore = {
  "Special Weather Statement": "Special Weather Statement",
  "Hurricane Warning": "Hurricane Warning",
  "Hurricane Force Wind Warning": "Hurricane Force Wind Warning",
  "Hurricane Watch": "Hurricane Watch",
  "Tropical Storm Warning": "Tropical Storm Warning",
  "Tropical Storm Watch": "Tropical Storm Watch",
  "High Wind Warning": "High Wind Warning",
  "Gale Warning": "Gale Warning",
  "Small Craft Advisory": "Small Craft Advisory",
  "Small Craft Warning": "Small Craft Warning"
};
var actions = {
  "W": "Warning",
  "F": "Forecast",
  "A": "Watch",
  "O": "Outlook",
  "Y": "Advisory",
  "N": "Synopsis",
  "S": "Statement"
};
var status = {
  "NEW": "Issued",
  "CON": "Updated",
  "EXT": "Extended",
  "EXA": "Extended",
  "EXB": "Extended",
  "UPG": "Upgraded",
  "COR": "Correction",
  "ROU": "Routine",
  "CAN": "Cancelled",
  "EXP": "Expired"
};
var types = {
  "O": "Operational Product",
  "T": "Test Product",
  "E": "Experimental Product",
  "X": "Experimental Product (Non-Operational)"
};
var status_correlations = [
  { type: "Update", forward: "Updated", cancel: false, update: true, new: false },
  { type: "Cancel", forward: "Cancelled", cancel: true, update: false, new: false },
  { type: "Alert", forward: "Issued", cancel: false, update: false, new: true },
  { type: "Updated", forward: "Updated", cancel: false, update: true, new: false },
  { type: "Expired", forward: "Expired", cancel: true, update: false, new: false },
  { type: "Issued", forward: "Issued", cancel: false, update: false, new: true },
  { type: "Extended", forward: "Updated", cancel: false, update: true, new: false },
  { type: "Correction", forward: "Updated", cancel: false, update: true, new: false },
  { type: "Upgraded", forward: "Upgraded", cancel: false, update: true, new: false },
  { type: "Cancelled", forward: "Cancelled", cancel: true, update: false, new: false },
  { type: "Routine", forward: "Routine", cancel: false, update: true, new: false }
];
var causes = {
  "SM": "Snow Melt",
  "RS": "Rain/Snow Melt",
  "ER": "Excessive Rain",
  "DM": "Dam/Levee Failure",
  "IJ": "Ice Jam",
  "GO": "Glacier Lake Outburst",
  "IC": "Ice",
  "FS": "Flash Flood / Storm Surge",
  "FT": "Tidal Effects",
  "ET": "Elevated Upstream Flow",
  "MC": "Other Multiple Causes",
  "WT": "Wind and/or Tidal Effects",
  "DR": "Reservoir Release",
  "UU": "Unknown",
  "OT": "Other Effects"
};
var records = {
  "NO": "No Record Expected",
  "NR": "Near Record or possible record",
  "UU": "Unknown history of records",
  "OO": "Other"
};
var severity = {
  N: "Not Expected",
  0: "Areal Flood or FF Product",
  1: "Minor",
  2: "Moderate",
  3: "Major",
  U: "Unknown"
};

// src/@dictionaries/awips.ts
var awips = {
  ABV: `rawinsonde-data-above-100-millibars`,
  ADA: `alarm-alert-administrative-message`,
  ADM: `alert-administrative-message`,
  ADR: `nws-administrative-message`,
  ADV: `space-environment-advisory`,
  AFD: `area-forecast-discussion`,
  AFM: `area-forecast-matrices`,
  AFP: `area-forecast-product`,
  AFW: `fire-weather-matrix`,
  AGF: `agricultural-forecast`,
  AGO: `agricultural-observations`,
  ALT: `space-environment-alert`,
  AQA: `air-quality-alert`,
  AQI: `air-quality-index-statement`,
  ASA: `air-stagnation-advisory`,
  AVA: `avalanche-watch`,
  AVG: `avalanche-weather-guidance`,
  AVW: `avalanche-warning`,
  AWO: `area-weather-outlook`,
  AWS: `area-weather-summary`,
  AWU: `area-weather-update`,
  AWW: `airport-weather-warning`,
  BLU: `blue-alert`,
  BOY: `buoy-report`,
  BRG: `coast-guard-observations`,
  BRT: `hourly-roundup-for-weather-radio`,
  CAE: `child-abduction-emergency`,
  CCF: `coded-city-forecast`,
  CDW: `civil-danger-warning`,
  CEM: `civil-emergency-message`,
  CF6: `monthly-daily-climate-data`,
  CFP: `convective-forecast-product`,
  CFW: `coastal-flood-warnings-watches-statements`,
  CGR: `coast-guard-surface-report`,
  CHG: `computer-hurricane-guidance`,
  CLA: `climatological-report-annual`,
  CLI: `climatological-report-daily`,
  CLM: `climatological-report-monthly`,
  CLQ: `climatological-report-quarterly`,
  CLS: `climatological-report-seasonal`,
  CLT: `climate-report`,
  CMM: `coded-climatological-monthly-means`,
  COD: `coded-analysis-and-forecasts`,
  CPF: `great-lakes-port-forecast`,
  CUR: `space-environment-products-routine`,
  CWA: `center-weather-advisory`,
  CWF: `coastal-waters-forecast`,
  CWS: `center-weather-statement`,
  DAY: `space-environment-product-daily`,
  DDO: `daily-dispersion-outlook`,
  DGT: `drought-information-statement`,
  DMO: `practice-demo-warning`,
  DSA: `unnumbered-depression-advisory`,
  DSM: `asos-daily-summary`,
  DSW: `dust-storm-warning`,
  EFP: `extended-forecast-3-to-5-day`,
  EOL: `six-to-ten-day-weather-outlook-local`,
  EQI: `tsunami-bulletin`,
  EQR: `earthquake-report`,
  EQW: `earthquake-warning`,
  ESF: `flood-potential-outlook`,
  ESG: `extended-streamflow-guidance`,
  ESP: `extended-streamflow-prediction`,
  ESS: `water-supply-outlook`,
  EVI: `evacuation-immediate`,
  EWW: `extreme-wind-warning`,
  FA0: `aviation-area-forecast-pacific`,
  FA1: `aviation-area-forecast-northeast`,
  FA2: `aviation-area-forecast-southeast`,
  FA3: `aviation-area-forecast-north-central`,
  FA4: `aviation-area-forecast-south-central`,
  FA5: `aviation-area-forecast-rocky-mountains`,
  FA6: `aviation-area-forecast-west-coast`,
  FA7: `aviation-area-forecast-juneau-ak`,
  FA8: `aviation-area-forecast-anchorage-ak`,
  FA9: `aviation-area-forecast-fairbanks-ak`,
  FD0: `winds-aloft-forecast-24hr-high-altitude`,
  FD1: `winds-aloft-forecast-6hr`,
  FD2: `winds-aloft-forecast-12hr`,
  FD3: `winds-aloft-forecast-24hr`,
  FD4: `winds-aloft-forecast`,
  FD5: `winds-aloft-forecast`,
  FD6: `winds-aloft-forecast`,
  FD7: `winds-aloft-forecast`,
  FD8: `winds-aloft-forecast-6hr-high-altitude`,
  FD9: `winds-aloft-forecast-12hr-high-altitude`,
  FDI: `fire-danger-indices`,
  FFA: `flash-flood-watch`,
  FFG: `flash-flood-guidance`,
  FFH: `headwater-guidance`,
  FFS: `flash-flood-statement`,
  FFW: `flash-flood-warning`,
  FLN: `national-flood-summary`,
  FLS: `flood-statement`,
  FLW: `flood-warning`,
  FOF: `upper-wind-fallout-forecast`,
  FRW: `fire-warning`,
  FSH: `marine-fisheries-service-message`,
  FTM: `radar-outage-notification`,
  FTP: `temp-pop-guidance`,
  FWA: `fire-weather-administrative-message`,
  FWD: `fire-weather-outlook-discussion`,
  FWF: `fire-weather-forecast`,
  FWL: `land-management-forecast`,
  FWM: `miscellaneous-fire-weather-product`,
  FWN: `fire-weather-notification`,
  FWO: `fire-weather-observation`,
  FWS: `fire-weather-spot-forecast`,
  FZL: `freezing-level-data`,
  GLF: `great-lakes-forecast`,
  GLS: `great-lakes-storm-summary`,
  GRE: `green`,
  HD1: `rfc-qpf-data-product`,
  HD2: `rfc-qpf-data-product`,
  HD3: `rfc-qpf-data-product`,
  HD4: `rfc-qpf-data-product`,
  HD7: `rfc-qpf-data-product`,
  HD8: `rfc-qpf-data-product`,
  HD9: `rfc-qpf-data-product`,
  HLS: `hurricane-local-statement`,
  HMD: `hydrometeorological-discussion`,
  HML: `ahps-xml-product`,
  HMW: `hazardous-materials-warning`,
  HP1: `rfc-qpf-verification-product`,
  HP2: `rfc-qpf-verification-product`,
  HP3: `rfc-qpf-verification-product`,
  HP4: `rfc-qpf-verification-product`,
  HP5: `rfc-qpf-verification-product`,
  HP6: `rfc-qpf-verification-product`,
  HP7: `rfc-qpf-verification-product`,
  HP8: `rfc-qpf-verification-product`,
  HRR: `weather-roundup`,
  HSF: `high-seas-forecast`,
  HWO: `hazardous-weather-outlook`,
  HWR: `hourly-weather-roundup`,
  HYD: `daily-hydrometeorological-products`,
  HYM: `monthly-hydrometeorological-product`,
  ICE: `ice-forecast`,
  IDM: `ice-drift-vectors`,
  INI: `administrative-message`,
  IOB: `ice-observation`,
  KPA: `keep-alive-message`,
  LAE: `local-area-emergency`,
  LCD: `preliminary-local-climatological-data`,
  LCO: `local-cooperative-observation`,
  LEW: `law-enforcement-warning`,
  LFP: `local-forecast`,
  LKE: `lake-stages`,
  LLS: `low-level-sounding`,
  LOW: `low-temperatures`,
  LSR: `local-storm-report`,
  LTG: `lightning-data`,
  MAN: `rawinsonde-mandatory-levels`,
  MAP: `mean-areal-precipitation`,
  MAW: `amended-marine-forecast`,
  MFM: `marine-forecast-matrix`,
  MIM: `marine-interpretation-message`,
  MIS: `miscellaneous-local-product`,
  MOB: `marine-observations`,
  MON: `space-environment-product-monthly`,
  MRP: `marine-product-techniques-development`,
  MSM: `asos-monthly-summary-message`,
  MTR: `metar-observation`,
  MTT: `metar-test-message`,
  MVF: `marine-verification-coded-message`,
  MWS: `marine-weather-statement`,
  MWW: `marine-weather-message`,
  NOU: `weather-reconnaissance-flights`,
  NOW: `short-term-forecast`,
  NOX: `data-management-message`,
  NPW: `non-precipitation-warning`,
  NSH: `nearshore-marine-forecast`,
  NUW: `nuclear-power-plant-warning`,
  NWR: `noaa-weather-radio-forecast`,
  OAV: `other-aviation-products`,
  OBS: `observations`,
  OFA: `offshore-aviation-forecast`,
  OFF: `offshore-forecast`,
  OMR: `other-marine-products`,
  OPU: `other-public-products`,
  OSO: `other-surface-observations`,
  OSW: `ocean-surface-winds`,
  OUA: `other-upper-air-data`,
  OZF: `zone-forecast`,
  PFM: `point-forecast-matrices`,
  PFW: `fire-weather-point-forecast-matrices`,
  PLS: `plain-language-ship-report`,
  PMD: `prognostic-meteorological-discussion`,
  PNS: `public-information-statement`,
  POE: `probability-of-exceedance`,
  PRB: `heat-index-forecast-tables`,
  PRC: `pilot-report-collective`,
  PRE: `preliminary-forecasts`,
  PSH: `post-storm-hurricane-report`,
  PTS: `probabilistic-outlook-points`,
  PWO: `public-severe-weather-outlook`,
  PWS: `tropical-cyclone-probabilities`,
  QPF: `quantitative-precipitation-forecast`,
  QPS: `quantitative-precipitation-statement`,
  RDF: `revised-digital-forecast`,
  REC: `recreational-report`,
  RER: `record-report`,
  RET: `eas-activation-request`,
  RFD: `rangeland-fire-danger-forecast`,
  RFI: `rfi-observation`,
  RFR: `route-forecast`,
  RFW: `red-flag-warning`,
  RHW: `radiological-hazard-warning`,
  RMT: `required-monthly-test`,
  RNS: `rain-information-statement`,
  RR1: `hydro-met-data-report-part-1`,
  RR2: `hydro-met-data-report-part-2`,
  RR3: `hydro-met-data-report-part-3`,
  RR4: `hydro-met-data-report-part-4`,
  RR5: `hydro-met-data-report-part-5`,
  RR6: `hydro-met-data-report-part-6`,
  RR7: `hydro-met-data-report-part-7`,
  RR8: `hydro-met-data-report-part-8`,
  RR9: `hydro-met-data-report-part-9`,
  RRA: `automated-hydrologic-observation-report`,
  RRM: `miscellaneous-hydrologic-data`,
  RRS: `hads-data`,
  RRY: `asos-hourly-test-message`,
  RSD: `daily-snotel-data`,
  RSM: `monthly-snotel-data`,
  RTP: `regional-temp-precip-table`,
  RVA: `river-summary`,
  RVD: `daily-river-forecast`,
  RVF: `river-forecast`,
  RVI: `river-ice-statement`,
  RVM: `miscellaneous-river-product`,
  RVR: `river-recreation-statement`,
  RVS: `river-statement`,
  RWR: `regional-weather-roundup`,
  RWS: `regional-weather-summary`,
  RWT: `required-weekly-test`,
  SAB: `special-avalanche-bulletin`,
  SAF: `agricultural-weather-forecast`,
  SAG: `snow-avalanche-guidance`,
  SAT: `apt-prediction`,
  SAW: `preliminary-notice-of-watch`,
  SCC: `storm-summary`,
  SCD: `supplementary-climatological-data`,
  SCN: `soil-climate-analysis-network`,
  SCP: `satellite-cloud-product`,
  SCS: `selected-cities-summary`,
  SDO: `supplementary-data-observation`,
  SDS: `special-dispersion-statement`,
  SEL: `severe-local-storm-watch`,
  SEV: `spc-watch-point-information`,
  SFP: `state-forecast`,
  SFT: `tabular-state-forecast`,
  SGL: `rawinsonde-significant-levels`,
  SHP: `surface-ship-report`,
  SIG: `international-sigmet`,
  SIM: `satellite-interpretation-message`,
  SLS: `severe-local-storm-outline`,
  SMF: `smoke-management-weather-forecast`,
  SMW: `special-marine-warning`,
  SOO: `science-operations-officer-product`,
  SPE: `satellite-precipitation-estimates`,
  SPF: `storm-strike-probability-bulletin`,
  SPS: `special-weather-statement`,
  SPW: `shelter-in-place-warning`,
  SQW: `snow-squall-warning`,
  SRD: `surf-discussion`,
  SRF: `surf-forecast`,
  SRG: `soaring-guidance`,
  SSM: `synoptic-surface-observation`,
  STA: `weather-statistical-summary`,
  STD: `satellite-tropical-disturbance-summary`,
  STO: `road-condition-report`,
  STP: `state-temp-precip-table`,
  STQ: `spot-forecast-request`,
  SUM: `space-weather-message`,
  SVR: `severe-thunderstorm-warning`,
  SVS: `severe-weather-statement`,
  SWOMCD: `mesoscale-discussion`,
  SWODY1: `day-1`,
  SWODY2: `day-2`,
  SWODY3: `day-3`,
  SWS: `state-weather-summary`,
  SYN: `regional-weather-synopsis`,
  TAF: `terminal-aerodrome-forecast`,
  TAP: `terminal-alerting-products`,
  TAV: `travelers-forecast-table`,
  TCA: `tropical-cyclone-advisory`,
  TCD: `tropical-cyclone-discussion`,
  TCE: `tropical-cyclone-position-estimate`,
  TCM: `tropical-cyclone-marine-aviation-advisory`,
  TCP: `public-tropical-cyclone-advisory`,
  TCS: `satellite-tropical-cyclone-summary`,
  TCU: `tropical-cyclone-update`,
  TCV: `tropical-cyclone-break-points`,
  TIB: `tsunami-bulletin`,
  TID: `tide-report`,
  TMA: `tsunami-tide-seismic-acknowledgement`,
  TOE: `telephone-outage-emergency`,
  TOR: `tornado-warning`,
  TPT: `temperature-precipitation-table`,
  TSU: `tsunami-watch-warning`,
  TUV: `ultraviolet-index`,
  TVL: `travelers-forecast`,
  TWB: `transcribed-weather-broadcast`,
  TWD: `tropical-weather-discussion`,
  TWO: `tropical-weather-outlook`,
  TWS: `tropical-weather-summary`,
  URN: `aircraft-reconnaissance`,
  UVI: `ultraviolet-index`,
  VAA: `volcanic-activity-advisory`,
  VER: `forecast-verification-statistics`,
  VFT: `taf-verification-product`,
  VOW: `volcano-warning`,
  WA0: `airmet-pacific`,
  WA1: `airmet-northeast`,
  WA2: `airmet-southeast`,
  WA3: `airmet-north-central`,
  WA4: `airmet-south-central`,
  WA5: `airmet-rocky-mountains`,
  WA6: `airmet-west-coast`,
  WA7: `airmet-juneau-ak`,
  WA8: `airmet-anchorage-ak`,
  WA9: `airmet-fairbanks-ak`,
  WAR: `space-environment-warning`,
  WAT: `space-environment-watch`,
  WCN: `weather-watch-clearance-notification`,
  WCR: `weekly-weather-and-crop-report`,
  WDA: `weekly-data-for-agriculture`,
  WDU: `warning-decision-update`,
  WEK: `space-environment-product-weekly`,
  WOU: `watch-outline-update`,
  WS1: `sigmet-northeast`,
  WS2: `sigmet-southeast`,
  WS3: `sigmet-north-central`,
  WS4: `sigmet-south-central`,
  WS5: `sigmet-rocky-mountains`,
  WS6: `sigmet-west-coast`,
  WST: `tropical-cyclone-sigmet`,
  WSV: `volcanic-activity-sigmet`,
  WSW: `winter-weather-warning`,
  WWA: `watch-status-report`,
  WWP: `watch-probabilities`,
  ZFP: `zone-forecast-product`
};

// src/@dictionaries/signatures.ts
var tags = {
  "FROSTBITE AND HYPOTHERMIA ARE LIKELY": "Frostbite and Hypothermia Likely",
  "LICKELY BECOME SLICK AND HAZARDOUS": "Slick and Hazardous Roads",
  "SLIPPERY ROAD CONDITIONS": "Slippery Roads",
  "BLOWING SNOW WHICH COULD REDUCE VISIBILITY": "Blowing Snow Reducing Visibility",
  "TRAVEL COULD BE VERY DIFFICULT": "Difficult Travel Conditions",
  "DIFFICULT TRAVEL CONDITIONS": "Difficult Travel Conditions",
  "EXPECT DISRUPTIONS": "Expect Disruptions to Travel",
  "A LARGE AND EXTREMELY DANGEROUS TORNADO": "Large and Dangerous Tornado",
  "THIS IS A PARTICULARLY DANGEROUS SITUATION": "Particularly Dangerous Situation",
  "RADAR INDICATED ROTATION": "Radar Indicated Tornado",
  "WEATHER SPOTTERS CONFIRMED TORNADO": "Confirmed by Storm Spotters",
  "A SEVERE THUNDERSTORM CAPABLE OF PRODUCING A TORNADO": "Developing Tornado",
  "LAW ENFORCEMENT CONFIRMED TORNADO": "Reported by Law Enforcement",
  "A TORNADO IS ON THE GROUND": "Confirmed Tornado",
  "WEATHER SPOTTERS REPORTED FUNNEL CLOUD": "Confirmed Funnel Cloud by Storm Spotters",
  "PUBLIC CONFIRMED TORNADO": "Public reports of Tornado",
  "RADAR CONFIRMED": "Radar Confirmed",
  "TORNADO WAS REPORTED BRIEFLY ON THE GROUND": "Tornado no longer on ground",
  "SPOTTERS INDICATE THAT A FUNNEL CLOUD CONTINUES WITH THIS STORM": "Funnel Cloud Continues",
  "A TORNADO MAY DEVELOP AT ANY TIME": "Potentional still exists for Tornado to form",
  "LIFE-THREATENING SITUATION": "Life Threating Situation",
  "COMPLETE DESTRUCTION IS POSSIBLE": "Extremly Damaging Tornado",
  "POTENTIALLY DEADLY TORNADO": "Deadly Tornado",
  "RADAR INDICATED": "Radar Indicated",
  "HAIL DAMAGE TO VEHICLES IS EXPECTED": "Damaging to Vehicles",
  "EXPECT WIND DAMAGE": "Wind Damage",
  "FREQUENT LIGHTNING": "Frequent Lightning",
  "PEOPLE AND ANIMALS OUTDOORS WILL BE INJURED": "Capable of Injuring People and Animals",
  "TRAINED WEATHER SPOTTERS": "Confirmed by Storm Spotters",
  "SOURCE...PUBLIC": "Confirmed by Public",
  "SMALL CRAFT COULD BE DAMAGED": "Potential Damage to Small Craft",
  "A TORNADO WATCH REMAINS IN EFFECT": "Active Tornado Watch",
  "TENNIS BALL SIZE HAIL": "Tennis Ball Size Hail",
  "BASEBALL SIZE HAIL": "Baseball Size Hail",
  "GOLF BALL SIZE HAIL": "Golf Ball Size Hail",
  "QUARTER SIZE HAIL": "Quarter Size Hail",
  "PING PONG BALL SIZE HAIL": "Ping Pong Ball Size Hail",
  "NICKEL SIZE HAIL": "Nickel Size Hail",
  "DOPPLER RADAR.": "Confirmed by Radar",
  "DOPPLER RADAR AND AUTOMATED GAUGES.": "Confirmed by Radar and Gauges",
  "FLASH FLOODING CAUSED BY THUNDERSTORMS.": "Caused by Thunderstorm",
  "SOURCE...EMERGENCY MANAGEMENT.": "Confirmed by Emergency Management",
  "FLASH FLOODING CAUSED BY HEAVY RAIN.": "Caused by heavy rain",
  "SOURCE...LAW ENFORCEMENT REPORTED.": "Confirmed by Law Enforcement",
  "MINOR FLOODING IS OCCURING": "Minor Flooding Occurring",
  "VERY COLD TEMPERATURES CAN LEAD TO HYPOTHERMIA": "Hypothermia Risk",
  "SENSITIVE VEGETATION AND POSSIBLY DAMAGE UNPROTECTED OUTDOOR": "Vegetation and Outdoor Plumbing Risk",
  "RIP CURRENTS CAN SWEEP EVEN THE BEST SWIMMER": "Hazardous to All Swimmers",
  "HYPOTHERMIA IF PRECAUTIONS ARE NOT TAKEN.": "Hypothermia Risk",
  "FROSTBITE AND HYPOTHERMIA WILL OCCUR IF UNPROTECTED SKIN": "Frostbite and Hypothermia Risk on Unprotected Skin",
  "TEMPERATURES COULD CAUSE RUPTURED WATER PIPES": "Risk of Ruptured Water Pipes",
  "COULD RESULT IN HYPOTHERMIA OR FROSTBITE ON EXPOSED SKIN IF": "Hypothermia or Frostbite Risk on Exposed Skin",
  "WINDS WILL STRENGTHEN": "Strengthening Winds",
  "EXPECT ROADS TO RE-FREEZE": "Roads May Re-Freeze",
  "SLICK AND ICY SPOTS ON ROADS": "Slick and Icy Roads",
  "ICY PATCHES MAY BE MORE COMMON ON BRIDGES": "Icy Patches Likely on Bridges",
  "SLICK SPOTS ON UNTREATED ROADS": "Slick Spots on Untreated Roads",
  "TEMPERATURES ARE EXPECTED TO FALL BELOW FREEZING": "Temperatures Expected Below Freezing",
  "HAZARDOUS ROADWAYS AND BLACK ICE": "Hazardous Roadways and Black Ice",
  "SLOW DOWN AND ALLOW EXTRA TIME": "Slow Down and Allow Extra Time",
  "SHOULD EXERCISE CAUTION": "Should Exercise Caution",
  "LAKE EFFECT SNOW EXPECTED": "Lake Effect Snow Expected",
  "MODERATE LAKE EFFECT SNOWFALL RATES AND BLOWING SNOW": "Moderate Lake Effect Snowfall and Blowing Snow"
};
var cancel_signatures = [
  "subsided sufficiently for the advisory to be cancelled",
  "has been cancelled",
  "will be allowed to expire",
  "has diminished",
  "and no longer",
  "has been replaced",
  "The threat has ended",
  "has weakened below severe"
];
var message_signatures = [
  { regex: /\*/g, replacement: "" },
  { regex: /\.{3,}/g, replacement: "" },
  { regex: /\bUTC\b/g, replacement: "Coordinated Universal Time" },
  { regex: /\bGMT\b/g, replacement: "Greenwich Mean Time" },
  { regex: /\bEST\b(?!\w)/g, replacement: "Eastern Standard Time" },
  { regex: /\bEDT\b(?!\w)/g, replacement: "Eastern Daylight Time" },
  { regex: /\bCST\b(?!\w)/g, replacement: "Central Standard Time" },
  { regex: /\bCDT\b(?!\w)/g, replacement: "Central Daylight Time" },
  { regex: /\bMST\b(?!\w)/g, replacement: "Mountain Standard Time" },
  { regex: /\bMDT\b(?!\w)/g, replacement: "Mountain Daylight Time" },
  { regex: /\bPST\b(?!\w)/g, replacement: "Pacific Standard Time" },
  { regex: /\bPDT\b(?!\w)/g, replacement: "Pacific Daylight Time" },
  { regex: /\bAKST\b(?!\w)/g, replacement: "Alaska Standard Time" },
  { regex: /\bAKDT\b(?!\w)/g, replacement: "Alaska Daylight Time" },
  { regex: /\bHST\b(?!\w)/g, replacement: "Hawaii Standard Time" },
  { regex: /\bHDT\b(?!\w)/g, replacement: "Hawaii Daylight Time" },
  { regex: /\bmph\b(?!\w)/g, replacement: "miles per hour" },
  { regex: /\bkm\/h\b(?!\w)/g, replacement: "kilometers per hour" },
  { regex: /\bkmh\b(?!\w)/g, replacement: "kilometers per hour" },
  { regex: /\bkt\b(?!\w)/g, replacement: "knots" },
  { regex: /\bNE\b(?!\w)/g, replacement: "northeast" },
  { regex: /\bNW\b(?!\w)/g, replacement: "northwest" },
  { regex: /\bSE\b(?!\w)/g, replacement: "southeast" },
  { regex: /\bSW\b(?!\w)/g, replacement: "southwest" },
  { regex: /\bNM\b(?!\w)/g, replacement: "nautical miles" },
  { regex: /\bdeg\b(?!\w)/g, replacement: "degrees" },
  { regex: /\btstm\b(?!\w)/g, replacement: "thunderstorm" },
  { regex: /\bmm\b(?!\w)/g, replacement: "millimeters" },
  { regex: /\bcm\b(?!\w)/g, replacement: "centimeters" },
  { regex: /\bin.\b(?!\w)/g, replacement: "inches" },
  { regex: /\bft\b(?!\w)/g, replacement: "feet" },
  { regex: /\bmi\b(?!\w)/g, replacement: "miles" },
  { regex: /\bhr\b(?!\w)/g, replacement: "hour" },
  { regex: /\bhourly\b(?!\w)/g, replacement: "per hour" },
  { regex: /\bkg\b(?!\w)/g, replacement: "kilograms" },
  { regex: /\bg\/kg\b(?!\w)/g, replacement: "grams per kilogram" },
  { regex: /\bmb\b(?!\w)/g, replacement: "millibars" },
  { regex: /\bhPa\b(?!\w)/g, replacement: "hectopascals" },
  { regex: /\bPa\b(?!\w)/g, replacement: "pascals" },
  { regex: /\bKPa\b(?!\w)/g, replacement: "kilopascals" },
  { regex: /\bC\/hr\b(?!\w)/g, replacement: "degrees Celsius per hour" },
  { regex: /\bF\/hr\b(?!\w)/g, replacement: "degrees Fahrenheit per hour" },
  { regex: /\bC\/min\b(?!\w)/g, replacement: "degrees Celsius per minute" },
  { regex: /\bF\/min\b(?!\w)/g, replacement: "degrees Fahrenheit per minute" },
  { regex: /\bC\b(?!\w)/g, replacement: "degrees Celsius" },
  { regex: /\bF\b(?!\w)/g, replacement: "degrees Fahrenheit" }
];

// src/@dictionaries/icao.ts
var icaos = {
  "KLCH": "Lake Charles, LA",
  "TSTL": "St. Louis, MO",
  "PABC": "Bethel, AK",
  "TCMH": "Columbus, OH",
  "KEPZ": "El Paso, TX",
  "KCYS": "Cheyenne, WY",
  "KJKL": "Jackson, KY",
  "KPAH": "Paducah, KY",
  "KEMX": "Tucson, AZ",
  "KMHX": "Morehead City, NC",
  "PAPD": "Fairbanks, AK",
  "KDLH": "Duluth, MN",
  "TADW": "Andrews Air Force Base, MD",
  "KOKX": "Brookhaven, NY",
  "KLZK": "Little Rock, AR",
  "KHGX": "Houston, TX",
  "TMSY": "New Orleans, LA",
  "KDGX": "Jackson/Brandon, MS",
  "KCTP": "Caribou, ME",
  "KAMA": "Amarillo, TX",
  "PGUA": "Andersen AFB, GU",
  "KAPX": "Gaylord, MI",
  "PAHG": "Kenai, AK",
  "KLWX": "Sterling, VA",
  "HWPA2": "Homer, AK",
  "KGRK": "Fort Hood, TX",
  "KAKQ": "Wakefield, VA",
  "ROCO2": "Norman, OK",
  "KCLX": "Charleston, SC",
  "TPHX": "Phoenix, AZ",
  "KNKX": "San Diego, CA",
  "TDEN": "Denver, CO",
  "TLAS": "Las Vegas, NV",
  "KBUF": "Buffalo, NY",
  "KTLX": "Norman, OK",
  "KILX": "Lincoln, IL",
  "KHDC": "Hammond, LA",
  "KVWX": "Evansville, IN",
  "TCLT": "Charlotte, NC",
  "TEWR": "Newark, NJ",
  "KFSD": "Sioux Falls, SD",
  "KEAX": "Pleasant Hill, MO",
  "KICX": "Cedar City, UT",
  "KHTX": "Huntsville, AL",
  "PACG": "Sitka, AK",
  "KSOX": "Santa Ana Mountains, CA",
  "TPBI": "West Palm Beach, FL",
  "TSLC": "Salt Lake City, UT",
  "KGLD": "Goodland, KS",
  "TRDU": "Raleigh-Durham, NC",
  "KATX": "Seattle, WA",
  "TICH": "Wichita, KS",
  "TSDF": "Louisville, KY",
  "TBOS": "Boston, MA",
  "TDCA": "Washington, DC",
  "KUEX": "Grand Island, NE",
  "TLKA2": "Talkeetna, AK",
  "KBGM": "Binghamton, NY",
  "TLVE": "Cleveland, OH",
  "KCAE": "Columbia, SC",
  "KDVN": "Quad Cities, IA",
  "KABR": "Aberdeen, SD",
  "KBYX": "Key West, FL",
  "KMPX": "Minneapolis, MN",
  "KCRP": "Corpus Christi, TX",
  "KCBW": "Caribou, ME",
  "KMRX": "Knoxville, TN",
  "KSHV": "Shreveport, LA",
  "KIWA": "Phoenix, AZ",
  "KRGX": "Reno, NV",
  "PHKM": "Kamuela, HI",
  "KABX": "Albuquerque, NM",
  "KBMX": "Birmingham, AL",
  "TMDW": "Chicago Midway, IL",
  "KVAX": "Moody AFB, GA",
  "KHDX": "Holloman AFB, NM",
  "KBRO": "Brownsville, TX",
  "KTWX": "Topeka, KS",
  "KRTX": "Portland, OR",
  "KCXX": "Burlington, VT",
  "KFCX": "Roanoke, VA",
  "KFFC": "Atlanta, GA",
  "KBOX": "Boston, MA",
  "KTLH": "Tallahassee, FL",
  "KPUX": "Pueblo, CO",
  "KFDR": "Altus AFB, OK",
  "KGJX": "Grand Junction, CO",
  "KDTX": "Detroit, MI",
  "PHWA": "Waimea, HI",
  "KMQT": "Marquette, MI",
  "KSJT": "San Angelo, TX",
  "KUDX": "Rapid City, SD",
  "TIAH": "Houston, TX",
  "KSRX": "Fort Smith, AR",
  "TJFK": "New York City, NY",
  "KDDC": "Dodge City, KS",
  "PAKC": "King Salmon, AK",
  "PAIH": "Middleton Island, AK",
  "RODN": "Kadena AB, JA",
  "TBWI": "Baltimore/Washington, MD",
  "KIWX": "Northern Indiana, IN",
  "KFDX": "Cannon AFB, NM",
  "TMIA": "Miami, FL",
  "KICT": "Wichita, KS",
  "TMKE": "Milwaukee, WI",
  "TFLL": "Fort Lauderdale, FL",
  "KARX": "La Crosse, WI",
  "KLRX": "Elko, NV",
  "KDAX": "Sacramento, CA",
  "KGRB": "Green Bay, WI",
  "KLGX": "Langley Hill, WA",
  "KFTG": "Denver, CO",
  "KMKX": "Milwaukee, WI",
  "TTUL": "Tulsa, OK",
  "TDFW": "Dallas/Fort Worth, TX",
  "TTPA": "Tampa Bay, FL",
  "TDAL": "Dallas Love Field, TX",
  "KDFX": "Laughlin AFB, TX",
  "KSFX": "Pocatello, ID",
  "KMTX": "Salt Lake City, UT",
  "PAEC": "Nome, AK",
  "RKSG": "Camp Humphreys, KR",
  "KOAX": "Omaha, NE",
  "PHMO": "Molokai, HI",
  "TDTW": "Detroit, MI",
  "THOU": "Houston, TX",
  "AWPA2": "Anchorage, AK",
  "KTYX": "Fort Drum, NY",
  "KCCX": "State College, PA",
  "TMSP": "Minneapolis, MN",
  "KMVX": "Grand Forks, ND",
  "KBIS": "Bismarck, ND",
  "KBBX": "Beale AFB, CA",
  "KVBX": "Vandenberg AFB, CA",
  "KPOE": "Fort Polk, LA",
  "KMOB": "Mobile, AL",
  "KJGX": "Robins AFB, GA",
  "KMUX": "San Francisco, CA",
  "TMCI": "Kansas City, MO",
  "KLSX": "St. Louis, MO",
  "KMAX": "Medford, OR",
  "KRAX": "Raleigh/Durham, NC",
  "KINX": "Tulsa, OK",
  "RKJK": "Kunsan AB, KR",
  "KSGF": "Springfield, MO",
  "TDAY": "Dayton, OH",
  "KDOX": "Dover AFB, DE",
  "KGGW": "Glasgow, MT",
  "KAMX": "Miami, FL",
  "KENX": "Albany, NY",
  "KTFX": "Great Falls, MT",
  "KPBZ": "Pittsburgh, PA",
  "KMAF": "Midland/Odessa, TX",
  "KPDT": "Pendleton, OR",
  "KLNX": "North Platte, NE",
  "KEOX": "Fort Rucker, AL",
  "KGSP": "Greer, SC",
  "KHPX": "Fort Campbell, KY",
  "KGRR": "Grand Rapids, MI",
  "KLOT": "Chicago, IL",
  "TPIT": "Pittsburgh, PA",
  "KEYX": "Edwards AFB, CA",
  "TIAD": "Dulles, VA",
  "KFWS": "Dallas/Fort Worth, TX",
  "KMLB": "Melbourne, FL",
  "KMBX": "Minot AFB, ND",
  "KDMX": "Des Moines, IA",
  "KEVX": "Eglin AFB, FL",
  "TBNA": "Nashville, TN",
  "KDYX": "Dyess AFB, TX",
  "TOKC": "Oklahoma City, OK",
  "PHKI": "South Kauai, HI",
  "TMCO": "Orlando, FL",
  "KDIX": "Philadelphia, PA",
  "TORD": "Chicago, IL",
  "KYUX": "Yuma, AZ",
  "KVNX": "Vance AFB, OK",
  "TJUA": "San Juan, PR",
  "TATL": "Atlanta, GA",
  "KVTX": "Los Angeles, CA",
  "KIND": "Indianapolis, IN",
  "KCBX": "Boise, ID",
  "KGYX": "Portland, ME",
  "KMXX": "Maxwell AFB, AL",
  "TSJU": "San Juan, PR",
  "KHNX": "San Joaquin Valley, CA",
  "KLVX": "Louisville, KY",
  "KMSX": "Missoula, MT",
  "KJAX": "Jacksonville, FL",
  "KNQA": "Memphis, TN",
  "KRIW": "Riverton/Lander, WY",
  "TCVG": "Covington, KY",
  "KBLX": "Billings, MT",
  "TPHL": "Philadelphia, PA",
  "KRLX": "Charleston, WV",
  "TMEM": "Memphis, TN",
  "KCLE": "Cleveland, OH",
  "KBHX": "Eureka, CA",
  "KLBB": "Lubbock, TX",
  "KOTX": "Spokane, WA",
  "KEWX": "Austin/San Antonio, TX",
  "KGWX": "Columbus AFB, MS",
  "KESX": "Las Vegas, NV",
  "KTBW": "Tampa, FL",
  "KOHX": "Nashville, TN",
  "KLTX": "Wilmington, NC",
  "KFSX": "Flagstaff, AZ",
  "TIDS": "Indianapolis, IN",
  "KILN": "Cincinnati, OH",
  "PAFG": "Fairbanks, AK",
  "KPQR": "Portland, OR",
  "KILM": "Wilmington, NC",
  "KEKA": "Eureka, CA",
  "KCHS": "Charleston, SC",
  "KPHI": "Philadelphia/Mt. Holly, NJ",
  "KUNR": "Rapid City, SD",
  "KMFL": "Miami, FL",
  "TJSJ": "San Juan, PR",
  "KFGF": "Grand Forks, ND",
  "KSEW": "Seattle, WA",
  "PAFC": "Anchorage, AK",
  "KLMK": "Louisville, KY",
  "PHFO": "Honolulu, HI",
  "KLIX": "New Orleans/Baton Rouge, LA",
  "KBOI": "Boise, ID",
  "KPIH": "Pocatello, ID",
  "KMTR": "San Francisco/Monterey, CA",
  "KGJT": "Grand Junction, CO",
  "PAAQ": "Anchorage, AK",
  "KABQ": "Albuquerque, NM",
  "KTAE": "Tallahassee, FL",
  "KCAR": "Caribou, ME",
  "KMFR": "Medford, OR",
  "PGUM": "Guam, GU",
  "PAJK": "Juneau, AK"
};

// src/bootstrap.ts
var packages = {
  fs,
  path,
  events: events2,
  xmpp: client_exports,
  shapefile,
  xml2js,
  sqlite3: import_better_sqlite3.default,
  jobs,
  axios: import_axios.default,
  crypto: import_crypto.default,
  os: import_os.default,
  say: import_say.default,
  child: import_child_process.default,
  polygonClipping,
  jszip: import_jszip.default
};
var cache = {
  isReady: true,
  sigHalt: false,
  isConnected: false,
  attemptingReconnect: false,
  totalReconnects: 0,
  lastStanza: null,
  session: null,
  lastConnect: null,
  db: null,
  lastWarn: null,
  totalLocationWarns: 0,
  events: new events2.EventEmitter(),
  isProcessingAudioQueue: false,
  audioQueue: []
};
var settings = {
  database: path.join(process.cwd(), "shapefiles.db"),
  is_wire: true,
  journal: true,
  noaa_weather_wire_service_settings: {
    reconnection_settings: {
      enabled: true,
      interval: 60
    },
    credentials: {
      username: null,
      password: null,
      nickname: "AtmosphericX Standalone Parser"
    },
    cache: {
      enabled: true,
      max_db_history: 5e3,
      max_db_cache_size: 1e3
    },
    preferences: {
      disable_ugc: false,
      disable_vtec: false,
      disable_text: false,
      cap_only: false
    }
  },
  national_weather_service_settings: {
    interval: 15,
    endpoint: `https://api.weather.gov/alerts/active`
  },
  global_settings: {
    parent_events_only: true,
    better_event_parsing: true,
    ignore_geometry_parsing: false,
    shapefile_coordinates: false,
    shapefile_skip: 15,
    filtering: {
      events: [],
      filtered_icao: [],
      ignored_icao: [],
      ignored_events: [`Xx`, `Test Message`],
      ugc_filter: [],
      state_filter: [],
      check_expired: true,
      ignore_test_products: true
    },
    eas_settings: {
      directory: null,
      intro_wav: null
    }
  }
};
var definitions = {
  events,
  actions,
  status,
  productTypes: types,
  correlations: status_correlations,
  offshore,
  awips,
  causes,
  records,
  severity,
  cancelSignatures: cancel_signatures,
  messageSignatures: message_signatures,
  tags,
  ICAO: icaos,
  enhancedEvents: [
    { "Tornado Warning": {
      "Tornado Emergency": { description: "tornado emergency", condition: (tornadoThreatTag) => tornadoThreatTag === "OBSERVED" },
      "PDS Tornado Warning": { description: "particularly dangerous situation", condition: (damageThreatTag) => damageThreatTag === "CONSIDERABLE" },
      "Confirmed Tornado Warning": { condition: (tornadoThreatTag) => tornadoThreatTag === "OBSERVED" },
      "Radar Indicated Tornado Warning": { condition: (tornadoThreatTag) => tornadoThreatTag !== "OBSERVED" }
    } },
    { "Special Marine Warning": {
      "Tornadic Special Marine Warning": { condition: (tornadoThreatTag) => tornadoThreatTag !== "POSSIBLE" }
    } },
    { "Tornado Watch": {
      "PDS Tornado Watch": { description: "particularly dangerous situation" }
    } },
    { "Flash Flood Warning": {
      "Flash Flood Emergency": { description: "flash flood emergency" },
      "Considerable Flash Flood Warning": { condition: (damageThreatTag) => damageThreatTag === "CONSIDERABLE" }
    } },
    { "Severe Thunderstorm Warning": {
      "EDS Severe Thunderstorm Warning": { description: "extremely dangerous situation" },
      "Destructive Severe Thunderstorm Warning": { condition: (damageThreatTag) => damageThreatTag === "DESTRUCTIVE" },
      "Considerable Severe Thunderstorm Warning": { condition: (damageThreatTag) => damageThreatTag === "CONSIDERABLE" }
    } }
  ],
  shapefiles_directory: [
    { name: "us_counties", id: "C", link: "https://www.weather.gov/source/gis/Shapefiles/County/c_18mr25.zip" },
    { name: "us_states_territories", id: "Z", link: "https://www.weather.gov/source/gis/Shapefiles/County/s_18mr25.zip" },
    { name: "fire_weather_zones", id: "Z", link: "https://www.weather.gov/source/gis/Shapefiles/WSOM/fz18mr25.zip" },
    { name: "costal_marine_zones", id: "Z", link: "https://www.weather.gov/source/gis/Shapefiles/WSOM/mz18mr25.zip" },
    { name: "offshore_marine_zones", id: "Z", link: "https://www.weather.gov/source/gis/Shapefiles/WSOM/oz18mr25.zip" },
    { name: "public_forecast_zones", id: "Z", link: "https://www.weather.gov/source/gis/Shapefiles/WSOM/z_18mr25.zip" },
    { name: "county_warning_areas", id: "Z", link: "https://www.weather.gov/source/gis/Shapefiles/WSOM/w_18mr25.zip" },
    { name: "river_forecast_boundaries", id: "Z", link: "https://www.weather.gov/source/gis/Shapefiles/Misc/rf05mr24.zip" }
  ],
  regular_expressions: {
    pvtec: new RegExp(`[OTEX].(NEW|CON|EXT|EXA|EXB|UPG|CAN|EXP|COR|ROU).[A-Z]{4}.[A-Z]{2}.[WAYSFON].[0-9]{4}.[0-9]{6}T[0-9]{4}Z-[0-9]{6}T[0-9]{4}Z`, "g"),
    hvtec: new RegExp(`[a-zA-Z0-9]{4}.[A-Z0-9].[A-Z]{2}.[0-9]{6}T[0-9]{4}Z.[0-9]{6}T[0-9]{4}Z.[0-9]{6}T[0-9]{4}Z.[A-Z]{2}`, "imu"),
    wmo: new RegExp(`[A-Z0-9]{6}\\s[A-Z]{4}\\s\\d{6}`, "imu"),
    ugc1: new RegExp(`(\\w{2}[CZ](\\d{3}((-|>)\\s?(\\n\\n)?))+)`, "imu"),
    ugc2: new RegExp(`(\\d{6}(-|>)\\s?(\\n\\n)?)`, "imu"),
    ugc3: new RegExp(`(\\d{6})(?=-|$)`, "imu"),
    dateline: new RegExp(`\\d{3,4}\\s*(AM|PM)?\\s*[A-Z]{2,4}\\s+[A-Z]{3,}\\s+[A-Z]{3,}\\s+\\d{1,2}\\s+\\d{4}`, "gim")
  },
  messages: {
    shapefile_creation: `DO NOT EXIT UNTIL THE SHAPEFILES ARE DONE COMPLETING! IF YOU CLOSE YOUR PROJECT, THE SHAPEFILES WILL NOT BE CREATED AND YOU WILL NEED TO DELETE ${settings.database} AND RESTART TO CREATE THEM AGAIN!`,
    shapefile_creation_finished: `Shapefiles have finished completing and you can now use the parser.`,
    not_ready: `You can not create another instance without shutting down the current one first, please make sure to call the stop() method first!`,
    invalid_nickname: `The nickname you provided is invalid, please provide a valid nickname to continue.`,
    eas_no_directory: `You have not set a directory for EAS audio files to be saved to, please set the 'directory' setting in the global settings to enable EAS audio generation.`,
    reconnect_too_fast: `The client is attempting to reconnect too fast. This may be due to network instability. Reconnection attempt has been halted for safety.`,
    dump_cache: `Found {count} cached events and will begin dumping them shortly. This may take a while depending on the number of cached events.`,
    dump_cache_complete: `Completed dumping all cached alert files.`
  }
};
process.on("uncaughtException", (err) => {
  if ((err == null ? void 0 : err.code) === "ETIMEDOUT") {
    return;
  }
  if ((err == null ? void 0 : err.code) === "ECONNRESET") {
    return;
  }
  if ((err == null ? void 0 : err.code) === "EHOSTUNREACH") {
    return;
  }
  throw err;
});

// src/@parsers/text.ts
var TextParser = class {
  /**
   * @function textProductToString
   * @description
   *     Searches a text product message for a line containing a specific value,
   *     extracts the substring immediately following that value, and optionally
   *     removes additional specified strings. Cleans up the extracted string by
   *     trimming whitespace and removing any remaining occurrences of the search
   *     value or '<' characters.
   *
   * @static
   * @param {string} message
   * @param {string} value
   * @param {string[]} [removal=[]]
   * @returns {string | null}
   */
  static textProductToString(message, value, removal = []) {
    const lines = message.split("\n");
    for (const line of lines) {
      if (line.includes(value)) {
        let result = line.slice(line.indexOf(value) + value.length).trim();
        for (const str of removal) {
          result = result.split(str).join("");
        }
        result = result.replace(value, "").replace("<", "").trim();
        return result || null;
      }
    }
    return null;
  }
  /**
   * @function textProductToPolygon
   * @description
   *     Parses a text product message to extract polygon coordinates based on
   *     LAT...LON data. Coordinates are converted to [latitude, longitude] pairs
   *     with longitude negated (assumes Western Hemisphere). If the polygon has
   *     more than two points, the first point is repeated at the end to close it.
   *
   * @static
   * @param {string} message
   * @returns {[number, number][]}
   */
  static textProductToPolygon(message) {
    const coordinates = [];
    const latLonMatch = message.match(/LAT\.{3}LON\s+([\d\s]+)/i);
    if (!latLonMatch || !latLonMatch[1]) return coordinates;
    const coordStrings = latLonMatch[1].replace(/\n/g, " ").trim().split(/\s+/);
    for (let i = 0; i < coordStrings.length - 1; i += 2) {
      const lat = parseFloat(coordStrings[i]) / 100;
      const lon = -parseFloat(coordStrings[i + 1]) / 100;
      if (!isNaN(lat) && !isNaN(lon)) {
        coordinates.push([lon, lat]);
      }
    }
    if (coordinates.length > 2) {
      coordinates.push(coordinates[0]);
    }
    return coordinates;
  }
  /**
   * @function textProductToDescription
   * @description
   *     Extracts a clean description portion from a text product message, optionally
   *     removing a handle and any extra metadata such as "STANZA ATTRIBUTES...".
   *     Also trims and normalizes whitespace.
   *
   * @static
   * @param {string} message
   * @param {string | null} [handle=null]
   * @returns {string}
   */
  static textProductToDescription(message, handle = null) {
    const original = message;
    const discoveredDates = Array.from(message.matchAll(definitions.regular_expressions.dateline));
    if (discoveredDates.length) {
      const lastMatch = discoveredDates[discoveredDates.length - 1][0];
      const startIdx = message.lastIndexOf(lastMatch);
      if (startIdx !== -1) {
        const endIdx = message.indexOf("&&", startIdx);
        message = message.substring(startIdx + lastMatch.length, endIdx !== -1 ? endIdx : void 0).trimStart();
        if (message.startsWith("/")) message = message.slice(1).trimStart();
        if (handle && message.includes(handle)) {
          const handleIdx = message.indexOf(handle);
          message = message.substring(handleIdx + handle.length).trimStart();
          if (message.startsWith("/")) message = message.slice(1).trimStart();
        }
      }
    } else if (handle) {
      const handleIdx = message.indexOf(handle);
      if (handleIdx !== -1) {
        let afterHandle = message.substring(handleIdx + handle.length).trimStart();
        if (afterHandle.startsWith("/")) afterHandle = afterHandle.slice(1).trimStart();
        const latEnd = afterHandle.indexOf("&&");
        message = latEnd !== -1 ? afterHandle.substring(0, latEnd).trim() : afterHandle.trim();
      }
    }
    return message.replace(/\s+/g, " ").trim().startsWith("STANZA ATTRIBUTES...") ? original : message.split("STANZA ATTRIBUTES...")[0].trim();
  }
  /**
   * @function getXmlValues
   * @description
   *     Recursively extracts specified values from a parsed XML-like object.
   *     Searches both object keys and array items for matching keys (case-insensitive)
   *     and returns the corresponding values. If multiple unique values are found for
   *     a key, an array is returned; if one value is found, it returns that value; 
   *     if none are found, returns `null`.
   *
   * @static
   * @param {any} parsed
   * @param {string[]} valuesToExtract
   * @returns {Record<string, string | string[] | null>}
   */
  static getXmlValues(parsed, valuesToExtract) {
    const extracted = {};
    const findValueByKey = (obj, searchKey) => {
      const results = [];
      if (obj === null || typeof obj !== "object") {
        return results;
      }
      const searchKeyLower = searchKey.toLowerCase();
      for (const key in obj) {
        if (obj.hasOwnProperty(key) && key.toLowerCase() === searchKeyLower) {
          results.push(obj[key]);
        }
      }
      if (Array.isArray(obj)) {
        for (const item of obj) {
          if (item.valueName && item.valueName.toLowerCase() === searchKeyLower && item.value !== void 0) {
            results.push(item.value);
          }
          const nestedResults = findValueByKey(item, searchKey);
          results.push(...nestedResults);
        }
      }
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const nestedResults = findValueByKey(obj[key], searchKey);
          results.push(...nestedResults);
        }
      }
      return results;
    };
    for (const key of valuesToExtract) {
      const values = findValueByKey(parsed.alert, key);
      const uniqueValues = [...new Set(values)];
      extracted[key] = uniqueValues.length === 0 ? null : uniqueValues.length === 1 ? uniqueValues[0] : uniqueValues;
    }
    return extracted;
  }
};
var text_default = TextParser;

// src/@parsers/ugc.ts
var UGCParser = class {
  /**
   * @function ugcExtractor
   * @description
   *     Extracts UGC (Universal Geographic Code) information from a message.
   *     This includes parsing the header, resolving zones, calculating the expiry
   *     date, and retrieving associated location names from the database.
   *
   * @static
   * @async
   * @param {string} message
   * @returns {Promise<types.UGCEntry | null>}
   */
  static ugcExtractor(message) {
    return __async(this, null, function* () {
      const header = this.getHeader(message);
      if (!header) return null;
      const zones = this.getZones(header);
      if (zones.length === 0) return null;
      const expiry = this.getExpiry(message);
      const locations = yield this.getLocations(zones);
      return {
        zones,
        locations,
        expiry
      };
    });
  }
  /**
   * @function getHeader
   * @description
   *     Extracts the UGC header from a message by locating patterns defined in
   *     `ugc1` and `ugc2` regular expressions. Removes all whitespace and the
   *     trailing character from the matched header.
   *
   * @static
   * @param {string} message
   * @returns {string | null}
   */
  static getHeader(message) {
    const start = message.search(definitions.regular_expressions.ugc1);
    const subMessage = message.substring(start);
    const end = subMessage.search(definitions.regular_expressions.ugc2);
    const full = subMessage.substring(0, end).replace(/\s+/g, "").slice(0, -1);
    return full || null;
  }
  /**
   * @function getExpiry
   * @description
   *     Extracts an expiration date from a message using the UGC3 format.
   *     The function parses day, hour, and minute from the message and constructs
   *     a Date object in the current month and year. Returns `null` if no valid
   *     expiration is found.
   *
   * @static
   * @param {string} message
   * @returns {Date | null}
   */
  static getExpiry(message) {
    const match = message.match(/\b(\d{6})-/);
    if (!match) return null;
    const token = match[1];
    const day = parseInt(token.slice(0, 2), 10);
    const hour = parseInt(token.slice(2, 4), 10);
    const minute = parseInt(token.slice(4, 6), 10);
    const now = /* @__PURE__ */ new Date();
    const expires = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), day, hour, minute));
    return expires;
  }
  /**
   * @function getLocations
   * @description
   *     Retrieves human-readable location names for an array of zone identifiers
   *     from the shapefiles database. If a zone is not found, the zone ID itself
   *     is returned. Duplicate locations are removed and the result is sorted.
   *
   * @static
   * @async
   * @param {string[]} zones
   * @returns {Promise<string[]>}
   */
  static getLocations(zones) {
    return __async(this, null, function* () {
      const uniqueZones = Array.from(new Set(zones.map((z) => z.trim())));
      const placeholders = uniqueZones.map(() => "?").join(",");
      const rows = yield cache.db.prepare(
        `SELECT id, location FROM shapefiles WHERE id IN (${placeholders})`
      ).all(...uniqueZones);
      const locationMap = /* @__PURE__ */ new Map();
      for (const row of rows) {
        locationMap.set(row.id, row.location);
      }
      const locations = uniqueZones.map((id2) => {
        var _a;
        return (_a = locationMap.get(id2)) != null ? _a : id2;
      });
      return locations.sort();
    });
  }
  /**
   * @function getCoordinates
   * @description
   *     Calculates the outer boundary coordinates for a set of UGC zones by
   *     querying their geometries from the database, merging them, and extracting
   *     the largest outer ring. The coordinates are downsampled based on a skip
   *     setting to reduce complexity. Returns `null` if no valid coordinates are found.
   *
   * @static
   * @param {string[]} zones
   * @returns {[number, number][]}
   */
  static getCoordinates(zones, isUnion = true) {
    const list = [...new Set(zones.map((z) => z.trim()))].filter((z) => z === "XX000" ? false : true);
    if (list.length === 0) return null;
    const placeholders = list.map(() => "?").join(",");
    const rows = cache.db.prepare(`SELECT geometry FROM shapefiles WHERE id IN (${placeholders})`).all(...list);
    const polygons = [];
    for (const row of rows) {
      if (!(row == null ? void 0 : row.geometry)) continue;
      const geom = JSON.parse(row.geometry);
      if ((geom == null ? void 0 : geom.type) === "Polygon") {
        polygons.push(geom.coordinates);
      }
    }
    if (polygons.length === 0) return null;
    if (isUnion) {
      const unionFn = packages.polygonClipping.union;
      const mergedCoords = unionFn(...polygons);
      if (!mergedCoords || mergedCoords.length === 0) return null;
      let maxArea = -1;
      let bestPoly = [];
      for (const poly of mergedCoords) {
        const outerRing2 = poly[0];
        let area = 0;
        for (let i = 0; i < outerRing2.length - 1; i++) {
          const [x1, y1] = outerRing2[i];
          const [x2, y2] = outerRing2[i + 1];
          area += x1 * y2 - x2 * y1;
        }
        area = Math.abs(area / 2);
        if (area > maxArea) {
          maxArea = area;
          bestPoly = poly;
        }
      }
      if (!bestPoly || bestPoly.length === 0) return null;
      const outerRing = bestPoly[0];
      const skip = Math.max(1, parseInt(String(settings.global_settings.shapefile_skip), 10) || 1);
      let skipped = outerRing.filter((_, idx) => idx % skip === 0);
      if (skipped.length < 4) {
        skipped = outerRing.slice();
      }
      const first = skipped[0];
      const last = skipped[skipped.length - 1];
      if (!first || !last || first[0] !== last[0] || first[1] !== last[1]) {
        skipped.push([first[0], first[1]]);
      }
      return { type: "Polygon", coordinates: [skipped] };
    } else {
      const multi = [];
      for (const polyCoords of polygons) {
        if (Array.isArray(polyCoords) && Array.isArray(polyCoords[0])) {
          multi.push(polyCoords);
        }
      }
      if (multi.length === 0) return null;
      const skip = Math.max(1, parseInt(String(settings.global_settings.shapefile_skip), 10) || 1);
      if (skip > 1) {
        for (let p = 0; p < multi.length; p++) {
          for (let r = 0; r < multi[p].length; r++) {
            const ring = multi[p][r];
            let reduced = ring.filter((_, i) => i % skip === 0);
            if (reduced.length < 4) reduced = ring.slice();
            const first = reduced[0];
            const last = reduced[reduced.length - 1];
            if (first && last && (first[0] !== last[0] || first[1] !== last[1])) {
              reduced.push([first[0], first[1]]);
            }
            multi[p][r] = reduced;
          }
        }
      }
      return { type: "MultiPolygon", coordinates: multi };
    }
  }
  /**
   * @function getZones
   * @description
   *     Parses a UGC header string and returns an array of individual zone
   *     identifiers. Handles ranges indicated with `>` and preserves the
   *     state and format prefixes.
   *
   * @static
   * @param {string} header
   * @returns {string[]}
   */
  static getZones(header) {
    const ugcSplit = header.split("-");
    const zones = [];
    let state = ugcSplit[0].substring(0, 2);
    const format = ugcSplit[0].substring(2, 3);
    for (const part of ugcSplit) {
      if (/^[A-Z]/.test(part)) {
        state = part.substring(0, 2);
        if (part.includes(">")) {
          const [start, end] = part.split(">");
          const startNum = parseInt(start.substring(3), 10);
          const endNum = parseInt(end, 10);
          for (let j2 = startNum; j2 <= endNum; j2++) {
            zones.push(`${state}${format}${j2.toString().padStart(3, "0")}`);
          }
        } else {
          zones.push(part);
        }
        continue;
      }
      if (part.includes(">")) {
        const [start, end] = part.split(">");
        const startNum = parseInt(start, 10);
        const endNum = parseInt(end, 10);
        for (let j2 = startNum; j2 <= endNum; j2++) {
          zones.push(`${state}${format}${j2.toString().padStart(3, "0")}`);
        }
      } else {
        zones.push(`${state}${format}${part}`);
      }
    }
    return zones.filter((item) => item !== "");
  }
};
var ugc_default = UGCParser;

// src/@parsers/pvtec.ts
var PVtecParser = class {
  /**
   * @function pVtecExtractor
   * @description
   *     Extracts VTEC entries from a raw NWWS message string and returns
   *     structured objects containing type, tracking, event, status,
   *     WMO identifiers, and expiry date.
   *
   * @static
   * @param {string} message
   * @returns {Promise<types.VtecEntry[] | null>}
   */
  static pVtecExtractor(message) {
    return __async(this, null, function* () {
      var _a, _b;
      const matches = (_a = message.match(definitions.regular_expressions.pvtec)) != null ? _a : [];
      const pVtecs = [];
      for (const pvtec of matches) {
        const parts = pvtec.split(".");
        if (parts.length < 7) continue;
        const dates = parts[6].split("-");
        pVtecs.push({
          raw: pvtec,
          type: definitions.productTypes[parts[0]],
          tracking: `${parts[2]}-${parts[3]}-${parts[4]}-${parts[5]}`,
          event: `${definitions.events[parts[3]]} ${definitions.actions[parts[4]]}`,
          status: definitions.status[parts[1]],
          wmo: ((_b = message.match(definitions.regular_expressions.wmo)) == null ? void 0 : _b[0]) || null,
          expires: this.parseExpiryDate(dates),
          isKWNS: (parts[4] == `A` || parts[4] == `Y`) && (parts[3] == `TO` || parts[3] == `SV`) ? true : false
        });
      }
      return pVtecs.length > 0 ? pVtecs : null;
    });
  }
  /**
   * @function parseExpiryDate
   * @description
   *     Converts a NWWS VTEC/expiry timestamp string into a formatted local ISO date string
   *     with an Eastern Time offset (-04:00). Returns `Invalid Date Format` if the input
   *     is `000000T0000Z`.
   *
   * @private
   * @static
   * @param {string[]} args
   * @returns {string}
   */
  static parseExpiryDate(args) {
    if (args[1] == `000000T0000Z`) return `Invalid Date Format`;
    const expires = `${(/* @__PURE__ */ new Date()).getFullYear().toString().substring(0, 2)}${args[1].substring(0, 2)}-${args[1].substring(2, 4)}-${args[1].substring(4, 6)}T${args[1].substring(7, 9)}:${args[1].substring(9, 11)}:00`;
    const local = new Date(new Date(expires).getTime() - 4 * 60 * 6e4);
    const pad = (n) => n.toString().padStart(2, "0");
    return `${local.getFullYear()}-${pad(local.getMonth() + 1)}-${pad(local.getDate())}T${pad(local.getHours())}:${pad(local.getMinutes())}:00.000-04:00`;
  }
};
var pvtec_default = PVtecParser;

// src/@parsers/hvtec.ts
var HVtecParser = class {
  /**
   * @function HVtecExtractor
   * @description
   *     Extracts VTEC entries from a raw NWWS message string and returns
   *     structured objects containing type, tracking, event, status,
   *     WMO identifiers, and expiry date.
   *
   * @static
   * @param {string} message
   * @returns {Promise<types.HtecEntry[] | null>}
   */
  static HVtecExtractor(message) {
    return __async(this, null, function* () {
      const matches = message.match(definitions.regular_expressions.hvtec);
      if (!matches || matches.length !== 1) return null;
      const hvtec = matches[0];
      const parts = hvtec.split(".");
      if (parts.length < 7) return null;
      const hvtecs = [{
        severity: definitions.severity[parts[1]],
        cause: definitions.causes[parts[2]],
        record: definitions.records[parts[6]],
        raw: hvtec
      }];
      return hvtecs;
    });
  }
};
var hvtec_default = HVtecParser;

// src/@parsers/@events/vtec.ts
var VTECAlerts = class {
  /**
   * @function event
   * @description
   *     Processes a validated stanza message, extracting VTEC and UGC entries,
   *     computing base properties, generating headers, and preparing structured
   *     event objects for downstream handling. Each extracted event is enriched
   *     with metadata, performance timing, and history information.
   *
   * @static
   * @async
   * @param {types.StanzaCompiled} validated
   * @returns {Promise<void>}
   */
  static event(validated) {
    return __async(this, null, function* () {
      var _a, _b, _c;
      let processed = [];
      const messages = (_c = (_b = (_a = validated == null ? void 0 : validated.message) == null ? void 0 : _a.split(/(?=\$\$)/g)) == null ? void 0 : _b.map((msg) => msg.trim())) == null ? void 0 : _c.filter((msg) => msg && msg !== "$$");
      if (!messages || messages.length == 0) {
        return;
      }
      for (let i = 0; i < messages.length; i++) {
        const tick = performance.now();
        const message = messages[i];
        const attributes = validated;
        const getPVTEC = yield pvtec_default.pVtecExtractor(message);
        const getHVTEC = yield hvtec_default.HVtecExtractor(message);
        const getUGC = yield ugc_default.ugcExtractor(message);
        if (getPVTEC != null && getUGC != null) {
          for (let j2 = 0; j2 < getPVTEC.length; j2++) {
            const pVtec = getPVTEC[j2];
            const baseProperties = yield events_default.getBaseProperties(message, attributes, getUGC, pVtec, getHVTEC);
            const getHeader = events_default.getHeader(__spreadValues(__spreadValues({}, validated.attributes), baseProperties.raw), baseProperties, pVtec);
            processed.push({
              type: "Feature",
              properties: __spreadProps(__spreadValues({
                event: pVtec.event,
                parent: pVtec.event,
                action_type: pVtec.status
              }, baseProperties), {
                details: {
                  performance: performance.now() - tick,
                  source: `pvtec-parser`,
                  tracking: pVtec.tracking,
                  header: getHeader,
                  pvtec: pVtec.raw,
                  hvtec: getHVTEC != null ? getHVTEC.raw : null,
                  history: [{ description: baseProperties.description, issued: baseProperties.issued, type: pVtec.status }]
                }
              })
            });
          }
        }
      }
      events_default.validateEvents(processed);
    });
  }
};
var vtec_default = VTECAlerts;

// src/@parsers/@events/ugc.ts
var UGCAlerts = class {
  /**
   * @function getTracking
   * @description
   *    Generates a unique tracking identifier for an event using the sender's ICAO
   *    and some attributes.
   *
   * @private
   * @static
   * @param {types.EventProperties} properties 
   * @returns {string} 
   */
  static getTracking(properties) {
    var _a, _b, _c;
    return `${properties.sender_icao}-${properties.raw.attributes.ttaaii}-${(_c = (_b = (_a = properties == null ? void 0 : properties.raw) == null ? void 0 : _a.attributes) == null ? void 0 : _b.id.slice(-4)) != null ? _c : "N/A"}`;
  }
  /**
   * @function getEvent
   * @description
   *     Determines the human-readable event name from a message and AWIPS attributes.
   *     - Checks if the message contains any predefined offshore event keywords
   *       and returns the matching offshore event if found.
   *     - Otherwise, returns a formatted event type string from the provided attributes,
   *       capitalizing the first letter of each word.
   *
   * @private
   * @static
   * @param {string} message
   * @param {Record<string, any>} metadata
   * @returns {string}
   */
  static getEvent(message, metadata) {
    const offshoreEvent = Object.keys(definitions.offshore).find((event) => message.toLowerCase().includes(event.toLowerCase()));
    if (offshoreEvent != void 0) return Object.keys(definitions.offshore).find((event) => message.toLowerCase().includes(event.toLowerCase()));
    return metadata.awipsType.type.split(`-`).map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(` `);
  }
  /**
   * @function event
   * @description
   *     Processes a validated stanza message, extracting UGC entries and
   *     computing base properties for non-VTEC events. Each extracted event
   *     is enriched with metadata, performance timing, and history information,
   *     then filtered and emitted via `EventParser.validateEvents`.
   *
   * @static
   * @async
   * @param {types.StanzaCompiled} validated
   * @returns {Promise<void>}
   */
  static event(validated) {
    return __async(this, null, function* () {
      var _a, _b, _c;
      let processed = [];
      const messages = (_c = (_b = (_a = validated == null ? void 0 : validated.message) == null ? void 0 : _a.split(/(?=\$\$)/g)) == null ? void 0 : _b.map((msg) => msg.trim())) == null ? void 0 : _c.filter((msg) => msg && msg !== "$$");
      if (!messages || messages.length == 0) {
        return;
      }
      for (let i = 0; i < messages.length; i++) {
        const tick = performance.now();
        const message = messages[i];
        const getUGC = yield ugc_default.ugcExtractor(message);
        if (getUGC != null) {
          const attributes = validated;
          const baseProperties = yield events_default.getBaseProperties(message, attributes, getUGC);
          const getHeader = events_default.getHeader(__spreadValues(__spreadValues({}, attributes), baseProperties.raw), baseProperties);
          const getEvent = this.getEvent(message, attributes);
          processed.push({
            type: "Feature",
            properties: __spreadProps(__spreadValues({
              event: getEvent,
              parent: getEvent,
              action_type: `Issued`
            }, baseProperties), {
              details: {
                performance: performance.now() - tick,
                source: `ugc-parser`,
                tracking: this.getTracking(baseProperties),
                header: getHeader,
                pvtec: null,
                hvtec: null,
                history: [{ description: baseProperties.description, issued: baseProperties.issued, type: `Issued` }]
              }
            })
          });
        }
      }
      events_default.validateEvents(processed);
    });
  }
};
var ugc_default2 = UGCAlerts;

// src/@parsers/@events/text.ts
var TextAlerts = class {
  /**
   * @function getTracking
   * @description
   *    Generates a unique tracking identifier for an event using the sender's ICAO
   *    and some attributes.
   *
   * @private
   * @static
   * @param {types.EventProperties} properties 
   * @returns {string} 
   */
  static getTracking(properties) {
    var _a, _b, _c;
    return `${properties.sender_icao}-${properties.raw.attributes.ttaaii}-${(_c = (_b = (_a = properties == null ? void 0 : properties.raw) == null ? void 0 : _a.attributes) == null ? void 0 : _b.id.slice(-4)) != null ? _c : "N/A"}`;
  }
  /**
   * @function getEvent
   * @description
   *     Determines the event name from a text message and its AWIPS attributes.
   *     If the message contains a known offshore event keyword, that offshore
   *     event is returned. Otherwise, the event type from the AWIPS attributes
   *     is formatted into a human-readable string with each word capitalized.
   *
   * @private
   * @static
   * @param {string} message
   * @param {types.StanzaAttributes} metadata
   * @returns {string}
   */
  static getEvent(message, metadata) {
    const offshoreEvent = Object.keys(definitions.offshore).find((event) => message.toLowerCase().includes(event.toLowerCase()));
    if (offshoreEvent != void 0) return Object.keys(definitions.offshore).find((event) => message.toLowerCase().includes(event.toLowerCase()));
    return metadata.awipsType.type.split(`-`).map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(` `);
  }
  /**
   * @function event
   * @description
   *     Processes a compiled text-based NOAA Stanza message and extracts relevant
   *     event information. Splits the message into multiple segments based on
   *     markers such as "$$", "ISSUED TIME...", or separator lines, generates
   *     base properties, headers, event names, and tracking information for
   *     each segment, then validates and emits the processed events.
   *
   * @public
   * @static
   * @async
   * @param {types.StanzaCompiled} validated
   * @returns {Promise<void>}
   */
  static event(validated) {
    return __async(this, null, function* () {
      var _a, _b, _c;
      let processed = [];
      const messages = (_c = (_b = (_a = validated == null ? void 0 : validated.message) == null ? void 0 : _a.split(/(?=\$\$)/g)) == null ? void 0 : _b.map((msg) => msg.trim())) == null ? void 0 : _c.filter((msg) => msg && msg !== "$$");
      if (!messages || messages.length == 0) {
        return;
      }
      for (let i = 0; i < messages.length; i++) {
        const tick = performance.now();
        const message = messages[i];
        const attributes = validated;
        const baseProperties = yield events_default.getBaseProperties(message, attributes);
        const getHeader = events_default.getHeader(__spreadValues(__spreadValues({}, validated.attributes), baseProperties.raw), baseProperties);
        const getEvent = this.getEvent(message, attributes);
        processed.push({
          properties: __spreadProps(__spreadValues({
            event: getEvent,
            parent: getEvent,
            action_type: `Issued`
          }, baseProperties), {
            details: {
              type: "Feature",
              performance: performance.now() - tick,
              source: `text-parser`,
              tracking: this.getTracking(baseProperties),
              header: getHeader,
              pvtec: null,
              hvtec: null,
              history: [{ description: baseProperties.description, issued: baseProperties.issued, type: `Issued` }]
            }
          })
        });
      }
      events_default.validateEvents(processed);
    });
  }
};
var text_default2 = TextAlerts;

// src/@parsers/@events/cap.ts
var CapAlerts = class {
  /**
   * @function getTracking
   * @description
   *   Generates a unique tracking identifier for a CAP alert based on extracted XML values.
   *   If VTEC information is available, it constructs the tracking ID from the VTEC components.
   *   Otherwise, it uses the WMO identifier along with TTAI and CCCC attributes.
   *
   * @private
   * @static
   * @param {Record<string, string>} extracted 
   * @returns {string} 
   */
  static getTracking(extracted, metadata) {
    return extracted.vtec ? (() => {
      const vtecValue = Array.isArray(extracted.vtec) ? extracted.vtec[0] : extracted.vtec;
      const splitPVTEC = vtecValue.split(".");
      return `${splitPVTEC[2]}-${splitPVTEC[3]}-${splitPVTEC[4]}-${splitPVTEC[5]}`;
    })() : `${extracted.wmoidentifier.substring(extracted.wmoidentifier.length - 4)}-${metadata.attributes.ttaaii}-${metadata.attributes.id.slice(-4)}`;
  }
  /**
   * @function event
   * @description
   *    Processes validated CAP alert messages, extracting relevant information and compiling it into structured event objects.   
   *
   * @public
   * @static
   * @async
   * @param {types.StanzaCompiled} validated 
   * @returns {*} 
   */
  static event(validated) {
    return __async(this, null, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u;
      let processed = [];
      const messages = (_c = (_b = (_a = validated == null ? void 0 : validated.message) == null ? void 0 : _a.split(/(?=\$\$)/g)) == null ? void 0 : _b.map((msg) => msg.trim())) == null ? void 0 : _c.filter((msg) => msg && msg !== "$$");
      if (!messages || messages.length == 0) {
        return;
      }
      for (let i = 0; i < messages.length; i++) {
        const tick = performance.now();
        let message = messages[i];
        const attributes = validated;
        message = message.substring(message.indexOf(`<?xml version="1.0"`), message.lastIndexOf(`>`) + 1);
        const parser = new packages.xml2js.Parser({ explicitArray: false, mergeAttrs: true, trim: true });
        const parsed = yield parser.parseStringPromise(message);
        if (parsed == null || parsed.alert == null) continue;
        const extracted = text_default.getXmlValues(parsed, [
          `vtec`,
          `wmoidentifier`,
          `ugc`,
          `areadesc`,
          `expires`,
          `sent`,
          `msgtype`,
          `description`,
          `event`,
          `sendername`,
          `tornadodetection`,
          `polygon`,
          `maxHailSize`,
          `maxWindGust`,
          `thunderstormdamagethreat`,
          `tornadodamagethreat`,
          `waterspoutdetection`,
          `flooddetection`
        ]);
        const getHeader = events_default.getHeader(__spreadValues({}, validated.attributes));
        const getSource = (_d = text_default.textProductToString(extracted.description, `SOURCE...`, [`.`])) != null ? _d : null;
        processed.push({
          type: "Feature",
          properties: {
            locations: (_e = extracted.areadesc) != null ? _e : null,
            event: (_f = extracted.event) != null ? _f : null,
            issued: extracted.sent ? new Date(extracted.sent).toISOString() : null,
            expires: extracted.expires ? new Date(extracted.expires).toISOString() : null,
            parent: (_g = extracted.event) != null ? _g : null,
            action_type: (_h = extracted.msgtype) != null ? _h : null,
            description: (_i = extracted.description) != null ? _i : null,
            instruction: null,
            sender_name: (_j = extracted.sendername) != null ? _j : null,
            sender_icao: extracted.wmoidentifier ? extracted.wmoidentifier.substring(extracted.wmoidentifier.length - 4) : null,
            attributes,
            geocode: {
              UGC: extracted.ugc ? Array.isArray(extracted.ugc) ? extracted.ugc : [extracted.ugc] : [],
              generated: ((_k = extracted == null ? void 0 : extracted.polygon) == null ? void 0 : _k.length) > 0 ? Buffer.from(JSON.stringify([extracted.polygon.split(" ").map((coord) => {
                const [lat, lon] = coord.split(",").map(Number);
                return [lon, lat];
              })])).toString("base64") : null
            },
            raw: { attributes },
            parameters: {
              wmo: (_l = extracted.wmoidentifier) != null ? _l : null,
              source: getSource,
              max_hail_size: (_m = extracted.maxHailSize) != null ? _m : null,
              max_wind_gust: (_n = extracted.maxWindGust) != null ? _n : null,
              damage_threat: (_o = extracted.thunderstormdamagethreat) != null ? _o : null,
              tornado_detection: (_q = (_p = extracted.tornadodetection) != null ? _p : extracted.waterspoutdetection) != null ? _q : null,
              flood_detection: (_r = extracted.flooddetection) != null ? _r : null,
              discussion_tornado_intensity: null,
              discussion_wind_intensity: null,
              discussion_hail_intensity: null
            },
            details: {
              performance: performance.now() - tick,
              source: `cap-parser`,
              tracking: this.getTracking(extracted, attributes),
              header: getHeader,
              pvtec: (_s = extracted.vtec) != null ? _s : null,
              hvtec: null,
              history: [{ description: (_t = extracted.description) != null ? _t : null, issued: extracted.sent ? new Date(extracted.sent).toISOString() : null, type: (_u = extracted.msgtype) != null ? _u : null }]
            }
          }
        });
      }
      events_default.validateEvents(processed);
    });
  }
};
var cap_default = CapAlerts;

// src/@parsers/@events/api.ts
var APIAlerts = class {
  /**
   * @function getTracking
   * @description
   *   Generates a unique tracking identifier for a CAP alert based on extracted XML values.
   *   If VTEC information is available, it constructs the tracking ID from the VTEC components.
   *   Otherwise, it uses the WMO identifier along with TTAI and CCCC attributes.
   *
   * @private
   * @static
   * @param {Record<string, string>} extracted 
   * @returns {string} 
   */
  static getTracking(extracted) {
    var _a, _b, _c, _d;
    if (extracted.pVtec) {
      const vtecValue = Array.isArray(extracted.pVtec) ? extracted.pVtec[0] : extracted.pVtec;
      const splitPVTEC = vtecValue.split(".");
      return `${splitPVTEC[2]}-${splitPVTEC[3]}-${splitPVTEC[4]}-${splitPVTEC[5]}`;
    }
    const wmoMatch = (_a = extracted.wmoidentifier) == null ? void 0 : _a.match(/([A-Z]{4}\d{2})\s+([A-Z]{4})/);
    const station = (_b = wmoMatch == null ? void 0 : wmoMatch[2]) != null ? _b : "N/A";
    if (extracted.featureId) {
      const idMatch = extracted.featureId.match(/([a-f0-9]+)\.(\d+)\.(\d+)$/);
      return `${station}-${(_c = idMatch == null ? void 0 : idMatch[1]) != null ? _c : "N/A"}`;
    }
    const id2 = (_d = wmoMatch == null ? void 0 : wmoMatch[1]) != null ? _d : "N/A";
    return `${station}-${id2}`;
  }
  /**
   * @function getICAO
   * @description
   *    Extracts the sender's ICAO code and corresponding name from a VTEC string.    
   *
   * @private
   * @static
   * @param {string} pVtec 
   * @returns {{ icao: any; name: any; }} 
   */
  static getICAO(pVtec) {
    var _a, _b;
    const icao = pVtec ? pVtec.split(`.`)[2] : null;
    const name = (_b = (_a = definitions.ICAO) == null ? void 0 : _a[icao]) != null ? _b : null;
    return { icao, name };
  }
  /**
   * @function event
   * @description
   *   Processes validated API alert messages, extracting relevant information and compiling it into structured event objects.
   *
   * @public
   * @static
   * @async
   * @param {types.StanzaCompiled} validated 
   * @returns {*} 
   */
  static event(validated) {
    return __async(this, null, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta;
      let processed = [];
      const messages = Object.values(JSON.parse(validated.message).features);
      for (let feature of messages) {
        const tick = performance.now();
        const getPVTEC = (_d = (_c = (_b = (_a = feature == null ? void 0 : feature.properties) == null ? void 0 : _a.parameters) == null ? void 0 : _b.VTEC) == null ? void 0 : _c[0]) != null ? _d : null;
        const getWmo = (_h = (_g = (_f = (_e = feature == null ? void 0 : feature.properties) == null ? void 0 : _e.parameters) == null ? void 0 : _f.WMOidentifier) == null ? void 0 : _g[0]) != null ? _h : null;
        const getUgc = (_k = (_j = (_i = feature == null ? void 0 : feature.properties) == null ? void 0 : _i.geocode) == null ? void 0 : _j.UGC) != null ? _k : null;
        const getHeadline = (_o = (_n = (_m = (_l = feature == null ? void 0 : feature.properties) == null ? void 0 : _l.parameters) == null ? void 0 : _m.NWSheadline) == null ? void 0 : _n[0]) != null ? _o : "";
        const getDescription = `${getHeadline} ${(_q = (_p = feature == null ? void 0 : feature.properties) == null ? void 0 : _p.description) != null ? _q : ``}`;
        const getAWIP = (_u = (_t = (_s = (_r = feature == null ? void 0 : feature.properties) == null ? void 0 : _r.parameters) == null ? void 0 : _s.AWIPSidentifier) == null ? void 0 : _t[0]) != null ? _u : null;
        const getHeader = events_default.getHeader(__spreadValues({}, { getAwip: { prefix: getAWIP == null ? void 0 : getAWIP.slice(0, -3) } }));
        const getSource = (_v = text_default.textProductToString(getDescription, `SOURCE...`, [`.`])) != null ? _v : null;
        const getOffice = this.getICAO(getPVTEC != null ? getPVTEC : ``);
        processed.push({
          type: "Feature",
          properties: {
            locations: (_x = (_w = feature == null ? void 0 : feature.properties) == null ? void 0 : _w.areaDesc) != null ? _x : null,
            event: (_z = (_y = feature == null ? void 0 : feature.properties) == null ? void 0 : _y.event) != null ? _z : null,
            issued: ((_A = feature == null ? void 0 : feature.properties) == null ? void 0 : _A.sent) ? new Date((_B = feature == null ? void 0 : feature.properties) == null ? void 0 : _B.sent).toISOString() : null,
            expires: ((_C = feature == null ? void 0 : feature.properties) == null ? void 0 : _C.expires) ? new Date((_D = feature == null ? void 0 : feature.properties) == null ? void 0 : _D.expires).toISOString() : null,
            parent: (_F = (_E = feature == null ? void 0 : feature.properties) == null ? void 0 : _E.event) != null ? _F : null,
            action_type: (_H = (_G = feature == null ? void 0 : feature.properties) == null ? void 0 : _G.messageType) != null ? _H : null,
            description: (_J = (_I = feature == null ? void 0 : feature.properties) == null ? void 0 : _I.description) != null ? _J : null,
            instruction: (_L = (_K = feature == null ? void 0 : feature.properties) == null ? void 0 : _K.instruction) != null ? _L : null,
            sender_name: (_M = getOffice.name) != null ? _M : null,
            sender_icao: (_N = getOffice.icao) != null ? _N : null,
            attributes: validated.attributes,
            geocode: {
              UGC: (_Q = (_P = (_O = feature == null ? void 0 : feature.properties) == null ? void 0 : _O.geocode) == null ? void 0 : _P.UGC) != null ? _Q : [],
              generated: ((_R = feature == null ? void 0 : feature.geometry) == null ? void 0 : _R.coordinates.length) > 0 ? Buffer.from(JSON.stringify([(_S = feature == null ? void 0 : feature.geometry) == null ? void 0 : _S.coordinates[0]])).toString("base64") : null
            },
            raw: {},
            parameters: {
              wmo: (_X = (_W = (_V = (_U = (_T = feature == null ? void 0 : feature.properties) == null ? void 0 : _T.parameters) == null ? void 0 : _U.WMOidentifier) == null ? void 0 : _V[0]) != null ? _W : getWmo) != null ? _X : null,
              source: getSource,
              max_hail_size: (__ = (_Z = (_Y = feature == null ? void 0 : feature.properties) == null ? void 0 : _Y.parameters) == null ? void 0 : _Z.maxHailSize) != null ? __ : null,
              max_wind_gust: (_ba = (_aa = (_$ = feature == null ? void 0 : feature.properties) == null ? void 0 : _$.parameters) == null ? void 0 : _aa.maxWindGust) != null ? _ba : null,
              damage_threat: (_fa = (_ea = (_da = (_ca = feature == null ? void 0 : feature.properties) == null ? void 0 : _ca.parameters) == null ? void 0 : _da.thunderstormDamageThreat) == null ? void 0 : _ea[0]) != null ? _fa : null,
              tornado_detection: (_ja = (_ia = (_ha = (_ga = feature == null ? void 0 : feature.properties) == null ? void 0 : _ga.parameters) == null ? void 0 : _ha.tornadoDetection) == null ? void 0 : _ia[0]) != null ? _ja : null,
              flood_detection: (_na = (_ma = (_la = (_ka = feature == null ? void 0 : feature.properties) == null ? void 0 : _ka.parameters) == null ? void 0 : _la.floodDetection) == null ? void 0 : _ma[0]) != null ? _na : null,
              discussion_tornado_intensity: null,
              discussion_wind_intensity: null,
              discussion_hail_intensity: null
            },
            details: {
              performance: performance.now() - tick,
              source: `api-parser`,
              tracking: this.getTracking({
                pVtec: getPVTEC,
                wmoidentifier: getWmo,
                featureId: feature == null ? void 0 : feature.id,
                ugc: getUgc ? getUgc.join(`,`) : null
              }),
              header: getHeader,
              pvtec: getPVTEC != null ? getPVTEC : null,
              history: [{
                description: (_pa = (_oa = feature == null ? void 0 : feature.properties) == null ? void 0 : _oa.description) != null ? _pa : null,
                action: (_ra = (_qa = feature == null ? void 0 : feature.properties) == null ? void 0 : _qa.messageType) != null ? _ra : null,
                time: ((_sa = feature == null ? void 0 : feature.properties) == null ? void 0 : _sa.sent) ? new Date((_ta = feature == null ? void 0 : feature.properties) == null ? void 0 : _ta.sent).toISOString() : null
              }]
            }
          }
        });
      }
      events_default.validateEvents(processed);
    });
  }
};
var api_default = APIAlerts;

// src/@parsers/events.ts
var EventParser = class {
  /**
   * @function getBaseProperties
   * @description
   *     Extracts and compiles the core properties of a weather
   *     alert message into a structured object. Combines parsed
   *     textual data, UGC information, VTEC entries, and additional
   *     metadata for downstream use.
   *
   * @static
   * @async
   * @param {string} message
   * @param {types.StanzaCompiled} metadata
   * @param {types.UGCEntry} [ugc=null]
   * @param {types.PVtecEntry} [pVtec=null]
   * @param {types.HVtecEntry} [hVtec=null]
   * @returns {Promise<Record<string, any>>}
   */
  static getBaseProperties(message, metadata, ugc = null, pVtec = null, hVtec = null) {
    return __async(this, null, function* () {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
      const settings2 = settings;
      const definitions2 = {
        tornado: (_b = (_a = text_default.textProductToString(message, `TORNADO...`)) != null ? _a : text_default.textProductToString(message, `WATERSPOUT...`)) != null ? _b : null,
        hail: (_d = (_c = text_default.textProductToString(message, `MAX HAIL SIZE...`, [`IN`])) != null ? _c : text_default.textProductToString(message, `HAIL...`, [`IN`])) != null ? _d : null,
        gusts: (_f = (_e = text_default.textProductToString(message, `MAX WIND GUST...`)) != null ? _e : text_default.textProductToString(message, `WIND...`)) != null ? _f : null,
        flood: (_g = text_default.textProductToString(message, `FLASH FLOOD...`)) != null ? _g : null,
        damage: (_h = text_default.textProductToString(message, `DAMAGE THREAT...`)) != null ? _h : null,
        source: (_i = text_default.textProductToString(message, `SOURCE...`, [`.`])) != null ? _i : null,
        description: text_default.textProductToDescription(message, (_j = pVtec == null ? void 0 : pVtec.raw) != null ? _j : null),
        polygon: text_default.textProductToPolygon(message),
        wmo: (_l = (_k = message.match(definitions.regular_expressions.wmo)) == null ? void 0 : _k[0]) != null ? _l : null,
        mdTorIntensity: (_m = text_default.textProductToString(message, `MOST PROBABLE PEAK TORNADO INTENSITY...`)) != null ? _m : null,
        mdWindGusts: (_n = text_default.textProductToString(message, `MOST PROBABLE PEAK WIND GUST...`)) != null ? _n : null,
        mdHailSize: (_o = text_default.textProductToString(message, `MOST PROBABLE PEAK HAIL SIZE...`)) != null ? _o : null
      };
      const getOffice = this.getICAO(pVtec, metadata, definitions2.wmo);
      const getCorrectIssued = this.getCorrectIssuedDate(metadata);
      const getCorrectExpiry = this.getCorrectExpiryDate(pVtec, ugc);
      const base = {
        locations: (_p = ugc == null ? void 0 : ugc.locations.join(`; `)) != null ? _p : `No Location Specified (UGC Missing)`,
        issued: getCorrectIssued,
        expires: getCorrectExpiry,
        geocode: {
          UGC: (_q = ugc == null ? void 0 : ugc.zones) != null ? _q : [],
          generated: definitions2.polygon.length > 0 ? Buffer.from(JSON.stringify([definitions2.polygon])).toString("base64") : null
        },
        description: definitions2.description,
        instruction: null,
        sender_name: getOffice.name,
        sender_icao: getOffice.icao,
        raw: __spreadValues({}, Object.fromEntries(Object.entries(metadata).filter(([key]) => key !== "message"))),
        parameters: {
          wmo: Array.isArray(definitions2.wmo) ? definitions2.wmo[0] : (_r = definitions2.wmo) != null ? _r : null,
          source: definitions2.source,
          max_hail_size: definitions2.hail,
          max_wind_gust: definitions2.gusts,
          damage_threat: definitions2.damage,
          tornado_detection: definitions2.tornado,
          flood_detection: definitions2.flood,
          discussion_tornado_intensity: definitions2.mdTorIntensity,
          discussion_wind_intensity: definitions2.mdWindGusts,
          discussion_hail_intensity: definitions2.mdHailSize
        }
      };
      return base;
    });
  }
  /**
   * @function getEventGeometry
   * @description
   *   Determines the geometry of an event using polygon data fromEntries
   *   in the message or UGC shapefile coordinates if enabled in settings. Falls
   *   back to null if no geometry can be determined.
   * 
   * @static
   * @param {string} generated
   * @param {types.UGCEntry} [ugc=null]
   * @returns {Promise<types.geometry>}
   */
  static getEventGeometry(generated, ugc = null, isUnion = true) {
    return __async(this, null, function* () {
      const settings2 = settings;
      let geometry = { type: "Polygon", coordinates: generated != null ? JSON.parse(Buffer.from(generated, "base64").toString("utf-8")) : null };
      if (settings2.global_settings.shapefile_coordinates && generated == null && ugc != null) {
        const coordinates = yield ugc_default.getCoordinates(ugc.zones, isUnion);
        geometry = coordinates;
      }
      return geometry;
    });
  }
  /**
   * @function betterParsedEventName
   * @description
   *     Enhances the parsing of an event name using additional criteria
   *     from its description and parameters. Can optionally use
   *     the original parent event name instead.
   *
   * @static
   * @param {types.EventCompiled} event
   * @param {boolean} [betterParsing=false]
   * @param {boolean} [useParentEvents=false]
   * @returns {string}
   */
  static betterParsedEventName(event, betterParsing, useParentEvents) {
    var _a, _b, _c, _d, _e, _f;
    let eventName = (_b = (_a = event == null ? void 0 : event.properties) == null ? void 0 : _a.event) != null ? _b : `Unknown Event`;
    const defEventTable = definitions.enhancedEvents;
    const properties = event == null ? void 0 : event.properties;
    const parameters = properties == null ? void 0 : properties.parameters;
    const description = ((_c = properties == null ? void 0 : properties.description) != null ? _c : `Unknown Description`).toLowerCase();
    const damageThreatTag = (_d = parameters == null ? void 0 : parameters.damage_threat) != null ? _d : null;
    const tornadoThreatTag = (_e = parameters == null ? void 0 : parameters.tornado_detection) != null ? _e : null;
    if (!betterParsing) {
      return eventName;
    }
    for (const eventGroup of defEventTable) {
      const [baseEvent, conditions] = Object.entries(eventGroup)[0];
      if (eventName === baseEvent) {
        for (const [specificEvent, condition] of Object.entries(conditions)) {
          let conditionMet = false;
          if (condition.description) {
            conditionMet = description.includes(condition.description.toLowerCase());
            if (!conditionMet) continue;
          }
          if (!conditionMet && condition.condition) {
            const tagToCheck = baseEvent.includes("Tornado") ? tornadoThreatTag : damageThreatTag;
            conditionMet = condition.condition(tagToCheck);
          }
          if (conditionMet) {
            eventName = specificEvent;
            break;
          }
        }
        if (baseEvent === "Severe Thunderstorm Warning" && tornadoThreatTag === "POSSIBLE" && !eventName.includes("(TPROB)")) {
          eventName += " (TPROB)";
        }
        break;
      }
    }
    return useParentEvents ? (_f = event == null ? void 0 : event.properties) == null ? void 0 : _f.event : eventName;
  }
  /**
   * @function validateEvents
   * @description
   *     Processes an array of event objects and filters them based on
   *     global and EAS filtering settings, and
   *     other criteria such as expired or test products. Valid events
   *     trigger relevant event emitters.
   *
   * @static
   * @param {unknown[]} events
   * @returns {Promise<void>}
   */
  static validateEvents(events3) {
    return __async(this, null, function* () {
      var _a, _b, _c, _d, _e;
      if (events3.length == 0) return;
      const filteringSettings = (_b = (_a = settings) == null ? void 0 : _a.global_settings) == null ? void 0 : _b.filtering;
      const easSettings = (_d = (_c = settings) == null ? void 0 : _c.global_settings) == null ? void 0 : _d.eas_settings;
      const globalSettings = (_e = settings) == null ? void 0 : _e.global_settings;
      const sets = {};
      const bools = {};
      const megered = __spreadValues(__spreadValues(__spreadValues({}, filteringSettings), easSettings), globalSettings);
      for (const key in megered) {
        const setting = megered[key];
        if (Array.isArray(setting)) {
          sets[key] = new Set(setting.map((item) => item.toLowerCase()));
        }
        if (typeof setting === "boolean") {
          bools[key] = setting;
        }
      }
      const filtered = events3.filter((event) => {
        var _a2, _b2;
        const originalEvent = this.buildDefaultSignature(event);
        const props = originalEvent == null ? void 0 : originalEvent.properties;
        const ugcs = (_b2 = (_a2 = props == null ? void 0 : props.geocode) == null ? void 0 : _a2.UGC) != null ? _b2 : [];
        const _c2 = originalEvent.properties, { details } = _c2, properties = __objRest(_c2, ["details"]);
        originalEvent.properties.parent = originalEvent.properties.event;
        originalEvent.properties.event = this.betterParsedEventName(originalEvent, bools == null ? void 0 : bools.better_event_parsing, bools == null ? void 0 : bools.parent_events_only);
        originalEvent.properties.hash = packages.crypto.createHash("md5").update(JSON.stringify(properties)).digest("hex");
        if (originalEvent.properties.is_test == true) {
          cache.events.emit(`onTest`, originalEvent);
          if (bools == null ? void 0 : bools.ignore_test_products) {
            return false;
          }
        }
        if (originalEvent.properties.is_cancelled == true) {
          cache.events.emit(`onExpired`, originalEvent);
          if (bools == null ? void 0 : bools.check_expired) {
            return false;
          }
        }
        cache.events.emit(`on${originalEvent.properties.event.replace(/\s+/g, "")}`, originalEvent);
        for (const key in sets) {
          const setting = sets[key];
          if (key === "events" && setting.size > 0 && !setting.has(originalEvent.properties.event.toLowerCase())) {
            cache.events.emit(`onFilteredEvent`, originalEvent);
            return false;
          }
          if (key === "ignored_events" && setting.size > 0 && setting.has(originalEvent.properties.event.toLowerCase())) {
            cache.events.emit(`onIgnoredEvent`, originalEvent);
            return false;
          }
          if (key === "filtered_icao" && setting.size > 0 && props.sender_icao != null && !setting.has(props.sender_icao.toLowerCase())) {
            cache.events.emit(`onFilteredICAO`, originalEvent);
            return false;
          }
          if (key === "ignored_icao" && setting.size > 0 && props.sender_icao != null && setting.has(props.sender_icao.toLowerCase())) {
            cache.events.emit(`onIgnoredICAO`, originalEvent);
            return false;
          }
          if (key === "ugc_filter" && setting.size > 0 && ugcs.length > 0 && !ugcs.some((ugc) => setting.has(ugc.toLowerCase()))) {
            cache.events.emit(`onFilteredUGC`, originalEvent);
            return false;
          }
          if (key === "state_filter" && setting.size > 0 && ugcs.length > 0 && !ugcs.some((ugc) => setting.has(ugc.substring(0, 2).toLowerCase()))) {
            cache.events.emit(`onFilteredState`, originalEvent);
            return false;
          }
        }
        return true;
      });
      for (const event of filtered) {
        if (!settings.global_settings.ignore_geometry_parsing) {
          const geometry = yield this.getEventGeometry(event.properties.geocode.generated, {
            zones: event.properties.geocode != null ? event.properties.geocode.UGC : null
          });
          event.geometry = geometry;
        }
      }
      if (filtered.length > 0) {
        cache.events.emit(`onEvents`, filtered);
      }
    });
  }
  /**
   * @function getHeader
   * @description
   *     Constructs a standardized alert header string using provided
   *     stanza attributes, event properties, and optional VTEC data.
   *
   * @static
   * @param {types.StanzaAttributes} attributes
   * @param {types.EventProperties} [properties]
   * @param {types.PVtecEntry} [pVtec]
   * @returns {string}
   */
  static getHeader(attributes, properties, pVtec) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    const parent = `ATSX`;
    const alertType = (_d = (_c = (_a = attributes == null ? void 0 : attributes.awipsType) == null ? void 0 : _a.type) != null ? _c : (_b = attributes == null ? void 0 : attributes.getAwip) == null ? void 0 : _b.prefix) != null ? _d : `XX`;
    const ugc = ((_e = properties == null ? void 0 : properties.geocode) == null ? void 0 : _e.UGC) != null ? (_f = properties == null ? void 0 : properties.geocode) == null ? void 0 : _f.UGC.join(`-`) : `000000`;
    const status2 = (_g = pVtec == null ? void 0 : pVtec.status) != null ? _g : "Issued";
    const issued = (properties == null ? void 0 : properties.issued) != null ? (_h = new Date(properties == null ? void 0 : properties.issued)) == null ? void 0 : _h.toISOString().replace(/[-:]/g, "").split(".")[0] : (/* @__PURE__ */ new Date()).toISOString().replace(/[-:]/g, "").split(".")[0];
    const sender = (_i = properties == null ? void 0 : properties.sender_icao) != null ? _i : `XXXX`;
    const header = `ZCZC-${parent}-${alertType}-${ugc}-${status2}-${issued}-${sender}-`;
    return header;
  }
  /**
   * @function eventHandler
   * @description
   *     Routes a validated stanza object to the appropriate alert handler
   *     based on its type flags: API, CAP, pVTEC (Primary VTEC), UGC, or plain text.
   *
   * @static
   * @param {types.StanzaCompiled} metadata
   * @returns {void}
   */
  static eventHandler(metadata) {
    const settings2 = settings;
    const preferences = settings2.noaa_weather_wire_service_settings.preferences;
    if (metadata.isApi) return api_default.event(metadata);
    if (metadata.isCap) return cap_default.event(metadata);
    if (!preferences.disable_vtec && !metadata.isCap && metadata.isPVtec && metadata.isUGC) return vtec_default.event(metadata);
    if (!preferences.disable_ugc && !metadata.isCap && !metadata.isPVtec && metadata.isUGC) return ugc_default2.event(metadata);
    if (!preferences.disable_text && !metadata.isCap && !metadata.isPVtec && !metadata.isUGC) return text_default2.event(metadata);
    return;
  }
  /**
   * @function getICAO
   * @description
   *     Determines the ICAO code and corresponding name for an event.
   *     Priority is given to the VTEC tracking code, then the attributes' `cccc` property, 
   *     and finally the WMO code if available. Returns null if none are found.
   *
   * @private
   * @static
   * @param {types.PVtecEntry | null} pVtec
   * @param {Record<string, string>} metadata
   * @param {RegExpMatchArray | string | null} WMO
   * @returns {{ icao: string; name: string }}
   */
  static getICAO(pVtec, metadata, WMO) {
    var _a, _b, _c;
    const icao = pVtec != null ? pVtec == null ? void 0 : pVtec.tracking.split(`-`)[0] : ((_a = metadata.attributes) == null ? void 0 : _a.cccc) || (WMO != null ? Array.isArray(WMO) ? WMO[0] : WMO : null);
    const name = (_c = (_b = definitions.ICAO) == null ? void 0 : _b[icao]) != null ? _c : null;
    return { icao, name };
  }
  /**
   * @function getCorrectIssuedDate
   * @description
   *     Determines the issued date for an event based on the provided attributes.
   *     Falls back to the current date and time if no valid issue date is available.
   *
   * @private
   * @static
   * @param {Record<string, string>} metadata
   * @returns {string}
   */
  static getCorrectIssuedDate(metadata) {
    var _a;
    const time = metadata.attributes.issue != null ? new Date(metadata.attributes.issue).toISOString() : ((_a = metadata.attributes) == null ? void 0 : _a.issue) != null ? new Date(metadata.attributes.issue).toISOString() : (/* @__PURE__ */ new Date()).toISOString();
    return time;
  }
  /**
   * @function getCorrectExpiryDate
   * @description
   *     Determines the most appropriate expiry date for an event using VTEC or UGC data.
   *     Falls back to one hour from the current time if no valid expiry is available.
   *
   * @private
   * @static
   * @param {types.PVtecEntry} pVtec
   * @param {types.UGCEntry} ugc
   * @returns {string}
   */
  static getCorrectExpiryDate(pVtec, ugc) {
    const time = (pVtec == null ? void 0 : pVtec.expires) && !isNaN(new Date(pVtec.expires).getTime()) ? new Date(pVtec.expires).toISOString() : (ugc == null ? void 0 : ugc.expiry) != null ? new Date(ugc.expiry).toISOString() : new Date((/* @__PURE__ */ new Date()).getTime() + 1 * 60 * 60 * 1e3);
    if (isNaN(new Date(time).getTime())) {
      return `Until Further Notice`;
    }
    return time;
  }
  /**
   * @function buildDefaultSignature
   * @description
   *     Populates default properties for an event object, including action type flags,
   *     tags, and status updates. Determines if the event is issued, updated, or cancelled
   *     based on correlations, description content, VTEC codes, and expiration time.
   *
   * @private
   * @static
   * @param {any} event
   * @returns {types.EventCompiled}
   */
  static buildDefaultSignature(event) {
    var _a, _b, _c, _d;
    const props = (_a = event.properties) != null ? _a : {};
    const statusCorrelation = definitions.correlations.find((c) => c.type === props.action_type);
    const defEventTags = definitions.tags;
    const tags2 = Object.entries(defEventTags).filter(([key]) => {
      var _a2;
      return (_a2 = props == null ? void 0 : props.description) == null ? void 0 : _a2.toLowerCase().includes(key.toLowerCase());
    }).map(([, value]) => value);
    props.tags = tags2.length > 0 ? tags2 : [];
    if (statusCorrelation) {
      props.action_type = (_b = statusCorrelation.forward) != null ? _b : props.action_type;
      props.is_updated = !!statusCorrelation.update;
      props.is_issued = !!statusCorrelation.new;
      props.is_cancelled = !!statusCorrelation.cancel;
    } else {
      props.is_issued = true;
    }
    if (props.description) {
      const detectedPhrase = definitions.cancelSignatures.find((sig) => props.description.toLowerCase().includes(sig.toLowerCase()));
      if (detectedPhrase) {
        props.is_cancelled = true;
      }
    }
    if ((_c = props.details) == null ? void 0 : _c.pvtec) {
      const getType = (_d = props.details.pvtec.split(`.`)[0]) == null ? void 0 : _d.replace(`/`, ``);
      const isTestProduct = definitions.productTypes[getType] == `Test Product`;
      const isTestSig = [`This is a test message`, `THIS_MESSAGE_IS_FOR_TEST_PURPOSES_ONLY`];
      if (isTestProduct || isTestSig.some((sig) => {
        var _a2, _b2;
        return ((_a2 = props == null ? void 0 : props.description) == null ? void 0 : _a2.toLowerCase().includes(sig.toLowerCase())) || ((_b2 = props == null ? void 0 : props.instruction) == null ? void 0 : _b2.toLowerCase().includes(sig.toLowerCase()));
      })) {
        props.is_test = true;
      }
    }
    if (new Date(props == null ? void 0 : props.expires).getTime() < (/* @__PURE__ */ new Date()).getTime()) {
      props.is_cancelled = true;
    }
    return event;
  }
};
var events_default = EventParser;

// src/@parsers/stanza.ts
var StanzaParser = class {
  /**
   * @function validate
   * @description
   *     Validates and parses a stanza message, extracting its attributes and metadata.
   *     Handles both raw message strings (for debug/testing) and actual stanza objects.
   *     Determines whether the message is a CAP alert, contains VTEC codes, or contains UGCs,
   *     and identifies the AWIPS product type and prefix.
   *
   * @static
   * @param {any} stanza
   * @param {boolean | types.StanzaAttributes} [isDebug=false]
   * @returns {{
   *     message: string;
   *     attributes: types.StanzaAttributes;
   *     isCap: boolean,
   *     isPVtec: boolean;
   *     isCapDescription: boolean;
   *     awipsType: Record<string, string>;
   *     isApi: boolean;
   *     ignore: boolean;
   *     isUGC?: boolean;
   * }}
   */
  static validate(stanza, isDebug = false) {
    var _a;
    if (isDebug !== false) {
      const vTypes = isDebug;
      const message = stanza;
      const attributes = vTypes;
      const isCap = (_a = vTypes.isCap) != null ? _a : message.includes(`<?xml`);
      const isCapDescription = message.includes(`<areaDesc>`);
      const isPVtec = message.match(definitions.regular_expressions.pvtec) != null;
      const isUGC = message.match(definitions.regular_expressions.ugc1) != null;
      const awipsType = this.getType(attributes);
      return { message, attributes, isCap, isPVtec, isUGC, isCapDescription, awipsType, isApi: false, ignore: false };
    }
    if (stanza.is(`message`)) {
      let cb = stanza.getChild(`x`);
      if (cb && cb.children) {
        let message = decodeURI(cb.children[0]);
        let attributes = cb.attrs;
        if (attributes.awipsid && attributes.awipsid.length > 1) {
          const isCap = message.includes(`<?xml`);
          const isCapDescription = message.includes(`<areaDesc>`);
          const isPVtec = message.match(definitions.regular_expressions.pvtec) != null;
          const isUGC = message.match(definitions.regular_expressions.ugc1) != null;
          const awipsType = this.getType(attributes);
          return { message, attributes, isCap, isPVtec, isUGC, isCapDescription, awipsType, isApi: false, ignore: false };
        }
      }
    }
    return { message: null, attributes: null, isApi: null, isCap: null, isPVtec: null, isUGC: null, isCapDescription: null, awipsType: null, ignore: true };
  }
  /**
   * @function getType
   * @description
   *     Determines the AWIPS product type and prefix from a stanza's attributes.
   *     Returns a default type of 'XX' if the attributes are missing or the AWIPS ID
   *     does not match any known definitions.
   *
   * @private
   * @static
   * @param {unknown} attributes
   * @returns {Record<string, string>}
   */
  static getType(attributes) {
    const attrs = attributes;
    if (!(attrs == null ? void 0 : attrs.awipsid)) return { type: "XX", prefix: "XX" };
    const awipsDefs = definitions.awips;
    for (const [prefix, type] of Object.entries(awipsDefs)) {
      if (attrs.awipsid.startsWith(prefix)) {
        return { type, prefix };
      }
    }
    return { type: "XX", prefix: "XX" };
  }
};
var stanza_default = StanzaParser;

// src/@submodules/database.ts
var Database = class {
  /**
   * @function stanzaCacheImport
   * @description
   *     Inserts a single NWWS stanza into the database cache. If the total number
   *     of stanzas exceeds the configured maximum history, it deletes the oldest
   *     entries to maintain the limit. Duplicate stanzas are ignored.
   *
   * @static
   * @async
   * @param {string} stanza - The raw stanza XML or text to store in the database.
   * @returns {Promise<void>} - Resolves when the stanza has been inserted and any necessary pruning of old stanzas has been performed.
   */
  static stanzaCacheImport(stanza) {
    return __async(this, null, function* () {
      var _a, _b;
      const settings2 = settings;
      try {
        const db = cache.db;
        if (!db) return;
        db.prepare(`INSERT OR IGNORE INTO stanzas (type, stanza, issued) VALUES (?, ?, ?)`).run((_a = stanza == null ? void 0 : stanza.awipsType) == null ? void 0 : _a.type, JSON.stringify(stanza), (_b = stanza == null ? void 0 : stanza.attributes) == null ? void 0 : _b.issue);
        const countRow = db.prepare(`SELECT COUNT(*) AS total FROM stanzas`).get();
        const totalRows = countRow.total;
        const maxHistory = settings2.noaa_weather_wire_service_settings.cache.max_db_history;
        if (totalRows > maxHistory) {
          const rowsToDelete = Math.floor((totalRows - maxHistory) / 2);
          if (rowsToDelete > 0) {
            db.prepare(`
                        DELETE FROM stanzas 
                        WHERE rowid IN (
                            SELECT rowid 
                            FROM stanzas 
                            ORDER BY rowid ASC 
                            LIMIT ?
                        )
                    `).run(rowsToDelete);
          }
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        utils_default.warn(`Failed to import stanza into cache: ${msg}. Please try to delete ${settings2.database} and restart the application.`);
      }
    });
  }
  /**
   * @function loadDatabase
   * @description
   *     Initializes the application's SQLite database, creating necessary tables
   *     for storing stanzas and shapefiles. If the shapefiles table is empty,
   *     it imports predefined shapefiles from disk, processes their features,
   *     and populates the database. Emits warnings during the import process.
   *
   * @static
   * @async
   * @returns {Promise<void>} - Resolves when the database has been initialized and shapefiles have been imported if necessary.
   */
  static loadDatabase() {
    return __async(this, null, function* () {
      const settings2 = settings;
      try {
        const { fs: fs2, path: path2, sqlite3: sqlite32, shapefile: shapefile2 } = packages;
        if (!fs2.existsSync(settings2.database)) fs2.writeFileSync(settings2.database, "");
        cache.db = new sqlite32(settings2.database);
        cache.db.prepare(`
                CREATE TABLE IF NOT EXISTS stanzas (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    type TEXT,
                    issued TEXT,
                    stanza TEXT
                )
            `).run();
        cache.db.prepare(`
                CREATE TABLE IF NOT EXISTS shapefiles (
                    id TEXT PRIMARY KEY,
                    location TEXT,
                    geometry TEXT
                )
            `).run();
        const shapefileCount = cache.db.prepare(`SELECT COUNT(*) AS count FROM shapefiles`).get().count;
        if (shapefileCount === 0) {
          yield utils_default.sleep(1e3);
          utils_default.warn(definitions.messages.shapefile_creation);
          for (const shape of definitions.shapefiles_directory) {
            const name = shape.name;
            const type = shape.id;
            const link = shape.link;
            const response2 = yield packages.axios.get(link, { responseType: "arraybuffer" });
            const zip = new packages.jszip();
            const content = yield zip.loadAsync(response2.data);
            const dirPath = path2.resolve(__dirname, "../../shapefiles");
            if (!fs2.existsSync(dirPath)) fs2.mkdirSync(dirPath);
            for (const fileName of Object.keys(content.files)) {
              if (fileName.endsWith(".shp") || fileName.endsWith(".dbf")) {
                const fileData = yield content.files[fileName].async("nodebuffer");
                const outputPath = path2.resolve(dirPath, `${name}_${type}${path2.extname(fileName)}`);
                fs2.writeFileSync(outputPath, fileData);
                utils_default.warn(`Successfully downloaded and extracted ${fileName}`);
              }
            }
            const filepath = path2.resolve(__dirname, "../../shapefiles", shape.name + "_" + shape.id);
            const { features } = yield shapefile2.read(
              filepath,
              filepath
            );
            utils_default.warn(`Importing ${features.length} entries from ${shape.name}_${shape.id}...`);
            const insertStmt = cache.db.prepare(`
                        INSERT OR REPLACE INTO shapefiles (id, location, geometry) VALUES (?, ?, ?)
                    `);
            const insertTransaction = cache.db.transaction((entries) => {
              for (const feature of entries) {
                const { properties, geometry } = feature;
                let final2, location;
                if (properties.FIPS) {
                  final2 = `${properties.STATE}${shape.id}${properties.FIPS.substring(2)}`;
                  location = `${properties.COUNTYNAME}, ${properties.STATE}`;
                } else if (properties.FULLSTAID) {
                  final2 = `${properties.ST}${shape.id}${properties.WFO}`;
                  location = `${properties.CITY}, ${properties.STATE}`;
                } else if (properties.STATE) {
                  final2 = `${properties.STATE}${shape.id}${properties.ZONE}`;
                  location = `${properties.NAME}, ${properties.STATE}`;
                } else {
                  final2 = properties.ID;
                  location = properties.NAME;
                }
                insertStmt.run(final2, location, JSON.stringify(geometry));
              }
            });
            fs2.unlinkSync(filepath + ".shp");
            fs2.unlinkSync(filepath + ".dbf");
            utils_default.warn(`Cleaned up temporary files for ${shape.name}_${shape.id}`);
            insertTransaction(features);
          }
          utils_default.warn(definitions.messages.shapefile_creation_finished);
          fs2.rm(path2.resolve(__dirname, "../../shapefiles"), { recursive: true, force: true }, () => {
          });
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        utils_default.warn(`Failed to load database: ${msg}`);
      }
    });
  }
};
var database_default = Database;

// src/@submodules/xmpp.ts
var Xmpp = class {
  /** 
   * @function isSessionReconnectionEligible
   * @description
   *     Checks if the XMPP session has been inactive longer than the given interval
   *     and, if so, attempts a controlled reconnection.
   *
   * @async
   * @static
   * @param {number} currentInterval
   * @returns {Promise<void>}
   */
  static isSessionReconnectionEligible(currentInterval) {
    return __async(this, null, function* () {
      const settings2 = settings;
      const lastStanzaElapsed = Date.now() - cache.lastStanza;
      const threshold = currentInterval * 1e3;
      if (!cache.isConnected && !cache.sigHalt || !cache.session) {
        return;
      }
      if (lastStanzaElapsed < threshold) {
        return;
      }
      if (cache.attemptingReconnect) {
        return;
      }
      cache.attemptingReconnect = true;
      cache.isConnected = false;
      cache.totalReconnects += 1;
      try {
        cache.events.emit("onReconnection", {
          reconnects: cache.totalReconnects,
          lastStanza: lastStanzaElapsed,
          lastName: settings2.noaa_weather_wire_service_settings.credentials.nickname
        });
        yield cache.session.stop().catch(() => {
        });
        yield cache.session.start().catch(() => {
        });
      } catch (err) {
        utils_default.warn(`XMPP reconnection failed: ${err.message}`);
      } finally {
        cache.attemptingReconnect = false;
      }
    });
  }
  /**
   * @function deploySession
   * @description
   *     Initializes the NOAA Weather Wire Service (NWWS-OI) XMPP client session and
   *     manages its lifecycle events including connection, disconnection, errors,
   *     and message handling.
   *
   * @async
   * @static
   * @returns {Promise<void>}
   */
  static deploySession() {
    return __async(this, null, function* () {
      var _a, _b;
      const settings2 = settings;
      (_b = (_a = settings2.noaa_weather_wire_service_settings.credentials).nickname) != null ? _b : _a.nickname = settings2.noaa_weather_wire_service_settings.credentials.username;
      cache.session = packages.xmpp.client({
        service: "xmpp://nwws-oi.weather.gov",
        domain: "nwws-oi.weather.gov",
        username: settings2.noaa_weather_wire_service_settings.credentials.username,
        password: settings2.noaa_weather_wire_service_settings.credentials.password
      });
      cache.session.on("online", (address) => __async(null, null, function* () {
        const now = Date.now();
        if (cache.lastConnect && now - cache.lastConnect < 1e4) {
          cache.sigHalt = true;
          utils_default.warn(definitions.messages.reconnect_too_fast);
          yield utils_default.sleep(2e3);
          yield cache.session.stop().catch(() => {
          });
          return;
        }
        cache.isConnected = true;
        cache.sigHalt = false;
        cache.lastConnect = now;
        cache.session.send(packages.xmpp.xml("presence", {
          to: `nwws@conference.nwws-oi.weather.gov/${settings2.noaa_weather_wire_service_settings.credentials.nickname}`,
          xmlns: "http://jabber.org/protocol/muc"
        }));
        cache.events.emit("onConnection", settings2.noaa_weather_wire_service_settings.credentials.nickname);
        if (cache.attemptingReconnect) return;
        cache.attemptingReconnect = true;
        yield utils_default.sleep(15e3);
        cache.attemptingReconnect = false;
      }));
      cache.session.on("offline", () => {
        cache.isConnected = false;
        cache.sigHalt = true;
        utils_default.warn("XMPP connection went offline");
      });
      cache.session.on("error", (error) => {
        cache.isConnected = false;
        cache.sigHalt = true;
        utils_default.warn(`XMPP connection error: ${error.message}`);
      });
      cache.session.on("stanza", (stanza) => __async(null, null, function* () {
        var _a2;
        try {
          cache.lastStanza = Date.now();
          if (stanza.is("message")) {
            const validate = stanza_default.validate(stanza);
            const skipMessage = validate.ignore || validate.isCap && !settings2.noaa_weather_wire_service_settings.preferences.cap_only || !validate.isCap && settings2.noaa_weather_wire_service_settings.preferences.cap_only || validate.isCap && !validate.isCapDescription;
            if (skipMessage) return;
            yield events_default.eventHandler(validate);
            yield database_default.stanzaCacheImport(validate);
            cache.events.emit("onMessage", validate);
          }
          if (stanza.is("presence") && ((_a2 = stanza.attrs.from) == null ? void 0 : _a2.startsWith("nwws@conference.nwws-oi.weather.gov/"))) {
            const occupant = stanza.attrs.from.split("/").slice(1).join("/");
            cache.events.emit("onOccupant", {
              occupant,
              type: stanza.attrs.type === "unavailable" ? "unavailable" : "available"
            });
          }
        } catch (err) {
          utils_default.warn(`Error processing stanza: ${err.message}`);
        }
      }));
      try {
        yield cache.session.start();
      } catch (err) {
        utils_default.warn(`Failed to start XMPP session: ${err.message}`);
      }
    });
  }
};
var xmpp_default = Xmpp;

// src/@submodules/utils.ts
var Utils = class _Utils {
  /**
   * @function sleep
   * @description
   *     Pauses execution for a specified number of milliseconds.
   *
   * @static
   * @async
   * @param {number} ms
   * @returns {Promise<void>}
   */
  static sleep(ms) {
    return __async(this, null, function* () {
      return new Promise((resolve5) => setTimeout(resolve5, ms));
    });
  }
  /**
   * @function warn
   * @description
   *     Emits a log event and prints a warning to the console. Throttles repeated
   *     warnings within a short interval unless `force` is `true`.
   *
   * @static
   * @param {string} message
   * @param {boolean} [force=false]
   * @returns {void}
   */
  static warn(message, force = false) {
    cache.events.emit("log", message);
    if (!settings.journal) return;
    if (cache.lastWarn != null && Date.now() - cache.lastWarn < 500 && !force) return;
    cache.lastWarn = Date.now();
    console.warn(`\x1B[33m[ATMOSX-PARSER]\x1B[0m [${(/* @__PURE__ */ new Date()).toLocaleString()}] ${message}`);
  }
  /**
   * @function loadCollectionCache
   * @description
   *      Loads cached stanzas from the database, validates them, and processes them through the event parser. 
   *      Only processes stanzas that are not marked to be ignored and match the CAP preferences.
   *     
   * @static
   * @async
   * @returns {Promise<void>}
   */
  static loadCollectionCache() {
    return __async(this, null, function* () {
      var _a;
      try {
        const settings2 = settings;
        if (settings2.noaa_weather_wire_service_settings.cache.enabled) {
          const maxRows = (_a = settings2.noaa_weather_wire_service_settings.cache.max_db_cache_size) != null ? _a : 5e3;
          const rows = yield cache.db.prepare(`SELECT * FROM stanzas ORDER BY rowid DESC LIMIT ?`).all(maxRows);
          this.warn(definitions.messages.dump_cache.replace(`{count}`, rows.length.toString()), true);
          const eventsToProcess = rows.map((row) => {
            return JSON.parse(row.stanza);
          }).filter((validate) => {
            if (!validate) return false;
            const skip = validate.ignore || validate.isCap && !settings2.noaa_weather_wire_service_settings.preferences.cap_only || !validate.isCap && settings2.noaa_weather_wire_service_settings.preferences.cap_only || validate.isCap && !validate.isCapDescription;
            return !skip;
          });
          yield Promise.all(eventsToProcess.map((validate) => events_default.eventHandler(validate)));
          this.warn(definitions.messages.dump_cache_complete, true);
          return;
        }
      } catch (error) {
        _Utils.warn(`Failed to load cache: ${error.stack}`);
      }
    });
  }
  /**
   * @function loadGeoJsonData
   * @description
   *     Fetches GeoJSON data from the National Weather Service endpoint and
   *     passes it to the event parser for processing.
   *
   * @static
   * @async
   * @returns {Promise<void>}
   */
  static loadGeoJsonData() {
    return __async(this, null, function* () {
      try {
        const settings2 = settings;
        const response2 = yield this.createHttpRequest(
          settings2.national_weather_service_settings.endpoint
        );
        if (response2.error) return;
        events_default.eventHandler({
          message: JSON.stringify(response2.message),
          attributes: {},
          isCap: true,
          isApi: true,
          isPVtec: false,
          isUGC: false,
          isCapDescription: false,
          awipsType: { type: "api", prefix: "AP" },
          ignore: false
        });
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        _Utils.warn(`Failed to load National Weather Service GeoJSON Data: ${msg}`);
      }
    });
  }
  /**
   * @function createHttpRequest
   * @description
   *     Performs an HTTP GET request with default headers and timeout, returning
   *     either the response data or an error message.
   *
   * @static
   * @template T
   * @param {string} url
   * @param {types.HTTPSettings} [options]
   * @returns {Promise<{ error: boolean; message: T | string }>}
   */
  static createHttpRequest(url, options) {
    return __async(this, null, function* () {
      var _a;
      const defaultOptions = {
        timeout: 1e4,
        headers: {
          "User-Agent": "AtmosphericX",
          "Accept": "application/geo+json, text/plain, */*; q=0.9",
          "Accept-Language": "en-US,en;q=0.9"
        }
      };
      const requestOptions = __spreadProps(__spreadValues(__spreadValues({}, defaultOptions), options), {
        headers: __spreadValues(__spreadValues({}, defaultOptions.headers), (_a = options == null ? void 0 : options.headers) != null ? _a : {})
      });
      try {
        const resp = yield packages.axios.get(url, {
          headers: requestOptions.headers,
          timeout: requestOptions.timeout,
          maxRedirects: 0,
          validateStatus: (status2) => status2 === 200 || status2 === 500
        });
        return { error: false, message: resp.data };
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        return { error: true, message: msg };
      }
    });
  }
  /**
   * @function handleCronJob
   * @description
   *     Performs scheduled tasks for NWWS XMPP session maintenance or GeoJSON data
   *     updates depending on the job type.
   *
   * @static
   * @param {boolean} isWire
   * @returns {void}
   */
  static handleCronJob(isWire) {
    try {
      const settings2 = settings;
      const cache2 = settings2.noaa_weather_wire_service_settings.cache;
      const reconnections = settings2.noaa_weather_wire_service_settings.reconnection_settings;
      if (isWire) {
        if (reconnections.enabled) {
          void xmpp_default.isSessionReconnectionEligible(reconnections.interval);
        }
      } else {
        void this.loadGeoJsonData();
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      _Utils.warn(`Failed to perform scheduled tasks (${isWire ? "NWWS" : "GeoJSON"}): ${msg}`);
    }
  }
  /**
   * @function mergeClientSettings
   * @description
   *     Recursively merges a ClientSettings object into a target object,
   *     preserving nested structures and overriding existing values.
   *
   * @static
   * @param {Record<string, unknown>} target
   * @param {types.ClientSettingsTypes} settings
   * @returns {Record<string, unknown>}
   */
  static mergeClientSettings(target, settings2) {
    for (const key in settings2) {
      if (!Object.prototype.hasOwnProperty.call(settings2, key)) continue;
      const value = settings2[key];
      if (value && typeof value === "object" && !Array.isArray(value)) {
        if (!target[key] || typeof target[key] !== "object" || Array.isArray(target[key])) {
          target[key] = {};
        }
        this.mergeClientSettings(target[key], value);
      } else {
        target[key] = value;
      }
    }
    return target;
  }
};
var utils_default = Utils;

// src/@submodules/eas.ts
var EAS = class {
  /**
   * @function generateEASAudio
   * @description
   *     Generates an EAS (Emergency Alert System) audio file for a given message
   *     and SAME/VTEC code. The audio is composed of optional intro tones, SAME
   *     headers, attention tones, TTS narration of the message, and repeated
   *     SAME headers. The resulting audio is processed for NWR-style broadcast
   *     quality and saved as a WAV file.
   *
   * @static
   * @async
   * @param {string} message
   * @param {string} header
   * @returns {Promise<string | null>}
   */
  static generateEASAudio(message, header) {
    return new Promise((resolve5) => __async(this, null, function* () {
      const settings2 = settings;
      const assetsDir = settings2.global_settings.eas_settings.directory;
      const rngFile = `${header.replace(/[^a-zA-Z0-9]/g, `_`)}`.substring(0, 32).replace(/^_+|_+$/g, "");
      const os2 = packages.os.platform();
      for (const { regex, replacement } of definitions.messageSignatures) {
        message = message.replace(regex, replacement);
      }
      if (!assetsDir) {
        utils_default.warn(definitions.messages.eas_no_directory);
        return resolve5(null);
      }
      if (!packages.fs.existsSync(assetsDir)) {
        packages.fs.mkdirSync(assetsDir);
      }
      const tmpTTS = packages.path.join(assetsDir, `/tmp/${rngFile}.wav`);
      const outTTS = packages.path.join(assetsDir, `/output/${rngFile}.wav`);
      const voice = process.platform === "win32" ? "Microsoft David Desktop" : "en-US-GuyNeural";
      if (!packages.fs.existsSync(packages.path.join(assetsDir, `/tmp`))) {
        packages.fs.mkdirSync(packages.path.join(assetsDir, `/tmp`), { recursive: true });
      }
      if (!packages.fs.existsSync(packages.path.join(assetsDir, `/output`))) {
        packages.fs.mkdirSync(packages.path.join(assetsDir, `/output`), { recursive: true });
      }
      if (os2 == "win32") {
        packages.say.export(message, voice, 1, tmpTTS);
      }
      if (os2 == "linux") {
        message = message.replace(/[\r\n]+/g, " ");
        const festivalCommand = `echo "${message.replace(/"/g, '\\"')}" | text2wave -o "${tmpTTS}"`;
        packages.child.execSync(festivalCommand);
      }
      yield utils_default.sleep(3500);
      let ttsBuffer = null;
      while (!packages.fs.existsSync(tmpTTS) || (ttsBuffer = packages.fs.readFileSync(tmpTTS)).length === 0) {
        yield utils_default.sleep(25);
      }
      const ttsWav = this.parseWavPCM16(ttsBuffer);
      const ttsSamples = this.resamplePCM16(ttsWav.samples, ttsWav.sampleRate, 8e3);
      const ttsRadio = this.applyNWREffect(ttsSamples, 8e3);
      let toneRadio = null;
      if (packages.fs.existsSync(settings2.global_settings.eas_settings.intro_wav)) {
        const toneBuffer = packages.fs.readFileSync(settings2.global_settings.eas_settings.intro_wav);
        const toneWav = this.parseWavPCM16(toneBuffer);
        if (toneWav == null) {
          console.log(`[EAS] Intro tone WAV file is not valid PCM 16-bit format.`);
          return resolve5(null);
        }
        const toneSamples = toneWav.sampleRate !== 8e3 ? this.resamplePCM16(toneWav.samples, toneWav.sampleRate, 8e3) : toneWav.samples;
        toneRadio = this.applyNWREffect(toneSamples, 8e3);
      }
      let build = toneRadio != null ? [toneRadio, this.generateSilence(0.5, 8e3)] : [];
      build.push(this.generateSAMEHeader(header, 3, 8e3, { preMarkSec: 1.1, gapSec: 0.5 }), this.generateSilence(0.5, 8e3), this.generateAttentionTone(8, 8e3), this.generateSilence(0.5, 8e3), ttsRadio);
      for (let i = 0; i < 3; i++) {
        build.push(this.generateSAMEHeader(header, 1, 8e3, { preMarkSec: 0.5, gapSec: 0.1 }));
        build.push(this.generateSilence(0.5, 8e3));
      }
      const allSamples = this.concatPCM16(build);
      const finalSamples = this.addNoise(allSamples, 2e-3);
      const outBuffer = this.encodeWavPCM16(Array.from(finalSamples).map((v) => ({ value: v })), 8e3);
      packages.fs.writeFileSync(outTTS, outBuffer);
      try {
        packages.fs.unlinkSync(tmpTTS);
      } catch (error) {
        if (error.code !== "EBUSY") {
          throw error;
        }
      }
      return resolve5(outTTS);
    }));
  }
  /**
   * @function encodeWavPCM16
   * @description
   *     Encodes an array of 16-bit PCM samples into a standard WAV file buffer.
   *     Produces mono audio with 16 bits per sample and a specified sample rate.
   *
   *     The input `samples` array should be an array of objects containing a
   *     numeric `value` property representing the PCM sample.
   *
   * @private
   * @static
   * @param {Record<string, number>[]} samples
   * @param {number} [sampleRate=8000]
   * @returns {Buffer}
   */
  static encodeWavPCM16(samples, sampleRate = 8e3) {
    const bytesPerSample = 2;
    const blockAlign = 1 * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const subchunk2Size = samples.length * bytesPerSample;
    const chunkSize = 36 + subchunk2Size;
    const buffer = Buffer.alloc(44 + subchunk2Size);
    let o = 0;
    buffer.write("RIFF", o);
    o += 4;
    buffer.writeUInt32LE(chunkSize, o);
    o += 4;
    buffer.write("WAVE", o);
    o += 4;
    buffer.write("fmt ", o);
    o += 4;
    buffer.writeUInt32LE(16, o);
    o += 4;
    buffer.writeUInt16LE(1, o);
    o += 2;
    buffer.writeUInt16LE(1, o);
    o += 2;
    buffer.writeUInt32LE(sampleRate, o);
    o += 4;
    buffer.writeUInt32LE(byteRate, o);
    o += 4;
    buffer.writeUInt16LE(blockAlign, o);
    o += 2;
    buffer.writeUInt16LE(16, o);
    o += 2;
    buffer.write("data", o);
    o += 4;
    buffer.writeUInt32LE(subchunk2Size, o);
    o += 4;
    for (let i = 0; i < samples.length; i++, o += 2) {
      buffer.writeInt16LE(samples[i].value, o);
    }
    return buffer;
  }
  /**
   * @function parseWavPCM16
   * @description
   *     Parses a WAV buffer containing 16-bit PCM mono audio and extracts
   *     the sample data along with format information.
   *
   *     Only supports PCM format (audioFormat = 1), 16 bits per sample,
   *     and single-channel (mono) audio. Returns `null` if the buffer
   *     is invalid or does not meet these requirements.
   *
   * @private
   * @static
   * @param {Buffer} buffer
   * @returns { { samples: Int16Array; sampleRate: number; channels: number; bitsPerSample: number } | null }
   */
  static parseWavPCM16(buffer) {
    if (buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WAVE") {
      return null;
    }
    let fmt = null;
    let data = null;
    let i = 12;
    while (i + 8 <= buffer.length) {
      const id2 = buffer.toString("ascii", i, i + 4);
      const size = buffer.readUInt32LE(i + 4);
      const start = i + 8;
      const end = start + size;
      if (id2 === "fmt ") fmt = buffer.slice(start, end);
      if (id2 === "data") data = buffer.slice(start, end);
      i = end + size % 2;
    }
    if (!fmt || !data) return null;
    const audioFormat = fmt.readUInt16LE(0);
    const channels = fmt.readUInt16LE(2);
    const sampleRate = fmt.readUInt32LE(4);
    const bitsPerSample = fmt.readUInt16LE(14);
    if (audioFormat !== 1 || bitsPerSample !== 16 || channels !== 1) {
      return null;
    }
    const samples = new Int16Array(data.buffer, data.byteOffset, data.length / 2);
    return { samples: new Int16Array(samples), sampleRate, channels, bitsPerSample };
  }
  /**
   * @function concatPCM16
   * @description
   *     Concatenates multiple Int16Array PCM audio buffers into a single
   *     contiguous Int16Array.
   *
   * @private
   * @static
   * @param {Int16Array[]} arrays
   * @returns {Int16Array}
   */
  static concatPCM16(arrays) {
    let total = 0;
    for (const a of arrays) total += a.length;
    const out = new Int16Array(total);
    let o = 0;
    for (const a of arrays) {
      out.set(a, o);
      o += a.length;
    }
    return out;
  }
  /**
   * @function pcm16toFloat
   * @description
   *     Converts a PCM16 Int16Array audio buffer to a Float32Array
   *     with normalized values in the range [-1, 1).
   *
   * @private
   * @static
   * @param {Int16Array} int16
   * @returns {Float32Array}
   */
  static pcm16toFloat(int16) {
    const out = new Float32Array(int16.length);
    for (let i = 0; i < int16.length; i++) out[i] = int16[i] / 32768;
    return out;
  }
  /**
   * @function floatToPcm16
   * @description
   *     Converts a Float32Array of audio samples in the range [-1, 1]
   *     to a PCM16 Int16Array.
   *
   * @private
   * @static
   * @param {Float32Array} float32
   * @returns {Int16Array}
   */
  static floatToPcm16(float32) {
    const out = new Int16Array(float32.length);
    for (let i = 0; i < float32.length; i++) {
      let v = Math.max(-1, Math.min(1, float32[i]));
      out[i] = Math.round(v * 32767);
    }
    return out;
  }
  /**
   * @function resamplePCM16
   * @description
   *     Resamples a PCM16 audio buffer from an original sample rate to a
   *     target sample rate using linear interpolation.
   *
   * @private
   * @static
   * @param {Int16Array} int16
   * @param {number} originalRate
   * @param {number} targetRate
   * @returns {Int16Array}
   */
  static resamplePCM16(int16, originalRate, targetRate) {
    if (originalRate === targetRate) return int16;
    const ratio = targetRate / originalRate;
    const outLen = Math.max(1, Math.round(int16.length * ratio));
    const out = new Int16Array(outLen);
    for (let i = 0; i < outLen; i++) {
      const pos = i / ratio;
      const i0 = Math.floor(pos);
      const i1 = Math.min(i0 + 1, int16.length - 1);
      const frac = pos - i0;
      const v = int16[i0] * (1 - frac) + int16[i1] * frac;
      out[i] = Math.round(v);
    }
    return out;
  }
  /**
   * @function generateSilence
   * @description
   *     Generates a PCM16 audio buffer containing silence for a specified
   *     duration.
   *
   * @private
   * @static
   * @param {number} ms
   * @param {number} [sampleRate=8000]
   * @returns {Int16Array}
   */
  static generateSilence(ms, sampleRate = 8e3) {
    return new Int16Array(Math.floor(ms * sampleRate));
  }
  /**
   * @function generateAttentionTone
   * @description
   *     Generates a dual-frequency Attention Tone (853 Hz and 960 Hz) used in
   *     EAS/SAME alerts. Produces a PCM16 buffer of the specified duration.
   *
   * @private
   * @static
   * @param {number} ms
   * @param {number} [sampleRate=8000]
   * @returns {Int16Array}
   */
  static generateAttentionTone(ms, sampleRate = 8e3) {
    const len = Math.floor(ms * sampleRate);
    const out = new Int16Array(len);
    const f1 = 853;
    const f2 = 960;
    const twoPi = Math.PI * 2;
    const amp = 0.1;
    const fadeLen = Math.floor(sampleRate * 0);
    for (let i = 0; i < len; i++) {
      const t = i / sampleRate;
      const s = Math.sin(twoPi * f1 * t) + Math.sin(twoPi * f2 * t);
      let gain = 1;
      if (i < fadeLen) gain = i / fadeLen;
      else if (i > len - fadeLen) gain = (len - i) / fadeLen;
      const v = Math.max(-1, Math.min(1, s / 2 * amp * gain));
      out[i] = Math.round(v * 32767);
    }
    return out;
  }
  /**
   * @function applyNWREffect
   * @description
   *     Applies a National Weather Radio (NWR)-style audio effect to a PCM16
   *     buffer, including high-pass and low-pass filtering, soft clipping
   *     compression, and optional bit reduction to simulate vintage broadcast
   *     characteristics.
   *
   * @private
   * @static
   * @param {Int16Array} int16
   * @param {number} [sampleRate=8000]
   * @returns {Int16Array}
   */
  static applyNWREffect(int16, sampleRate = 8e3) {
    const hpCut = 3555;
    const lpCut = 1600;
    const noiseLevel = 0;
    const crushBits = 8;
    const x = this.pcm16toFloat(int16);
    const dt = 1 / sampleRate;
    const rcHP = 1 / (2 * Math.PI * hpCut);
    const aHP = rcHP / (rcHP + dt);
    let yHP = 0, xPrev = 0;
    for (let i = 0; i < x.length; i++) {
      const xi = x[i];
      yHP = aHP * (yHP + xi - xPrev);
      xPrev = xi;
      x[i] = yHP;
    }
    const rcLP = 1 / (2 * Math.PI * lpCut);
    const aLP = dt / (rcLP + dt);
    let yLP = 0;
    for (let i = 0; i < x.length; i++) {
      yLP = yLP + aLP * (x[i] - yLP);
      x[i] = yLP;
    }
    const compGain = 2;
    const norm = Math.tanh(compGain);
    for (let i = 0; i < x.length; i++) x[i] = Math.tanh(x[i] * compGain) / norm;
    const levels = Math.pow(2, crushBits) - 1;
    return this.floatToPcm16(x);
  }
  /**
   * @function addNoise
   * @description
   *     Adds random noise to a PCM16 audio buffer and normalizes the signal
   *     to prevent clipping. Useful for simulating real-world signal conditions
   *     or reducing digital artifacts.
   *
   * @private
   * @static
   * @param {Int16Array} int16
   * @param {number} [noiseLevel=0.02]
   * @returns {Int16Array}
   */
  static addNoise(int16, noiseLevel = 0.02) {
    const x = this.pcm16toFloat(int16);
    for (let i = 0; i < x.length; i++) x[i] += (Math.random() * 2 - 1) * noiseLevel;
    let peak = 0;
    for (let i = 0; i < x.length; i++) peak = Math.max(peak, Math.abs(x[i]));
    if (peak > 1) for (let i = 0; i < x.length; i++) x[i] *= 0.98 / peak;
    return this.floatToPcm16(x);
  }
  /**
   * @function asciiTo8N1Bits
   * @description
   *     Converts an ASCII string into a sequence of bits using the 8N1 framing
   *     convention (1 start bit, 8 data bits, 2 stop bits) commonly used in
   *     serial and EAS transmissions.
   *
   * @private
   * @static
   * @param {string} str
   * @returns {number[]}
   */
  static asciiTo8N1Bits(str) {
    const bits = [];
    for (let i = 0; i < str.length; i++) {
      const c = str.charCodeAt(i) & 255;
      bits.push(0);
      for (let b = 0; b < 8; b++) bits.push(c >> b & 1);
      bits.push(1, 1);
    }
    return bits;
  }
  /**
   * @function generateAFSK
   * @description
   *     Converts a sequence of bits into AFSK-modulated PCM16 audio data for EAS
   *     alerts. Applies a fade-in and fade-out to reduce clicks and generates
   *     the audio at the specified sample rate.
   *
   * @private
   * @static
   * @param {number[]} bits
   * @param {number} [sampleRate=8000]
   * @returns {Int16Array}
   */
  static generateAFSK(bits, sampleRate = 8e3) {
    const baud = 520.83;
    const markFreq = 2083.3;
    const spaceFreq = 1562.5;
    const amplitude = 0.6;
    const twoPi = Math.PI * 2;
    const result = [];
    let phase = 0;
    let frac = 0;
    for (let b = 0; b < bits.length; b++) {
      const bit = bits[b];
      const freq = bit ? markFreq : spaceFreq;
      const samplesPerBit = sampleRate / baud + frac;
      const n = Math.round(samplesPerBit);
      frac = samplesPerBit - n;
      const inc = twoPi * freq / sampleRate;
      for (let i = 0; i < n; i++) {
        result.push(Math.round(Math.sin(phase) * amplitude * 32767));
        phase += inc;
        if (phase > twoPi) phase -= twoPi;
      }
    }
    const fadeSamples = Math.floor(sampleRate * 2e-3);
    for (let i = 0; i < fadeSamples; i++) {
      const gain = i / fadeSamples;
      result[i] = Math.round(result[i] * gain);
      result[result.length - 1 - i] = Math.round(result[result.length - 1 - i] * gain);
    }
    return Int16Array.from(result);
  }
  /**
   * @function generateSAMEHeader
   * @description
   *     Generates a SAME (Specific Area Message Encoding) audio header for
   *     EAS alerts. Converts a VTEC string into AFSK-modulated PCM16 audio,
   *     optionally repeating the signal with pre-mark and gap intervals.
   *
   * @private
   * @static
   * @param {string} vtec
   * @param {number} repeats
   * @param {number} [sampleRate=8000]
   * @param {{preMarkSec?: number, gapSec?: number}} [options={}]
   * @returns {Int16Array}
   */
  static generateSAMEHeader(vtec, repeats, sampleRate = 8e3, options = {}) {
    var _a, _b;
    const preMarkSec = (_a = options.preMarkSec) != null ? _a : 0.3;
    const gapSec = (_b = options.gapSec) != null ? _b : 0.1;
    const bursts = [];
    const gap = this.generateSilence(gapSec, sampleRate);
    for (let i = 0; i < repeats; i++) {
      const bodyBits = this.asciiTo8N1Bits(vtec);
      const body = this.generateAFSK(bodyBits, sampleRate);
      const extendedBodyDuration = Math.round(preMarkSec * sampleRate);
      const extendedBody = new Int16Array(extendedBodyDuration + gap.length);
      for (let j2 = 0; j2 < extendedBodyDuration; j2++) {
        extendedBody[j2] = Math.round(body[j2 % body.length] * 0.2);
      }
      extendedBody.set(gap, extendedBodyDuration);
      bursts.push(extendedBody);
      if (i !== repeats - 1) bursts.push(gap);
    }
    return this.concatPCM16(bursts);
  }
};
var eas_default = EAS;

// src/index.ts
var Manager = class {
  constructor(metadata) {
    this.start(metadata);
  }
  /**
   * @function setDisplayName
   * @description
   *     Sets the display nickname for the NWWS XMPP session. Trims the provided
   *     name and validates it, emitting a warning if the name is empty or invalid.
   *
   * @param {string} [name]
   */
  setDisplayName(name) {
    const settings2 = settings;
    const trimmed = name == null ? void 0 : name.trim();
    if (!trimmed) {
      utils_default.warn(definitions.messages.invalid_nickname);
      return;
    }
    settings2.noaa_weather_wire_service_settings.credentials.nickname = trimmed;
  }
  /**
   * @function getEventPolygon
   * @description
   *    Retrieves the geographical polygon for a given event based on its
   *    generated geocode and UGC zones.
   * 
   * @async
   * @param {types.EventCompiled} event
   * @returns {Promise<types.geometry | null>}
   */
  getEventPolygon(event, isUnion = true) {
    return __async(this, null, function* () {
      var _a, _b, _c, _d;
      const hasGenerated = (_b = (_a = event.properties.geocode) == null ? void 0 : _a.generated) != null ? _b : null;
      const getUgc = (_d = (_c = event.properties.geocode) == null ? void 0 : _c.UGC) != null ? _d : null;
      return yield events_default.getEventGeometry(hasGenerated, { zones: getUgc }, isUnion);
    });
  }
  /**
   * @function createEasAudio
   * @description
   *     Generates an EAS (Emergency Alert System) audio file using the provided
   *     description and header.
   *
   * @async
   * @param {string} description
   * @param {string} header
   * @returns {Promise<string>}
   */
  createEasAudio(description, header) {
    return __async(this, null, function* () {
      return yield eas_default.generateEASAudio(description, header);
    });
  }
  /**
   * @function getAllAlertTypes
   * @description
   *     Generates a list of all possible alert types by combining defined
   *     event names with action names.
   *
   * @returns {string[]}
   */
  getAllAlertTypes() {
    const events3 = new Set(Object.values(definitions.events));
    const actions2 = new Set(Object.values(definitions.actions));
    return Array.from(events3).flatMap(
      (event) => Array.from(actions2).map((action) => `${event} ${action}`)
    );
  }
  /**
   * @function searchStanzaDatabase
   * @description
   *     Searches the stanza database for entries containing the specified query.
   *     Escapes SQL wildcard characters and returns results in descending order
   *     by ID, up to the specified limit.
   *
   * @async
   * @param {string} query
   * @param {number} [limit=250]
   * @returns {Promise<string[]>}
   */
  searchStanzaDatabase(query, limit = 250) {
    return __async(this, null, function* () {
      const escapeLike = (s) => s.replace(/[%_]/g, "\\$&");
      const rows = yield cache.db.prepare(`SELECT * FROM stanzas WHERE stanza LIKE ? ESCAPE '\\' ORDER BY id DESC LIMIT ${limit}`).all(`%${escapeLike(query)}%`);
      return rows;
    });
  }
  /**
   * @function setSettings
   * @description
   *     Merges the provided client settings into the current configuration,
   *     preserving nested structures.
   *
   * @async
   * @param {types.ClientSettingsTypes} settings
   * @returns {Promise<void>}
   */
  setSettings(settings2) {
    return __async(this, null, function* () {
      utils_default.mergeClientSettings(settings, settings2);
    });
  }
  /**
   * @function on
   * @description
   *     Registers a callback for a specific event and returns a function
   *     to unregister the listener.
   *
   * @param {string} event
   * @param {(...args: any[]) => void} callback
   * @returns {() => void}
   */
  on(event, callback) {
    cache.events.on(event, callback);
    return () => cache.events.off(event, callback);
  }
  /**
   * @function start
   * @description
   *     Initializes the client with the provided settings, starts the NWWS XMPP
   *     session if applicable, loads cached messages, and sets up scheduled
   *     tasks (cron jobs) for ongoing processing.
   *
   * @async
   * @param {types.ClientSettingsTypes} metadata
   * @returns {Promise<void>}
   */
  start(metadata) {
    return __async(this, null, function* () {
      if (!cache.isReady) {
        utils_default.warn(definitions.messages.not_ready);
        return;
      }
      this.setSettings(metadata);
      const settings2 = settings;
      this.isNoaaWeatherWireService = settings2.is_wire;
      cache.isReady = false;
      yield database_default.loadDatabase();
      if (this.isNoaaWeatherWireService) {
        (() => __async(this, null, function* () {
          try {
            yield xmpp_default.deploySession();
            yield utils_default.loadCollectionCache();
          } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            utils_default.warn(`Failed to initialize NWWS services: ${msg}`);
          }
        }))();
      }
      utils_default.handleCronJob(this.isNoaaWeatherWireService);
      if (this.job) {
        try {
          this.job.stop();
        } catch (e) {
          utils_default.warn(`Failed to stop existing cron job.`);
        }
        this.job = null;
      }
      const interval = !this.isNoaaWeatherWireService ? settings2.national_weather_service_settings.interval : 5;
      this.job = new packages.jobs.Cron(`*/${interval} * * * * *`, () => {
        utils_default.handleCronJob(this.isNoaaWeatherWireService);
      });
    });
  }
  /**
   * @function stop
   * @description
   *     Stops active scheduled tasks (cron job) and, if connected, the NWWS
   *     XMPP session. Updates relevant cache flags to indicate the session
   *     is no longer active.
   *
   * @async
   * @returns {Promise<void>}
   */
  stop() {
    return __async(this, null, function* () {
      cache.isReady = true;
      if (this.job) {
        try {
          this.job.stop();
        } catch (e) {
          utils_default.warn(`Failed to stop cron job.`);
        }
        this.job = null;
      }
      const session = cache.session;
      if (session && this.isNoaaWeatherWireService) {
        try {
          yield session.stop();
        } catch (e) {
          utils_default.warn(`Failed to stop XMPP session.`);
        }
        cache.sigHalt = true;
        cache.isConnected = false;
        cache.session = null;
        this.isNoaaWeatherWireService = false;
      }
    });
  }
};
var index_default = Manager;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Database,
  EAS,
  EventParser,
  HVtecParser,
  Manager,
  PVtecParser,
  StanzaParser,
  TextParser,
  UGCParser,
  Utils
});
