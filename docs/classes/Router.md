# Class: Router

Router class contains a very basic implementation of a SPA router using
window.history to change the location.

**`noinheritdoc`**

## Table of contents

### Constructors

- [constructor](Router.md#constructor)

### Properties

- [routes](Router.md#routes)
- [target](Router.md#target)

### Accessors

- [current](Router.md#current)
- [path](Router.md#path)

### Methods

- [go](Router.md#go)
- [init](Router.md#init)
- [load](Router.md#load)
- [matchRoute](Router.md#matchroute)
- [routeElem](Router.md#routeelem)
- [routeHash](Router.md#routehash)

## Constructors

### constructor

• **new Router**(`target`, `routes`)

The Router class initialization includes the assignation of the arguments
to the class properties and call to [Router.init](Router.md#init).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `HTMLElement` | The root [Router](Router.md) element to replace its content. |
| `routes` | [`Route`](../modules.md#route)[] | The [Route](../modules.md#route)'s definition. |

#### Defined in

router.ts:70

## Properties

### routes

• `Private` **routes**: [`Route`](../modules.md#route)[]

routes array property contains the list of the defined [Route](../modules.md#route)'s'.

#### Defined in

router.ts:37

___

### target

• `Private` **target**: `HTMLElement`

target property references the HTMLElement to use as router container and
replace its content with the defined [Route](../modules.md#route)'s views.

#### Defined in

router.ts:30

## Accessors

### current

• `Private` `get` **current**(): [`Route`](../modules.md#route)

current property returns the current [Route](../modules.md#route) from the current
{@link Route.path}. It gets the [Route](../modules.md#route) calling to
[Router.matchRoute](Router.md#matchroute).

#### Returns

[`Route`](../modules.md#route)

#### Defined in

router.ts:58

___

### path

• `Private` `get` **path**(): `string`

path property return the current path from location of the current window
instance. It also removes the hash character if it is contained.

#### Returns

`string`

#### Defined in

router.ts:45

## Methods

### go

▸ **go**(`path`, `params?`): `void`

go function allows to the user to navigate to other [Route](../modules.md#route) view.
It also allows to pass parameters to the next [Route](../modules.md#route) using
`window.history.state`. It updates the current `window.history` with the
provided params and the [Route](../modules.md#route) title, and then it calls to
[Router.load](Router.md#load) function. If the following [Route](../modules.md#route) is null, it
thrown an error.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The path of the view to navigate to. |
| `params?` | `Object` | Optional argument to pass parameters to the target view. |

#### Returns

`void`

#### Defined in

router.ts:175

___

### init

▸ `Private` **init**(): `void`

init function starts to listen to `popstate` events to trigger
[Router.load](Router.md#load) function when the location changes. It also check if
path is null to redirect to root path and then call to
[Router.load](Router.md#load) for the first time.

#### Returns

`void`

#### Defined in

router.ts:128

___

### load

▸ `Private` **load**(): `void`

load function gets the following [Route](../modules.md#route) by its path, removes the
current target content and insert the [Route](../modules.md#route) view element instead.
It also updates the document title if the current [Route](../modules.md#route) has it
defined and reassign the current route if the current `history.state` is
empty (for example when a HTML link is clicked). If the following
[Route](../modules.md#route) is null, it thrown an error.

#### Returns

`void`

#### Defined in

router.ts:143

___

### matchRoute

▸ `Private` **matchRoute**(`path`): [`Route`](../modules.md#route)

matchRoute function iterates over the definded [Route](../modules.md#route)'s searching
for any [Route](../modules.md#route) that matches with the provided path. If any
[Route](../modules.md#route) has the path, the function returns null.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The URI path to search the [Route](../modules.md#route). |

#### Returns

[`Route`](../modules.md#route)

The found [Route](../modules.md#route)-.

#### Defined in

router.ts:85

___

### routeElem

▸ `Private` **routeElem**(`route`): `HTMLElement`

routeElem function checks if the provided [Route](../modules.md#route) view is a
string that represents the tagName of the HTMLElement to create the view
element or it is already a HTMLElement. Then returns the created or
provided HTMLElement. If the [Route](../modules.md#route) view is not a string or a
HTMLElement, it returns null.

#### Parameters

| Name | Type |
| :------ | :------ |
| `route` | [`Route`](../modules.md#route) |

#### Returns

`HTMLElement`

The [Route](../modules.md#route) view element or the created one.

#### Defined in

router.ts:105

___

### routeHash

▸ `Private` **routeHash**(`route`): `string`

routeHash function constructs the correct [Route](../modules.md#route) location URI
combining the {@link Route.path} with hash separator.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `route` | [`Route`](../modules.md#route) | The route to get its hash. |

#### Returns

`string`

The resulting hash.

#### Defined in

router.ts:118
