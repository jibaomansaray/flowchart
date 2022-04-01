import { IEntity } from "./entities/entity_types";
import { ISystem } from "./systems/system_types";

export class Manager {
  private _systems: Array<ISystem>;
  private _entities: Map<string, IEntity>;

  constructor() {
    this._systems = [];
    this._entities = new Map()
  }


  addSystem(system: ISystem | Array<ISystem>): Manager {
    const list = (Array.isArray(system)) ? system : [system];
    list.forEach((s) => {
      this._systems.push(s);
    })
    return this;
  }

  newEntity<T extends IEntity>(entity: T): T {
    this._entities.set(entity.id, entity);
    return entity;
  }

  setup(canvas: HTMLCanvasElement): Manager {
    this._systems.forEach((s) => {
      s.setup(canvas);
    })
    return this;
  }

  update(ctx: CanvasRenderingContext2D) {
    this._systems.forEach((s) => {
      s.update(this._entities, ctx);
    })
  }
}