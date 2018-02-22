import test from 'ava';
import FingerRoll from '../index';

test('Public interface has not changed', t => {
	let fingerRoll = new FingerRoll();

	// Helper for checking if something is a function
	const isFunction = (name) => 
		t.is(typeof fingerRoll[name], 'function', `${name} should be a function`);
	const takesXArguments = (fn, x) =>
		t.is(fn.length, x, `${fn.name} should take ${x} arguments`);

	t.true(fingerRoll instanceof FingerRoll, 'FingerRoll is a class');

	isFunction('toKeyFormat');
	isFunction('getAlternate');
	isFunction('getAdjacentKeys');
	isFunction('isAdjacent');
	isFunction('distanceBetween');
	isFunction('pathTo');
	isFunction('distanceToAll');
	isFunction('pathToAll');

	// Find all of the public functions
	let publicFunctions = Object.getOwnPropertyNames(Object.getPrototypeOf(fingerRoll))
		.filter(prop =>
			typeof fingerRoll[prop] === 'function' &&
			prop[0] !== '_' &&
			prop !== 'constructor'
		);
	t.is(publicFunctions.length, 8);

	takesXArguments(fingerRoll.toKeyFormat, 1);
	takesXArguments(fingerRoll.getAlternate, 1);
	takesXArguments(fingerRoll.getAdjacentKeys, 1);
	takesXArguments(fingerRoll.isAdjacent, 2);
	takesXArguments(fingerRoll.distanceBetween, 2);
	takesXArguments(fingerRoll.pathTo, 2);
	takesXArguments(fingerRoll.distanceToAll, 1);
	takesXArguments(fingerRoll.pathToAll, 1);
});

test('toKeyFormat', t => {
	const fingerRoll = new FingerRoll('qwerty');

	// Requires a string
	t.throws(() => fingerRoll.toKeyFormat());
	t.throws(() => fingerRoll.toKeyFormat(1));
	t.throws(() => fingerRoll.toKeyFormat({}));
	t.throws(() => fingerRoll.toKeyFormat([]));
	t.notThrows(() => fingerRoll.toKeyFormat(''));

	// Takes a string, returns a string
	t.is(typeof fingerRoll.toKeyFormat('A'), 'string');
});

test('getAlternate', t => {
	const fingerRoll = new FingerRoll('qwerty');

	// Requires a string
	t.throws(() => fingerRoll.getAlternate());
	t.throws(() => fingerRoll.getAlternate(1));
	t.throws(() => fingerRoll.getAlternate({}));
	t.notThrows(() => fingerRoll.getAlternate(''));

	// Takes a string, returns a string
	t.is(typeof fingerRoll.getAlternate('1'), 'string');
	t.is(typeof fingerRoll.getAlternate('a'), 'string');
	t.is(typeof fingerRoll.getAlternate('&'), 'string');

	// Unless it's an unknown character, then return null
	t.is(fingerRoll.getAlternate('not a valid key'), null);
});

test('getAdjacentKeys', t => {
	const fingerRoll = new FingerRoll();

	// Requires a string
	t.throws(() => fingerRoll.getAdjacentKeys());
	t.throws(() => fingerRoll.getAdjacentKeys(1));
	t.throws(() => fingerRoll.getAdjacentKeys({}));
	t.notThrows(() => fingerRoll.getAdjacentKeys(''));

	// Takes a string, returns an array
	t.true(Array.isArray(fingerRoll.getAdjacentKeys('a')));
	t.true(Array.isArray(fingerRoll.getAdjacentKeys('z')));
	t.true(Array.isArray(fingerRoll.getAdjacentKeys('!')));
});

test('isAdjacent', t => {
	const fingerRoll = new FingerRoll();

	// Requires two strings
	t.throws(() => fingerRoll.isAdjacent());
	t.throws(() => fingerRoll.isAdjacent(1));
	t.throws(() => fingerRoll.isAdjacent(1, 1));
	t.throws(() => fingerRoll.isAdjacent('', 1));
	t.notThrows(() => fingerRoll.isAdjacent('', ''));

	// Takes two strings, returns a boolean
	t.is(typeof fingerRoll.isAdjacent('a', 'b'), 'boolean');
	t.is(typeof fingerRoll.isAdjacent('2', '!'), 'boolean');
});

test('distanceBetween', t => {
	const fingerRoll = new FingerRoll('qwerty');

	// Requires two strings
	t.throws(() => fingerRoll.distanceBetween());
	t.throws(() => fingerRoll.distanceBetween(1));
	t.throws(() => fingerRoll.distanceBetween(1, 1));
	t.throws(() => fingerRoll.distanceBetween('', 1));
	t.notThrows(() => fingerRoll.distanceBetween('', ''));

	// Takes two strings, returns number
	t.is(typeof fingerRoll.distanceBetween('a', 'b'), 'number');

	// Unless an invalid source or destination is given
	// then return null
	t.is(fingerRoll.distanceBetween('invalid', 'b'), null);
	t.is(fingerRoll.distanceBetween('a', 'invalid'), null);
});

test('pathTo', t => {
	const fingerRoll = new FingerRoll('qwerty');

	// Requires two strings
	t.throws(() => fingerRoll.pathTo());
	t.throws(() => fingerRoll.pathTo(1));
	t.throws(() => fingerRoll.pathTo(1, 1));
	t.throws(() => fingerRoll.pathTo('', 1));
	t.notThrows(() => fingerRoll.pathTo('', ''));

	// Takes two strings, returns an array
	t.true(Array.isArray(fingerRoll.pathTo('a', 'b')));

	// Unless an invalid source or destination is given
	// then return null
	t.is(fingerRoll.pathTo('invalid', 'b'), null);
	t.is(fingerRoll.pathTo('a', 'invalid'), null);
});

test('distanceToAll', t => {
	const fingerRoll = new FingerRoll('qwerty');

	// Requires a string
	t.throws(() => fingerRoll.distanceToAll());
	t.throws(() => fingerRoll.distanceToAll(1));
	t.throws(() => fingerRoll.distanceToAll([]));
	t.notThrows(() => fingerRoll.distanceToAll(''));

	// Takes a string, returns an object
	t.is(typeof fingerRoll.distanceToAll('a'), 'object');

	// Unless an invalid string is given
	// then return null
	t.is(fingerRoll.distanceToAll('invalid'), null);

	// Should return a lookup for distances to different keys
	t.is(fingerRoll.distanceToAll('A')['A'], 0);
});

test('pathToAll', t => {
	const fingerRoll = new FingerRoll('qwerty');

	// Requires a string
	t.throws(() => fingerRoll.pathToAll());
	t.throws(() => fingerRoll.pathToAll(1));
	t.throws(() => fingerRoll.pathToAll([]));
	t.notThrows(() => fingerRoll.pathToAll(''));

	// Takes a string, returns an object
	t.is(typeof fingerRoll.pathToAll('a'), 'object');

	// Unless an invalid string is given
	// then return null
	t.is(fingerRoll.pathToAll('invalid'), null);

	// Should return a lookup for distances to different keys
	let path = fingerRoll.pathToAll('A');
	t.is(path['X'], 'Z');
	t.is(path['Z'], 'A');
});