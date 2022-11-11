import React from 'react'
import PropTypes from 'prop-types'
import { extend, Canvas } from '@react-three/fiber'
import { Sky, OrbitControls } from '@react-three/drei'
//import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
//import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
//import Roboto from '../assets/Roboto_Regular.json'
import Ground from './Ground'
import Tile from './Tile'

//extend({ TextGeometry })

const TileColors = {
    default: '#AAAAA9',
    red: '#FF6767',
    blue: '#67AEFF',
    green: '#48CFAD',
    yellow: '#FFD167',
}

const initialTileData = [
    { position: [-3, 3, 0] },
    { position: [0, 3, 0] },
    { position: [3, 3, 0] },
    { position: [-3, 0, 0] },
    { position: [0, 0, 0] },
    { position: [3, 0, 0] },
    { position: [-3, -3, 0] },
    { position: [0, -3, 0] },
    { position: [3, -3, 0] },
]

const styles = {
    container: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
}

function Board(props) {

    const [tiles, setTiles] = React.useState(props.tiles)

    const [turn, setTurn] = React.useState(props.turn)

    React.useEffect(() => {

        setTiles(props.tiles)

    }, [props.tiles])

    React.useEffect(() => {

        setTurn(props.turn)

    }, [props.turn])

    const handleTileClick = (tid) => {

        if(turn === 2) {
            return
        }

        props.onClick(parseInt(tid))
    }

    return (
        <div style={styles.container}>
            <Canvas camera={{ fov: 70, position: [0, 5, 15]}}>
                <OrbitControls />
                <ambientLight args={[0xffffff]} intensity={0.3} />
                <directionalLight position={[0, 1, 5]} rotation={[0.5 * 0.5 * Math.PI, 0, 0]} intensity={1.1} />
                <directionalLight position={[0, 0, -5]} rotation={[0, 0.75 * Math.PI, 0]} intensity={0.8} />
                <directionalLight position={[0, 0, 5]} rotation={[0, -0.75 * Math.PI, 0]} intensity={0.6} />
                <Sky distance={100} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
                <Ground />
                {
                    tiles.map((item, index) => {
                        return (
                            <Tile 
                            key={index} 
                            id={String(index)} 
                            color={item === 0 ? TileColors.default : item === 1 ? TileColors.red : TileColors.yellow}
                            selected={item > 0}
                            position={initialTileData[index].position}
                            onClick={handleTileClick}
                            />
                        )
                    })
                }
            </Canvas>
        </div>
    )
}

Board.defaultProps = {
    turn: 0,
    tiles: [],
    onClick: undefined,
}

Board.propTypes = {
    turn: PropTypes.number,
    tiles: PropTypes.arrayOf(PropTypes.number),
    onClick: PropTypes.func,
}

export default Board