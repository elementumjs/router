import Router from '../router';

// Bind window object
const open = jest.fn();
Object.defineProperty(window, 'open', open);

test('Router.constructor', () => {
    const testTarget = document.createElement('div')
    const testElement = document.createElement('span')
    let testRoutes = [
        { path: '/test', title: 'test page', view: testElement }
    ]

    expect(() => Router(testTarget, testRoutes)).toThrow();

    testRoutes.push({ path: '/', view: testElement, title: 'homepage' });
    Router(testTarget, testRoutes);
    expect(window.history.state.route).toBeDefined();
    expect(window.history.state.params).toBeUndefined();
    
    const { route } = window.history.state; 
    expect(route.title).toBe('homepage');
    expect(route.path).toBe('/');
});

test('Router.go', () => {
    const testTarget = document.createElement('div');
    const testElement = document.createElement('span');
    const reouteHandler = () => { return };
    let testRoutes = [
        { path: '/', title: 'homepage', view: testElement },
        { path: '/test', title: 'test page', view: testElement, handler: reouteHandler }
    ]

    const router = Router(testTarget, testRoutes);
    expect(window.history.state.route).toBeDefined();
    expect(window.history.state.params).toBeUndefined();
    
    const testHandler = jest.spyOn(testRoutes[1] as any, 'handler');
    router.go('/test', { user: 'testUser' });
    expect(window.history.state.route).toBeDefined();
    expect(window.history.state.params).toBeDefined();
    expect(testHandler).toBeCalled();
    
    const { route, params } = window.history.state;
    expect(route.title).toBe('test page');
    expect(route.path).toBe('/test');
    expect(params.user).toBe('testUser');
});