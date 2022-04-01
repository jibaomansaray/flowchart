import { CircleComponent } from './ecs/components/circle';
import { ComponentTypes, IComponent } from './ecs/components/component_types';
import { FillableComponent } from './ecs/components/fillable';
import { Position } from './ecs/components/position';
import { SizeComponent } from './ecs/components/size';
import { StartShapeEntity } from './ecs/entities/flowchart/start_shape';
import { RectangleEntity } from './ecs/entities/rectangle_entity';
import { Manager } from './ecs/manager';
import { ChangeCircleFill } from './ecs/systems/change_circle_fill';
import { ClearCanvas } from './ecs/systems/clear_canvas';
import { RenderCircle } from './ecs/systems/render_circle';
import { RenderRectangle } from './ecs/systems/render_rectangle';
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
  <center>
    <canvas id="stage" width="600" height="600"><canvas>
  </center>
`


const canvas = document.querySelector<HTMLCanvasElement>('#stage')!

const ctx = canvas.getContext('2d')!;

const circle = new StartShapeEntity('a');

circle.get(ComponentTypes.POSITION, (com: IComponent) => {
  const pos = com as Position;
  pos.x = 400;
  pos.y = 400;
});

circle.get(ComponentTypes.CIRCLE, (com: IComponent) => {
  const circle = com as CircleComponent;
  circle.radius = 40;
})

const circle2 = new StartShapeEntity('b');
circle2.get(ComponentTypes.POSITION, (com: IComponent) => {
  const pos = com as Position;
  pos.x = 75;
  pos.y = 75;
});
circle2.get(ComponentTypes.CIRCLE, (com: IComponent) => {
  const circle = com as CircleComponent;
  circle.radius = 10;
})

circle.get(ComponentTypes.FILLABLE, (com: IComponent) => {
  (com as FillableComponent).fill = false;
 });

const rect1 = new RectangleEntity('rect1');
rect1.get(ComponentTypes.POSITION, (com) => {
  const pos = com as Position;
  pos.x = 250;
  pos.y = 250;
});

rect1.get(ComponentTypes.SIZE, (com) => {
  const size = com as SizeComponent;
  size.width = 25;
  size.height = 25;
});

const manager = new Manager();

const systems = [
  new ClearCanvas(),
  new RenderCircle(),
  new ChangeCircleFill(),
  new RenderRectangle(),
];


manager.newEntity(circle);
manager.newEntity(circle2);
manager.newEntity(rect1);

manager.addSystem(systems)

manager.setup(canvas);

const updateSystems = () => {
  manager.update(ctx);
  requestAnimationFrame(updateSystems);
}
updateSystems();
