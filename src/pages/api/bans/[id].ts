import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function method(req: NextApiRequest, res: NextApiResponse){
    const id  = Number(req.query.id);

    const result = await prisma.bans.findMany({
        where: {matchId: id}
    });
    res.json(result);

    console.log("bans/:id with id", id);
};