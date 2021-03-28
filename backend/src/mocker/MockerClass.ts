import data from './data'
import {EventEmitter} from 'events'

export default class MockerClass extends EventEmitter {

    data: Array<object>;
    timeoutList: Array<NodeJS.Timeout>;

    constructor() {
        super();

        //this.socket = socket;
        this.data = data;
        this.timeoutList = [];

        this.parseData(this.data)
    }


    // Parse data into event listen
    parseData(data: Array<object>){ 

        // Map over values of event list
        data.forEach((object: object, index: number) => {

            // Get key value by using value position
            const key = Object.keys(object);
            const element = Object.values(object)[0];
     
            
            // Throw error since this is needed to schedule our timer
            if(element.time === undefined){ throw new Error("time object property is required"); }

            // Create an handle
            const handle = setTimeout(() =>{

                // Delete time property since this is not needed on frontend anymore?
                delete element.time;

                // Emit event with key and value
                this.emit('action', [key, element])

            }, element.time)

            // Push handle into array, gonna use it later for clearing event list.
            this.timeoutList.push(handle);
            
        });    

    }


}

