import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function main(req: NextApiRequest, res: NextApiResponse){
    const id = Number(req.query.wId);

    const result = await prisma.waywins.findOne({
        where: {id: Number(id)}
    });
    
    res.json(result);
    res.end();
    
    console.log("waywins/:id with id", id);
};