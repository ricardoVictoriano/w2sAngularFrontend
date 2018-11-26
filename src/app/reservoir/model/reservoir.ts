

export class Reservoir {
    id: string;
    designation: string;
    capacity: number;
    level: number;
    chlorine: number;
    ph: number;
    lat: string;
    lon: string;
    logs: string[];

    constructor(){
    }

    printReservoir() {
        return "Reservoir id: " + this.id + "\nDesignation: " + this.designation + "\nCapacity: " + this.capacity + "\nLevel: " + this.level + " (" + this.level * 100 / this.capacity + "%)\nChlorine: " + this.chlorine + "\nPh: " + this.ph + "\nLocation: (" + this.lat + ", " + this.lon + ") ";
    }

}