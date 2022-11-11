import React from 'react'
import PropTypes from 'prop-types'

import { DoubleSide, } from 'three'

const Ground = (props) => {
    return (
        <mesh rotation={[-0.5 * Math.PI, 0, 0]}>
            <planeGeometry args={[10, 10, 10, 10]} />
            <meshStandardMaterial wireframe={true} side={DoubleSide} flatShading />
        </mesh>
    )
}

export default Ground