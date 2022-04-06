import { ComponentTypes, IComponent } from "./component_types";

export class DrawableComponent implements IComponent {

  private _strokeStyle: string;
  private _tempStrokeStyle: string;

  constructor(strokeStyle = 'black') {
    this._strokeStyle = strokeStyle;
    this._tempStrokeStyle = '';
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