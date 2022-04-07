import { CircleComponent } from "../components/circle";
import { ComponentTypes, IComponent } from "../types/component_types";
import { MouseCollisionComponent } from "../components/mouse_collision";
import { Position } from "../components/position";
import { SizeComponent } from "../components/size";
import { IEntity } from "../types/entity_types";
import { ISystem } from "../types/system_types";


export class MouseCollisionDetection implements ISystem {

  private mouseOver: boolean = false;
  private x: number = -1;
  private y: number = -1;

  setup(canvas: HTMLCanvasElement): void {
    // handle mouse move 
    canvas.addEventListener('mousemove', (event: MouseEvent) => {
      this.mouseOver = true;
      this.x = event.offsetX;
      this.y = event.offsetY;
    });

    canvas.addEventListener('mouseleave', (_event: MouseEvent) => {
      this.mouseOver = false;
      this.x = -1;
      this.y = -1;
    });
  }

  update(entity: IEntity, _ctx: CanvasRenderingContext2D, _timestamp: number): void {
    if (this.mouseOver) {
      const circle = [ComponentTypes.POSITION, ComponentTypes.CIRCLE, ComponentTypes.MOUSE_COLLISION];
      const rectangle = [ComponentTypes.POSITION, ComponentTypes.SIZE, ComponentTypes.MOUSE_COLLISION];

      const circleComponents = entity.components(circle, false);
      const rectangleComponents = entity.components(rectangle, false);
      if (circleComponents) {
        this.detectCircleCollision(circleComponents);
      } else if (rectangleComponents) {
        this.detectRectangleCollision(rectangleComponents);
      }

    }
  }


  private detectCircleCollision(components: Map<ComponentTypes, IComponent>) {
    const pos = components.get(ComponentTypes.POSITION)! as Position;
    const circle = components.get(ComponentTypes.CIRCLE)! as CircleComponent;
    const mouse = components.get(ComponentTypes.MOUSE_COLLISION)! as MouseCollisionComponent;

    const x = pos.x - this.x;
    const y = pos.y - this.y;
    const distance = Math.sqrt(Math.abs((x * x) + (y * y)));

    if (distance <= circle.radius) {
      mouse.x = x;
      mouse.y = y;
      mouse.detected = true;
    } else {
      mouse.reset();
    }
  }

  private detectRectangleCollision(components: Map<ComponentTypes, IComponent>) {
    const pos = components.get(ComponentTypes.POSITION)! as Position;
    const mouse = components.get(ComponentTypes.MOUSE_COLLISION)! as MouseCollisionComponent;
    const size = components.get(ComponentTypes.SIZE)! as SizeComponent;

    if (this.x >= pos.x && this.y >= pos.y && this.x <= (pos.x + size.width) && this.y <= (pos.y + size.height)) {
      mouse.x = this.x;
      mouse.y = this.y;
      mouse.detected = true;
    } else {
      mouse.reset()
    }
  }
}

export const mouseCollisionDetection = new MouseCollisionDetection();