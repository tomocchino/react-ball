var debounce = function(callback, timeout) {
  var timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(callback, timeout || 100);
  }
}

var throttle = function(callback, timeout) {
  var timer = null;
  return function() {
    if (!timer) {
      timer = setTimeout(function() {
        callback();
        timer = null;
      }, timeout || 100);
    }
  }
};

var requestAnimationFrame =
  window.requestAnimationFrame       ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  window.oRequestAnimationFrame      ||
  window.msRequestAnimationFrame     ||
  function(callback) {
    return window.setTimeout(callback, 1000 / 60);
  };

var cancelAnimationFrame =
  window.cancelAnimationFrame        ||
  window.webkitCancelAnimationFrame  ||
  window.mozCancelAnimationFrame     ||
  window.oCancelAnimationFrame       ||
  window.msCancelAnimationFrame      ||
  function(token) {
    return window.clearTimeout(token);
  };

if (window.location.hash == '#debug') {
  requestAnimationFrame = function(callback) {
    return window.setTimeout(callback, 500);
  };

  cancelAnimationFrame = function(token) {
    window.clearTimeout(token);
  };
}
