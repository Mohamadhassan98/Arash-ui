import React from 'react';
import Error from "../components/Error";

export default function Page404(props) {
    return <Error errorCode={404} mainError={'Oops! You\'re lost.'}
                  details={'The page you are looking for was not found.'}/>
}