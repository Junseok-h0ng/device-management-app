import { REPAIR_ADD_REQUEST, REPAIR_LOAD_REQUEST } from './types'

export const addRepairAction = (data) => ({
    type:REPAIR_ADD_REQUEST,
    data
});

export const loadRepairAction = (data) => ({
    type:REPAIR_LOAD_REQUEST,
    data
});