import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function main(req: NextApiRequest, res: NextApiResponse){
    const id = Number(req.query.tId);

    const tournaments = await prisma.tournaments.findOne({
        where: {id: Number(id)}
    });
    //res.json(tournaments);

    const t = await prisma.matches.findMany({
        include: {matches_players: {select: {player: true}}},
        where: {tournamentId: id}
    })
    res.json(t[0].matches_players.map(player => player.player));

    console.log("tournaments/:id with id", id);
};