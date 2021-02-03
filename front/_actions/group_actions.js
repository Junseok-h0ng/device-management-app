import { GROUP_CREATE_REQUEST } from "./types";

export const createGroupActionRequest = (data) =>({
    type: GROUP_CREATE_REQUEST,
    data
});