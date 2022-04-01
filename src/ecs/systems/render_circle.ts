import { CircleComponent } from "../components/circle";
import { ComponentTypes, IComponent } from "../components/component_types";
import { FillableComponent } from "../components/fillable";
import { Position } from "../components/position";
import { IEntity } from "../entities/entity_types";
import { ISystem } from "./system_types";

export class RenderCircle implements ISystem {
  setup(_canvas: HTMLCanvasElement): void {

  }

  update(entities: Map<string, IEntity>, ctx: CanvasRenderingContext2D): void {
    const list = [ComponentTypes.POSITION, ComponentTypes.CIRCLE];

    entities.forEach((ent) => {
      const components = ent.components(list, false);
      if (components) {
        this.render(components, ctx, ent);
      }
    })
  }

  private render(components: Map<ComponentTypes, IComponent>, ctx: CanvasRenderingContext2D, ent: IEntity) {
    const pos = components.get(ComponentTypes.POSITION)! as Position;
    const circle = components.get(ComponentTypes.CIRCLE)! as CircleComponent;
    const fillable = ent.get(ComponentTypes.FILLABLE);


    // @todo filling

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, circle.radius, circle.startAngle, circle.endAngle, circle.counterClockwise);

    if (fillable && (fillable as FillableComponent).fill) {
      ctx.fillStyle = (fillable as FillableComponent).fillStyle;
      ctx.fill();
    } else {
      ctx.stroke();
    }
  }
}