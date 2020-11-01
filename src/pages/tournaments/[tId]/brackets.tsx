import React from 'react';
import { connect } from 'react-redux';
import { wrapper } from '../../../redux/store';

import Footer from '../../../components/footer/Footer';
import { TournamentTabs } from '../../../components/footer/FooterTabsDefinitions';

import * as FooterActions from '../../../redux/actions/footerActions';
import * as TournamentPanelActions from '../../../redux/actions/tournamentPanelActions';

import AppContainer from '../../../components/style/AppContainer';
import TournamentPanel from '../../../components/tournaments/TournamentPanel';
import fetcher from '../../../utilities/fetcher';

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
    const result: Array<any> = await fetcher('tournaments/getAll');
    const paths = result.map(item => `/tournaments/${item.id.toString()}/brackets`);
    return { paths, fallback: true};
}

export const getStaticProps = wrapper.getStaticProps(async ({store, params}:any) => {
    const res = await (await fetch(`http://localhost:3001/api/tournaments/${params.tId}/brackets`)).json();
    const tournamentInfo = await fetcher(`tournaments/getById?id=${params.tId}`);

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
        },
        revalidate: 1
    }
});

type Props = {
    data: Array<any>,
    id: number,
    tournamentPanelData: any
}

export default connect()(brackets);