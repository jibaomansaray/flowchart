export enum ComponentTypes {
  FILLABLE = 'fillable',
  POSITION = 'position',
  CIRCLE = 'circle',
  SIZE = 'size',
}

export interface IComponent {
  get type(): ComponentTypes;
  toJSON(): { [key:string]: any };
  fromJSON(json: { [key:string]: any }): void;
}