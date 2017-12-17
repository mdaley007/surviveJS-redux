export const create = () => {
    return {
        type: 'CREATE',
    }
}
export const update = () => {
    return {
        type: 'UPDATE',
        payload: {
            id,
            name,
            editing,
        }
    }
}
export const deleteLane = () => {
    return {
        type: 'DELETE',
    }
}
export const attachToLane = () => {
    return {
        type: 'ATTACH_TO_LANE',
    }
}
export const detachFromLane = () => {
    return {
        type: 'DETATCH_FROM_LANE',
    }
}
export const move = () => {
    return {
        type: 'MOVE',
    }
}
