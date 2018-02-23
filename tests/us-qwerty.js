import test from 'ava';
import FingerRoll from '../index';

test('Keys are formatted correctly', t => {
	let fr = new FingerRoll('us-qwerty');

	// Letters are uppercase
	t.is(fr.toKeyFormat('a'), 'A', 'Letters should be uppercase');
	t.is(fr.toKeyFormat('m'), 'M', 'Letters should be uppercase');
	t.is(fr.toKeyFormat('z'), 'Z', 'Letters should be uppercase');

	// Otherwise, they should be the same as what was passed in
	t.is(fr.toKeyFormat('Tab'), 'Tab', 'All other keys should not change');
	t.is(fr.toKeyFormat('CapsLock'), 'CapsLock', 'All other keys should not change');
	t.is(fr.toKeyFormat('capslock'), 'capslock', 'All other keys should not change');
	t.is(fr.toKeyFormat('caps lock'), 'caps lock', 'All other keys should not change');
});

test('Distance between keys', t => {
	let fr = new FingerRoll('us-qwerty');

	const dist = (source, dest, d) =>
		t.is(fr.distanceBetween(source, dest), d, `${source} -> ${dest} should be ${d}`);

	dist('A', 'A', 0);
	dist('A', 'S', 1);
	dist('A', '\'', 10);

	// Works with alternate keys
	dist('&', 'B', 3);
	dist('N', '*', 3);
	dist('~', '+', 12);

	// Is commutative
	t.is(fr.distanceBetween('A', '\''), fr.distanceBetween('\'', 'A'), 'Should be commutative');
});

test('Shortest path between keys', t => {
	let fr = new FingerRoll('us-qwerty');

	const isPath = (source, dest, p) => t.is(fr.pathTo(source, dest).join(', '), p.join(', '));

	isPath('A', 'A', ['A']);
	isPath('A', 'S', ['A', 'S']);
	isPath('A', '\'', 'ASDFGHJKL;\''.split(''));
});

test('Function keys', t => {
	let fr = new FingerRoll('us-qwerty');
	t.true(fr.isAdjacent('F1', 'F2'));
	t.true(fr.isAdjacent('F2', 'F1'));
	t.true(fr.isAdjacent('F2', 'F3'));
	t.true(fr.isAdjacent('F3', 'F4'));
	t.true(fr.isAdjacent('F4', 'F3'));
	t.true(fr.isAdjacent('F5', 'F6'));
	t.true(fr.isAdjacent('F6', 'F5'));
	t.true(fr.isAdjacent('F6', 'F7'));
	t.true(fr.isAdjacent('F7', 'F8'));
	t.true(fr.isAdjacent('F9', 'F10'));
	t.true(fr.isAdjacent('F10', 'F9'));
	t.true(fr.isAdjacent('F10', 'F11'));
	t.true(fr.isAdjacent('F11', 'F10'));
	t.true(fr.isAdjacent('F11', 'F12'));
	t.true(fr.isAdjacent('F12', 'F11'));
});

test('Command keys', t => {
	let fr = new FingerRoll('us-qwerty');
	t.true(fr.isAdjacent('Tab', 'CapsLock'));
	t.true(fr.isAdjacent('CapsLock', 'Shift'));
	t.true(fr.isAdjacent('Shift', 'Control'));
	t.true(fr.isAdjacent('Control', 'Meta'));
	t.true(fr.isAdjacent('Meta', 'Alt'));
	t.true(fr.isAdjacent('Alt', ' '));
});