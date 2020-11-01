import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function method(req: NextApiRequest, res: NextApiResponse){
    const id = req.query.id;

    const result = await prisma.matches.findOne({
        where: {id: Number(id)}
    });
    res.json(result);

    console.log("matches/getById with id", id);
};