import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function method(req: NextApiRequest, res: NextApiResponse){
    const id = req.query.id;

    const tournaments = await prisma.tournaments.findOne({
        where: {id: Number(id)}
    });
    res.json(tournaments);

    console.log("Tournaments: getById with id", id);
};