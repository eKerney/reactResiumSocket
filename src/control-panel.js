import * as React from 'react';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel, FormGroup } from '@mui/material';
import {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import { Viewer, Entity, PointGraphics, EntityDescription, GeoJsonDataSource, Scene, Globe, Camera} from "resium";
import { Cartesian3, Color } from "cesium";


function ControlPanel(props) {
 
  const [GPS003, setGPS003 ] = useState(false);
  const [GPS050, setGPS050 ] = useState(false);
  const [GPS100, setGPS100 ] = useState(false);

  const handleChange = (event) => {
    console.log(event.target.name);
    event.target.name == 'GPS003' ? setGPS003(!GPS003) : setGPS003(GPS003);
    event.target.name == 'GPS050' ? setGPS050(!GPS050) : setGPS050(GPS050);
    event.target.name == 'GPS100' ? setGPS100(!GPS100) : setGPS100(GPS100);
    
    
  };
  
  const pdopColor = {
    1:Color.GREEN, 2:Color.CHARTREUSE, 3:Color.GREENYELLOW, 4:Color.YELLOW, 5:Color.GOLD, 6:Color.ORANGERED
  };

  return !GPS003 && !GPS050 && !GPS100 ? 
  // START PANEL NO SLIDER
  (
    <>
    <div className="control-panel">
    <h2>AIRHUB SPHERE <br/> **DRAFT**</h2>
        <hr style={{width: '800px', marginLeft: '-100px', marginTop: '26px'}}/>
        <br />
      <FormGroup>
        <FormControlLabel control={<Checkbox name='GPS003' checked={GPS003} color="secondary" onChange={handleChange}/>} label="GPS Signal Strength 3 meters" />
        <FormControlLabel control={<Checkbox name='GPS050' checked={GPS050} color="secondary" onChange={handleChange}/>} label="GPS Signal Strength 50 meters " />
        <FormControlLabel control={<Checkbox name='GPS100' checked={GPS100} color="secondary" onChange={handleChange}/>} label="GPS Signal Strength 100 meters " />
      </FormGroup>
    </div>
    </>
  ) 
    : GPS003 && !GPS050 && !GPS100 ? 
    (
    <>
      <div className="control-panel">
      <h2>AIRHUB SPHERE <br/> **DRAFT**</h2>
        <hr style={{width: '800px', marginLeft: '-100px', marginTop: '26px'}}/>
        <br />
        <FormGroup>
          <FormControlLabel control={<Checkbox name='GPS003' checked={GPS003} color="secondary" onChange={handleChange}/>} label="GPS Signal Strength 3 meters" />
          <FormControlLabel control={<Checkbox name='GPS050' checked={GPS050} color="secondary" onChange={handleChange}/>} label="GPS Signal Strength 50 meters " />
          <FormControlLabel control={<Checkbox name='GPS100' checked={GPS100} color="secondary" onChange={handleChange}/>} label="GPS Signal Strength 100 meters " />
        </FormGroup>
      </div>
      <GeoJsonDataSource data={"https://raw.githubusercontent.com/eKerney/reactResium/main/src/data/agl_003_h3_11_worst.geojson"} 
        onLoad={d => {d.entities.values.map(d => {
          d.polygon.height = 0;
          d.polygon.extrudedHeight = 30;
          d.polygon.material = d._properties._dop_worst._value < 1 ? pdopColor[d._properties._dop_worst._value].withAlpha(0.0) :
                               pdopColor[d._properties._dop_worst._value].withAlpha(0.3);        
          })
        }}
        stroke={Color.GRAY.withAlpha(0.0)}
      />
    </>
    ) 
    : GPS003 && GPS050 && !GPS100 ? 
    (
      <>
        <div className="control-panel">
        <h2>AIRHUB SPHERE <br/> **DRAFT**</h2>
        <hr style={{width: '800px', marginLeft: '-100px', marginTop: '26px'}}/>
        <br />
          <FormGroup>
            <FormControlLabel control={<Checkbox name='GPS003' checked={GPS003} color="secondary" onChange={handleChange}/>} label="GPS Signal Strength 3 meters" />
            <FormControlLabel control={<Checkbox name='GPS050' checked={GPS050} color="secondary" onChange={handleChange}/>} label="GPS Signal Strength 50 meters " />
            <FormControlLabel control={<Checkbox name='GPS100' checked={GPS100} color="secondary" onChange={handleChange}/>} label="GPS Signal Strength 100 meters " />
          </FormGroup>
        </div>
        <GeoJsonDataSource data={"https://raw.githubusercontent.com/eKerney/reactResium/main/src/data/agl_003_h3_11_worst.geojson"} 
          onLoad={d => {d.entities.values.map(d => {
            d.polygon.height = 0;
            d.polygon.extrudedHeight = 20;
            d.polygon.material = d._properties._dop_worst._value < 1 ? pdopColor[d._properties._dop_worst._value].withAlpha(0.0) :
                                 pdopColor[d._properties._dop_worst._value].withAlpha(0.3);        
            })
          }}
          stroke={Color.GRAY.withAlpha(0.0)}
        />
        <GeoJsonDataSource data={"https://raw.githubusercontent.com/eKerney/reactResium/main/src/data/agl_005_h3_11_worst.geojson"} 
          onLoad={d => {d.entities.values.map(d => {
            d.polygon.height = 50;
            d.polygon.extrudedHeight = 70;
            d.polygon.material = d._properties._dop_worst._value < 1 ? pdopColor[d._properties._dop_worst._value].withAlpha(0.0) :
                                 pdopColor[d._properties._dop_worst._value].withAlpha(0.3);        
            })
          }}
          stroke={Color.GRAY.withAlpha(0.0)}
        />
      </>
      ) 
      : 
    (
      <>
        <div className="control-panel">
        <h2>AIRHUB SPHERE <br/> **DRAFT**</h2>
        <hr style={{width: '800px', marginLeft: '-100px', marginTop: '26px'}}/>
        <br />
          <FormGroup>
            <FormControlLabel control={<Checkbox name='GPS003' checked={GPS003} color="secondary" onChange={handleChange}/>} label="GPS Signal Strength 3 meters" />
            <FormControlLabel control={<Checkbox name='GPS050' checked={GPS050} color="secondary" onChange={handleChange}/>} label="GPS Signal Strength 50 meters " />
            <FormControlLabel control={<Checkbox name='GPS100' checked={GPS100} color="secondary" onChange={handleChange}/>} label="GPS Signal Strength 100 meters " />
          </FormGroup>
        </div>
        <GeoJsonDataSource data={"https://raw.githubusercontent.com/eKerney/reactResium/main/src/data/agl_003_h3_11_worst.geojson"} 
          onLoad={d => {d.entities.values.map(d => {
            d.polygon.height = 0;
            d.polygon.extrudedHeight = 20;
            d.polygon.material = d._properties._dop_worst._value < 1 ? pdopColor[d._properties._dop_worst._value].withAlpha(0.0) :
                                 pdopColor[d._properties._dop_worst._value].withAlpha(0.3);        
            })
          }}
          stroke={Color.GRAY.withAlpha(0.0)}
        />
        <GeoJsonDataSource data={"https://raw.githubusercontent.com/eKerney/reactResium/main/src/data/agl_005_h3_11_worst.geojson"} 
          onLoad={d => {d.entities.values.map(d => {
            d.polygon.height = 50;
            d.polygon.extrudedHeight = 70;
            d.polygon.material = d._properties._dop_worst._value < 1 ? pdopColor[d._properties._dop_worst._value].withAlpha(0.0) :
                                 pdopColor[d._properties._dop_worst._value].withAlpha(0.3);        
            })
          }}
          stroke={Color.GRAY.withAlpha(0.0)}
        />
        <GeoJsonDataSource data={"https://raw.githubusercontent.com/eKerney/reactResium/main/src/data/agl_100_h3_11_worst.geojson"} 
          onLoad={d => {d.entities.values.map(d => {
            d.polygon.height = 100;
            d.polygon.extrudedHeight = 130;
            d.polygon.material = d._properties._dop_worst._value < 1 ? pdopColor[d._properties._dop_worst._value].withAlpha(0.0) :
                                 pdopColor[d._properties._dop_worst._value].withAlpha(0.3);        
            })
          }}
          stroke={Color.GRAY.withAlpha(0.0)}
        />
      </>
      ) 
    
}

export default React.memo(ControlPanel);
