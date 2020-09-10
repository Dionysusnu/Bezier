# Bezier Curve
Easily calculate points on a bezier curve!
## Example
```ts
import Bezier from "@rbxts/bezier";

const curve = new BezierCurve([new Vector3(0, 0, 0), new Vector3(10, 0, 0), new Vector3(10, 0, 10), new Vector3(0, 0, 10)]);
for (let i = 0; i < 100; i++) {
	const part = new Instance("Part")
	part.Position = curve.calculate(i / 100)
	part.Parent = workspace
}
```
