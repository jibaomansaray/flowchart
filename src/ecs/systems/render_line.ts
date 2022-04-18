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

    ctx.save()
    ctx.strokeStyle = drawable.strokeStyle || ctx.strokeStyle;
    ctx.setLineDash(drawable.lineDash);

    ctx.beginPath();
    ctx.lineWidth = drawable.lineWidth;
    ctx.moveTo(line.aX, line.aY);
    ctx.lineTo(line.bX, line.bY);
    ctx.stroke();

    if (line.drawHead) {
      this.arrow(ctx, drawable, line.aX, line.aY, line.bX, line.bY)
    }

    ctx.restore()
  }

  private arrow(ctx: CanvasRenderingContext2D, drawable: DrawableComponent , x1: number, y1: number, x2: number, y2: number) {
    ctx.beginPath();
    ctx.strokeStyle = drawable.strokeStyle || ctx.strokeStyle;
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2);
    ctx.stroke()

    var dx = x2 - x1
    var dy = y2 - y1
    var size = 10

    ctx.save();
    ctx.strokeStyle = drawable.strokeStyle || ctx.strokeStyle;
    ctx.fillStyle = drawable.strokeStyle || ctx.strokeStyle
    ctx.translate(x2, y2)
    ctx.rotate(Math.atan2(dy, dx))
    ctx.moveTo(3, 0);
    ctx.lineTo(-size, -size);
    ctx.lineTo(-size, size);
    ctx.closePath();
    ctx.fill()
    ctx.restore()
  }


}

export const renderLine = new RenderLine();