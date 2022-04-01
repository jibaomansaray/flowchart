import { IEntity } from "../entities/entity_types";
import { ComponentTypes, IComponent } from "../components/component_types";
import { ISystem } from "./system_types";
import { FillableComponent } from "../components/fillable";

export class ChangeCircleFill implements ISystem {
  private fps: number = 60;
  private counter = 0;
  setup(_canvas: HTMLCanvasElement): void {
      
  }

  update(entities: Map<string, IEntity>, _ctx: CanvasRenderingContext2D): void {
    const colors = ['red', 'blue', 'green', 'yellow', 'black', '#8B0000'];
    if (this.counter < this.fps) {
      this.counter++;
      return;
    }
    this.counter = 0;

    entities.forEach((ent) => {
      ent.get(ComponentTypes.FILLABLE, (cmp: IComponent) => {
        (cmp as FillableComponent).fillStyle = colors[Math.floor(Math.random() * colors.length)];
       });
    })
  }

}