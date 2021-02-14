import React from 'react';
import {Result,Button} from 'antd';
import Router from 'next/router';

function ErrorPage() {

    const onClickHandle = () =>{
        Router.push('/');
    }

    return (
        <div>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" onClick={onClickHandle}>Back Home</Button>}
            />
        </div>
    )
}

export default ErrorPage
