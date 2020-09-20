import { useRouter } from 'next/router';
import React from 'react';

import Template from '../../../src/components/style/Template';
import TournamentTabs from '../../../src/components/tournaments/TournamentTabs';

export default function brackets({data, id}: Props){

    const router = useRouter();

    const goTo = (path: string) => {
        router.push(path);
    }

    return(
        <Template>
            <TournamentTabs path={router.asPath} goTo={goTo} id={id}/>
            {JSON.stringify(data)}
        </Template>
    )
}

export async function getStaticPaths(){
    const res: Array<any> = await (await fetch('http://localhost:3001/api/tournaments')).json();
    const paths = res.map(tournament => `/tournaments/${tournament.id.toString()}/brackets`);
    return { paths, fallback: false};
}

export async function getStaticProps({params}:any): Promise<any>{
  const res = await (await fetch(`http://localhost:3001/api/tournaments/${params.tId}/brackets`)).json();

  return{
    props: {
        data: res,
        id: params.tId
    }
  }
}

type Props = {
    data: Array<any>,
    id: number
}