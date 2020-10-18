function InterpolateColor(start, end, steps, count) {
    var s = start,
        e = end,
        final = s + (((e - s) / steps) * count);
    return Math.floor(final);
}

function Color(_r, _g, _b) {
    var r, g, b;
    var setColors = function(_r, _g, _b) { r = _r; g = _g; b = _b; };
    setColors(_r, _g, _b);

    this.getColors = function() {
        var colors = { r: r, g: g, b: b };
        return colors;
    };
}