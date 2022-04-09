import { DrawableComponent } from "../components/drawable";
import { LineComponent } from "../components/line";
import { ComponentTypes, IComponent } from "../types/component_types";
import { IEntity } from "../types/entity_types";
import { ISystem } from "../types/system_types";

export class RenderLine implements ISystem {
  setup(_canvas: HTMLCanvasElement): void { }

  update(entity: IEntity, ctx: CanvasRenderingContext2D, _timestamp: number): void {
    const list = [
      ComponentTypes.LINE,
      ComponentTypes.DRAWABLE,
      ComponentTypes.LINE_SHAPE_TAG
    ];

    const components = entity.components(list, false);
    if (components) {
      this.render(components, ctx, entity);
    }
  }

  private render(components: Map<ComponentTypes, IComponent>, ctx: CanvasRenderingContext2D, _ent: IEntity) {
    const line = components.get(ComponentTypes.LINE)! as LineComponent;
    const drawable = components.get(ComponentTypes.DRAWABLE)! as DrawableComponent;

    ctx.strokeStyle = drawable.strokeStyle || ctx.strokeStyle;
    ctx.setLineDash(drawable.lineDash);

    ctx.beginPath();
    ctx.moveTo(line.aX, line.aY);
    ctx.lineTo(line.bX, line.bY);
    ctx.stroke();
  }
}

export const renderLine = new RenderLine();