import { defaultValue, defined, scaleToGeodeticSurface } from "./index";
import MathGL from "./MathGL";
import Cartesian3 from "./Cartesian3";

export default class Cartographic {
  longitude: number;
  latitude: number;
  height: number;

  constructor(longitude?: number, latitude?: number, height?: number) {
    this.longitude = defaultValue(longitude, 0.0);
    this.latitude = defaultValue(latitude, 0.0);
    this.height = defaultValue(height, 0.0);
  }

  static fromCartesian(cartesian: Cartesian3, result?: Cartographic) {
    const cartesianToCartographicP = new Cartesian3();
    const cartesianToCartographicN = new Cartesian3();
    const cartesianToCartographicH = new Cartesian3();

    const oneOverRadii = new Cartesian3(
      1.0 / 6378137.0,
      1.0 / 6378137.0,
      1.0 / 6356752.3142451793
    );
    const oneOverRadiiSquared = new Cartesian3(
      1.0 / (6378137.0 * 6378137.0),
      1.0 / (6378137.0 * 6378137.0),
      1.0 / (6356752.3142451793 * 6356752.3142451793)
    );
    const centerToleranceSquared = 0.1;

    const p = scaleToGeodeticSurface(
      cartesian,
      oneOverRadii,
      oneOverRadiiSquared,
      centerToleranceSquared,
      cartesianToCartographicP
    );

    if (!defined(p)) {
      return undefined;
    }

    let n = Cartesian3.multiplyComponents(
      p as Cartesian3,
      oneOverRadiiSquared,
      cartesianToCartographicN
    );
    n = Cartesian3.normalize(n, n);

    const h = Cartesian3.subtract(
      cartesian,
      p as Cartesian3,
      cartesianToCartographicH
    );

    const longitude = Math.atan2(n.y, n.x);
    const latitude = Math.asin(n.z);
    const height =
      MathGL.sign(Cartesian3.dot(h, cartesian)) * Cartesian3.magnitude(h);

    if (!defined(result)) {
      return new Cartographic(longitude, latitude, height);
    }
    (result as Cartographic).longitude = longitude;
    (result as Cartographic).latitude = latitude;
    (result as Cartographic).height = height;
    return result;
  }
}
