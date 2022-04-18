import { CircleComponent } from "../components/circle";
import { ConnectableComponent } from "../components/connectable";
import { LineComponent } from "../components/line";
import { LinkComponent } from "../components/link";
import { Position } from "../components/position";
import { SizeComponent } from "../components/size";
import { ConnectorEntity } from "../entities/connector_entity";
import { manager } from "../manager";
import { ComponentTypes } from "../types/component_types";
import { IEntity } from "../types/entity_types";
import { ISystem } from "../types/system_types";

enum DIRECTION {
  LEFT,  // 0
  TOP, // 1
  RIGHT, // 2
  BOTTOM, // 3
  SAME // 4
}

export class Connection implements ISystem {

  setup(_canvas: HTMLCanvasElement): void {

  }

  update(entity: IEntity, _ctx: CanvasRenderingContext2D, _timestamp: number): void {
    entity.get(ComponentTypes.CONNECTABLE, (c) => {
      const connectable = c as ConnectableComponent;
      connectable.to.forEach((connectorId, toId) => {
        const to = manager.getEntity(toId);
        let connector = manager.getEntity(connectorId);
        if (!connector) {
          connector = new ConnectorEntity(connectorId );
          manager.addEntity(connector);
        }
        const link = connector.get(ComponentTypes.LINK) as LinkComponent;
        if (link.active && to) {

          link.from = link.from || entity.id;
          link.to = link.to || to.id;

          const pointA = entity.get(ComponentTypes.POSITION)! as Position;
          const pointB = to.get(ComponentTypes.POSITION)! as Position;
          const aSize = entity.get(ComponentTypes.SIZE)! as SizeComponent
          const bSize = to.get(ComponentTypes.SIZE)! as SizeComponent

          this.checkSize(connector, pointA, pointB, aSize , bSize);
        } else {
          connectable.remove(toId);
          manager.removeEntity(connector.id);
        }
      });
    });
  }

  private checkSize(connector: IEntity, pointA: Position, pointB: Position, pointASize: SizeComponent, pointBSize: SizeComponent) {
    let directionX = DIRECTION.SAME;
    let directionY = DIRECTION.SAME;

    let aX = pointA.topX;
    let aY = pointA.topY;
    let bX = pointB.topX;
    let bY = pointB.topY;

    // 100 is the width;
    if (pointA.x > pointB.x && pointA.x > pointB.x + pointBSize.width) {
      directionX = DIRECTION.RIGHT;
    } else if (pointB.x > pointA.x && pointB.x > pointA.x + pointASize.width) {
      directionX = DIRECTION.LEFT;
    } else {
    }


    // 100 is the height;
    if (pointA.y > pointB.y && pointA.y > pointB.y + pointBSize.height) {
      directionY = DIRECTION.BOTTOM;
    } else if (pointB.y > pointA.y && pointB.y > pointA.y + pointASize.height) {
      directionY = DIRECTION.TOP;
    } else {
    }


    if (directionX === DIRECTION.LEFT && directionY === DIRECTION.BOTTOM) {
      bY += pointBSize.height / 2;
      aX += pointASize.width / 2;
    } else if (directionX === DIRECTION.SAME && directionY === DIRECTION.BOTTOM) {
      bY += pointASize.height;
      bX += pointBSize.width / 2;
      aX += pointASize.width / 2;
    } else if (directionX === DIRECTION.LEFT && directionY === DIRECTION.SAME) {
      aX += pointASize.width;
      aY += pointASize.height / 2;
      bY += pointBSize.height / 2;
    } else if (directionX === DIRECTION.LEFT && directionY === DIRECTION.TOP) {
      aY += pointASize.height;
      aX += pointASize.width / 2;
      bX += pointBSize.width / 2;
    } else if (directionX === DIRECTION.SAME && directionY === DIRECTION.TOP) {
      aY += pointASize.height;
      aX += pointASize.width / 2;
      bX += pointBSize.width / 2;
    } else if (directionX == DIRECTION.RIGHT && directionY === DIRECTION.TOP) {
      aY += pointASize.height / 2;
      bX += pointBSize.width / 2;
    } else if (directionX == DIRECTION.RIGHT && directionY === DIRECTION.SAME) {
      aY += pointASize.height / 2;
      bY += pointBSize.height / 2;
      bX += pointBSize.width;
    } else if (directionX === DIRECTION.RIGHT && directionY === DIRECTION.BOTTOM) {
      aX += pointASize.width / 2;
      bY += pointASize.height;
      bX += pointBSize.width / 2;
    }


    connector.get(ComponentTypes.LINE, (l) => {
      const line = l as LineComponent;
      // 
      line.aX = aX;
      line.aY = aY;
      line.bX = bX;
      line.bY = bY;
    });

  }

}

export const connection = new Connection();