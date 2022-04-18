import { CircleComponent } from "../components/circle";
import { ComponentTypes, IComponent } from "../types/component_types";
import { DrawableComponent } from "../components/drawable";
import { FillableComponent } from "../components/fillable";
import { Position } from "../components/position";
import { IEntity } from "../types/entity_types";
import { ISystem } from "../types/system_types";

export class RenderCircle implements ISystem {
  setup(_canvas: HTMLCanvasElement): void {

  }

  update(entity: IEntity, ctx: CanvasRenderingContext2D, _timestamp: number): void {
    const list = [
      ComponentTypes.POSITION,
      ComponentTypes.CIRCLE,
      ComponentTypes.DRAWABLE,
      ComponentTypes.CIRCLE_SHAPE_TAG
    ];

    const components = entity.components(list, false);
    if (components) {
      this.render(components, ctx, entity);
    }
  }

  private render(components: Map<ComponentTypes, IComponent>, ctx: CanvasRenderingContext2D, ent: IEntity) {
    const pos = components.get(ComponentTypes.POSITION)! as Position;
    const circle = components.get(ComponentTypes.CIRCLE)! as CircleComponent;
    const drawable = components.get(ComponentTypes.DRAWABLE)! as DrawableComponent;
    const fillable = ent.get(ComponentTypes.FILLABLE);


    // @todo filling

    ctx.save()
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, circle.radius, circle.startAngle, circle.endAngle, circle.counterClockwise);

    ctx.strokeStyle = drawable.strokeStyle;
    ctx.setLineDash(drawable.lineDash);
    ctx.lineWidth = drawable.lineWidth;

    if (fillable && (fillable as FillableComponent).fill) {
      ctx.fillStyle = (fillable as FillableComponent).fillStyle;
      ctx.fill();
    } else {
      ctx.stroke();
    }

    ctx.restore()
  }
}

export const renderCircle = new RenderCircle();