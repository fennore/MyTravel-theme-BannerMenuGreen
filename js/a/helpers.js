// @todo add as DOM element prototype functions
var rmClass = function (elm, cl) {
  if (elm && elm.className) {
    elm.className = elm.className.split(' ').filter(function (val) {
      return val !== cl;
    }).join(' ');
  }
};
var addClass = function (elm, cl) {
  if (elm && elm.className) {
    elm.className = elm.className.split(' ').filter(function (val) {
      return val !== cl;
    }).join(' ') + ' ' + cl;
  } else if (elm) {
    elm.className = cl;
  }
};
var getIndex = function (elm) {
  if(!elm.parentNode || !elm.parentNode.children) {
    return 0;
  }
  return Array.prototype.indexOf.call(elm.parentNode.children, elm);
};
var activeChange = function (target, cssActiveClass) {
  if(!cssActiveClass) {
    cssActiveClass = Data.cssActiveClass;
  }
  // clear all existing active classes
  Data.contentNode.querySelectorAll("." + cssActiveClass).forEach(function (currentValue, index, arr) {
    rmClass(arr[index], cssActiveClass);
  });
  addClass(target, cssActiveClass);
};
var matchParent = function (elm, match) {
  do {
    elm = elm.parentNode;
  } while (elm && (!elm.className || elm.className.indexOf(match) < 0));

  return elm;
};
var offset = function (el) {
  var rect = el.getBoundingClientRect(),
          scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
          scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
};
var getStyle = function (e, styleName) {
  var styleValue = "";
  if (document.defaultView && document.defaultView.getComputedStyle) {
    styleValue = document.defaultView.getComputedStyle(e, "").getPropertyValue(styleName);
  } else if (e.currentStyle) {
    styleName = styleName.replace(/\-(\w)/g, function (strMatch, p1) {
      return p1.toUpperCase();
    });
    styleValue = e.currentStyle[styleName];
  }
  return parseInt(styleValue, 10);
};
var request = function (method, path, data, callback) {
  if(!method)
    method = 'GET';
  try {
    var xhr = XMLHttpRequest || ActiveXObject,
            x = new xhr('MSXML2.XMLHTTP.3.0');
    x.open(method, path, true);
    x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    // REST => request json answer
    x.setRequestHeader('Accept', 'application/json');
    if(method === 'POST' || method === 'PUT') {
      try {
        JSON.parse(data);
        x.setRequestHeader('Content-type', 'application/json');
      } catch (e) {
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      }
    }
    else {
      x.setRequestHeader('Content-type', 'application/json');
    }
    x.onreadystatechange = function () {
      var acceptedStates = [
        200, 201, 304
      ];
      if (
        x.readyState === 4 && 
        acceptedStates.indexOf(x.status) > -1 &&
        x.getResponseHeader('Content-type') === 'application/json' &&
        callback
      ) {
        var response = JSON.parse(x.responseText);
        callback(response);
      }
    };
    if(Array.isArray(data))
      data = data.join('&');
    x.send(data);
  } catch (e) {
    if (window.console) {
      //console.log(e);
    }
  }
  return xhr;
};
// dataset
// 
// replace namesLikeThis with names-like-this
function toDashed(name) {
  return name.replace(/([A-Z])/g, function(u) {
    return "-" + u.toLowerCase();
  });
};

var fn;

if (typeof document !== "undefined" && document.head && document.head.dataset) {
  fn = {
    set: function(node, attr, value) {
      node.dataset[attr] = value;
    },
    get: function(node, attr) {
      return node.dataset[attr];
    },
    del: function (node, attr) {
      delete node.dataset[attr];
    }
  };
} else {
  fn = {
    set: function(node, attr, value) {
      node.setAttribute('data-' + toDashed(attr), value);
    },
    get: function(node, attr) {
      return node.getAttribute('data-' + toDashed(attr));
    },
    del: function (node, attr) {
      node.removeAttribute('data-' + toDashed(attr));
    }
  };
}

function dataset(node, attr, value) {
  var self = {
    set: set,
    get: get,
    del: del
  };

  function set(attr, value) {
    fn.set(node, attr, value);
    return self;
  }

  function del(attr) {
    fn.del(node, attr);
    return self;
  }

  function get(attr) {
    return fn.get(node, attr);
  }

  if (arguments.length === 3) {
    return set(attr, value);
  }
  if (arguments.length === 2) {
    return get(attr);
  }

  return self;
}
