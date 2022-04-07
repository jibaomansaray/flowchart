import { InteractEntity } from "../entities/interact_entity";
import { manager } from "../manager";
import { ComponentTypes, IComponent } from "../types/component_types";
import { IEntity } from "../types/entity_types";

export class InteractComponent implements IComponent {
  private _strokeStyle: string;
  private _fillStyle: string;
  private _box: IEntity;

  constructor(entity: IEntity) {
    this._fillStyle = 'green';
    this._strokeStyle = 'red';
    this._box = new InteractEntity(entity);

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

  toJSON(): { [key: string]: any; } {
    return {
      fillStyle: this.fillStyle,
      strokeStyle: this.strokeStyle
    }
  }

  fromJSON(json: { [key: string]: any; }): void {
    json = json as { fillStyle: string, strokeStyle: string };

    this.fillStyle = json.fillStyle;
    this.strokeStyle = json.strokeStyle;
  }

}