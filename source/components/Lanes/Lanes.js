// modules
import React from 'react'

// style
import Style from './Lanes.css'

// component
import Lane from '../../containers/Lane'

export default ({laneIds}) => {
    return(
        <div>
            {laneIds.map(laneId =>
                <Lane
                    className={Style.lane}
                    key={laneId}
                    laneId={laneId}
                />
            )}
        </div>
    )
}
