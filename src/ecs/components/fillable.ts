import { ComponentTypes, IComponent } from "../types/component_types";

export class FillableComponent implements IComponent {

  private _fill: boolean;
  private _fillStyle: string;
  private _tempFillStyle: string;

  constructor(fill = true, fillStyle = 'black') {
    this._fill = fill;
    this._fillStyle = fillStyle;
    this._tempFillStyle = '';
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
    return this._tempFillStyle || this._fillStyle;
  }

  set fillStyle(style: string) {
    this._fillStyle = style;
  }

  get tempFillStyle() {
    return this._tempFillStyle;
  }

  set tempFillStyle(s: string) {
    this._tempFillStyle = s;
  }

  toJSON(): { [key: string]: any; } {
    return {
      fill: this.fill,
      fillStyle: this._fillStyle // we don't want the temp color 
    };
  }

  fromJSON(json: { [key: string]: any; }): void {
    json = json as { fill: boolean, fillStyle: string };

    this.fill = json.fill;
    this.fillStyle = json.fillStyle;
  }

}