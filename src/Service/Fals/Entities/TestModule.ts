/* Auto-generated file */

import {Period, Type} from "Service/Fals/TypeMap"

import { Answer } from '../Bank/Answer'; 
import { AssignmentModule } from './AssignmentModule'; 
/**
 * @author Computer
 * @version 1.0
 * @created 24-дек-2017 20:28:47
 * @class
 * @extends AssignmentModule
 */
export class TestModule extends AssignmentModule {
    public answers : Answer[];

    public correctAnswer : number;

    public constructor() {
        super();
        this.answers = null;
        this.correctAnswer = 0;
    }
}
TestModule["__class"] = "Entities.TestModule";



