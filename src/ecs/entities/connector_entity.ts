import { Entity } from ".";
import { EntityType } from "../types/entity_types";
import { LineComponent } from '../components/line'
import { LinkComponent } from "../components/link";
import { DrawableComponent } from "../components/drawable";
import { ComponentTypes } from "../types/component_types";
import { LineTagComponent } from "../components/tags/line_shape";


export class ConnectorEntity extends Entity {
  constructor(id: string) {
    super(EntityType.CONNECTOR, id)
    this.add(new DrawableComponent());
    this.add(new LineComponent(this));
    this.add(new LinkComponent());
    this.add(new LineTagComponent());

    this.get(ComponentTypes.DRAWABLE, (d) => { 
      (d as DrawableComponent).strokeStyle = 'red';
    });
  }
 
}