import { ComponentTypes, IComponent } from "./component_types";

export class CircleComponent implements IComponent {
  private _radius: number;
  private _startAngle: number;
  private _endAngle: number;
  private _counterClockwise: boolean;
  private _fill: boolean;
  private _fillStye: string;

  constructor(radius = 0, startAngle = 0, endAngle = Math.PI * 2, counterClockwise = true, fill = false, fillStyle = 'black') {
    this._radius = radius;
    this._startAngle = startAngle;
    this._endAngle = endAngle;
    this._counterClockwise = counterClockwise;''
    this._fill = fill;
    this._fillStye = fillStyle;
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

  get fill() {
    return this._fill;
  }

  set fill(f: boolean) {
    this._fill = f;
  }

  get fillStyle() {
    return this._fillStye;
  }

  set fillStyle(style: string) {
    this._fillStye = style;
  }

  toJSON(): { [key: string]: any; } {
    return {
      radius: this.radius,
      startAngle: this.startAngle,
      endAngle: this.endAngle,
      counterClockwise: this.counterClockwise,
      fill: this.fill,
      fillStyle: this.fillStyle,
    };
  }

  fromJSON(json: { [key: string]: any; }): void {
    json = json as {
      radius: number,
      startAngle: number,
      endAngle: number,
      counterClockwise: number,
      fill: boolean,
      fillStyle: string,
    }; 

    this.radius = json.radius;
    this.startAngle = json.startAngle;
    this.endAngle = json.endAngle;
    this.counterClockwise = json.counterClockwise;
    this.fill = json.fill;
    this.fillStyle = json.fillStyle;
  }
}