import './css/loadCss';

import { PI } from "./PI";
import { EXP } from "./EXP";
import { Polygone } from "./Polygone";
import { Task } from './Task';
import { Doc } from './Doc';

//console.log('PI ~=', PI.calculate3(1e8));
//console.log('E ~=', EXP.calculate2(1e8));

Task.init();
Doc.printTitle('Aspects probabilistes - TP1');

PI.execTests();
EXP.execTests();
Polygone.execTests();


