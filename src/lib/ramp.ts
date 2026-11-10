// Clamped linear map as a function. Used instead of useTransform's range form for
// opacity, because framer-motion hands range-form opacity to a native scroll
// timeline, which rendered wrong values here (words stuck half-lit).
export const ramp = (a: number, b: number, from: number, to: number) => (v: number) =>
  from + (to - from) * Math.min(1, Math.max(0, (v - a) / (b - a)));
