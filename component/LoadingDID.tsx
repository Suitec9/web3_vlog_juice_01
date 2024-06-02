import React from 'react';

interface LoadingDIDProps {
    message: string;
}

const LoadingDID = ({message}: LoadingDIDProps) => {

    return (
        <div>
            <p>{message}</p>
            <div>Creating DID-polygon...</div>
        </div>
    );
};
export default LoadingDID