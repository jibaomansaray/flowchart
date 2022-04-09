import { ComponentTypes, IComponent } from "../types/component_types";
import { EntityType, IEntity } from "../types/entity_types";
import { CircleComponent } from "./circle";

export class Position implements IComponent {
  protected _x: number;
  protected _y: number;
  protected _entity: IEntity;

  constructor(entity: IEntity, x = 0, y = 0) {
    this._entity = entity;
    this._x = x;
    this._y = y;
  }

  get type() {
    return ComponentTypes.POSITION;
  }

  get x() {
    return this._x;
  }

  /**
   * Always return the top x considering the entity type
   */
  get topX() {
    let x = this.x;
    this._entity.get(ComponentTypes.CIRCLE, (c) => {
      x -= (c as CircleComponent).radius;
    })

    return x;
  }

  /**
   * 
   * Always return the top y considering the entity type
   */
  get topY() {
    let y = this.y;
    this._entity.get(ComponentTypes.CIRCLE, (c) => {
      y -= (c as CircleComponent).radius;
    })

    return y;
  }

  set x(value: number) {
    this._x = value;
  }

  get y() {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }

  toJSON(): { [key: string]: any; } {
    return {
      x: this.x,
      y: this.y
    };
  }

  fromJSON(json: { [key: string]: any; }): void {
    json = json as { x: number, y: number };
    this.x = json.x;
    this.y = json.y;
  }
}