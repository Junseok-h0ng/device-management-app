import { GROUP_CREATE_REQUEST, GROUPS_LOAD_REQUEST } from "./types";

export const createGroupActionRequest = (data) =>({
    type: GROUP_CREATE_REQUEST,
    data
});

export const loadGroupsActionRequest = (data) =>({
    type: GROUPS_LOAD_REQUEST,
    data
})