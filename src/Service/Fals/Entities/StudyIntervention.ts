/* Auto-generated file */

import * as typeMap from "Service/Fals/TypeMap"

import { InterventionModel } from './InterventionModel'; 
import { StudyModule } from './StudyModule'; 
import { Module } from './Module'; 
/**
 * @author Computer
 * @version 1.0
 * @created 24-дек-2017 20:28:47
 * @class
 * @extends InterventionModel
 */
export class StudyIntervention extends InterventionModel {
    public studyModule : StudyModule;

    public followingModule : Module;

    public studyTimeout : Period;

    public constructor() {
        super();
        this.studyModule = null;
        this.followingModule = null;
        this.studyTimeout = null;
    }
}
StudyIntervention["__class"] = "Entities.StudyIntervention";



