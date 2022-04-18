import { InteractEntity } from "../entities/interact_entity";
import { manager } from "../manager";
import { ComponentTypes, IComponent } from "../types/component_types";
import { IEntity } from "../types/entity_types";

export class InteractComponent implements IComponent {
  private _strokeStyle: string;
  private _fillStyle: string;
  private _box: IEntity;
  private _highlight: boolean;
  private _fill: boolean;

  constructor(entity: IEntity) {
    this._fillStyle = 'green';
    this._strokeStyle = 'red';
    this._highlight = true;
    this._box = new InteractEntity(entity);
    this._fill = true;

    manager.addEntity(this._box);
  }

  get type(): ComponentTypes {
    return ComponentTypes.INTERACT;
  }

  get fillStyle() {
    return this._fillStyle;
  }

  set fillStyle(s: string) {
    this._fillStyle = s;
  }

  get strokeStyle() {
    return this._strokeStyle;
  }

  set strokeStyle(s: string) {
    this._strokeStyle = s;
  }

  get box() {
    return this._box;
  }

  get highlight() {
    return this._highlight;
  }

  set highlight(h: boolean) {
    this._highlight = h;
  }

  get fill() {
    return this._fill;
  }

  set fill(f: boolean) {
    this._fill = f;
  }

  toJSON(): { [key: string]: any; } {
    return {
      fillStyle: this.fillStyle,
      strokeStyle: this.strokeStyle,
      highlight: this.highlight,
      fill: this.fill
    }
  }

  fromJSON(json: { [key: string]: any; }): void {
    json = json as {
      fillStyle: string,
      strokeStyle: string,
      highlight: boolean,
      fill: boolean
    };

    this.fillStyle = json.fillStyle;
    this.strokeStyle = json.strokeStyle;
    this.highlight = json.highlight;
    this.fill = json.fill;
  }

}