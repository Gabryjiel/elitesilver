import { useRouter } from 'next/router';
import React from 'react';

import Template from '../../../src/components/style/Template';
import TournamentTabs from '../../../src/components/tournaments/TournamentTabs';
import Footer from '../../../src/components/utils/Footer';

export default function brackets({data, id}: Props){

    const router = useRouter();

    const goTo = (path: string) => {
        router.push(path);
    }

    const footerData = {
        first: {text: 'Schemat'},
        second: {text: 'data.title', href: `/tournaments/${id}`},
        third: {text: ''},
        tabs: [
            {text: 'Info', href: `/tournaments/${id}`}, 
            {text: 'Schemat'},
            {text: 'Mecze', href: `/tournaments/${id}/matches`},
            {text: 'Uczestnicy', href: `/tournaments/${id}/participants`}
        ]
    }

    return(
        <Template>
            {JSON.stringify(data)}
            <Footer data={footerData} goTo={goTo}/>
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