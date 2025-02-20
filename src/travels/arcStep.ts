import { Circle } from "../questions/circle";
import { StepType } from "./stepType";

export interface ArcStep {
  type: StepType.ArcStep;

  x: number;
  y: number;

  circle: Circle;
}
