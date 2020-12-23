import Dexie from 'dexie';
import { Customer, LastUpdateTracker } from "./map.model";

export class MapDB extends Dexie {
  customer!: Dexie.Table<Customer, string>;
  lastUpdateTracker!: Dexie.Table<LastUpdateTracker, string>;

  constructor() {
    super('Map');
    this.version(1).stores({
      customer: '++id, properties.kota, properties.idpelangga',
      lastUpdateTracker: 'slug',
    });
  }
}

export const mapDB = new MapDB();
