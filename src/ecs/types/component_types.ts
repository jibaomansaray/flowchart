export enum ComponentTypes {
  DRAWABLE = 'drawable',                      // The entity is drawable
  FILLABLE = 'fillable',                      // The entity can be will with something eg. color
  POSITION = 'position',                      // The entity can be position on the canvas
  CIRCLE = 'circle',                          // The entity is a circle
  CONNECTABLE= 'connectable',                 // The entity can be connected
  SIZE = 'size',                              // The entity can be sized. note
  MOUSE_COLLISION = 'mouse_collision',        // The entity response to mouse interaction
  INTERACT = 'interact',                      // The entity can be interacted with
  LINE = 'line',                              // The entity is a line
  LINK = 'link',                              // Stores link data for connector entity
  CIRCLE_SHAPE_TAG = 'circle_tag',            // Identifies an entity as a `circle` shape
  RECTANGLE_SHAPE_TAG = 'rectangle_tag',      // Identifies an entity as a `rectangle` shape
  LINE_SHAPE_TAG = 'line_tag',                // Identifies an entity as a `line` shape
}

export interface IComponent {
  get type(): ComponentTypes;
  toJSON(): { [key:string]: any };
  fromJSON(json: { [key:string]: any }): void;
}