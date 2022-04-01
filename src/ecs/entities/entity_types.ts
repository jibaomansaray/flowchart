import { ComponentTypes, IComponent } from "../components/component_types";

export enum EntityType {
  CIRCLE = 'circle',
  START = 'start',
  STATE = 'state',
  CONDITION = 'condition',
  END = 'end',
  FLOW = 'flow'
}

export interface IEntity {
  get id(): string;
  get type(): EntityType;
  components(types: Array<ComponentTypes>, any: boolean): Map<ComponentTypes, IComponent> | null;
  add(component: IComponent | Array<IComponent>): void;
  get(type: ComponentTypes, callback?: (component: IComponent) => void): IComponent | null;
  toJSON(): { [key:string]: any };
  fromJSON(json: { [key:string]: any }): void;
}