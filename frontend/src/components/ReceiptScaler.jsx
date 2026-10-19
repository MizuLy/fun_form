import { useLayoutEffect, useRef, useState } from "react"

// Renders a fixed-width receipt and scales it down to fit narrow screens.
// The scale is display-only: print and PNG export use the full-size receipt.
export default function ReceiptScaler({ width, children }) {
  const outerRef = useRef(null)
  const innerRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [height, setHeight] = useState()

  useLayoutEffect(() => {
    const update = () => {
      const next = Math.min(1, outerRef.current.clientWidth / width)
      setScale(next)
      setHeight(innerRef.current.offsetHeight * next)
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(outerRef.current)
    observer.observe(innerRef.current)
    return () => observer.disconnect()
  }, [width])

  return (
    <div
      ref={outerRef}
      className="receipt-scaler w-full flex items-start justify-center"
      style={{ height }}
    >
      <div
        ref={innerRef}
        className="receipt-scaler-inner shrink-0 origin-top"
        style={{ width, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  )
}
