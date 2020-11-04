import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

function uniqueArray(array: Array<any>, property: string){
    let t:any = {};
    return array.filter(element => !(t[element[property]] = element[property] in t))
}

const prisma = new PrismaClient();

export default async function main(req: NextApiRequest, res: NextApiResponse){
    const id = Number(req.query.tId);

    const matches = await prisma.matches.findMany({
        include: {
            matches_players: {
                include: {
                    player: {
                        include: {
                            rank: true
                        }
                    }
                }
            }
        },
        where: {tournamentId: id},
        orderBy: {
            id: 'asc'
        }
    })

    const map = matches.map(match => match.matches_players).flat().map(player => player.player);
    const unique = uniqueArray(map, 'id')

    res.json(unique);
    res.end();

    console.log("tournaments/:id/participants with id", id);
};