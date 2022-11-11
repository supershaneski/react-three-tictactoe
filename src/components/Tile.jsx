import React from 'react'
import PropTypes from 'prop-types'

import { useSpring, animated, config } from '@react-spring/three'

const Tile = (props) => {

    const springs = useSpring({ 
        scale: props.selected ? 1.3 : 1,
        config: config.wobbly,
    })

    return (
        <animated.mesh 
        onClick={() => props.onClick(props.id)} 
        scale={springs.scale} 
        rotation={[0.5 * Math.PI, 0, 0]}
        position={props.position}
        >
            <cylinderGeometry args={[1, 1, 0.5, 6]} />
            <meshStandardMaterial flatShading color={props.color} />
        </animated.mesh>
    )
}

Tile.defaultProps = {
    position: [0, 0, 0],
    selected: false,
    color: '#AAAAAA',
    onClick: undefined,
}

Tile.propTypes = {
    id: PropTypes.string.isRequired,
    position: PropTypes.arrayOf(PropTypes.number),
    selected: PropTypes.bool,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Tile