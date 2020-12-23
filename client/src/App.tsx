import React from 'react';
import './App.css';
import { GeoJSON } from 'ol/format';
import { MainMap } from './component/map/Map';
import { Tile } from './component/map/Tile';
import { DrawComp } from './component/map/DrawControl';
import { FeatureLayer } from './component/map/Feature';
import { Feature, Map, View } from 'ol';
import Geometry from 'ol/geom/Geometry';
import {mapDB} from './db/map.db'
import { getMapFeature, getUpdateTracker } from "./socket/action";
import { fromLonLat } from "ol/proj";
import VectorImageLayer from "ol/layer/VectorImage";
import VectorSource from "ol/source/Vector";

const CENTER = [140.685677, -2.5758922];
const KOTA = "kota-jayapura"

function App() {
  const [map] = React.useState(new Map({
    view: new View({
      projection: 'EPSG:3857',
      center: fromLonLat(CENTER),
      zoom: 14,
      minZoom: 2,
      maxZoom: 18,
    })
  }))
  const [features, setFeatures] = React.useState<Feature<Geometry>[]>();
  const [featuresLayer] = React.useState(new VectorImageLayer({
    source: new VectorSource({
      format: new GeoJSON({ dataProjection: 'EPSG:3857' }),
    }),
    // style: (features: FeatureLike) => {
    //   return styleFunction(features, highlights, filters, styles);
    // },
    imageRatio: 2,
  }))

  React.useEffect(() => {
    map.addLayer(featuresLayer)
    // addFeatures();
    mapDB.table("customer").toArray().then((result) => {

    })

    getMapFeature({type : "customer", kota : KOTA}, (data) => {
      console.log(data)

      // add feature to layers immediately after data received
      const src = featuresLayer.getSource() as VectorSource
      src.addFeatures(new GeoJSON().readFeatures({type: 'FeatureCollection',features: data}, {
        featureProjection: 'EPSG:3857',
      }))
      // add feature to indexedDB
      mapDB.table("customer").bulkAdd(data)
    })

    getUpdateTracker({kota : KOTA}, (data) => {
      console.log(data)
    })

    // return () => {socket.disconnect()};
  }, []);

  return (
    <MainMap map={map}>
      <Tile />
      <DrawComp />
      {features && <FeatureLayer features={features}/>}
    </MainMap>
  );
}

export default App;
