import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function method(req: NextApiRequest, res: NextApiResponse){
    const result = await prisma.matchesbans.findMany();
    res.json(result);

    console.log("matchesbans/getAll");
};