import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function method(req: NextApiRequest, res: NextApiResponse){
    const { gId, pId }  = req.query;

    const result = await prisma.matchban.findOne({
        where: {gameId_championId: {gameId: Number(gId), championId: Number(pId)}}
    });
    res.json(result);

    console.log("matchesbans/getById with id", gId, pId);
};