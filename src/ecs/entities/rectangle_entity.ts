import { Entity } from ".";
import { EntityType } from "./entity_types";
import { Position } from "../components/position";
import { FillableComponent } from "../components/fillable";
import { SizeComponent } from "../components/size";
import { MouseCollisionComponent } from "../components/mouse_collision";
import { DrawableComponent } from "../components/drawable";
import { InteractComponent } from "../components/interact";

export class RectangleEntity extends Entity {

  constructor(id?: string, type = EntityType.RECTANGLE) {
    super(type, id);
    this.add(new Position());
    this.add(new FillableComponent());
    this.add(new SizeComponent());
    this.add(new MouseCollisionComponent());
    this.add(new DrawableComponent());
    this.add(new InteractComponent());
  }
}