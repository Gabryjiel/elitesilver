import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function method(req: NextApiRequest, res: NextApiResponse){
    const tId = req.query.id;

    const result = await prisma.matches.findMany({
        select: {participants_matches_player1IdToparticipants: true, participants_matches_player2IdToparticipants: true},
        where: {tournamentId: Number(tId)},
        distinct: ['player1Id', 'player2Id']
    });

    console.log(result)
    res.json(result);

    console.log("Tournaments: getParticipants with id", tId);
};