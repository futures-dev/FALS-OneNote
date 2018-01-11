/* Auto-generated file */

import {Period, Type} from "Service/Fals/TypeMap"

/**
 * @author Computer
 * @version 1.0
 * @created 11-џэт-2018 9:14:21
 * @class
 */
export class Student {
    public email : string;

    public displayName : string;

    public constructor() {
        this.email = null;
        this.displayName = null;
    }

    /**
     * 
     * @param {Student} other
     * @return {boolean}
     */
    public equals(other : Student) : boolean {
        return this === other || (other != null && /* equals */(<any>((o1: any, o2: any) => { if(o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })(this.email,other.email)));
    }
}
Student["__class"] = "Entities.Student";



