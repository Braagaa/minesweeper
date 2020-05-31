import React from 'react';

type AnyFn = (...args: any[]) => any;

export const click = function<T extends AnyFn>(fn: T, ...args: Parameters<T>) {
	return function() {
		fn(...args);
	}
}

export const contextMenu = function<T extends AnyFn>(fn: T, ...args: Parameters<T>) {
	return function(e: React.MouseEvent) {
		e.preventDefault();
		fn(...args);
	}
}
