import { useRouter } from 'next/router';
import React from 'react';

import Template from '../../../src/components/style/Template';
import TournamentTabs from '../../../src/components/tournaments/TournamentTabs';

export default function participantsTable({participants, id}: Props){

    const router = useRouter();
    const classes = ['trophy-gold', 'trophy-silver', 'trophy-bronze'];

    const goTo = (path: string) => {
        router.push(path);
    }

    return(
        <Template>
            <TournamentTabs path={router.asPath} goTo={goTo} id={id}/>

            <div id="participants" className="table-container">
                <div className="table-header">
                    <span className="table-row-flexed">Uczestnik</span>
                    <span>Ranga</span>
                    <span>Miejsce</span>
                </div>
                <div className="table-body">
                    {participants.map((participant, idx) => {

                        return(
                            <div onClick={() => goTo(`/participants/${participant.id}`)} className="table-row" key={participant.name}>
                                <div className="table-row-flexed table-element">
                                    <span className="table-hoverable">{participant.name}</span>
                                </div>
                                <div className="table-element">
                                    <span>{participant.stage}</span>
                                </div>
                                <div className="table-element">
                                    <span className={classes[idx]}>{participant.place}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Template>
    )
}

export async function getStaticPaths(){
    const res: Array<any> = await (await fetch('http://localhost:3001/api/tournaments')).json();
    const paths = res.map(tournament => `/tournaments/${tournament.id.toString()}/participants`);
    return { paths, fallback: false};
}

export async function getStaticProps({params}:any): Promise<any>{
  const res = await (await fetch(`http://localhost:3001/api/tournaments/${params.tId}/participants`)).json();

  return{
    props: {
        participants: res,
        id: params.tId
    }
  }
}

type Props = {
    participants: Array<any>,
    id: number
}