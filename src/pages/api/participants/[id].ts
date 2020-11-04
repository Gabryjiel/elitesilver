import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';
import bool2bin from '../../../utilities/bool2bin';

const prisma = new PrismaClient();

export default async function method(req: NextApiRequest, res: NextApiResponse){
    const id = Number(req.query.id);

    const result = await prisma.users.findOne({
        include: {
            players: {
                include: {
                    rank: true,
                    matches_players: {
                        include: {
                            champion: true
                        }
                    }
                }
            }
        },
        where: {
            id: id
        }
    });

    const response = {
        id: result?.id,
        name: result?.name,
        rank: result?.players[0].rank,
        champions: result?.players[0].matches_players.map(match => match.champion)
    }

    res.json(response);
    res.end();

    console.log("participants/:id with id", id);
};