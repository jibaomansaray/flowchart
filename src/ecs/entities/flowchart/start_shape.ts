import { CircleEntity } from "../circle_entity";
import { EntityType } from "../entity_types";

export class StartShapeEntity extends CircleEntity{

  constructor(id?: string) {
    super(id, EntityType.FLOWCHART_START);
  }
}