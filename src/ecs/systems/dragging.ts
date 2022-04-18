import { DraggableComponent } from "../components/draggable";
import { MouseCollisionComponent } from "../components/mouse_collision";
import { Position } from "../components/position";
import { ComponentTypes, IComponent } from "../types/component_types";
import { IEntity } from "../types/entity_types";
import { ISystem } from "../types/system_types";

export class Dragging implements ISystem {
  setup(_canvas: HTMLCanvasElement): void {
      
  }

  update(entity: IEntity, _ctx: CanvasRenderingContext2D, _timestamp: number): void {
    const list = [ComponentTypes.DRAGGABLE,ComponentTypes.MOUSE_COLLISION, ComponentTypes.POSITION];

    const components = entity.components(list, false);

    if (components) {
      const mouseComponent = components.get(ComponentTypes.MOUSE_COLLISION)! as MouseCollisionComponent;
      const draggable = components.get(ComponentTypes.DRAGGABLE)! as DraggableComponent;

    this.move(mouseComponent, draggable, components, entity);
    }
    // const mouseComponent = components.get(ComponentTypes.MOUSE_COLLISION)! as MouseCollisionComponent;
  }

  private move(mouse: MouseCollisionComponent, draggable: DraggableComponent , _components: Map<ComponentTypes, IComponent>, ent: IEntity) {
    if (draggable.draggable && mouse.detected && mouse.mouseDown) {
      ent.get(ComponentTypes.POSITION, (c) => {
        const p = c as Position;
        p.x = mouse.x;
        p.y = mouse.y;
      });
    } 
  }

}


export const dragging = new Dragging();
