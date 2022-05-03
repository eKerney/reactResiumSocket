import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel, FormGroup } from '@mui/material';
import {useState, useEffect, useMemo, useCallback, useRef} from 'react';
//import { Viewer, Entity, PointGraphics, EntityDescription, GeoJsonDataSource, Scene, Globe, Camera} from "resium";
import { GeoJsonDataSource, Viewer } from 'resium';
import { Color } from "cesium";