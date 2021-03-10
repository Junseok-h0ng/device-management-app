import { GROUP_CREATE_REQUEST, GROUPS_LOAD_REQUEST, RESET_GROUP_STATUS, GROUP_CONNECTED_STATUS, GROUP_JOIN_REQUEST, GROUP_LOAD_JOIN_REQUEST, GROUP_ACCESS_JOIN_REQUEST, RESET_ERROR_MESSAGE, GROUP_REJECT_JOIN_REQUEST, GROUP_LOAD_MEMBERS_REQUEST, GROUP_ROLE_INCREASE_REQUEST, GROUP_ROLE_DECREASE_REQUEST, GROUP_DELETE_REQUEST } from "./types";

export const createGroupActionRequest = (data,cb) =>({
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

export const loadMembersGroupAction = (data)=>({
    type:GROUP_LOAD_MEMBERS_REQUEST,
    data
})

export const accessJoinGroupAction = (data)=>({
    type: GROUP_ACCESS_JOIN_REQUEST,
    data
});

export const rejectJoinGroupAction = (data)=>({
    type: GROUP_REJECT_JOIN_REQUEST,
    data
});

export const increaseRoleGroupAction = (data) =>({
    type: GROUP_ROLE_INCREASE_REQUEST,
    data
});

export const decreaseRoleGroupAction = (data) => ({
    type: GROUP_ROLE_DECREASE_REQUEST,
    data
});

export const deleteGroupAction = (data) => ({
    type: GROUP_DELETE_REQUEST,
    data
})