import Cartesian3 from "./Cartesian3";
export declare function defaultValue(a?: any, b?: any): any;
export declare function defined(value?: any): boolean;
export declare function scaleToGeodeticSurface(cartesian: Cartesian3, oneOverRadii: Cartesian3, oneOverRadiiSquared: Cartesian3, centerToleranceSquared: number, result: Cartesian3): Cartesian3 | undefined;
