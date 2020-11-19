import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function main(req: NextApiRequest, res: NextApiResponse){
    const result = await prisma.tournaments.findMany({
        include: {
            matches: {
                include: {
                    matches_players: true
                }
            }
        },
        orderBy: {
            id: 'asc'
        }
    });

    type Props = {
        id: number,
        name: string,
        startDate: string,
        endDate?: string,
        noOfMatches: number,
        noOfPlayers: number
    };

    const response: Array<Props> = result.map(({id, name, startDate, endDate, matches}) => ({
        id: id,
        name: name,
        startDate: startDate?.toISOString().slice(0,10).split('-').reverse().join('.'),
        endDate: endDate?.toISOString().slice(0,10).split('-').reverse().join('.'),
        noOfMatches: matches.length,
        noOfPlayers: matches.map(item => item.matches_players.map(item => item.playerId)).flat().filter((v, i, a) => a.indexOf(v) === i).length
    }))

    res.json(response);

    console.log('tournaments');
};