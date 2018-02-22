import test from 'ava';
import FingerRoll from '../index';

test('Keys are formatted correctly', t => {
	let fr = new FingerRoll('qwerty');

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
	let fr = new FingerRoll('qwerty');

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
	let fr = new FingerRoll('qwerty');

	const isPath = (source, dest, p) => t.is(fr.pathTo(source, dest).join(', '), p.join(', '));

	isPath('A', 'A', ['A']);
	isPath('A', 'S', ['A', 'S']);
	isPath('A', '\'', 'ASDFGHJKL;\''.split(''));
});