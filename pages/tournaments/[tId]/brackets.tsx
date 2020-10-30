import React from 'react';
import { connect } from 'react-redux';
import { wrapper } from '../../../src/redux/store';

import Footer from '../../../src/components/footer/Footer';
import { TournamentTabs } from '../../../src/components/footer/FooterTabsDefinitions';

import * as FooterActions from '../../../src/redux/actions/footerActions';
import * as TournamentPanelActions from '../../../src/redux/actions/tournamentPanelActions';

import AppContainer from '../../../src/components/style/AppContainer';
import TournamentPanel from '../../../src/components/tournaments/TournamentPanel';

function brackets({data, tournamentPanelData, id}: Props){

    return(
        <AppContainer>
            <TournamentPanel />
            {JSON.stringify(data)}
            <Footer />
        </AppContainer>
    )
}

export async function getStaticPaths(){
    const res: Array<any> = await (await fetch('http://localhost:3001/api/tournaments')).json();
    const paths = res.map(tournament => `/tournaments/${tournament.id.toString()}/brackets`);
    return { paths, fallback: false};
}

export const getStaticProps = wrapper.getStaticProps(async ({store, params}:any) => {
    const res = await (await fetch(`http://localhost:3001/api/tournaments/${params.tId}/brackets`)).json();
    const tournamentInfo = await (await fetch(`http://localhost:3001/api/tournaments/${params.tId}`)).json();

    store.dispatch(FooterActions.setTitle({content: 'Schemat' , href: ''}));
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
            data: res,
            id: params.tId
        }
    }
});

type Props = {
    data: Array<any>,
    id: number,
    tournamentPanelData: any
}

export default connect()(brackets);