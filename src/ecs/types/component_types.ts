export enum ComponentTypes {
  DRAWABLE = 'drawable',
  FILLABLE = 'fillable',
  POSITION = 'position',
  CIRCLE = 'circle',
  SIZE = 'size',
  MOUSE_COLLISION = 'mouse_collision',
  INTERACT = 'interact',
  LINE = 'line'
}

export interface IComponent {
  get type(): ComponentTypes;
  toJSON(): { [key:string]: any };
  fromJSON(json: { [key:string]: any }): void;
}