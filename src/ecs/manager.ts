import { IEntity } from "./types/entity_types";
import { ISystem } from "./types/system_types";

/**
 * Manager class
 * 
 * An instance of this class is exported
 */
class Manager {
  private _systems: Array<ISystem>;
  private _entities: Map<string, IEntity>;
  private _id = 0;

  constructor() {
    this._systems = [];
    this._entities = new Map()
  }

  newId() {
    return (++this._id).toString();
  }

  addSystem(system: ISystem | Array<ISystem>): Manager {
    const list = (Array.isArray(system)) ? system : [system];
    list.forEach((s) => {
      this._systems.push(s);
    })
    return this;
  }

  addEntity<T extends IEntity>(entity: T | Array<T>): T | Array<T> {
    entity = (Array.isArray(entity)) ? entity : [entity];
    entity.forEach((e) => {
      this._entities.set(e.id, e);
    })
    return entity;
  }

  getEntity(id: string): IEntity | null {
    return this._entities.get(id) || null
  }

  removeEntity(id: Array<string> | string) {
    const entity = (Array.isArray(id)) ? id : [id];
    entity.forEach((e) => {
      this._entities.delete(e);
    })
  }

  run(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    let shouldUpdate = true;
    this._systems.forEach((s) => {
      s.setup(canvas);
    })

    const updateSystems = (ts: number) => {
      this.update(ctx, ts);
      if (shouldUpdate) {
        requestAnimationFrame(updateSystems);
      }
    }
    updateSystems(0);

    canvas.addEventListener('mouseleave', () => {
      // shouldUpdate = false;
    })

    canvas.addEventListener('mouseenter', () => {
      if (!shouldUpdate) {
        shouldUpdate = true;
        updateSystems(0);
      }
    });
  }

  public toJSON(): Array<{ [key: string]: any }> {
    const json: Array<{ [key: string]: any }> = [];
    this._entities.forEach((e) => {
      const d = e.toJSON();
      if (d) {
        json.push(d);
      }
    })
    return json;
  }

  private update(ctx: CanvasRenderingContext2D, ts: number) {
    this._systems.forEach((s) => {
      this._entities.forEach((entity) => {
        s.update(entity, ctx, ts);
      });
    });
  }

}

export const manager = new Manager();