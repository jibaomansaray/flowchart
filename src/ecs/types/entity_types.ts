import { ComponentTypes, IComponent } from "../types/component_types";

export enum EntityType {
  CIRCLE = 'circle',
  RECTANGLE = 'rectangle',
  LINE = 'line',
  INTERACT = 'interact',
  CONNECTOR = 'connector',
  FLOWCHART_START = 'start',
  FLOWCHART_STATE = 'state',
  FLOWCHART_CONDITION = 'condition',
  FLOWCHART_END = 'end',
  FLOWCHART_FLOW = 'flow',
}

export interface IEntity {
  get id(): string;
  get type(): EntityType;
  components(types: Array<ComponentTypes>, any: boolean): Map<ComponentTypes, IComponent> | null;
  add(component: IComponent | Array<IComponent>): void;
  get(type: ComponentTypes, callback?: (component: IComponent) => void): IComponent | null;
  toJSON(): { [key:string]: any } | null;
  fromJSON(json: { [key:string]: any }): void;
}