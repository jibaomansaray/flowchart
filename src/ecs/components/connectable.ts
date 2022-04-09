import { manager } from "../manager";
import { ComponentTypes, IComponent } from "../types/component_types";
import { IEntity } from "../types/entity_types";

export class ConnectableComponent implements IComponent {
  private _entity: IEntity;
  private _connections: Map<string, string>;

  constructor(aEntity: IEntity) {
    this._entity = aEntity;
    this._connections = new Map;
  }

  get type(): ComponentTypes {
    return ComponentTypes.CONNECTABLE;
  }

  get entity() {
    return this._entity;
  }

  get to() {
    return this._connections;
  }


  public add(to: string, connectorId: string | IEntity = '') {
    this._connections.set(to, this.generateId((typeof connectorId === 'string') ? connectorId : connectorId.id));
  }

  public remove(id: string) {
    this._connections.delete(id)
  }

  private generateId(id: string = ''): string {
    return id || manager.newId();
  }


  toJSON(): { [key: string]: any; } {
    const connections: { [key: string]: string } = {};

    this._connections.forEach((conId, toId) => connections[toId] = conId)

    return {
      connections
    }
  }

  fromJSON(json: { [key: string]: any; }): void {
    json = json as { connections: { [toId: string]: string } };
    for (let toId in json.connections) {
      this.add(toId, json.connections[toId])
    }
  }

}