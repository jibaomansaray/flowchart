import { IEntity } from "../entities/entity_types";
import { ISystem } from "./system_types";

export class ClearCanvas implements ISystem {
  private canvasWidth: number = 0;
  private canvasHeight: number = 0;

  setup(canvas: HTMLCanvasElement): void {
    this.canvasWidth = canvas.width;      
    this.canvasHeight = canvas.height;
  }

  update(_entities: Map<string, IEntity>, ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }
}

export const clearCanvas = new ClearCanvas();