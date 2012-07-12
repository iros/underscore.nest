// from: https://github.com/documentcloud/underscore/issues/88
(function(global) {

  _.mixin({
    deepExtend : function(obj) {
      var deepMerge = function(target, source) {
        for (var key in source) {
          var original = target[key];
          var next = source[key];
          if (original && next && typeof next == "object") {
            deepMerge(original, next);
          } else {
            target[key] = next;
          }
        }
        return target;
      };

      _.each(Array.prototype.slice.call(arguments, 1), function(source) {
        deepMerge(obj, source);
      });

      return obj;
    }
  });

}(this));