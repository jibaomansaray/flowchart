import { Entity } from ".";
import { CircleComponent } from "../components/circle";
import { FillableComponent } from "../components/fillable";
import { Position } from "../components/position";
import { EntityType } from "./entity_types";

export class CircleEntity extends Entity {

  constructor(id?: string, type = EntityType.CIRCLE) {
    super(type, id);

    this.add(new FillableComponent());
    this.add(new Position());
    this.add(new CircleComponent());
  }

}