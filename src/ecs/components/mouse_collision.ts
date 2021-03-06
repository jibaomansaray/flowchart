import { ComponentTypes, IComponent } from "../types/component_types";

export class MouseCollisionComponent implements IComponent {
  private _detected: boolean = false;
  private _x: number = -1;
  private _y: number = -1;
  private _mouseDown = false;

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

  get mouseDown() {
    return this._mouseDown
  }

  set mouseDown(d: boolean) {
    this._mouseDown = d;
  }

  public reset() {
    this.detected = false;
    this.mouseDown = false;
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