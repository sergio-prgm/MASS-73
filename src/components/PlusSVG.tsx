interface Props {
  color: string
  height: number
  width: number
}

export default function PlusSVG ({ color, height, width }: Props) {
  return <svg
  id="e3N5x6kXpIM1" xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 30 30"
  shapeRendering="geometricPrecision" textRendering="geometricPrecision"
  height={height} width={width} className='mx-auto'
  >
  <path
    d="M1.38015,15.95157c11.440675,0,11.440675,0,22.881351,0"
    transform="matrix(0-1.197286-6.525074 0 119.085174 30.35019)"
    fill={color} stroke={color} strokeWidth="1"
  />
  <path d="M1.38015,15.95157c11.440675,0,11.440675,0,22.881351,0"
  transform="matrix(1.197286 0 0-6.525074-.350194 119.085182)"
  fill={color} stroke={color} strokeWidth="1"
  />
</svg>
}
