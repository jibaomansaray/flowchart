import { ComponentTypes, IComponent } from "./component_types";

export class CircleComponent implements IComponent {
  private _radius: number;
  private _startAngle: number;
  private _endAngle: number;
  private _counterClockwise: boolean;

  constructor(radius = 0, startAngle = 0, endAngle = Math.PI * 2, counterClockwise = true) {
    this._radius = radius;
    this._startAngle = startAngle;
    this._endAngle = endAngle;
    this._counterClockwise = counterClockwise;''
  }

  get type(): ComponentTypes {
    return ComponentTypes.CIRCLE;
  }

  get radius() {
    return this._radius
  }

  set radius(v: number) {
    this._radius = v;
  }

  get startAngle() {
    return this._startAngle;
  }
  set startAngle(v: number) {
    this._startAngle = v;
  }

  get endAngle() {
    return this._endAngle;
  }

  set endAngle(v: number) {
    this._endAngle = v;
  }

   get counterClockwise() {
    return this._counterClockwise;
  }

  set counterClockwise(v: boolean) {
    this._counterClockwise = v;
  }
  toJSON(): { [key: string]: any; } {
    return {
      radius: this.radius,
      startAngle: this.startAngle,
      endAngle: this.endAngle,
      counterClockwise: this.counterClockwise,
    };
  }

  fromJSON(json: { [key: string]: any; }): void {
    json = json as {
      radius: number,
      startAngle: number,
      endAngle: number,
      counterClockwise: number,
    }; 

    this.radius = json.radius;
    this.startAngle = json.startAngle;
    this.endAngle = json.endAngle;
    this.counterClockwise = json.counterClockwise;
  }
}