import { IEntity } from "../types/entity_types";
import { ComponentTypes, IComponent } from "../types/component_types";
import { ISystem } from "../types/system_types";
import { FillableComponent } from "../components/fillable";

export class ChangeCircleFill implements ISystem {
  private fps: number = 60;
  private counter = 0;
  setup(_canvas: HTMLCanvasElement): void {

  }

  update(entity: IEntity, _ctx: CanvasRenderingContext2D, _ts: number): void {
    const colors = ['red', 'blue', 'green', 'yellow', 'black', '#8B0000'];
    if (this.counter < this.fps) {
      this.counter++;
      return;
    }
    this.counter = 0;
    entity.get(ComponentTypes.FILLABLE, (cmp: IComponent) => {
      (cmp as FillableComponent).fillStyle = colors[Math.floor(Math.random() * colors.length)];
    });
  }

}