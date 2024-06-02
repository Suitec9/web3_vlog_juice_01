import React from 'react';

interface LoadingMessageProps {
    message: string;
}

const LoadingMessage = ({message}: LoadingMessageProps) => {

    return (
        <div>
            <p>{message}</p>
            <div>Loading...</div>
        </div>
    );
};
export default LoadingMessage;