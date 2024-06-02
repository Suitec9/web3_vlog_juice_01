import type { NextApiRequest, NextApiResponse } from "next";
import { createDID, registerDID } from '@ayanworks/polygon-did-registrar';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Content-Type', 'application/json');
    const { method, body } = req;

    switch(method) {
        case 'POST':
            try {
                const { operation, privateKey, url } = body;

                if (operation ===  "create") {

                    const result = await createDID("polygon-mainnet | polygon-amoy-testnet", privateKey);
                    res.status(200).json(result);
                } else if (operation === "register") {
                    const { did } = body;
                    const txHash = await registerDID(did, privateKey, url);
                    res.status(200).json({ txHash });
                } else {
                    res.status(400).json({ error: 'Invalid operation'});
                }
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error'});
            }
            break;
            default:
                res.setHeader('Allow', ['POST']);
                res.status(405).json({error:`Method ${method} Not Allowed`});
    }
}

export const config = {
    api: {
        bodyParser: true,
    },
};