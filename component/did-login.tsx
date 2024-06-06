import React, { useState } from 'react';
import LoadingDID from './LoadingDID';


import { FaUserCircle } from 'react-icons/fa';


function Login() {

    const [ userDID, setUserDID ] = useState<string | null>(null);
    const [ isCreatingDID,  setIsCreatingDID ] = useState<boolean>(false);
    const [ isSendingTx , setIsSendingTx ] = useState<'idle' | 'creatingDID' | 'success' | 'errorDID'>('idle');

    const handleLogin = async () => {
        setIsCreatingDID(true);
        setIsSendingTx('creatingDID');
        try {
            // Create a new DID if the user doesn't have one
            const createResonse = await fetch("/api/did",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
              //  body: JSON.stringify({ operation: "create"}),
            });
            console.log(createResonse, "Digging deep");
            if (createResonse.ok) {
                // Check the response content-type
                const contentType = createResonse.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    // Handle the non-JSON responses
                    const text = await createResonse.text();
                    console.log('Response:', text);
                }
            } else {
                // Handle the error
                console.error('Error creating DID:', createResonse)
            }
            const didCreationResult = await createResonse.json()
            const { DID, privateKey } = didCreationResult;

            // Regiter the DID on the Polygon ledger
            const registerResponse = await fetch("/api/did", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ operation: "register", did: DID, privateKey }),
            });
            const { txHash } = await registerResponse.json(); 
            console.log('DID registeration transaction hash:', txHash);

            setUserDID(DID);
        } catch (error) {
            setIsSendingTx('errorDID')
            console.error('Login error:', error);
        }
        setIsCreatingDID(false)
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-pink-900'>
            <div className='max-w-md w-full px-6 py-8 bg-gray-200 rounded-lg shadow-md'>
                <div className='mb-6 text-center'>
                    <FaUserCircle className='mx-auto text-6xl text-gray-500'/>
                    <h4 className='mt-4 text-2xl font-bold text-gray-800'>
                        Login
                    </h4>
                </div>
                <button className='w-full py-2 px-4 bg-purple-800 text-black font-semibold
                rounded-lg hover:bg-blue-900 transition duration-duration-400' onClick={handleLogin} disabled={isSendingTx === 'creatingDID' &&
                isCreatingDID}>
                     {isCreatingDID && <LoadingDID message="Creating DID with the smart contract..."/>}
                    Login with DID
                </button>
                {userDID && (
                    <div className='mt-4 prose'>
                        <p>Your DID: {userDID}</p>
                    </div>
                )}
            </div>
        </div>
    )
}    
export default Login