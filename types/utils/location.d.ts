export interface Location {
    lng: number;
    lat: number;
    height: number;
}
export default function getLocationFromBox(box: Array<number>, transform?: Array<number>): Location;
