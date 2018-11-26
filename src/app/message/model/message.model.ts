import { Reservoir } from "src/app/reservoir/model/reservoir";

export class Message {
    id: string;
    reservoirId: string;
    timestamp: string;
    messageType: string;
    content: string;

    constructor() {
    }

    toString() {
        return ""+this.messageType+": "+this.id+"\nReservoir: "+this.reservoirId+"\nTimestamp: "+this.timestamp+"\nMessage: "+this.content+" ";
    }

}