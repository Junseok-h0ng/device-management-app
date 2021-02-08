import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {useRouter} from 'next/router';
import LoginedMenu from '../../components/menu/loginedMenu';
import { loadJoinGroupActionRequest } from '../../_actions/group_actions';

function team() {
    // const {join} = useSelector(state=>state.group)
    const dispatch = useDispatch();
    const router = useRouter();
    const {pid} = router.query;
    useEffect(() => {
        const data = {
            groupId: pid
        }
        dispatch(loadJoinGroupActionRequest(data));
    }, [])
    return (
        <div>
            <LoginedMenu/>
            {pid}            
        </div>
    )
}

export default team
 