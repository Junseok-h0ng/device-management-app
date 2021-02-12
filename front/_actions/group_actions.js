import { GROUP_CREATE_REQUEST, GROUPS_LOAD_REQUEST, RESET_GROUP_STATUS, GROUP_CONNECTED_STATUS, GROUP_JOIN_REQUEST, GROUP_LOAD_JOIN_REQUEST, GROUP_ACCESS_JOIN_REQUEST, RESET_ERROR_MESSAGE, GROUP_REJECT_JOIN_REQUEST } from "./types";

export const createGroupActionRequest = (data) =>({
    type: GROUP_CREATE_REQUEST,
    data
});


export const loadGroupsActionRequest = (data) =>({
    type: GROUPS_LOAD_REQUEST,
    data
});

export const resetGroupStatus = () =>({
    type: RESET_GROUP_STATUS
});

export const connectedGroupStatus = (data) =>({
    type:GROUP_CONNECTED_STATUS,
    data
});

export const joinGroupActionRequest = (data)=>({
    type:GROUP_JOIN_REQUEST,
    data
});

export const loadJoinGroupActionRequest = (data)=>({
    type:GROUP_LOAD_JOIN_REQUEST,
    data
});

export const accessJoinGroupAction = (data)=>({
    type: GROUP_ACCESS_JOIN_REQUEST,
    data
});

export const rejectJoinGroupAction = (data)=>({
    type: GROUP_REJECT_JOIN_REQUEST,
    data
})