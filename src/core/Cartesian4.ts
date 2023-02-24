import { defaultValue } from "./index";

export default class Cartesian4 {
  x: number;
  y: number;
  z: number;
  w: number;

  constructor(x?: number, y?: number, z?: number, w?: number) {
    this.x = defaultValue(x, 0.0);
    this.y = defaultValue(y, 0.0);
    this.z = defaultValue(z, 0.0);
    this.w = defaultValue(w, 0.0);
  }
}
