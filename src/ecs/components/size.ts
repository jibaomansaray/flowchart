import { ComponentTypes, IComponent } from "./component_types";

export class SizeComponent implements IComponent {

  private _width: number;
  private _height: number;

  constructor(width = 0, height = 0) {
    this._width = width;
    this._height = height;
  }

  get type(): ComponentTypes {
    return ComponentTypes.SIZE;
  }

  get width() {
    return this._width;
  }

  set width(w: number) {
    this._width = w;
  }

  get height() {
    return this._height;
  }

  set height(h: number) {
    this._height = h;
  }

  toJSON(): { [key: string]: any; } {
    return {
      width: this.width,
      height: this.height
    };
  }

  fromJSON(json: { [key: string]: any; }): void {
    json = json as { width: number, height: number };

    this.width = json.width;
    this.height = json.height;
  }

}