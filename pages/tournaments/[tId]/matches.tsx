import { useRouter } from 'next/router';
import React from 'react';

import Template from '../../../src/components/style/Template';
import Footer from '../../../src/components/utils/Footer';

export default function matchesTable({matches, id}: Props){

    const router = useRouter();

    const goTo = (path: string, event?: React.MouseEvent) => {
        event?.stopPropagation();
        router.push(path);
    }

    const footerData = {
        first: {text: 'Mecze'},
        second: {text: 'data.title', href: `/tournaments/${id}`},
        third: {text: ''},
        tabs: [
            {text: 'Info', href: `/tournaments/${id}`}, 
            {text: 'Schemat', href: `/tournaments/${id}/brackets`},
            {text: 'Mecze'},
            {text: 'Uczestnicy', href: `/tournaments/${id}/participants`}
        ]
    }

    return(
        <Template>

            <div id="matches" className="table-container">
                <div className="table-header">
                    <span className="table-row-flexed">Zwycięzca</span>
                    <span className="table-row-flexed">Przegrany</span>
                    <span>Wynik</span>
                    <span>Faza</span>
                </div>
                <div className="table-body">
                    {matches.map(match => {
                        return(
                            <div className="table-row" key={`${match.player1} vs ${match.player2} in ${match.stage}`} onClick={(event) => goTo(`/matches/${match.id}`, event)}>
                                <div className="table-element table-row-flexed">
                                    <span onClick={(event) => goTo(`/participants/${match.player1id}`, event)} className="table-hoverable">{match.player1}</span>
                                </div>
                                <div className="table-element table-row-flexed">
                                    <span onClick={(event) => goTo(`/participants/${match.player1id}`, event)} className="table-hoverable">{match.player2}</span>
                                </div>
                                <div className="table-element">
                                    <span>{`${match.p1score} : ${match.p2score}`}</span>
                                </div>
                                <div className="table-element">
                                    <span>{match.stage}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <Footer data={footerData} goTo={goTo}/>
        </Template>
    )
}

export async function getStaticPaths(){
    const res: Array<any> = await (await fetch('http://localhost:3001/api/tournaments')).json();
    const paths = res.map(tournament => `/tournaments/${tournament.id.toString()}/matches`);
    return { paths, fallback: false};
}

export async function getStaticProps({params}:any): Promise<any>{
  const res = await (await fetch(`http://localhost:3001/api/tournaments/${params.tId}/matches`)).json();

  return{
    props: {
        matches: res,
        id: params.tId
    }
  }
}

type Props = {
    matches: Array<any>,
    id: number
}