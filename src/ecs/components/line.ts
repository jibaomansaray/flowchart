import { ComponentTypes, IComponent } from "../types/component_types";
import { Position } from "./position";

export class LineComponent implements IComponent {

  private _pointA: Position;
  private _pointB: Position;

  constructor(pointA: Position = new Position(), pointB: Position = new Position()) {
    this._pointA = pointA;
    this._pointB = pointB;
  }

  get type(): ComponentTypes {
    return ComponentTypes.LINE;
  }

  get pointA() {
    return this._pointA;
  }

  set pointA(a: Position) {
    this._pointA = a;
  }

  get aX() {
    return this._pointA.x;
  }

  set aX(x: number) {
    this._pointA.x = x;
  }

  get aY() {
    return this._pointA.y;
  }

  set aY(y: number) {
    this._pointA.y = y;
  }

  get pointB() {
    return this._pointB;
  }

  set pointB(b: Position) {
    this._pointB = b;
  }

  get bX() {
    return this._pointB.x;
  }

  set bX(x: number) {
    this._pointB.x = x;
  }

  get bY() {
    return this._pointB.y;
  }

  set bY(y: number) {
    this._pointB.y = y;
  }

  toJSON(): { [key: string]: any; } {
    return {
      pointA: this.pointA.toJSON(),
      pointB: this.pointB.toJSON()
    };
  }

  fromJSON(json: { [key: string]: any; }): void {
    json = json as { pointA: { [key: string]: any }, pointB: { [key: string]: any } };

    this._pointA.fromJSON(json.pointA);
    this._pointB.fromJSON(json.pointB);

  }
}