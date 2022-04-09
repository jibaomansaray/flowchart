import { ComponentTypes, IComponent } from "../../types/component_types";

export class RectangleTagComponent implements IComponent {

  get type(): ComponentTypes {
    return ComponentTypes.RECTANGLE_SHAPE_TAG;
  }

  toJSON(): { [key: string]: any; } {
    return {
      tag: true
    }
  }

  fromJSON(_json: { [key: string]: any; }): void {
      
  }
}