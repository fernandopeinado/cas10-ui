import Color from 'color';

Color.prototype.bestContrast = function(color1, color2) {
  let c1 = Color(color1);
  let c2 = Color(color2);
  return this.contrast(c1) > this.contrast(c2) ? c1 : c2;
}

export default Color;