import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function method(req: NextApiRequest, res: NextApiResponse){
    const id = Number(req.query.id);

    const result = await prisma.champions.findOne({
        where: {id: id}
    });

    const response = {
        id: result?.id,
        name: result?.name,
        splash: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${result?.name}_0.jpg`,
        profile: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${result?.name}_0.jpg`,
        avatar: `http://ddragon.leagueoflegends.com/cdn/10.24.1/img/champion/${result?.name}.png`
    }

    res.json(response);
    res.end();

    console.log("champions/:id with id", id);
};