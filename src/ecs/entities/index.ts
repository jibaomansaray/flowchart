import { manager } from '../manager';
import { ComponentTypes, IComponent } from '../types/component_types';
import { EntityType, IEntity } from '../types/entity_types'
export class Entity implements IEntity {

  protected _id: string;
  protected _component: Map<ComponentTypes, IComponent>;
  protected _type: EntityType;

  constructor(type: EntityType,id?: string) {
    this._id = id || manager.newId();
    this._component = new Map();
    this._type = type;
  }

  get id() {
    return this._id;
  }

  get type(){
    return this._type;
  }

  add(component: IComponent | IComponent[]): void {
    const list = (Array.isArray(component)) ? component : [component];
    list.forEach((cmp) => {
      this._component.set(cmp.type, cmp);
    })
  }

  components(types: ComponentTypes[], any: boolean): Map<ComponentTypes, IComponent> | null {
    const list = new Map<ComponentTypes, IComponent>()
    let allFound = true;

    types.forEach((id) => {
      const cmp = this._component.get(id)
      if (cmp) {
        list.set(cmp.type, cmp);
      } else {
        allFound = false;
      }
    })

    return (allFound || any) ? list : null;
  }

  get(type: ComponentTypes, callback?: (component: IComponent) => void): IComponent | null {
    const cmp = this._component.get(type);

    if (cmp && callback) {
      callback(cmp);
    } 

    return cmp || null;
  }

  toJSON(): { [key: string]: any; } | null {
    const list:{[key:string]: {[key:string]: any}} = {};

    this._component.forEach((cmp) => {
      list[cmp.type as string] = cmp.toJSON()
    });

    return {
      id: this.id,
      type: this.type,
      components: list
    };
  }

  fromJSON(json: { [key: string]: any; }): void {
    json = json as { id: string, type: EntityType, components: {[key:string]: {[key:string]: any}} };
    this._id = json.id;
    this._type = json.type;

    for (let type in json.components) {
      const cmp = this._component.get(type as ComponentTypes);
      if (cmp) {
        cmp.fromJSON(json.components[type]);
      }
    }
  }
}