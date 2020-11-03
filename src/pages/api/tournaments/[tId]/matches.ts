import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';
import bool2bin from '../../../../utilities/bool2bin';

const prisma = new PrismaClient();

const groupBy = (array: Array<any>, keyGetter: (item: any) => any) => {
    const map = new Map();
    array.forEach(item => {
        const key = keyGetter(item);
        const collection = map.get(key);

        if (!collection) {
            map.set(key, item);
        } else {
            if  (collection.player1.id === item.player1.id) {
                collection.player1.score += item.player1.score;
                collection.player2.score += item.player2.score;
            } else {
                collection.player1.score += item.player2.score;
                collection.player2.score += item.player1.score;
            }

            collection.waywin = [collection.waywin, item.waywin];
            map.set(key, collection);
        }
    })

    return map;
}

export default async function main(req: NextApiRequest, res: NextApiResponse){
    const id = req.query.tId;

    const result = await prisma.matches.findMany({
        include: {
            matches_players: {
                include: {
                    player: true
                }
            },
            waywin: true,
            stage: true
        },
        where: {tournamentId: Number(id)},
        orderBy: {
            id: 'asc'
        }
    });

    const response = result.map(item => ({
        id: item.id,
        player1: {
            id: item.matches_players[0].playerId,
            name: item.matches_players[0].player.name,
            score: bool2bin(item.winningSide === item.matches_players[0].side)
        },
        player2: {
            id: item.matches_players[1].playerId,
            name: item.matches_players[1].player.name,
            score: bool2bin(item.winningSide === item.matches_players[1].side)
        },
        waywin: {
            id: item.waywinId,
            name: item.waywin.name,
        },
        stage: {
            id: item.stageId,
            name: item.stage.name
        }
    }))

    res.json(response);
    res.end();

    console.log("tournaments/:id/matches with id", id);
};