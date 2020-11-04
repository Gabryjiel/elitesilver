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
import fetcher from '../../../utilities/fetcher';

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
    const result: Array<any> = await fetcher('tournaments');
    const paths = result.map(item => `/tournaments/${item.id.toString()}/brackets`);
    return { paths, fallback: false};
}

export const getStaticProps = wrapper.getStaticProps(async ({store, params}:any) => {
    const { id } = params;

    const res = await fetcher(`tournaments/${id}/participants`);
    const tournamentInfo = await fetcher(`tournaments/${id}`);

    store.dispatch(FooterActions.setTitle({content: 'Uczestnicy' , href: ''}));
    store.dispatch(FooterActions.setSubtitle({content: tournamentInfo.name , href: `/tournaments/${tournamentInfo.id}`}));
    store.dispatch(FooterActions.setDescription({content: 'Turnieje', href: '/tournaments'}))
    store.dispatch(FooterActions.setTabs(TournamentTabs(id)));

    //store.dispatch(TournamentPanelActions.setImagePath(''));
    store.dispatch(TournamentPanelActions.setTitle(tournamentInfo.name));
    store.dispatch(TournamentPanelActions.setFirstPlace('Firster'));
    store.dispatch(TournamentPanelActions.setSecondPlace('Seconder'));
    store.dispatch(TournamentPanelActions.setThirdPlace('Thirder'));

    return{
        props: {
            participants: res,
            id: id
        }
    }
})

type Props = {
    participants: Array<any>,
    id: number
}

export default connect()(participants);