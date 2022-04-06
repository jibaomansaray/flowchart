import { ComponentTypes, IComponent } from "./component_types";

export class InteractComponent implements IComponent {
  private _strokeStyle: string;
  private _fillStyle: string;

  constructor() {
    this._fillStyle = 'green';
    this._strokeStyle = 'red';
  }

  get type(): ComponentTypes {
    return ComponentTypes.INTERACT;
  }

  get fillStyle() {
    return this._fillStyle;
  }

  set fillStyle(s: string) {
    this._fillStyle = s;
  }

  get strokeStyle() {
    return this._strokeStyle;
  }

  set strokeStyle(s: string) {
    this._strokeStyle = s;
  }

  toJSON(): { [key: string]: any; } {
    return {
      fillStyle: this.fillStyle,
      strokeStyle: this.strokeStyle
    }
  }

  fromJSON(json: { [key: string]: any; }): void {
    json = json as { fillStyle: string, strokeStyle: string };

    this.fillStyle = json.fillStyle;
    this.strokeStyle = json.strokeStyle;
  }

}