/* Auto-generated file */

import * as typeMap from "Service/Fals/TypeMap"

import { PascaSessionSettings } from '../Pasca/PascaSessionSettings'; 
import { PascaOnenoteSettings } from '../Pasca/PascaOnenoteSettings'; 
import { Module } from './Module'; 
import { PascaFalsSettings } from './PascaFalsSettings'; 
/**
 * @author Computer
 * @version 1.0
 * @created 24-дек-2017 20:28:47
 * @class
 * @extends Module
 */
export class PascaModule extends Module {
    public pascaFalsSettings : PascaFalsSettings;

    public pascaSessionSettings : PascaSessionSettings;

    public pascaOnenoteSettings : PascaOnenoteSettings;

    public m_PascaFalsSettings : PascaFalsSettings;

    public constructor() {
        super();
        this.pascaFalsSettings = null;
        this.pascaSessionSettings = null;
        this.pascaOnenoteSettings = null;
        this.m_PascaFalsSettings = null;
    }
}
PascaModule["__class"] = "Entities.PascaModule";



