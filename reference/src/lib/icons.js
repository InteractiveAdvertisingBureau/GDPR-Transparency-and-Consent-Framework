var svg;

svg = function(paths, width, height, color) {
  var d;
  color = color || "#2E7D32";
  width = width || 40;
  height = height || 20;
  if (typeof paths === 'string') {
    paths = [paths];
  }
  return "<svg fill=\"" + color + "\"preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 " + width + " " + height + "\">\n  <g>\n    " + (((function() {
    var i, len, results;
    results = [];
    for (i = 0, len = paths.length; i < len; i++) {
      d = paths[i];
      results.push("<path d='" + d + "'></path>");
    }
    return results;
  })()).join('')) + "\n  </g>\n</svg>";
}

module.exports = {
  arrow: svg('M39.4188034,0.547008547 C38.8717949,1.16573418e-15 37.982906,1.16573418e-15 37.4358974,0.547008547 L20,18.017094 L2.52991453,0.547008547 C1.98290598,1.16573418e-15 1.09401709,1.16573418e-15 0.547008547,0.547008547 C-5.55111512e-16,1.09401709 -5.55111512e-16,1.98290598 0.547008547,2.52991453 L18.974359,20.957265 C19.2478632,21.2307692 19.5897436,21.3675214 19.965812,21.3675214 C20.3076923,21.3675214 20.6837607,21.2307692 20.957265,20.957265 L39.3846154,2.52991453 C39.965812,1.98290598 39.965812,1.09401709 39.4188034,0.547008547 Z')
}
