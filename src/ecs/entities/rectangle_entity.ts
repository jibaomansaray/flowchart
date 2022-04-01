import { Entity } from ".";
import { EntityType } from "./entity_types";
import { Position } from "../components/position";
import { FillableComponent } from "../components/fillable";
import { SizeComponent } from "../components/size";

export class RectangleEntity extends Entity {

  constructor(id?: string, type = EntityType.RECTANGLE) {
    super(type, id);
    this.add(new Position());
    this.add(new FillableComponent());
    this.add(new SizeComponent());
  }
}