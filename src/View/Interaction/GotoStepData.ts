import { Step } from "Service/Fals/Entities/Step";

export class GotoStepData {
  constructor(public FromStep: Step, public ToStep: Step) {}
}
