// modules
import React from 'react'
// component
import Lane from '../../containers/Lane'

export default ({laneIds}) => {
    return(
        <div>
            {laneIds.map(laneId =>
                <Lane
                    key={laneId}
                    laneId={laneId}
                />
            )}
        </div>
    )
}
