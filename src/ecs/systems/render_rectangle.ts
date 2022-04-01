import { IEntity } from "../entities/entity_types";
import { ISystem } from "./system_types";
import { ComponentTypes, IComponent } from "../components/component_types";
import { Position } from "../components/position";
import { SizeComponent } from "../components/size";
import { FillableComponent } from "../components/fillable";

export class RenderRectangle implements ISystem {
  setup(_canvas: HTMLCanvasElement): void {}

  update(entities: Map<string, IEntity>, ctx: CanvasRenderingContext2D): void {
    const list = [ComponentTypes.POSITION, ComponentTypes.SIZE];

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
    const fillable = ent.get(ComponentTypes.FILLABLE);

    if (fillable && (fillable as FillableComponent).fill) {
      ctx.fillStyle = (fillable as FillableComponent).fillStyle;
      ctx.fillRect(pos.x, pos.y, size.width, size.height);
    } else {
      ctx.strokeRect(pos.x, pos.y, size.width, size.height);
    }
  }
}