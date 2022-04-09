import { ComponentTypes, IComponent } from "../../types/component_types";

export class LineTagComponent implements IComponent {

  get type(): ComponentTypes {
    return ComponentTypes.LINE_SHAPE_TAG;
  }

  toJSON(): { [key: string]: any; } {
    return {
      tag: true
    }
  }

  fromJSON(_json: { [key: string]: any; }): void {
      
  }
}