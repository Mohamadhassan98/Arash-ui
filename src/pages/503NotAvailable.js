import React from 'react';
import Error from "../components/Error";

export default function Page503(props) {
    return <Error errorCode={503} mainError={'Oops! We\'re offline.'}
                  details={'The server didn\'t send any response.'}/>
}