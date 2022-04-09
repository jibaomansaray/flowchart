import { CircleComponent } from "../components/circle";
import { ComponentTypes, IComponent } from "../types/component_types";
import { MouseCollisionComponent } from "../components/mouse_collision";
import { Position } from "../components/position";
import { SizeComponent } from "../components/size";
import { IEntity } from "../types/entity_types";
import { ISystem } from "../types/system_types";


export class MouseCollisionDetection implements ISystem {

  private mouseOver: boolean = false;
  private mouseDown: boolean = false;
  private x: number = -1;
  private y: number = -1;
  private entityId = '';
  private _offsetX: number = 0;
  private _offsetY: number = 0;

  setup(canvas: HTMLCanvasElement): void {
    this._offsetX = canvas.getBoundingClientRect().left;
    this._offsetY = canvas.getBoundingClientRect().top;

    // handle mouse move 
    canvas.addEventListener('mousemove', (event: MouseEvent) => {
      this.mouseOver = true;
      this.x = event.clientX - this._offsetX;
      this.y = event.clientY - this._offsetY;
    });


    canvas.addEventListener('mouseleave', (_event: MouseEvent) => {
      this.mouseOver = false;
      this.entityId = '';
      this.mouseDown = false;
      // this.x = -1;
      // this.y = -1;
    });

    canvas.addEventListener('mousedown', () => {
      this.mouseDown = true;
    });

    canvas.addEventListener('mouseup', () => {
      this.mouseDown = false;
      this.entityId = '';
    });
  }

  update(entity: IEntity, _ctx: CanvasRenderingContext2D, _timestamp: number): void {
    if (this.mouseOver && !this.entityId) {
      const circle = [ComponentTypes.POSITION, ComponentTypes.CIRCLE, ComponentTypes.MOUSE_COLLISION];
      const rectangle = [ComponentTypes.POSITION, ComponentTypes.SIZE, ComponentTypes.MOUSE_COLLISION];

      const circleComponents = entity.components(circle, false);
      const rectangleComponents = entity.components(rectangle, false);
      let detected = false;
      if (circleComponents) {
        detected = this.detectCircleCollision(circleComponents);
      } else if (rectangleComponents) {
        detected = this.detectRectangleCollision(rectangleComponents);
      }

      if (this.mouseDown && detected) {
        this.entityId = entity.id
      }
    } else if (this.entityId == entity.id) {
      entity.get(ComponentTypes.MOUSE_COLLISION, (c) => {
        this.doUpdate(c as MouseCollisionComponent)
      })
    }
  }


  private detectCircleCollision(components: Map<ComponentTypes, IComponent>): boolean {
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