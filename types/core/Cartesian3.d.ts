export default class Cartesian3 {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    static multiplyByScalar(cartesian: Cartesian3, scalar: number, result: Cartesian3): Cartesian3;
    static clone(cartesian: Cartesian3, result?: Cartesian3): Cartesian3 | undefined;
    static magnitude(cartesian: Cartesian3): number;
    static magnitudeSquared(cartesian: Cartesian3): number;
    static multiplyComponents(left: Cartesian3, right: Cartesian3, result: Cartesian3): Cartesian3;
    static normalize(cartesian: Cartesian3, result: Cartesian3): Cartesian3;
    static subtract(left: Cartesian3, right: Cartesian3, result: Cartesian3): Cartesian3;
    static dot(left: Cartesian3, right: Cartesian3): number;
    static fromElements(x: number, y: number, z: number, result: Cartesian3): Cartesian3;
}
