import { ComponentTypes, IComponent } from "../types/component_types";
import { DrawableComponent } from "../components/drawable";
import { FillableComponent } from "../components/fillable";
import { InteractComponent } from "../components/interact";
import { MouseCollisionComponent } from "../components/mouse_collision";
import { IEntity } from "../types/entity_types";
import { ISystem } from "../types/system_types";

export class Interaction implements ISystem {

  setup(_canvas: HTMLCanvasElement): void {

  }

  update(entity: IEntity, _ctx: CanvasRenderingContext2D, _timestamp: number): void {
    const list = [ComponentTypes.MOUSE_COLLISION, ComponentTypes.DRAWABLE, ComponentTypes.INTERACT];

    const components = entity.components(list, false);
    if (components) {
      this.doInteraction(components, entity);
    }
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