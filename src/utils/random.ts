import {drop} from './func';

export const getRandomInt = (min: number, max: number): number => {
	min = Math.ceil(min);
	max = Math.ceil(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const selectRandom2D = <T>(array: T[][], select: number): T[] => { 
	const newArr = [];
    for (let i = 0; i < select; i++) {
        let y = getRandomInt(0, array.length - 1);
        let x = getRandomInt(0, array[y].length - 1);

		while(!array[y][x]) {
			array = drop(y)(array);
			y = getRandomInt(0, array.length - 1);
			x = getRandomInt(0, array[y].length - 1);
		}

        newArr.push(array[y][x]);
        array[y] = drop(x)(array[y]);
    }
    return newArr;
}
