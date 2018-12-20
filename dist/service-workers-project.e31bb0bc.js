// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"character-modal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var Trait = function Trait(_ref) {
  var name = _ref.name,
      value = _ref.value;
  return "<div class=\"trait-container\">\n  <div class=\"trait-name\">".concat(name, "</div>\n  <div class=\"trait-value\">").concat(value, "</div>\n</div>");
};

var CharacterModal = function CharacterModal(_ref2) {
  var title = _ref2.title,
      description = _ref2.description,
      imgSrc = _ref2.imgSrc,
      shared = _ref2.shared,
      mark = _ref2.mark,
      _ref2$traits = _ref2.traits,
      traits = _ref2$traits === void 0 ? [] : _ref2$traits,
      onClickGenerate = _ref2.onClickGenerate,
      onClickOutside = _ref2.onClickOutside;
  var mappedTraits = '';
  traits.forEach(function (trait) {
    mappedTraits += Trait(trait);
  });
  setTimeout(function () {
    if (document.getElementsByClassName('generate-button')[0]) {
      document.getElementsByClassName('generate-button')[0].addEventListener('click', onClickGenerate);
    }

    var specifiedElement = document.getElementsByClassName('character-modal-container')[0];
    var specifiedElement2 = document.getElementById('characters-list');
    document.addEventListener('click', function (event) {
      var isClickInside = specifiedElement.contains(event.target) && !specifiedElement2.contains(event.target);

      if (!isClickInside) {
        onClickOutside();
      }
    });
  });
  return "<div class=\"modal-container\">\n      <div class=\"character-modal-container\">\n        <div class=\"character-modal__title\">".concat(title, "</div>\n        <div class=\"character-modal__image-container\"><img src=").concat(imgSrc, " alt=\"portrait\" /></div>\n        <div class=\"line-clamp\">").concat(description, "</div>\n        ").concat(mappedTraits, "\n        <button class=\"generate-button\">Generate</button>\n        <div class=\"bottom-bar\">\n            <div>Shared: ").concat(shared, "</div>\n            <div>Mark: ").concat(mark, "</div>\n        </div>\n    </div>\n</div>");
};

var _default = CharacterModal;
exports.default = _default;
},{}],"node_modules/line-clamp/index.js":[function(require,module,exports) {
function truncateTextNode (
  textNode,
  rootElement,
  maximumHeight,
  ellipsisCharacter
) {
  var lastIndexOfWhitespace
  var textContent = textNode.textContent
  while (textContent.length > 1) {
    lastIndexOfWhitespace = textContent.lastIndexOf(' ')
    if (lastIndexOfWhitespace === -1) {
      break
    }
    textNode.textContent = textContent.substring(0, lastIndexOfWhitespace)
    if (rootElement.scrollHeight <= maximumHeight) {
      textNode.textContent = textContent
      break
    }
    textContent = textNode.textContent
  }
  return truncateTextNodeByCharacter(
    textNode,
    rootElement,
    maximumHeight,
    ellipsisCharacter
  )
}

var TRAILING_WHITESPACE_AND_PUNCTUATION_REGEX = /[ .,;!?'‘’“”\-–—]+$/
function truncateTextNodeByCharacter (
  textNode,
  rootElement,
  maximumHeight,
  ellipsisCharacter
) {
  var textContent = textNode.textContent
  var length = textContent.length
  while (length > 1) {
    // Trim off one trailing character and any trailing punctuation and whitespace.
    textContent = textContent
      .substring(0, length - 1)
      .replace(TRAILING_WHITESPACE_AND_PUNCTUATION_REGEX, '')
    length = textContent.length
    textNode.textContent = textContent + ellipsisCharacter
    if (rootElement.scrollHeight <= maximumHeight) {
      return true
    }
  }
  return false
}

function truncateElementNode (
  element,
  rootElement,
  maximumHeight,
  ellipsisCharacter
) {
  var childNodes = element.childNodes
  var i = childNodes.length - 1
  while (i > -1) {
    var childNode = childNodes[i--]
    var nodeType = childNode.nodeType
    if (
      (nodeType === 1 &&
        truncateElementNode(
          childNode,
          rootElement,
          maximumHeight,
          ellipsisCharacter
        )) ||
      (nodeType === 3 &&
        truncateTextNode(
          childNode,
          rootElement,
          maximumHeight,
          ellipsisCharacter
        ))
    ) {
      return true
    }
    element.removeChild(childNode)
  }
  return false
}

var ELLIPSIS_CHARACTER = '\u2026'

module.exports = function (rootElement, lineCount, options) {
  rootElement.style.cssText +=
    'overflow:hidden;overflow-wrap:break-word;word-wrap:break-word'

  var maximumHeight =
    (lineCount || 1) *
    parseInt(window.getComputedStyle(rootElement).lineHeight, 10)

  // Exit if text does not overflow `rootElement`.
  if (rootElement.scrollHeight <= maximumHeight) {
    return
  }

  truncateElementNode(
    rootElement,
    rootElement,
    maximumHeight,
    (options && options.ellipsis) || ELLIPSIS_CHARACTER
  )
}

},{}],"utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCutText = void 0;

var _lineClamp = _interopRequireDefault(require("line-clamp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCutText = function getCutText() {
  var elements = document.getElementsByClassName('line-clamp');

  for (var i = 0; i < elements.length; i++) {
    (0, _lineClamp.default)(elements[i], 5);
  }
};

exports.getCutText = getCutText;
},{"line-clamp":"node_modules/line-clamp/index.js"}],"list-elements-data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _characterModal = _interopRequireDefault(require("./character-modal"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

var getRandomTitle = function getRandomTitle() {
  var titles = ['Ravaged Snow', 'The Seventh Mist', 'Gate of Angel', 'The Night\'s Name', 'The Voyages of the Danger', 'Flowers in the Night'];
  var randomIndex = getRandomArbitrary(0, 6);
  return titles[randomIndex];
};

var getRandomDescription = function getRandomDescription() {
  var descriptions = ["Chestnut, oily hair is pulled back to reveal a thin, radiant face. Beady hazel eyes, set concealed within their sockets, watch thoughtfully over the tribes they've been seperated from for so long.\nA large beard gracefully compliments his nose and mouth and leaves a beautiful memory of his adventurous love life.\n\nThis is the face of Isaac Chilson, a true romanticist among vampires. He stands small among others, despite his athletic frame.\n\nThere's something wonderful about him, perhaps it's his gentleness or perhaps it's simply a feeling of coldness. But nonetheless, people tend to stay on his good side, while wishing they were more like him.", "Green, long hair tight in a ponytail reveals a chiseled, wild face. Dead green eyes, set well within their sockets, watch devotedly over the mountains they've befriended for so long.\nA scar stretching from the bottom of the right cheek , running towards his upper lip and ending under his left eye leaves an amusing memory of true friendship.\n\nThis is the face of Alluin Moonfall, a true genius among night elves. He stands towering above others, despite his brawny frame.\n\nThere's something curious about him, perhaps it's a feeling of shame or perhaps it's simply a feeling of indifference. But nonetheless, people tend to share local gossip with him, while trying to please him.", "Blue, perfectly groomed hair neatly coiffured to reveal a bony, anguished face. Smart red eyes, set a-symmetrically within their sockets, watch delightedly over the castle they've sought solace in for so long.\nA tattoo of an eagle claw is almost hidden just below her left eye and leaves an aching memory of liberated love.\n\nThe is the face of Nafareath Moonwalker, a true vindicator among elves. She stands average among others, despite her skinny frame.\n\nThere's something inexplicable about her, perhaps it's a feeling of delight or perhaps it's simply her gentleness. But nonetheless, people tend to ask her to tell stories, while trying to avoid her.", "Blonde, layered hair is pulled back to reveal a strong, radiant face. Glistening silver eyes, set handsomely within their sockets, watch vigorously over the sea they've kept safe for so long.\nA tattoo of a small cross is prominently featured on the left side of her neck and leaves a gracious memory of a new life.\n\nThe is the face of Nafareath Dawnfury, a true spectacle among elves. She stands high among others, despite her light frame.\n\nThere's something charming about her, perhaps it's her disposition or perhaps it's simply her odd friends. But nonetheless, people tend to ask her about her adventures, while secretly training to become more like her.\n", "Light green, shoulder-length hair neatly coiffured to reveal a round, worried face. Dancing sapphire eyes, set elegantly within their sockets, watch gratefully over the river they've sworn to protect for so long.\nA gunshot left a mark stretching from the top of the left cheek , running towards the other eye and ending on her left cheekbone and leaves an aching burden of return to home.\n\nThe is the face of Yneasia Stagrunner, a true angel among night elves. She stands awkwardly among others, despite her thin frame.\n\nThere's something different about her, perhaps it's her suffering or perhaps it's simply her sympathy. But nonetheless, people tend to welcome her with open arms, while thinking of ways to become her friend.", "Brown, dreadlocks is pulled back to reveal a long, warm face. Narrow amber eyes, set rooted within their sockets, watch delicately over the rivers they've rarely felt at home at for so long.\nA beard charmingly compliments his eyes and hair and leaves a heartbreaking memory of his fortunate adventures.\n\nThis is the face of Cade Falkner, a true friend among dwarves. He stands gracefully among others, despite his sturdy frame.\n\nThere's something appealing about him, perhaps it's his personality or perhaps it's simply his humility. But nonetheless, people tend to keep their distance, while trying to subtly look more like him.", "Silver, wavy hair braided to reveal a fine, cheerful face. Beady aquamarine eyes, set appealingly within their sockets, watch wearily over the lands they've befriended for so long.\nFallen debry left a mark stretching from just under the right eye , running across the nose and ending on her right cheekbone and leaves an aching burden of her fortunate destiny.\n\nThe is the face of Lelarea Lunadancer, a true spectacle among elves. She stands average among others, despite her slim frame.\n\nThere's something alluring about her, perhaps it's her friendly demeanor or perhaps it's simply her gentleness. But nonetheless, people tend to ask her about her latest victory, while trying to hide from her.\n"];
  var randomIndex = getRandomArbitrary(0, 7);
  return descriptions[randomIndex];
};

var getRandomPortrait = function getRandomPortrait() {
  var portraits = ['https://i.pinimg.com/originals/cf/61/d5/cf61d563013cf829deb56e10b32e681b.jpg', 'https://i.pinimg.com/236x/81/71/8b/81718bce7ad49b589d508b6d197214d6--paint-tool-sai-character-art.jpg', 'http://3.bp.blogspot.com/-BeEO51brzj8/TnFCwxq42kI/AAAAAAAAAnc/KLjra5HxWOU/s1600/warrior_female.jpg', 'https://i.pinimg.com/236x/b1/bc/3a/b1bc3a51d2d417b2b705c48a93a9156c.jpg', 'https://vignette.wikia.nocookie.net/moon-guard/images/d/d3/A7c7259ef6050e967a93aa799d2d685d--fantasy-male-digital-portrait.jpg/revision/latest?cb=20171224092829', 'http://strefarpg.net/uploads/monthly_2018_01/3e176c52813aac48a4ad8e3b4b612c2a--fantasy-rpg-character-portraits.jpg.f6e3ac45eb067aeee527a515dacd2a43.jpg'];
  var randomIndex = getRandomArbitrary(0, 6);
  return portraits[randomIndex];
};

var listElementsData = [];

var _loop = function _loop(i) {
  listElementsData.push({
    index: 0,
    title: getRandomTitle(),
    description: getRandomDescription(),
    imgSrc: getRandomPortrait(),
    shared: getRandomArbitrary(0, 10000),
    mark: getRandomArbitrary(0, 5),
    openModal: function openModal() {
      document.getElementById('modal').innerHTML = (0, _characterModal.default)(listElementsData[i]);
      (0, _utils.getCutText)();
    },
    onClickOutside: function onClickOutside() {
      document.getElementById('modal').innerHTML = '';
    },
    traits: [{
      name: 'strength',
      value: getRandomArbitrary(8, 19)
    }, {
      name: 'stamina',
      value: getRandomArbitrary(8, 19)
    }, {
      name: 'agility',
      value: getRandomArbitrary(8, 19)
    }, {
      name: 'intelligence',
      value: getRandomArbitrary(8, 19)
    }, {
      name: 'wisdom',
      value: getRandomArbitrary(8, 19)
    }, {
      name: 'charisma',
      value: getRandomArbitrary(8, 19)
    }],
    onClickGenerate: function onClickGenerate() {
      listElementsData[i].traits = listElementsData[i].traits.map(function (item) {
        return _objectSpread({}, item, {
          value: getRandomArbitrary(8, 19)
        });
      });
    }
  });
};

for (var i = 0; i < 100; i++) {
  _loop(i);
}

var _default = listElementsData;
exports.default = _default;
},{"./character-modal":"character-modal.js","./utils":"utils.js"}],"list-element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var ListElement = function ListElement(_ref) {
  var title = _ref.title,
      description = _ref.description,
      imgSrc = _ref.imgSrc,
      shared = _ref.shared,
      mark = _ref.mark,
      index = _ref.index;
  return "<div class=\"character-element-container\" data-index=".concat(index, ">\n        <div class=\"character-element__title\">").concat(title, "</div>\n        <div class=\"character-element__image-container\"><img src=").concat(imgSrc, " alt=\"portrait\" /></div>\n        <div class=\"line-clamp\">").concat(description, "</div>\n        <div class=\"bottom-bar\">\n            <div>Shared: ").concat(shared, "</div>\n            <div>Mark: ").concat(mark, "</div>\n        </div>\n    </div>");
};

var _default = ListElement;
exports.default = _default;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _listElementsData = _interopRequireDefault(require("./list-elements-data"));

var _listElement = _interopRequireDefault(require("./list-element"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var attachList = function attachList(data) {
  var characterListHTML = '';
  var length = data.length;

  for (var i = 0; i < length; i++) {
    characterListHTML += (0, _listElement.default)(data[i]);
  }

  document.getElementById('characters-list').innerHTML = characterListHTML;
};

attachList(_listElementsData.default);
var characterElements = document.getElementsByClassName('character-element-container');

for (var i = 0; i < characterElements.length; i++) {
  characterElements[i].addEventListener('click', _listElementsData.default[i].openModal);
}

(0, _utils.getCutText)();
document.getElementById('kitty-picture').addEventListener('click', function () {
  fetch("".concat(window.location.origin, "/kitten.4431d989.jpeg")).then(function (data) {
    document.getElementById('kitty-picture-container').innerHTML = "<img src=".concat(data.url, " alt=\"kitty\" />");
  }).catch(function () {
    console.log('failed to fetch kitty...');
  });
});
var applicationServerPublicKey = 'BJgRttpCBYWBwJw89Xmaq-6-fLYzdjHGLc-3R7muJYfopOXabBxq2Uxss2bdOT03GTJF9FHjEuHHxbDGwH6z-l8';
var pushButton = document.querySelector('.js-push-btn');
var isSubscribed = false;
var swRegistration = null;

function urlB64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var _i = 0; _i < rawData.length; ++_i) {
    outputArray[_i] = rawData.charCodeAt(_i);
  }

  return outputArray;
}

function sendMessageToSw(msg) {
  return new Promise(function (resolve, reject) {
    // Create a Message Channel
    var messageChannel = new MessageChannel(); // Handler for receiving message reply from service worker

    messageChannel.port1.onmessage = function (event) {
      if (event.data.error) {
        reject(event.data.error);
      } else {
        resolve(event.data);
      }
    }; // Send message to service worker along with port for reply


    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(msg, [messageChannel.port2]);
    }
  });
}

function updateBtn() {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push Messaging Blocked.';
    pushButton.disabled = true;
    updateSubscriptionOnServer(null);
    return;
  }

  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}

function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server
  var subscriptionJson = document.querySelector('.js-subscription-json');
  var subscriptionDetails = document.querySelector('.js-subscription-details');

  if (subscription) {
    subscriptionJson.textContent = JSON.stringify(subscription);
    subscriptionDetails.classList.remove('is-invisible');
  } else {
    subscriptionDetails.classList.add('is-invisible');
  }
}

function subscribeUser() {
  var applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  }).then(function (subscription) {
    console.log('User is subscribed.');
    updateSubscriptionOnServer(subscription);
    isSubscribed = true;
    updateBtn();
  }).catch(function (err) {
    console.log('Failed to subscribe the user: ', err);
    updateBtn();
  });
}

function initializeUI() {
  pushButton.addEventListener('click', function () {
    pushButton.disabled = true;

    if (isSubscribed) {// TODO: Unsubscribe user
    } else {
      subscribeUser();
    }
  }); // Set the initial subscription value

  swRegistration.pushManager.getSubscription().then(function (subscription) {
    isSubscribed = !(subscription === null);
    updateSubscriptionOnServer(subscription);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
}

window.addEventListener('load', function () {
  navigator.serviceWorker.register("/service-worker.js").then(function (sw) {
    swRegistration = sw;
    initializeUI();
    sendMessageToSw('test msg').then(function (data) {
      console.log('back after 1000000000 iterations: ', data);
    });
  }).catch(function (err) {
    console.log('error!', err);
  });
});
navigator.serviceWorker.ready.then(function (swRegistration) {
  return swRegistration.sync.register('someTestSync');
});
},{"./list-elements-data":"list-elements-data.js","./list-element":"list-element.js","./utils":"utils.js","/Users/meph1k/dev/service-workers-project/service-worker.js":[["service-worker.js","service-worker.js"],"service-worker.map","service-worker.js"]}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56690" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/service-workers-project.e31bb0bc.map