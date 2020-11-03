import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function method(req: NextApiRequest, res: NextApiResponse){
    const id = Number(req.query.id);

    const result = await prisma.champions.findOne({
        where: {id: id}
    });

    res.json(result);
    res.end();

    console.log("champions/:id with id", id);
};