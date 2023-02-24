import { defined, defaultValue } from "./index";

export default class Cartesian3 {
  x: number;
  y: number;
  z: number;

  constructor(x?: number, y?: number, z?: number) {
    this.x = defaultValue(x, 0.0);
    this.y = defaultValue(y, 0.0);
    this.z = defaultValue(z, 0.0);
  }

  static multiplyByScalar(
    cartesian: Cartesian3,
    scalar: number,
    result: Cartesian3
  ) {
    result.x = cartesian.x * scalar;
    result.y = cartesian.y * scalar;
    result.z = cartesian.z * scalar;
    return result;
  }

  static clone(cartesian: Cartesian3, result?: Cartesian3) {
    if (!defined(cartesian)) {
      return undefined;
    }
    if (!defined(result)) {
      return new Cartesian3(cartesian.x, cartesian.y, cartesian.z);
    }

    (result as Cartesian3).x = cartesian.x;
    (result as Cartesian3).y = cartesian.y;
    (result as Cartesian3).z = cartesian.z;
    return result;
  }

  static magnitude(cartesian: Cartesian3) {
    return Math.sqrt(Cartesian3.magnitudeSquared(cartesian));
  }

  static magnitudeSquared(cartesian: Cartesian3) {
    return (
      cartesian.x * cartesian.x +
      cartesian.y * cartesian.y +
      cartesian.z * cartesian.z
    );
  }

  static multiplyComponents(
    left: Cartesian3,
    right: Cartesian3,
    result: Cartesian3
  ) {
    result.x = left.x * right.x;
    result.y = left.y * right.y;
    result.z = left.z * right.z;
    return result;
  }

  static normalize(cartesian: Cartesian3, result: Cartesian3) {
    const magnitude = Cartesian3.magnitude(cartesian);

    result.x = cartesian.x / magnitude;
    result.y = cartesian.y / magnitude;
    result.z = cartesian.z / magnitude;

    return result;
  }

  static subtract(left: Cartesian3, right: Cartesian3, result: Cartesian3) {
    result.x = left.x - right.x;
    result.y = left.y - right.y;
    result.z = left.z - right.z;
    return result;
  }

  static dot(left: Cartesian3, right: Cartesian3) {
    return left.x * right.x + left.y * right.y + left.z * right.z;
  }

  static fromElements(x: number, y: number, z: number, result: Cartesian3) {
    if (!defined(result)) {
      return new Cartesian3(x, y, z);
    }

    result.x = x;
    result.y = y;
    result.z = z;
    return result;
  }
}
