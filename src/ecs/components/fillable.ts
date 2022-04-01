import { ComponentTypes, IComponent } from "./component_types";

export class FillableComponent implements IComponent {

  private _fill: boolean;
  private _fillStyle: string

  constructor(fill = true, fillStyle = 'black') {
    this._fill = fill;
    this._fillStyle = fillStyle;
  }

  get type(): ComponentTypes {
    return ComponentTypes.FILLABLE;
  }

  get fill() {
    return this._fill;
  }

  set fill(f: boolean) {
    this._fill = f;
  }

  get fillStyle() {
    return this._fillStyle;
  }

  set fillStyle(style: string) {
    this._fillStyle = style;
  }

  toJSON(): { [key: string]: any; } {
    return {
      fill: this.fill,
      fillStyle: this.fillStyle
    };
  }

  fromJSON(json: { [key: string]: any; }): void {
    json = json as { fill: boolean, fillStyle: string };

    this.fill = json.fill;
    this.fillStyle = json.fillStyle;
  }

}