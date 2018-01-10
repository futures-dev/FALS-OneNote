/* Auto-generated file */

import {Period, Type} from "Service/Fals/TypeMap"

/**
 * @author Computer
 * @version 1.0
 * @created 24-���-2017 20:28:47
 * @class
 */
export class Student {
    public email : string;

    public displayName : string;

    public constructor() {
        this.email = null;
        this.displayName = null;
    }

    public equals(other : Student) {
        return this === other || (
            other != null &&
            this.email == other.email
        );
    }
}
Student["__class"] = "Entities.Student";



