import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';
import bool2bin from '../../../utilities/bool2bin';

const prisma = new PrismaClient();

export default async function method(req: NextApiRequest, res: NextApiResponse){
    
    const result = await prisma.users.findMany({
        include: {
            players: {
                include: {
                    rank: true,
                    matches_players: {
                        include: {
                            champion: true,
                            match: true
                        }
                    }
                }
            }
        }
    });

    const response = result.map(item => ({
        id: item?.id,
        name: item?.name,
        rank: item?.players[0].rank?.name,
        champions: item?.players[0].matches_players.map(match => match.champion),
        noOfMatches: item?.players[0].matches_players.length,
        matches: item?.players[0].matches_players,
        noOfWins: item?.players[0].matches_players.filter((match) => match.side === match.match.winningSide).length
    }));

    res.json(response);
    res.end();

    console.log("participants");
};