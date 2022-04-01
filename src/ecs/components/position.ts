import { ComponentTypes, IComponent } from "./component_types";

export class Position implements IComponent {
  protected _x: number;
  protected _y: number;

  constructor(x = 0, y = 0) {
    this._x = x;
    this._y = y;
  }

  get type() {
    return ComponentTypes.POSITION;
  }

  get x() {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  get y() {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }

  toJSON(): { [key: string]: any; } {
    return {
      x: this.x,
      y: this.y
    };
  }

  fromJSON(json: { [key: string]: any; }): void {
    json = json as { x: number, y: number };
    this.x = json.x;
    this.y = json.y;
  }
}