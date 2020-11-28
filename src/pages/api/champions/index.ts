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
        bans: item.bans.length,
        splash: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${item.name}_0.jpg`,
        profile: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${item.name}_0.jpg`,
        avatar: `http://ddragon.leagueoflegends.com/cdn/10.24.1/img/champion/${item.name}.png`
    })).sort((a, b) => a.name > b.name ? 1 : -1);

    res.json(response);
    res.end();

    console.log("champions");
};