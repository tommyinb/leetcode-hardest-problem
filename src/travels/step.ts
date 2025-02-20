import { ArcStep } from "./arcStep";
import { BottomEndStep } from "./bottomEndStep";
import { CornerEndStep } from "./cornerEndStep";
import { DownLineStep } from "./downLineStep";
import { LeftEndStep } from "./leftEndStep";
import { RightLineStep } from "./rightLineStep";

export type Step =
  | RightLineStep
  | DownLineStep
  | ArcStep
  | CornerEndStep
  | LeftEndStep
  | BottomEndStep;
