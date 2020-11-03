import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';
import bool2bin from '../../../utilities/bool2bin';

const prisma = new PrismaClient();

export default async function method(req: NextApiRequest, res: NextApiResponse){
    const result = await prisma.matches.findMany({
        include: {
            stage: true,
            waywin: true,
            bans: {
                include: {
                    champion: true,
                    player: true
                }
            },
            matches_players: {
                include: {
                    champion: true,
                    player: true
                }
            }
        },
        orderBy: {
            id: 'asc'
        }
    });

    const response = result.map(item => ({
        id: item.id,
        player1: {
            id: item.matches_players[0].playerId,
            name: item.matches_players[0].player.name,
            score: bool2bin(item.winningSide === item.matches_players[0].side),
            champion: item.matches_players[0].champion,
            bans: item.bans.filter(ban => ban.playerId === item.matches_players[0].playerId).map(ban => ban.champion)
        },
        player2: {
            id: item.matches_players[1].playerId,
            name: item.matches_players[1].player.name,
            score: bool2bin(item.winningSide === item.matches_players[1].side),
            champion: item.matches_players[1].champion,
            bans: item.bans.filter(ban => ban.playerId === item.matches_players[1].playerId).map(ban => ban.champion)
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

    console.log("matches");
};