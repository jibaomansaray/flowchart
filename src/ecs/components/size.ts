import { ComponentTypes, IComponent } from "../types/component_types";
import { IEntity } from "../types/entity_types";
import { CircleComponent } from "./circle";

export class SizeComponent implements IComponent {

  private _width: number;
  private _height: number;
  private _entity: IEntity;

  constructor(entity: IEntity,width = 0, height = 0) {
    this._entity = entity;
    this._width = width;
    this._height = height;
  }

  get type(): ComponentTypes {
    return ComponentTypes.SIZE;
  }

  get width() {
    let width = this._width
    this._entity.get(ComponentTypes.CIRCLE, (c) => {
      width = (c as CircleComponent).radius * 2;
    })
    return width;
  }

  set width(w: number) {
    this._entity.get(ComponentTypes.CIRCLE, (c) => {
      (c as CircleComponent).radius = w / 2;
    })
    this._width = w;
  }

  get height() {
    let height = this._height;
    this._entity.get(ComponentTypes.CIRCLE, (c) => {
      height = (c as CircleComponent).radius * 2;
    })
    return height;
  }

  set height(h: number) {
    this._entity.get(ComponentTypes.CIRCLE, (c) => {
      (c as CircleComponent).radius = h / 2;
    })
    this._height = h;
  }

  toJSON(): { [key: string]: any; } {
    // we want to non calculated values. Calculation will be don't at the time of `setting`
    return {
      width: this._width,
      height: this._height
    };
  }

  fromJSON(json: { [key: string]: any; }): void {
    json = json as { width: number, height: number };

    this.width = json.width;
    this.height = json.height;
  }

}