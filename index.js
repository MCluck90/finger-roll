// Provides information about keyboard layouts
// Does not currently support control keys
// Ex. Caps Lock, Tab, Shift, etc.
class FingerRoll {
	constructor(layout = 'us-qwerty') {
		this._layout = require(`./layouts/${layout}`);
	}

	// Converts a key obtained through a keypress (or similar) event
	// to the format used for looking up
	toKeyFormat(key) {
		if (typeof key !== 'string') {
			throw new Error('Must provide a string');
		}
		if (key.length === 1) {
			return key.toUpperCase();
		}
		return key;
	}

	// Returns the alternate for a key
	// An alternate is what you get when holding down Shift
	// or null when no such alternate exists
	// Ex: getAlternate('1') -> '!'
	//     getAlternate('a') -> 'A'
	//     getAlternate('Tab') -> null
	getAlternate(key) {
		if (typeof key !== 'string') {
			throw new Error('Must provide a string');
		}
		if (key.match(/^[a-z]$/)) {
			return key.toUpperCase();
		}

		return this._layout.alternateLookup[this.toKeyFormat(key)] || null;
	}

	// Returns any keys adjacent to the given key
	getAdjacentKeys(key) {
		if (typeof key !== 'string') {
			throw new Error('Must provide a string');
		}
		let lookupKey = this._formatAndAlternate(key);
		if (!this._layout.lookup[lookupKey]) {
			return [];
		}

		return this._layout.lookup[lookupKey].adjacent.slice(0);
	}

	// Are two keys adjacent?
	isAdjacent(keyA, keyB) {
		keyA = this.toKeyFormat(keyA);
		keyB = this.toKeyFormat(keyB);

		let lookup = this._layout.lookup;
		if (!lookup[keyA] || !lookup[keyB]) {
			return false;
		}

		return lookup[keyA].adjacent.indexOf(keyB) > -1;
	}

	// Returns the distance between two keys
	distanceBetween(source, destination) {
		if (typeof source !== 'string' || typeof destination !== 'string') {
			throw new Error('Must provide source and destination as strings');
		}

		let result = this._shortestPath(source, destination);
		if (result === null) {
			// Invalid source or destination
			return null;
		}
		return result.distance;
	}

	// Returns the path from one key to another
	pathTo(source, destination) {
		if (typeof source !== 'string' || typeof destination !== 'string') {
			throw new Error('Must provide source and destination as strings');
		}

		let result = this._shortestPath(source, destination);
		if (result === null) {
			// Invalid source or destination
			return null;
		}
		return result.path;
	}

	// Returns an object indicating the distance to all other keys
	distanceToAll(source) {
		if (typeof source !== 'string') {
			throw new Error('Must provide source as a string');
		}

		let result = this._shortestPath(source);
		if (result === null) {
			return null;
		}
		return result.distance;
	}

	// Returns an object which can be used to construct a path to any key
	pathToAll(source) {
		if (typeof source !== 'string') {
			throw new Error('Must provide source as a string');
		}

		let result = this._shortestPath(source);
		if (result === null) {
			return null;
		}
		return result.path;
	}

	// Helper function for formatting a key and getting the alternate, if needed
	_formatAndAlternate(key) {
		key = this.toKeyFormat(key);
		return this.getAlternate(key) || key;
	}
	
	// Helper function for getting distance information for a given key
	_shortestPath(source, destination) {
		source = this._formatAndAlternate(source);
		if (destination) {
			destination = this._formatAndAlternate(destination);
		}
		if (!this._layout.lookup[source] || (destination && !this._layout.lookup[destination])) {
			return null;
		}

		let lookup = this._layout.lookup;

		// Dijkstra's algorithm for shortest path
		let unvisited = new Set(); // Remaining nodes to check
		let distance = {};         // Distance from source
		let previous = {};         // Path through previous nodes

		// Set the initial state
		for (let key in lookup) {
			distance[key] = Infinity;
			previous[key] = undefined;
			unvisited.add(key);
		}

		// Distance from source to source is 0
		distance[source] = 0;

		// Look through every available node
		while (unvisited.size > 0) {
			// Get the closest unvisited node
			let next = Array.from(unvisited).reduce((a, b) => (distance[a] < distance[b]) ? a : b);
			unvisited.delete(next);

			// If we only want the distance the information to a given destination
			// Go ahead and return it
			if (next === destination) {
				let totalDistance = distance[destination];
				let shortestPath = [];
				while (previous[destination] !== undefined) {
					shortestPath.unshift(destination);
					destination = previous[destination];
				}
				shortestPath.unshift(destination);

				return {
					distance: totalDistance,
					path: shortestPath
				};
			}

			// Determine the distance to each of the neighbors
			for (let neighbor of lookup[next].adjacent) {
				let alternative = distance[next] + 1;
				if (alternative < distance[neighbor]) {
					// Found a new shorter path, update it
					distance[neighbor] = alternative;
					previous[neighbor] = next;
				}
			}
		}

		// Return the distances and paths for all nodes
		return {
			distance,
			path: previous
		};
	}
}

module.exports = FingerRoll;