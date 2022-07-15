import axios from "axios";

export const webhooks = axios.create({
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type, Accept',
        'Authorization': process.env.WEBHOOKS_TOKEN
    },
    baseURL: process.env.NEXT_PUBLIC_WEBHOOKS_URL,
});
