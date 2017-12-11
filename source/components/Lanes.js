// modules
import React from 'react'

// components
import Lane from './Lane'

export default ({lanes}) => {
    return (
        <div className='lanes'>
            {lanes.map(lane =>
                <Lane
                    className='lane'
                    key={lane.id}
                    lane={lane}
                />
            )}
        </div>
    )
}
