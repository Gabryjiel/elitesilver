import React from 'react';
import { connect } from 'react-redux';
import { wrapper } from '../../../redux/store';

import Footer from '../../../components/footer/Footer';

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
    const result: Array<any> = await fetcher('tournaments');
    const paths = result.map(item => `/tournaments/${item.id}/brackets`);

    return { paths, fallback: true};
}

export const getStaticProps = wrapper.getStaticProps(async ({store, params}:any) => {
    const id = params.tId;

    const res = await fetcher(`tournaments/${id}`);
    const tournamentInfo = await fetcher(`tournaments/${id}`);

    const footerActions = await import('../../../redux/actions/footerActions');
    const tournamentPanel = await import('../../../redux/actions/tournamentPanelActions');
    const TournamentTabs = await import('../../../components/footer/FooterTabsDefinitions');

    store.dispatch(footerActions.setFooter({
        title: {content: 'Schemat', href: ''},
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

    return{
        props: {
            data: res,
            id: id
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