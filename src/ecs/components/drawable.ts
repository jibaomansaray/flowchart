import { ComponentTypes, IComponent } from "../types/component_types";

export class DrawableComponent implements IComponent {

  private _strokeStyle: string;
  private _tempStrokeStyle: string;
  private _lineDash: number[];
  private _lineWidth: number;

  constructor(strokeStyle = 'black') {
    this._strokeStyle = strokeStyle;
    this._tempStrokeStyle = '';
    this._lineDash = [];
    this._lineWidth = 1;
  }

  get type(): ComponentTypes {
    return ComponentTypes.DRAWABLE;
  }

  get strokeStyle() {
    return this._tempStrokeStyle ||  this._strokeStyle;
  }

  set strokeStyle(s: string) {
    this._strokeStyle = s;
  }

  set tempStrokeStyle(s: string) {
    this._tempStrokeStyle = s;
  }

  get lineDash() {
    return this._lineDash
  }

  set lineDash(n: number[]) {
    this._lineDash = []
    if (n.length >= 2) {
      this._lineDash[0] = n[0];
      this._lineDash[1] = n[1];
    }
  }

  public setLineDash(line: number, space: number) {
    this._lineDash = [
      line,
      space
    ];
  }


  toJSON(): { [key: string]: any; } {
    return {
        stokeStyle: this._strokeStyle // we don't want the temp color
    }
  }

  fromJSON(json: { [key: string]: any; }): void {
    json = json as { strokeStyle: string };

    this.strokeStyle = json.strokeStyle;
  }

}