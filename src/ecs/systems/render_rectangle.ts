import { IEntity } from "../types/entity_types";
import { ISystem } from "../types/system_types";
import { ComponentTypes, IComponent } from "../types/component_types";
import { Position } from "../components/position";
import { SizeComponent } from "../components/size";
import { FillableComponent } from "../components/fillable";
import { DrawableComponent } from "../components/drawable";

export class RenderRectangle implements ISystem {
  setup(_canvas: HTMLCanvasElement): void { }

  update(entity: IEntity, ctx: CanvasRenderingContext2D, _timestamp: number): void {
    const list = [
      ComponentTypes.POSITION,
      ComponentTypes.SIZE,
      ComponentTypes.DRAWABLE,
      ComponentTypes.RECTANGLE_SHAPE_TAG
    ];
    const components = entity.components(list, false);
    if (components) {
      this.render(components, ctx, entity);
    }
  }


  private render(components: Map<ComponentTypes, IComponent>, ctx: CanvasRenderingContext2D, ent: IEntity) {
    const pos = components.get(ComponentTypes.POSITION)! as Position;
    const size = components.get(ComponentTypes.SIZE)! as SizeComponent;
    const drawable = components.get(ComponentTypes.DRAWABLE)! as DrawableComponent;
    const fillable = ent.get(ComponentTypes.FILLABLE);

    ctx.save()
    ctx.strokeStyle = drawable.strokeStyle;
    ctx.setLineDash(drawable.lineDash);

    if (fillable && (fillable as FillableComponent).fill) {
      ctx.fillStyle = (fillable as FillableComponent).fillStyle;
      ctx.fillRect(pos.x, pos.y, size.width, size.height);
    } else {
      ctx.strokeRect(pos.x, pos.y, size.width, size.height);
    }

    ctx.restore()
  }
}

export const renderRectangle = new RenderRectangle()