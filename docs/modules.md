# @elementumjs/router

## Table of contents

### Classes

- [Router](classes/Router.md)

### Type aliases

- [Route](modules.md#route)

## Type aliases

### Route

Ƭ **Route**: `Object`

The Route type defines the properties thar any route could have. A valid route
will has defined its view and path at least. The title and params properties
are optional.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `handler?` | `Function` |
| `path` | `string` |
| `title?` | `string` |
| `view` | `string` \| `HTMLElement` |

#### Defined in

router.ts:9
