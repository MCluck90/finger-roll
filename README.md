# Finger Roll

This goes out to all the people who have fat fingered something on their keyboard.

Finger Roll provides information about keyboard layouts. Specifically, it will let you know
which keys are close to another on the keyboard (`'A'` is close to `'S'` on a QWERTY layout, for example).

## Example

```js
const FingerRoll = require('finger-roll');

const fingerRoll = new FingerRoll('us-qwerty');

fingerRoll.getAdjacentKeys('F'); // [ 'C', 'D', 'G', 'R', 'T', 'V' ]
fingerRoll.distanceBetween('A', 'L'); // 8
```

## Supported Keyboard Layouts

* US QWERTY

## API

*Note:* All examples are given assuming as US QWERTY layout since that's what I type with.

* `FingerRoll(string layout = 'us-qwerty') -> FingerRoll`
	* Creates a new instance of FingerRoll with the designated keyboard layout.
* `toKeyFormat(string key) -> string`
	* Converts a key name obtained from something like `event.key` in a `keypress` event to the internal format. Example: `toKeyFormat('a') == 'A'`
	* All other methods use this internally so if you only use the given API then you won't need this. However, it may be useful when working with the results of other methods.
* `getAlternate(string key) -> string?`
	* Returns the equivalent key as if you were holding down Shift
	* Returns `null` if it doesn't recognize the key
	* Example: `getAlternate('1') == '!'`
	* Example: `getAlternate('not a key') == null`
* `getAdjacentKeys(string key) -> string[]`
	* Returns an array with all keys surrounding the given one
	* Example: `getAdjacentKeys('F') == [ 'C', 'D', 'G', 'R', 'T', 'V' ]`
* `isAdjacent(string keyA, string keyB) -> bool`
	* Reports whether two keys are next to each other or not
	* Example: `isAdjacent('G', 'H') == true`
	* Example: `isAdjacent('G', 'J') == false`
* `distanceBetween(string source, string destination) -> number?`
	* Returns the distance between two keys
	* Returns `null` if it doesn't recognize either the `source` or `destination`
	* Example: `distanceBetween('A', 'L') == 8`
	* Example: `distanceBetween('not a key', 'L') == null`
* `distanceToAll(string source) -> ({ [key]: number })?`
	* Returns an object indicating the distance from one key to any other key on the keyboard
	* Returns `null` if it doesn't recognize the `source` key
	* Example: `distanceToAll('A')['D'] == 2`
	* Example: `distanceToAll('not a key') == null`
* `pathTo(string source, string destination) -> string[]?`
	* Returns an array indicating the path to take to go between two keys.
	* Returns `null` if it doesn't recognize either the `source` or `destination`
	* Example: `pathTo('A', 'F') == ['A', 'S', 'D', 'F']`
	* Example: `pathTo('not a key', 'F') == null`
* `pathToAll(string source) -> ({ [key]: string })?`
	* Returns an object indicating which key to follow to return to the `source`
	* Returns `null` if it doesn't recognize the `source`
	* Example: `pathToAll('A')['F'] == 'D'`
	* Example: `pathToAll('not a key') == null`