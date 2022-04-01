import { IEntity } from "../entities/entity_types";

export interface ISystem {
  setup(canvas: HTMLCanvasElement): void;
  update(entities: Map<string, IEntity>, ctx: CanvasRenderingContext2D): void;
}