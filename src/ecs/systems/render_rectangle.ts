import { IEntity } from "../entities/entity_types";
import { ISystem } from "./system_types";
import { ComponentTypes, IComponent } from "../components/component_types";
import { Position } from "../components/position";
import { SizeComponent } from "../components/size";
import { FillableComponent } from "../components/fillable";
import { DrawableComponent } from "../components/drawable";

export class RenderRectangle implements ISystem {
  setup(_canvas: HTMLCanvasElement): void {}

  update(entities: Map<string, IEntity>, ctx: CanvasRenderingContext2D): void {
    const list = [ComponentTypes.POSITION, ComponentTypes.SIZE, ComponentTypes.DRAWABLE];

    entities.forEach((ent) => {
      const components = ent.components(list, false);
      if (components) {
        this.render(components, ctx, ent);
      }
    })
  }


  private render(components: Map<ComponentTypes, IComponent>, ctx: CanvasRenderingContext2D, ent: IEntity) {
    const pos = components.get(ComponentTypes.POSITION)! as Position;
    const size = components.get(ComponentTypes.SIZE)! as SizeComponent;
    const drawable = components.get(ComponentTypes.DRAWABLE)! as DrawableComponent;
    const fillable = ent.get(ComponentTypes.FILLABLE);

    ctx.strokeStyle = drawable.strokeStyle;
    if (fillable && (fillable as FillableComponent).fill) {
      ctx.fillStyle = (fillable as FillableComponent).fillStyle;
      ctx.fillRect(pos.x, pos.y, size.width, size.height);
    } else {
      ctx.strokeRect(pos.x, pos.y, size.width, size.height);
    }
  }
}

export const renderRectangle = new RenderRectangle()