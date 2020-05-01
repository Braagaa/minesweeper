type FirstParam<F extends (...args: any) => any> = Parameters<F>[0];
type TupleMap<F extends (...args: any[]) => any> = (args: FirstParam<F>, i?: number, arr?: FirstParam<F>[]) => any;

export const tupleMap = function<F extends TupleMap<F>>(fn: F) {
	return function(arr: FirstParam<F>[]) {
		const newArr: ReturnType<F>[] = [];
        for (let i = 0; i < arr.length; i++) {
            newArr[i] = fn(arr[i], i, arr);
        }
        return newArr;
	}
}
