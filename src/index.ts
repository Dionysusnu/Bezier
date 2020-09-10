type BezierCompatible = UDim2 | Vector2 | Vector3 | CFrame | Color3;
type E = UnionToIntersection<BezierCompatible>;
export default class BezierCurve<T extends BezierCompatible, P extends Array<T>> {
	/**
	 * @param points Array with input points.
	 */
	public constructor(private points: [...P, T]) {
		assert(points.size() > 1);
	}

	/**
	 * Calculates a point on the curve.
	 * @param n The fraction to calculate with.
	 */
	public calculate(n: number): T {
		let array: Array<T> = this.getPoints(n);
		while (array.size() > 1) {
			array = new BezierCurve(array).getPoints(n);
		}
		return array[0];
	}

	/**
	 * Calculates one step.
	 * Returns an Array of length 1 smaller than the input Array.
	 * Mostly for internal use.
	 * @param n The fraction to calculate with.
	 */
	public getPoints(n: number): P {
		const array = [];
		for (let i = 0; i < this.points.size() - 1; i++) {
			array.push((this.points[i] as E).Lerp(this.points[i + 1] as E, n));
		}
		return array as P;
	}
}
