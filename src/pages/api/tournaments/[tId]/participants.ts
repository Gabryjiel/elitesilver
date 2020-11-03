import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

function uniqueArray(array: Array<any>, property: string){
    let t:any = {};
    return array.filter(element => !(t[element[property]] = element[property] in t))
}

const prisma = new PrismaClient();

export default async function main(req: NextApiRequest, res: NextApiResponse){
    const id = req.query.tId;

    const tournaments = await prisma.matches.findMany({
        select: {
            p1Participants: {
                select: {
                    id: true, 
                    name: true
                }
            },
            p2Participants: {
                select: {
                    id: true,
                    name: true
                }
            }
        },
        where: {
            tournamentId: Number(id)
        }
    });

    const map = tournaments.map(match => [match.p1Participants, match.p2Participants]).flat();
    res.json(uniqueArray(map, 'name'));

    console.log("tournaments/:id/participants with id", id);
};