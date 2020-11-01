import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function method(req: NextApiRequest, res: NextApiResponse){
    const tournaments = await prisma.tournaments.findMany();
    res.json(tournaments);

    console.log("Tournaments: getAll");
};