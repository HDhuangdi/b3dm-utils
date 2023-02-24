import Cartesian3 from "./Cartesian3";
import Cartesian4 from "./Cartesian4";
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
    static IDENTITY: Readonly<Matrix4>;
    constructor(column0Row0: number, column1Row0: number, column2Row0: number, column3Row0: number, column0Row1: number, column1Row1: number, column2Row1: number, column3Row1: number, column0Row2: number, column1Row2: number, column2Row2: number, column3Row2: number, column0Row3: number, column1Row3: number, column2Row3: number, column3Row3: number);
    static multiplyByPoint(matrix: Matrix4, cartesian: Cartesian3, result: Cartesian3): Cartesian3;
    static fromColumnMajorArray(values: Array<number>, result?: Matrix4): Matrix4 | undefined;
    static multiplyByVector(matrix: Matrix4, cartesian: Cartesian4, result: Cartesian4): Cartesian4;
    static clone(matrix: Array<number> | Matrix4, result?: Matrix4): Matrix4 | undefined;
}
