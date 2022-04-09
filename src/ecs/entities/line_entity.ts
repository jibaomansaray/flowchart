import { Entity } from ".";
import { DrawableComponent } from "../components/drawable";
import { InteractComponent } from "../components/interact";
import { LineComponent } from "../components/line";
import { LineTagComponent } from "../components/tags/line_shape";
import { MouseCollisionComponent } from "../components/mouse_collision";
import { EntityType } from "../types/entity_types";

export class LineEntity extends Entity {

  constructor(id?: string, type = EntityType.LINE) {
    super(type, id);

    this.add(new LineComponent(this));
    this.add(new MouseCollisionComponent());
    this.add(new DrawableComponent());
    this.add(new InteractComponent(this));
    this.add(new LineTagComponent());
  }
}