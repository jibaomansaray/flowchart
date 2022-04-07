import { CircleEntity } from "../circle_entity";
import { EntityType } from "../../types/entity_types";

export class StartShapeEntity extends CircleEntity{

  constructor(id?: string) {
    super(id, EntityType.FLOWCHART_START);
  }
}