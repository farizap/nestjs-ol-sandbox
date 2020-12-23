import React from 'react';
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import 'ol/ol.css';
import { Map, View } from 'ol';

import { fromLonLat } from 'ol/proj';


export const MapContext = React.createContext<Map | undefined>(undefined);

// interface Props {
//   features: Feature<Geometry>[];
// }
interface Props {
  map : Map
}
export const MainMap: React.FC<Props> = (props) => {

  React.useEffect(() => {
    props.map.setTarget('map');
  }, []);

  return (
    <MapContext.Provider value={props.map}>
      <div
        className="map"
        id="map"
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: '#cccccc',
          // marginTop: '64px',
        }}
      ></div>
      {props.children}
    </MapContext.Provider>
  );
};
