export enum ComponentTypes {
  POSITION = 'position',
  CIRCLE = 'circle',
}

export interface IComponent {
  get type(): ComponentTypes;
  toJSON(): { [key:string]: any };
  fromJSON(json: { [key:string]: any }): void;
}