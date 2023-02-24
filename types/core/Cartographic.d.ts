import Cartesian3 from "./Cartesian3";
export default class Cartographic {
    longitude: number;
    latitude: number;
    height: number;
    constructor(longitude?: number, latitude?: number, height?: number);
    static fromCartesian(cartesian: Cartesian3, result?: Cartographic): Cartographic | undefined;
}
