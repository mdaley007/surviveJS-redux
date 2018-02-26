// modules
import React from 'react'
// component
import Lane from './Lane'

export default ({laneIds}) => {
    return(
        <div className='lanes'>
            {laneIds.map(laneId =>
                <Lane
                    className='lane'
                    key={laneId}
                    laneId={laneId}
                />
            )}
        </div>
    )
}
