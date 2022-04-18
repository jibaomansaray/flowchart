import { ComponentTypes, IComponent } from "../types/component_types";

export class DraggableComponent implements IComponent {

  private _draggable: boolean;

  constructor(draggable = true) {
    this._draggable = draggable
  }

  get type(): ComponentTypes {
    return ComponentTypes.DRAGGABLE;
  }

  get draggable() {
    return this._draggable
  }

  set draggable(d: boolean) {
    this._draggable = d;
  }

  toJSON(): { [key: string]: any; } {
    return {
        draggable: this.draggable
      }
  }

  fromJSON(json: { [key: string]: any; }): void {
    json = json as { draggable: boolean };

    this.draggable = json.draggable;
  }
}