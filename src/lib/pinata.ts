'server only';

import { PinataSDK } from 'pinata';

const pinata = new PinataSDK({
    pinataJwt: `${process.env.PINATA_JWT_TOKEN}`,
    pinataGateway: `${process.env.NEXT_PUBLIC_PINATA_GATEWAY_DOMAIN}`
});

export default pinata;
