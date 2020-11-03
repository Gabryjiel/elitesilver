import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function main(req: NextApiRequest, res: NextApiResponse){
    const id = req.query.tId;

    const tournaments = await prisma.matches.findMany({
        where: {tournamentId: Number(id)}
    });
    res.json(tournaments);

    console.log("tournaments/:id/matches with id", id);
};