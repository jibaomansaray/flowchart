import { ComponentTypes, IComponent } from "./component_types";

export class MouseCollisionComponent implements IComponent {
  private _detected: boolean = false;
  private _x: number = -1;
  private _y: number = -1;

  get type(): ComponentTypes {
    return ComponentTypes.MOUSE_COLLISION;
  } 

  get x() {
    return this._x;
  }

  set x(x: number) {
    this._x = x;
  }

  get y() {
    return this._y;
  }

  set y(y: number) {
    this._y = y;
  }

  get detected() {
    return this._detected;
  }

  set detected(d: boolean) {
    this._detected = d;
  }

  public reset() {
    this.detected = false;
    this.x - 1;
    this.y = -1;
  }

  toJSON(): { [key: string]: any; } {
    return {}
  }

  fromJSON(_json: { [key: string]: any; }): void {
     // nothing todo here 
  }
}