import { defaultValue } from "./index";

export default class MathGL {
  static sign = defaultValue(Math.sign, function sign(value: number) {
    value = +value;
    if (value === 0 || value !== value) {
      return value;
    }
    return value > 0 ? 1 : -1;
  });

  static toDegrees(radians: number) {
    return (radians * 180.0) / Math.PI;
  }
}
