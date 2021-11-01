/** @private */
const URI_SEPARATOR: string = '#';

/**
 * The Route type defines the properties thar any route could have. A valid route
 * will has defined its view and path at least. The title and params properties
 * are optional.
 */
type Route = {
    path: string,
    title?: string,
    view: string | HTMLElement,
    handler?: Function
}

/**
 * Router class contains a very basic implementation of a SPA router using
 * window.history to change the location.
 * 
 * @class Router
 * @noInheritDoc
 */
class Router {
    /**
     * target property references the HTMLElement to use as router container and
     * replace its content with the defined {@link Route}'s views.
     * 
     * @type {HTMLElement}
     */
    private target: HTMLElement

    /**
     * routes array property contains the list of the defined {@link Route}'s'.
     * 
     * @type {Array<Route>}
     */
    private routes: Array<Route>

    /**
     * path property return the current path from location of the current window
     * instance. It also removes the hash character if it is contained.
     * 
     * @type {string}
     */
    private get path(): string {
        const { hash } = window.location;
        const path = hash !== '' ? hash.replace(URI_SEPARATOR, '') : null;
        return path;
    }

    /**
     * current property returns the current {@link Route} from the current 
     * {@link Route.path}. It gets the {@link Route} calling to 
     * {@link Router.matchRoute}.
     * 
     * @type {Route}
     */
    private get current(): Route {
        const path: string = this.path || '/';
        return this.matchRoute(path);
    }

    /**
     * The Router class initialization includes the assignation of the arguments
     * to the class properties and call to {@link Router.init}.
     * 
     * @param {HTMLElement} target The root {@link Router} element to replace its content.
     * @param {Array<Route>} routes The {@link Route}'s definition.
     */
    constructor(target: HTMLElement, routes: Array<Route>) {
        this.target = target;
        this.routes = routes;

        this.init();
    }

    /**
     * matchRoute function iterates over the definded {@link Route}'s searching 
     * for any {@link Route} that matches with the provided path. If any 
     * {@link Route} has the path, the function returns null.
     * 
     * @param {string} path The URI path to search the {@link Route}.
     * @returns {Route} The found {@link Route}-.
     */
    private matchRoute(path: string): Route {
        const { length } = this.routes;
        for (let i = 0; i < length; i++) {
            const route = this.routes[i];
            if (route.path === path) return route;
        }

        return null;
    }

    /**
     * routeElem function checks if the provided {@link Route} view is a
     * string that represents the tagName of the HTMLElement to create the view
     * element or it is already a HTMLElement. Then returns the created or 
     * provided HTMLElement. If the {@link Route} view is not a string or a 
     * HTMLElement, it returns null.
     * 
     * @param {Route} route 
     * @returns {HTMLElement} The {@link Route} view element or the created one.
     */
    private routeElem(route: Route): HTMLElement {
        if (typeof route.view === 'string') return document.createElement(route.view as string);
        else if (route.view instanceof HTMLElement) return route.view as HTMLElement;
        return null;
    }

    /**
     * routeHash function constructs the correct {@link Route} location URI 
     * combining the {@link Route.path} with hash separator.
     * 
     * @param {Route} route The route to get its hash.
     * @returns {string} The resulting hash.
     */
    private routeHash(route: Route): string {
        return URI_SEPARATOR + route.path;
    }

    /**
     * init function starts to listen to `popstate` events to trigger 
     * {@link Router.load} function when the location changes. It also check if 
     * path is null to redirect to root path and then call to 
     * {@link Router.load} for the first time.
     */
    private init() {
        window.addEventListener('popstate', () => this.load());

        if (this.path === null) this.go('/');
        this.load();
    }

    /**
     * load function gets the following {@link Route} by its path, removes the 
     * current target content and insert the {@link Route} view element instead.
     * It also updates the document title if the current {@link Route} has it 
     * defined and reassign the current route if the current `history.state` is
     * empty (for example when a HTML link is clicked). If the following 
     * {@link Route} is null, it thrown an error.
     */
    private load() {
        const following = this.current;
        this.target.innerHTML = '';
            
        if (following !== null) {
            let { state } = window.history;
            if (state === null) {
                let route = { title: following.title, path: following.path }
                window.history.replaceState({ route }, route.title, this.routeHash(following));
            }

            const element = this.routeElem(following);
            if (element !== null) {
                this.target.append(element);
                if (following.title !== undefined) document.title = following.title;
                if (following.handler !== undefined) following.handler();
            }
        } else throw Error('the provided path hasn\'t assigned any route.');
    }

    /**
     * go function allows to the user to navigate to other {@link Route} view.
     * It also allows to pass parameters to the next {@link Route} using 
     * `window.history.state`. It updates the current `window.history` with the 
     * provided params and the {@link Route} title, and then it calls to 
     * {@link Router.load} function. If the following {@link Route} is null, it 
     * thrown an error.
     * 
     * @param {string} path The path of the view to navigate to.
     * @param {Objetc?} params Optional argument to pass parameters to the 
     * target view.
     */
    public go(path: string, params?: Object) {
        const following = this.matchRoute(path);
        if (following !== null) {
            let route = { title: following.title, path: following.path };
            window.history.pushState({ route, params }, route.title, this.routeHash(following));
            this.load();
        } else throw Error('the provided path hasn\'t assigned any route.');
    }
}

export { Route, Router };