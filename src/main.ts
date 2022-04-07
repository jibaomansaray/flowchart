import { CircleComponent } from './ecs/components/circle';
import { ComponentTypes, IComponent } from './ecs/types/component_types';
import { FillableComponent } from './ecs/components/fillable';
import { InteractComponent } from './ecs/components/interact';
import { Position } from './ecs/components/position';
import { SizeComponent } from './ecs/components/size';
import { StartShapeEntity } from './ecs/entities/flowchart/start_shape';
import { RectangleEntity } from './ecs/entities/rectangle_entity';
import { manager } from './ecs/manager';
import { clearCanvas } from './ecs/systems/clear_canvas';
import { interaction } from './ecs/systems/interaction';
import { mouseCollisionDetection } from './ecs/systems/mouse_collision_detection';
import { renderCircle } from './ecs/systems/render_circle';
import { renderRectangle } from './ecs/systems/render_rectangle';
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
  circle.radius = 100;
})

const circle2 = new StartShapeEntity('b');
circle2.get(ComponentTypes.POSITION, (com: IComponent) => {
  const pos = com as Position;
  pos.x = 200;
  pos.y = 200;
});
circle2.get(ComponentTypes.CIRCLE, (com: IComponent) => {
  const circle = com as CircleComponent;
  circle.radius = 100;
})

circle.get(ComponentTypes.FILLABLE, (com: IComponent) => {
  (com as FillableComponent).fill = false;
 });

const rect1 = new RectangleEntity('rect1');
rect1.get(ComponentTypes.POSITION, (com) => {
  const pos = com as Position;
  pos.x = 460;
  pos.y = 200;
});

rect1.get(ComponentTypes.SIZE, (com) => {
  const size = com as SizeComponent;
  size.width = 100;
  size.height = 100;
});

rect1.get(ComponentTypes.INTERACT, (com) => { 
  const interact = com as InteractComponent;
  interact.fillStyle = 'yellow';
});


manager.addSystem([
  clearCanvas,
  mouseCollisionDetection,
  renderCircle,
  renderRectangle,
  interaction
]);

manager.addEntity([
  circle,
  circle2,
  rect1
]);

manager.addEntity(rect1);
manager.run(canvas, ctx);