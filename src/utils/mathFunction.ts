export function distanceFromCoordinate(
  longitudeA: number,
  latitudeA: number,
  longitudeB: number,
  latitudeB: number
) {
  const radius = 6371;
  const phiA = toRadian(latitudeA);
  const phiB = toRadian(latitudeB);
  const Deltaphi = toRadian(latitudeB - latitudeA);
  const DeltaLambda = toRadian(longitudeB - longitudeA);

  const a =
    Math.sin(Deltaphi / 2) * Math.sin(Deltaphi / 2) +
    Math.cos(phiA) *
      Math.cos(phiB) *
      Math.sin(DeltaLambda / 2) *
      Math.sin(DeltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return radius * c;
}

function toRadian(value: number) {
  return (value * Math.PI) / 180;
}
