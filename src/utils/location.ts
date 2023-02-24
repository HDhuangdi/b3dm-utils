import Cartesian3 from "../core/Cartesian3";
import Cartesian4 from "../core/Cartesian4";
import Cartographic from "../core/Cartographic";
import MathGL from "../core/MathGL";
import Matrix4 from "../core/Matrix4";

export interface Location {
  lng: number,
  lat: number,
  height: number,
}

export default function getLocationFromBox(
  box: Array<number>,
  transform?: Array<number>
): Location {
  let center = new Cartesian4(box[0], box[1], box[2], 1);
  let matrix4;
  if (transform) {
    matrix4 = Matrix4.fromColumnMajorArray(transform) || Matrix4.IDENTITY;
  } else {
    matrix4 = Matrix4.IDENTITY;
  }
  let wgs84Cartesian4 = Matrix4.multiplyByVector(
    matrix4,
    center,
    new Cartesian4()
  );
  let wgs84Cartesian3 = Cartesian3.clone(wgs84Cartesian4) || new Cartesian3();
  let wgs84Cartographic =
    Cartographic.fromCartesian(wgs84Cartesian3) || new Cartographic();
  let lng = MathGL.toDegrees(wgs84Cartographic.longitude);
  let lat = MathGL.toDegrees(wgs84Cartographic.latitude);
  let height = wgs84Cartographic.height;

  return {
    lng,
    lat,
    height,
  };
}
