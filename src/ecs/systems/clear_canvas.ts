import { IEntity } from "../types/entity_types";
import { ISystem } from "../types/system_types";

export class ClearCanvas implements ISystem {
  private canvasWidth: number = 0;
  private canvasHeight: number = 0;
  private clear: boolean = false;
  private lastTs: number = 0;

  setup(canvas: HTMLCanvasElement): void {
    this.canvasWidth = canvas.width;      
    this.canvasHeight = canvas.height;
  }

  update(_entity: IEntity, ctx: CanvasRenderingContext2D, timestamp: number): void {
    if(this.lastTs != timestamp) {
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.lastTs = timestamp;
    }
  }
}

export const clearCanvas = new ClearCanvas();