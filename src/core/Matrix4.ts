import Cartesian3 from "./Cartesian3";
import Cartesian4 from "./Cartesian4";
import { defaultValue, defined } from "./index";

export default class Matrix4 {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
  9: number;
  10: number;
  11: number;
  12: number;
  13: number;
  14: number;
  15: number;
  static IDENTITY = Object.freeze(
    new Matrix4(
      1.0,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0
    )
  );

  constructor(
    column0Row0: number,
    column1Row0: number,
    column2Row0: number,
    column3Row0: number,
    column0Row1: number,
    column1Row1: number,
    column2Row1: number,
    column3Row1: number,
    column0Row2: number,
    column1Row2: number,
    column2Row2: number,
    column3Row2: number,
    column0Row3: number,
    column1Row3: number,
    column2Row3: number,
    column3Row3: number
  ) {
    this[0] = defaultValue(column0Row0, 0.0);
    this[1] = defaultValue(column0Row1, 0.0);
    this[2] = defaultValue(column0Row2, 0.0);
    this[3] = defaultValue(column0Row3, 0.0);
    this[4] = defaultValue(column1Row0, 0.0);
    this[5] = defaultValue(column1Row1, 0.0);
    this[6] = defaultValue(column1Row2, 0.0);
    this[7] = defaultValue(column1Row3, 0.0);
    this[8] = defaultValue(column2Row0, 0.0);
    this[9] = defaultValue(column2Row1, 0.0);
    this[10] = defaultValue(column2Row2, 0.0);
    this[11] = defaultValue(column2Row3, 0.0);
    this[12] = defaultValue(column3Row0, 0.0);
    this[13] = defaultValue(column3Row1, 0.0);
    this[14] = defaultValue(column3Row2, 0.0);
    this[15] = defaultValue(column3Row3, 0.0);
  }

  static multiplyByPoint(
    matrix: Matrix4,
    cartesian: Cartesian3,
    result: Cartesian3
  ) {
    const vX = cartesian.x;
    const vY = cartesian.y;
    const vZ = cartesian.z;

    const x = matrix[0] * vX + matrix[4] * vY + matrix[8] * vZ + matrix[12];
    const y = matrix[1] * vX + matrix[5] * vY + matrix[9] * vZ + matrix[13];
    const z = matrix[2] * vX + matrix[6] * vY + matrix[10] * vZ + matrix[14];

    result.x = x;
    result.y = y;
    result.z = z;
    return result;
  }

  static fromColumnMajorArray(values: Array<number>, result?: Matrix4) {
    return Matrix4.clone(values, result);
  }

  static multiplyByVector(
    matrix: Matrix4,
    cartesian: Cartesian4,
    result: Cartesian4
  ) {
    const vX = cartesian.x;
    const vY = cartesian.y;
    const vZ = cartesian.z;
    const vW = cartesian.w;

    const x =
      matrix[0] * vX + matrix[4] * vY + matrix[8] * vZ + matrix[12] * vW;
    const y =
      matrix[1] * vX + matrix[5] * vY + matrix[9] * vZ + matrix[13] * vW;
    const z =
      matrix[2] * vX + matrix[6] * vY + matrix[10] * vZ + matrix[14] * vW;
    const w =
      matrix[3] * vX + matrix[7] * vY + matrix[11] * vZ + matrix[15] * vW;

    result.x = x;
    result.y = y;
    result.z = z;
    result.w = w;
    return result;
  }

  static clone(matrix: Array<number> | Matrix4, result?: Matrix4) {
    if (!defined(matrix)) {
      return undefined;
    }
    if (!defined(result)) {
      return new Matrix4(
        matrix[0],
        matrix[4],
        matrix[8],
        matrix[12],
        matrix[1],
        matrix[5],
        matrix[9],
        matrix[13],
        matrix[2],
        matrix[6],
        matrix[10],
        matrix[14],
        matrix[3],
        matrix[7],
        matrix[11],
        matrix[15]
      );
    }

    (result as Matrix4)[0] = matrix[0];
    (result as Matrix4)[1] = matrix[1];
    (result as Matrix4)[2] = matrix[2];
    (result as Matrix4)[3] = matrix[3];
    (result as Matrix4)[4] = matrix[4];
    (result as Matrix4)[5] = matrix[5];
    (result as Matrix4)[6] = matrix[6];
    (result as Matrix4)[7] = matrix[7];
    (result as Matrix4)[8] = matrix[8];
    (result as Matrix4)[9] = matrix[9];
    (result as Matrix4)[10] = matrix[10];
    (result as Matrix4)[11] = matrix[11];
    (result as Matrix4)[12] = matrix[12];
    (result as Matrix4)[13] = matrix[13];
    (result as Matrix4)[14] = matrix[14];
    (result as Matrix4)[15] = matrix[15];
    return result;
  }
}
