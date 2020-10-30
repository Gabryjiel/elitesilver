import { useRouter } from 'next/router';
import React from 'react';
import { connect } from 'react-redux';
import { wrapper } from '../../../redux/store';

import { TournamentTabs } from '../../../components/footer/FooterTabsDefinitions';

import * as FooterActions from '../../../redux/actions/footerActions'
import * as TournamentPanelActions from '../../../redux/actions/tournamentPanelActions';

import AppContainer from '../../../components/style/AppContainer';
import TournamentPanel from '../../../components/tournaments/TournamentPanel';
import Footer from '../../../components/footer/Footer';

function participants({participants, id}: Props){

    const router = useRouter();
    const classes = ['trophy-gold', 'trophy-silver', 'trophy-bronze'];

    const goTo = (path: string) => {
        router.push(path);
    }

    return(
        <AppContainer>

            <TournamentPanel />

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

            <Footer />

        </AppContainer>
    )
}

export async function getStaticPaths(){
    const res: Array<any> = await (await fetch('http://localhost:3001/api/tournaments')).json();
    const paths = res.map(tournament => `/tournaments/${tournament.id.toString()}/participants`);
    return { paths, fallback: false};
}

export const getStaticProps = wrapper.getStaticProps(async ({store, params}:any) => {
    const res = await (await fetch(`http://localhost:3001/api/tournaments/${params.tId}/participants`)).json();

    const tournamentInfo = await (await fetch(`http://localhost:3001/api/tournaments/${params.tId}`)).json();

    store.dispatch(FooterActions.setTitle({content: 'Uczestnicy' , href: ''}));
    store.dispatch(FooterActions.setSubtitle({content: tournamentInfo.name , href: `/tournaments/${tournamentInfo.id}`}));
    store.dispatch(FooterActions.setDescription({content: 'Turnieje', href: '/tournaments'}))
    store.dispatch(FooterActions.setTabs(TournamentTabs(params.tId)));

    //store.dispatch(TournamentPanelActions.setImagePath(''));
    store.dispatch(TournamentPanelActions.setTitle(tournamentInfo.name));
    store.dispatch(TournamentPanelActions.setFirstPlace('Firster'));
    store.dispatch(TournamentPanelActions.setSecondPlace('Seconder'));
    store.dispatch(TournamentPanelActions.setThirdPlace('Thirder'));

    return{
        props: {
            participants: res,
            id: params.tId
        }
    }
})

type Props = {
    participants: Array<any>,
    id: number
}

export default connect()(participants);