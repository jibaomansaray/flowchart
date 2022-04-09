import { ComponentTypes, IComponent } from "../types/component_types";

export class LinkComponent implements IComponent {
  private _from: string;// from entity
  private _to: string; // to entity
  private _active: boolean; // is the connection active or should be deleted

  constructor(from = '') {
    this._from = from;
    this._to = '';
    this._active = true;
  }

  get type(): ComponentTypes {
    return ComponentTypes.LINK
  }

  get from() {
    return this._from;
  }

  set from(f: string) {
    this._from = f;
  }

  get to() {
    return this._to;
  }

  set to(t: string) {
    this._to = t;
  }

  get active() {
    return this._active;
  }

  set active(a: boolean) {
    this._active = a;
  }

  toJSON(): { [key: string]: any; } {
    return {
      from: this._from,
      to: this._to,
      active: this._active
    }
  }

  fromJSON(json: { [key: string]: any; }): void {
    json = json as { from: string, to: string, active: boolean };

    this.from = json.from;
    this.to = json.to;
    this.active = json.active;
  }

}