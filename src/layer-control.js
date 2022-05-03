//import React from 'react';
//import Slider from '@mui/material/Slider';
import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel, FormGroup } from '@mui/material';
import {useState, useEffect, useMemo, useCallback, useRef} from 'react';
//import { Viewer, Entity, PointGraphics, EntityDescription, GeoJsonDataSource, Scene, Globe, Camera} from "resium";
import { GeoJsonDataSource, Viewer } from 'resium';
import { Color } from "cesium";

function LayerControl(props) {
  const [buildings, setBuildings ] = useState(false);
  const [GPS003, setGPS003 ] = useState(false);
  const [GPS050, setGPS050 ] = useState(false);
  const [GPS100, setGPS100 ] = useState(false);
  const [MDOTairTraffic, setMDOTairTraffic ] = useState(false);
  const [testLayer, setTestLayer ] = useState(false);
  const [GPSall, setGPSall ] = useState(false);

  const handleChange = (event) => {
    console.log(event.target.name);
    console.log(GPS003, GPS050, GPS100);
    event.target.name === 'GPS003' ? setGPS003(GPS003 => !GPS003) : setGPS003(GPS003 => GPS003);
    event.target.name === 'GPS050' ? setGPS050(!GPS050) : setGPS050(GPS050);
    event.target.name === 'GPS100' ? setGPS100(!GPS100) : setGPS100(GPS100);
    event.target.name === 'BUILDINGS' ? setBuildings(!buildings) : setBuildings(buildings);
    event.target.name === 'MDOT' ? setMDOTairTraffic(!MDOTairTraffic) : setMDOTairTraffic(MDOTairTraffic);
    event.target.name === 'TESTLAYER' ? setTestLayer(!testLayer) : setTestLayer(testLayer);
    event.target.name === 'GPSALL' ? setGPSall(!GPSall) : setGPSall(GPSall);
  };
  
  const pdopColor = {
    1:Color.GREEN, 2:Color.CHARTREUSE, 3:Color.GREENYELLOW, 4:Color.YELLOW, 5:Color.DARKORANGE, 6:Color.RED
  };
  const pdopColAll = {
    1:Color.GREEN.withAlpha(0.1), 2:Color.CHARTREUSE.withAlpha(0.2), 3:Color.GREENYELLOW.withAlpha(0.3), 
    4:Color.YELLOW.withAlpha(0.3), 5:Color.DARKORANGE.withAlpha(0.3), 6:Color.RED.withAlpha(0.3),
    '-99999':Color.BLACK.withAlpha(0.5)
  };
  const pdopColBad = {
    1:Color.GREEN.withAlpha(0.0), 2:Color.CHARTREUSE.withAlpha(0.2), 3:Color.GREENYELLOW.withAlpha(0.3), 
    4:Color.YELLOW.withAlpha(0.3), 5:Color.DARKORANGE.withAlpha(0.3), 6:Color.RED.withAlpha(0.3),
    '-99999':Color.GREY.withAlpha(0.3)
  };
  return  (
  <>
    <div className="control-panel">
    <h2>AIRHUB SPHERE <br/> **DRAFT**</h2>
        <hr style={{width: '800px', marginLeft: '-100px', marginTop: '26px'}}/>
        <br />
      <FormGroup>
        <FormControlLabel control={<Checkbox name='BUILDINGS' checked={buildings} color="secondary" onChange={handleChange}/>} label="3D Buildings" />
        <FormControlLabel control={<Checkbox name='MDOT' checked={MDOTairTraffic} color="secondary" onChange={handleChange}/>} label="MDOT Air Traffic Density" />
        <FormControlLabel control={<Checkbox name='GPS003' checked={GPS003} color="secondary" onChange={handleChange}/>} label="GPS Signal Strength 3 meters" />
        <FormControlLabel control={<Checkbox name='GPS050' checked={GPS050} color="secondary" onChange={handleChange}/>} label="GPS Signal Strength 50 meters " />
        <FormControlLabel control={<Checkbox name='GPS100' checked={GPS100} color="secondary" onChange={handleChange}/>} label="GPS Signal Strength 100 meters " />
        <FormControlLabel control={<Checkbox name='TESTLAYER' checked={testLayer} color="secondary" onChange={handleChange}/>} label="MDOT AIR SELECTION" />
        <FormControlLabel control={<Checkbox name='GPSALL' checked={GPSall} color="secondary" onChange={handleChange}/>} label="GPS ALL" />
      </FormGroup>
    </div>
    { testLayer &&
       <GeoJsonDataSource data={"https://raw.githubusercontent.com/eKerney/dataStore/main/mdotDensitySelection.geojson"} 
       onLoad={d => {d.entities.values.forEach(d => {
          const h = (d._properties.level)*.3048;
          const den = d._properties.density;
          d.polygon.height = (h) - 100
          d.polygon.extrudedHeight = (h) + 100;
        //  d.polygon.material = h > (10000) ? Color.LAVENDER.withAlpha(0.2) : h > (5000) ? Color.LIGHTSTEELBLUE.withAlpha(0.2) : h > (3000) ? Color.PLUM.withAlpha(0.2) : 
        //  h > (1000) ? Color.MEDIUMPURPLE.withAlpha(0.1) : h > (500) ? Color.BLUEVIOLET.withAlpha(0.2) : Color.DARKMAGENTA.withAlpha(0.3); 
        d.polygon.material = den > (20) ? Color.DARKMAGENTA.withAlpha(0.4) : den > (10) ? Color.BLUEVIOLET.withAlpha(0.4) : 
        den > (5) ? Color.MEDIUMPURPLE.withAlpha(0.3) : den > (1) ? Color.PLUM.withAlpha(0.15) : den > (.5) ? 
        Color.LIGHTSTEELBLUE.withAlpha(0.1) : Color.LAVENDER.withAlpha(0.1); 
       })
       }}  
       stroke={Color.AQUA.withAlpha(0.0)}
     />
    }
    { MDOTairTraffic &&
       <GeoJsonDataSource data={"https://raw.githubusercontent.com/eKerney/reactResiumSocket/main/src/data/MDOTairDensity.geojson"} 
       onLoad={d => {d.entities.values.forEach(d => {
          const h = (d._properties.level)*.3048;
          const den = d._properties.density;
          d.polygon.height = (h) - 100
          d.polygon.extrudedHeight = (h) + 100;
        d.polygon.material = den > (20) ? Color.DARKMAGENTA.withAlpha(0.3) : den > (10) ? Color.BLUEVIOLET.withAlpha(0.2) : den > (5) ? Color.MEDIUMPURPLE.withAlpha(0.1) : 
        den > (1) ? Color.PLUM.withAlpha(0.2) : den > (.5) ? Color.LIGHTSTEELBLUE.withAlpha(0.2) : Color.LAVENDER.withAlpha(0.2); 
       })
       }}  
       stroke={Color.AQUA.withAlpha(0.0)}
     />
    }
    { buildings &&
       <GeoJsonDataSource data={"https://services5.arcgis.com/UDWrEU6HdWNYIRIV/ArcGIS/rest/services/buildingsClippedDet/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=-83.12%2C+42.23%2C+-83.04%2C+42.35&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token="} 
       onLoad={d => {d.entities.values.forEach(d => {
         d.polygon.extrudedHeight = (d._properties.median_hgt * 2);
         const h = d._properties.median_hgt;
         d.polygon.material = h > (700) ? Color.NAVY.withAlpha(0.6) : h > (400) ? Color.TEAL.withAlpha(0.6) : h > (200) ? Color.LIGHTSEAGREEN.withAlpha(0.7) : 
         h > (100) ? Color.MEDIUMTURQUOISE.withAlpha(0.8) : h > (50) ? Color.PALETURQUOISE.withAlpha(0.8) : Color.ALICEBLUE.withAlpha(0.6); 
       })
       }}
       stroke={Color.AQUA.withAlpha(0.0)}
     />
    }
    { GPSall && 
      <GeoJsonDataSource data={"https://raw.githubusercontent.com/eKerney/dataStore/main/spirent_gps_202204.geojson"} 
          onLoad={d => {d.entities.values.forEach(d => {
            d.polygon.height = 0;
            d.polygon.extrudedHeight = 50;
            //d.polygon.material = Color.GRAY.withAlpha(0.5)
            console.log(d._properties._dop_worst_agl003_202204._value);
            d.polygon.material = d._properties._dop_worst_agl003_202204._value < 1 ?
                                  pdopColBad[d._properties._dop_worst_agl003_202204._value] :
                                  pdopColBad[d._properties._dop_worst_agl003_202204._value] ;
                                  
                      
            })
          }}
          stroke={Color.GRAY.withAlpha(0.0)}
      /> 
    }
    { GPS003 && 
      <GeoJsonDataSource data={"https://raw.githubusercontent.com/eKerney/reactResium/main/src/data/agl_003_h3_11_worst.geojson"} 
          onLoad={d => {d.entities.values.forEach(d => {
            d.polygon.height = 0;
            d.polygon.extrudedHeight = 50;
            d.polygon.material = d._properties._dop_worst._value < 1 ? pdopColor[d._properties._dop_worst._value].withAlpha(0.0) :
                                pdopColor[d._properties._dop_worst._value].withAlpha(0.2);        
            })
          }}
          stroke={Color.GRAY.withAlpha(0.1)}
      /> 
    }
    { GPS050 &&
      <GeoJsonDataSource data={"https://raw.githubusercontent.com/eKerney/reactResium/main/src/data/agl_005_h3_11_worst.geojson"} 
          onLoad={d => {d.entities.values.forEach(d => {
            d.polygon.height = 100;
            d.polygon.extrudedHeight = 150;
            d.polygon.material = d._properties._dop_worst._value < 1 ? pdopColor[d._properties._dop_worst._value].withAlpha(0.0) :
                                 pdopColor[d._properties._dop_worst._value].withAlpha(0.2);        
            })
          }}
          stroke={Color.GRAY.withAlpha(0.0)}
        />
    }
    { GPS100 && 
      <GeoJsonDataSource data={"https://raw.githubusercontent.com/eKerney/reactResium/main/src/data/agl_100_h3_11_worst.geojson"} 
          onLoad={d => {d.entities.values.forEach(d => {
            d.polygon.height = 200;
            d.polygon.extrudedHeight = 250;
            d.polygon.material = d._properties._dop_worst._value < 1 ? pdopColor[d._properties._dop_worst._value].withAlpha(0.0) :
                                 pdopColor[d._properties._dop_worst._value].withAlpha(0.2);        
            })
          }}
          stroke={Color.GRAY.withAlpha(0.0)}
      />
    }
  </>
  ) 
    
}

export default React.memo(LayerControl);
