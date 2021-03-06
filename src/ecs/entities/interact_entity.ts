import { Entity } from "."
import { DrawableComponent } from "../components/drawable";
import { Position } from "../components/position"
import { SizeComponent } from "../components/size";
import { RectangleTagComponent } from "../components/tags/rectangle_shape";
import { EntityType, IEntity } from "../types/entity_types"

export class InteractEntity extends Entity {
  private _child: IEntity;

  constructor(child: IEntity) {
    super(EntityType.INTERACT, `${child.id}_box`)
    this._child = child;

    const drawable = new DrawableComponent();
    drawable.setLineDash(2,1)

    this.add(new Position(this));
    this.add(new SizeComponent(this));
    this.add(drawable);
    this.add(new RectangleTagComponent());
  }

  get child() {
    return this._child
  }

  toJSON(): { [key: string]: any; } | null {
    return null;
  }


}