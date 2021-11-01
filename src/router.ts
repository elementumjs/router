/** @private */
import { Route, Router } from './lib/router';

/** @private */
export default (target: HTMLElement, routes: Array<Route>) => 
    new Router(target, routes);