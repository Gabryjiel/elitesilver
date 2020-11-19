import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function method(req: NextApiRequest, res: NextApiResponse){
    const result = await prisma.champions.findMany({
        include: {
            matches_players: {
                include: {
                    match: true
                }
            },
            bans: true
        }
    });

    const response: any = result.map(item => ({
        id: item.id,
        name: item.name,
        picks: item.matches_players.length,
        wins: item.matches_players.filter(match => match.side = match.match.winningSide).length,
        bans: item.bans.length
    })).sort((a, b) => a.name > b.name ? 1 : -1);

    res.json(response);
    res.end();

    console.log("champions");
};