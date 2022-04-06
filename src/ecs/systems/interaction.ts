import { ComponentTypes, IComponent } from "../components/component_types";
import { DrawableComponent } from "../components/drawable";
import { FillableComponent } from "../components/fillable";
import { InteractComponent } from "../components/interact";
import { MouseCollisionComponent } from "../components/mouse_collision";
import { IEntity } from "../entities/entity_types";
import { ISystem } from "./system_types";

export class Interaction implements ISystem {

  setup(_canvas: HTMLCanvasElement): void {

  }

  update(entities: Map<string, IEntity>, _ctx: CanvasRenderingContext2D): void {
    const list = [ComponentTypes.MOUSE_COLLISION, ComponentTypes.DRAWABLE, ComponentTypes.INTERACT];

    entities.forEach((ent) => {
      const components = ent.components(list, false);
      if (components) {
        this.doInteraction(components, ent);
      }
    })
  }

  private doInteraction(components: Map<ComponentTypes, IComponent>, ent: IEntity) {
    const mouseComponent = components.get(ComponentTypes.MOUSE_COLLISION)! as MouseCollisionComponent;
    const drawable = components.get(ComponentTypes.DRAWABLE)! as DrawableComponent;
    const interact = components.get(ComponentTypes.INTERACT)! as InteractComponent;

    ent.get(ComponentTypes.FILLABLE, (com) => {
      const c = com as FillableComponent;
      if (mouseComponent.detected) {
        drawable.tempStrokeStyle = interact.strokeStyle;
        if (c.fill) {
          c.tempFillStyle = interact.fillStyle;
        }
      } else {
        drawable.tempStrokeStyle = '';
        if (c.fill) {
          c.tempFillStyle = ''
        }
      }
    })
  }
}

export const interaction = new Interaction();