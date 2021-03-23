import { Socket } from "socket.io";
import dataJson from './data.json';

export class MockerClass {

    level: string[];
    //socket: Socket;
    data: object[];


    constructor() {
        this.level = [];
        //this.socket = socket;
        this.data = []

        this.loadData(dataJson)
        this.parseData(this.data)
    }


    // Push mock data to data array
    loadData(json: object){
        return this.data.push(json)
    }

    // Parse data into event listen
    parseData(data: object[]){
        console.log(data)
        for(const item in data){
            console.log(item[0])
        }
    }


}

new MockerClass()