import { IEntity } from "./entity_types";

export interface ISystem {
  setup(canvas: HTMLCanvasElement): void;
  update(entity: IEntity, ctx: CanvasRenderingContext2D, timestamp: number): void;
}