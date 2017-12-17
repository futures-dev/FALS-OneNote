import { Injectable } from '@angular/core';
import * as io from "socket.io-client"

import { StatisticsModule } from './Module';

@Injectable()
export class NameService {  


    constructor() { 
        console.log("NameService ctr");        
        const socket = io.connect('http://localhost:1337');
        socket.on("connection", () => {console.log("Connected!");});
    }
}
