type FirstParam<F extends (...args: any) => any> = Parameters<F>[0];
type TupleMap<F extends (...args: any[]) => any> = (args: FirstParam<F>, i?: number, arr?: FirstParam<F>[]) => any;
type ArrayT<T> = T extends (infer A)[] ? A : never;
type AnyFn = (...args: any[]) => any;

export const tupleMap = function<F extends TupleMap<F>>(fn: F) {
	return function(arr: FirstParam<F>[]) {
		const newArr: ReturnType<F>[] = [];
        for (let i = 0; i < arr.length; i++) {
            newArr[i] = fn(arr[i], i, arr);
        }
        return newArr;
	}
}

export const drop = function(k: number) {
	return function<T extends any[]>(a: T): ArrayT<T>[] {
		return [...a.slice(0, k), ...a.slice(k + 1)];
	}
}

export const complement = function <T extends (...args: any[]) => boolean>(fn: T) {
	return function (...args: Parameters<T>): boolean {
		return  !(fn(...args));
	}
}

export const accumulate = function <T extends any[]>(acc: T, arr: T): ArrayT<T>[] {
	return [...acc, ...arr];
}

export const callTo = function <T extends AnyFn>(fn: T, ...args: Parameters<T>) {
	return function(): ReturnType<T> {
		return fn(...args);
	}
}
