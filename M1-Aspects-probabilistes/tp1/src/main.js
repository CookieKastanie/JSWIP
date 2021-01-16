import './css/loadCss';
import { PI } from "./PI";
import { EXP } from "./EXP";
import { Polygone } from "./Polygone";
import { Task } from './utils/Task';
import { Doc } from './utils/Doc';

Task.init();
Doc.init();
Doc.printTitle('Aspects probabilistes - TP1');

PI.execTests();
EXP.execTests();
Polygone.execTests();


