import { ComponentTypes, IComponent } from "../types/component_types";
import { DrawableComponent } from "../components/drawable";
import { FillableComponent } from "../components/fillable";
import { InteractComponent } from "../components/interact";
import { MouseCollisionComponent } from "../components/mouse_collision";
import { IEntity } from "../types/entity_types";
import { ISystem } from "../types/system_types";
import { Position } from "../components/position";
import { SizeComponent } from "../components/size";
import { CircleComponent } from "../components/circle";

export class Interaction implements ISystem {
  private _offsetX: number = 0;
  private _offsetY: number = 0;

  setup(canvas: HTMLCanvasElement): void {
    this._offsetX = canvas.getBoundingClientRect().left;
    this._offsetY = canvas.getBoundingClientRect().top;
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

    this.toggleBox(mouseComponent.detected, components, ent);
    this.toggleFill(mouseComponent.detected, components, ent);
  }

  private toggleFill(detected: boolean, components: Map<ComponentTypes, IComponent>, ent: IEntity) {
    const drawable = components.get(ComponentTypes.DRAWABLE)! as DrawableComponent;
    const interact = components.get(ComponentTypes.INTERACT)! as InteractComponent;
    ent.get(ComponentTypes.FILLABLE, (com) => {
      const c = com as FillableComponent;
      if (detected && interact.fill) {
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

  private toggleBox(detected: boolean, components: Map<ComponentTypes, IComponent>, ent: IEntity) {
    const interact = components.get(ComponentTypes.INTERACT)! as InteractComponent;
    const pos = ent.get(ComponentTypes.POSITION)! as Position;
    const size = ent.get(ComponentTypes.SIZE)! as SizeComponent;
    const circle = ent.get(ComponentTypes.CIRCLE)! as CircleComponent;

    if (detected && interact.highlight) {
      interact.box.get(ComponentTypes.POSITION, (c) => {
        const p = c as Position;
        if (circle) {
          p.x = pos.x - circle.radius - 4;
          p.y = pos.y - circle.radius - 4
        } else {
          p.x = pos.x - 4;
          p.y = pos.y - 4
        }
      });

      interact.box.get(ComponentTypes.SIZE, (c) => {
        const s = c as SizeComponent;
        if (circle) {
          s.width = circle.width + 10;
          s.height = circle.height + 10;
        } else {
          s.width = size.width + 8;
          s.height = size.height + 8;
        }
      });
    } else {
      interact.box.get(ComponentTypes.SIZE, (c) => {
        const s = c as SizeComponent;
        s.width = 0
        s.height = 0;
      });
    }

  }

}

export const interaction = new Interaction();