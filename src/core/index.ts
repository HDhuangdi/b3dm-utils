import Cartesian3 from "./Cartesian3";

export function defaultValue(a?: any, b?: any) {
  if (a !== undefined && a !== null) {
    return a;
  }
  return b;
}

export function defined(value?: any) {
  return value !== undefined && value !== null;
}

export function scaleToGeodeticSurface(
  cartesian: Cartesian3,
  oneOverRadii: Cartesian3,
  oneOverRadiiSquared: Cartesian3,
  centerToleranceSquared: number,
  result: Cartesian3
): Cartesian3 | undefined {
  const scaleToGeodeticSurfaceIntersection = new Cartesian3();
  const scaleToGeodeticSurfaceGradient = new Cartesian3();

  const positionX = cartesian.x;
  const positionY = cartesian.y;
  const positionZ = cartesian.z;

  const oneOverRadiiX = oneOverRadii.x;
  const oneOverRadiiY = oneOverRadii.y;
  const oneOverRadiiZ = oneOverRadii.z;

  const x2 = positionX * positionX * oneOverRadiiX * oneOverRadiiX;
  const y2 = positionY * positionY * oneOverRadiiY * oneOverRadiiY;
  const z2 = positionZ * positionZ * oneOverRadiiZ * oneOverRadiiZ;

  const squaredNorm = x2 + y2 + z2;
  const ratio = Math.sqrt(1.0 / squaredNorm);

  const intersection = Cartesian3.multiplyByScalar(
    cartesian,
    ratio,
    scaleToGeodeticSurfaceIntersection
  );

  if (squaredNorm < centerToleranceSquared) {
    return !isFinite(ratio)
      ? undefined
      : Cartesian3.clone(intersection, result);
  }

  const oneOverRadiiSquaredX = oneOverRadiiSquared.x;
  const oneOverRadiiSquaredY = oneOverRadiiSquared.y;
  const oneOverRadiiSquaredZ = oneOverRadiiSquared.z;

  const gradient = scaleToGeodeticSurfaceGradient;
  gradient.x = intersection.x * oneOverRadiiSquaredX * 2.0;
  gradient.y = intersection.y * oneOverRadiiSquaredY * 2.0;
  gradient.z = intersection.z * oneOverRadiiSquaredZ * 2.0;

  let lambda =
    ((1.0 - ratio) * Cartesian3.magnitude(cartesian)) /
    (0.5 * Cartesian3.magnitude(gradient));
  let correction = 0.0;

  let func;
  let denominator;
  let xMultiplier;
  let yMultiplier;
  let zMultiplier;
  let xMultiplier2;
  let yMultiplier2;
  let zMultiplier2;
  let xMultiplier3;
  let yMultiplier3;
  let zMultiplier3;

  do {
    lambda -= correction;

    xMultiplier = 1.0 / (1.0 + lambda * oneOverRadiiSquaredX);
    yMultiplier = 1.0 / (1.0 + lambda * oneOverRadiiSquaredY);
    zMultiplier = 1.0 / (1.0 + lambda * oneOverRadiiSquaredZ);

    xMultiplier2 = xMultiplier * xMultiplier;
    yMultiplier2 = yMultiplier * yMultiplier;
    zMultiplier2 = zMultiplier * zMultiplier;

    xMultiplier3 = xMultiplier2 * xMultiplier;
    yMultiplier3 = yMultiplier2 * yMultiplier;
    zMultiplier3 = zMultiplier2 * zMultiplier;

    func = x2 * xMultiplier2 + y2 * yMultiplier2 + z2 * zMultiplier2 - 1.0;

    denominator =
      x2 * xMultiplier3 * oneOverRadiiSquaredX +
      y2 * yMultiplier3 * oneOverRadiiSquaredY +
      z2 * zMultiplier3 * oneOverRadiiSquaredZ;

    const derivative = -2.0 * denominator;

    correction = func / derivative;
  } while (Math.abs(func) > 0.000000000001);

  if (!defined(result)) {
    return new Cartesian3(
      positionX * xMultiplier,
      positionY * yMultiplier,
      positionZ * zMultiplier
    );
  }
  result.x = positionX * xMultiplier;
  result.y = positionY * yMultiplier;
  result.z = positionZ * zMultiplier;
  return result;
}
