export default class BezierCurve<T extends { Lerp(this: T, other: T, fraction: number): T }, P extends Array<T>> {
	/**
	 * @param points Array with input points.
	 */
	public constructor(private points: [...P, P[0] extends undefined ? T : T & P[0]]) {
		if (points.size() < 2) {
			error("RangeError: BezierCurve input points ", 3);
		}
	}

	/**
	 * Calculates a point on the curve.
	 * @param n The fraction to calculate with.
	 */
	public calculate(n: number): T {
		let array: Array<T> = this.getPointsInternal(n);
		while (array.size() > 1) {
			array = new BezierCurve(array).getPointsInternal(n);
		}
		return array[0];
	}

	/**
	 * Calculates one step.
	 * Returns an Array of length 1 smaller than the input Array.
	 * @param n The fraction to calculate with.
	 */
	public getPoints(n: number): P {
		// extra function call for error stack location
		return this.getPointsInternal(n);
	}

	private getPointsInternal(n: number): P {
		if (n < 0 || n > 1) {
			error("RangeError: BezierCurve calculation fraction out of bounds", 3);
		}
		const array = [];
		for (let i = 0; i < this.points.size() - 1; i++) {
			array.push(this.points[i].Lerp(this.points[i + 1], n));
		}
		return array as P;
	}
}
