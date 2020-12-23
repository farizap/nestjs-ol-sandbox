import { mapSocket } from '.';
import { emit } from "./emit";
import { EventType } from "./type";

export const getMapFeature = (payload : {kota: string, type: string}, cb: (arg0: any) => void) => {
    mapSocket.on(EventType.GET_FEATURES, cb)
    emit.getFeature(payload)
}

export const getUpdateTracker = (payload : {kota: string}, cb: (arg0: any) => void) => {
    mapSocket.on(EventType.GET_LAST_UPDATE_TRACKER, cb)
    emit.getUpdateTracker(payload)
}
