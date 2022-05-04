import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel, FormGroup } from '@mui/material';
import {useState, useEffect, useMemo, useCallback, useRef} from 'react';
//import { Viewer, Entity, PointGraphics, EntityDescription, GeoJsonDataSource, Scene, Globe, Camera} from "resium";
import { GeoJsonDataSource, Viewer } from 'resium';
import { Color } from "cesium";


function GeoJSON(props) {
    console.log(props);
    return (
    <>
        { 
            <GeoJsonDataSource data={"https://raw.githubusercontent.com/eKerney/dataStore/main/mdotDensitySelection.geojson"} 
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
    </>
    )
}

 export default React.memo(GeoJSON);