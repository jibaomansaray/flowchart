import { CircleComponent } from "../components/circle";
import { InteractComponent } from "../components/interact";
import { ComponentTypes } from "../types/component_types";
import { EntityType } from "../types/entity_types";
import { CircleEntity } from "./circle_entity";

export class DotEntity extends CircleEntity {
  constructor(id?: string, type = EntityType.DOT) {
    super(id, type);
    this.remove([
      ComponentTypes.DRAGGABLE,
      ComponentTypes.CONNECTABLE
    ]);

    this.get(ComponentTypes.CIRCLE, (c) => {
      (c as CircleComponent).radius = 5;
    })

    this.get(ComponentTypes.INTERACT, (i) => {
      (i as InteractComponent).highlight = false;
      (i as InteractComponent).fillStyle = "gray";
    })
  }
}