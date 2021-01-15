import React from 'react';
import {wrapper} from '../components/redux/store';

function DpApp({ Component, pageProps }) {
    return (
        <Component {...pageProps} />
    );
}

export default wrapper.withRedux(DpApp);