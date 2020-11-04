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
import Table from '../../../components/utils/Table';

function participants({participants, id}: Props){

    const router = useRouter();
    const classes = ['trophy-gold', 'trophy-silver', 'trophy-bronze'];

    const goTo = (path: string) => {
        router.push(path);
    }

    return(
        <AppContainer>

            <TournamentPanel />
            <Table goTo={goTo} />

            {/* <div id="participants" className="table-container">
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
            </div> */}

            <Footer />

        </AppContainer>
    )
}

export async function getStaticPaths(){
    const result: Array<any> = await fetcher('tournaments');
    const paths = result.map(item => `/tournaments/${item.id}/participants`);

    return { paths, fallback: true};
}

export const getStaticProps = wrapper.getStaticProps(async ({store, params}:any) => {
    const id = params.tId;

    const result: Array<any> = await fetcher(`tournaments/${id}/participants`);
    const tournamentInfo = await fetcher(`tournaments/${id}`);

    const tableActions = await import('../../../redux/actions/tableActions');
    const footerActions = await import('../../../redux/actions/footerActions');
    const tournamentPanel = await import('../../../redux/actions/tournamentPanelActions');
    const TournamentTabs = await import('../../../components/footer/FooterTabsDefinitions');

    store.dispatch(footerActions.setFooter({
        title: {content: 'Uczestnicy', href: ''},
        subtitle: {content: tournamentInfo.name, href: `/tournaments/${tournamentInfo.id}`},
        description: {content: 'Turnieje', href: '/tournaments'},
        tabs: TournamentTabs.TournamentTabs(id)
    }))

    //store.dispatch(TournamentPanelActions.setImagePath(''));
    store.dispatch(tournamentPanel.setTournamentPanel({
        title: tournamentInfo.name,
        firstPlace: 'Firster',
        secondPlace: 'Seconder',
        thirdPlace: 'Thirder'
    }))

    const rows = result.map(({id, name, rank, userId}) => ({
        content: [userId, name, rank?.name],
        href: `/users/${id}`
    }))

    store.dispatch(tableActions.setTable({
        headers: ['Id', 'Pseudonim', 'Ranga'],
        rows: rows
    }))
    
    return{
        props: {
            participants: rows,
            id: id
        }
    }
})

type Props = {
    participants: Array<any>,
    id: number
}

export default connect()(participants);