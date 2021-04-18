import React from 'react'

import PaintDrip from './PaintDrip'

export default function PaintDripTransitionLink(allProps) {
	const { children, ...props } = allProps

	return <PaintDrip {...props}>{children}</PaintDrip>
}