import React from 'react';

import {Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


function Loading() {

    const antIcon = <LoadingOutlined style={{fontSize:24}} spin/>

    return (
        <div>
            <Spin indicator={antIcon}/>
        </div>
    )
}

export default Loading
