import './css/loadCss';
import { PI } from "./PI";
import { E } from "./E";
import { Polygon } from "./Polygon";
import { Task } from './utils/Task';
import { Doc } from './utils/Doc';

Task.init();
Doc.init();
Doc.printTitle('Aspects probabilistes - TP1');

PI.execTests();
E.execTests();
Polygon.execTests();
