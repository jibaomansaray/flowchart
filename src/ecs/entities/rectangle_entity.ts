import { Entity } from ".";
import { EntityType } from "../types/entity_types";
import { Position } from "../components/position";
import { FillableComponent } from "../components/fillable";
import { SizeComponent } from "../components/size";
import { MouseCollisionComponent } from "../components/mouse_collision";
import { DrawableComponent } from "../components/drawable";
import { InteractComponent } from "../components/interact";
import { ConnectableComponent } from "../components/connectable";
import { RectangleTagComponent } from "../components/tags/rectangle_shape";
import { DraggableComponent } from "../components/draggable";

export class RectangleEntity extends Entity {

  constructor(id?: string, type = EntityType.RECTANGLE) {
    super(type, id);
    this.add(new Position(this));
    this.add(new FillableComponent());
    this.add(new SizeComponent(this));
    this.add(new MouseCollisionComponent());
    this.add(new DrawableComponent());
    this.add(new InteractComponent(this));
    this.add(new ConnectableComponent(this));
    this.add(new RectangleTagComponent());
    this.add(new DraggableComponent());
  }
}