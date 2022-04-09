import { Entity } from ".";
import { CircleComponent } from "../components/circle";
import { ConnectableComponent } from "../components/connectable";
import { DrawableComponent } from "../components/drawable";
import { FillableComponent } from "../components/fillable";
import { InteractComponent } from "../components/interact";
import { MouseCollisionComponent } from "../components/mouse_collision";
import { Position } from "../components/position";
import { SizeComponent } from "../components/size";
import { CircleTagComponent } from "../components/tags/circle_shape";
import { EntityType } from "../types/entity_types";

export class CircleEntity extends Entity {

  constructor(id?: string, type = EntityType.CIRCLE) {
    super(type, id);

    this.add(new FillableComponent());
    this.add(new Position(this));
    this.add(new CircleComponent());
    this.add(new MouseCollisionComponent());
    this.add(new DrawableComponent());
    this.add(new InteractComponent(this));
    this.add(new ConnectableComponent(this));
    this.add(new SizeComponent(this));
    this.add(new CircleTagComponent());
  }

}