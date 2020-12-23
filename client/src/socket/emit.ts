import { mapSocket } from './index';
import { EmitType } from './type';

const getFeature = (payload: { kota: string; type: string }) => {
  mapSocket.emit(EmitType.GET_FEATURES, payload);
};

const getUpdateTracker = (payload: { kota: string }) => {
  mapSocket.emit(EmitType.GET_LAST_UPDATE_TRACKER, payload);
};

export const emit = {
  getFeature,
  getUpdateTracker,
};
