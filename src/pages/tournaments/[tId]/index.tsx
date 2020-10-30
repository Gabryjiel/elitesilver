import React from 'react';
import { connect } from 'react-redux';
import { wrapper } from '../../../redux/store';
import { useRouter } from 'next/router';

import { TournamentTabs } from '../../../components/footer/FooterTabsDefinitions';

import * as FooterActions from '../../../redux/actions/footerActions'
import * as TournamentPanelActions from '../../../redux/actions/tournamentPanelActions';

import AppContainer from '../../../components/style/AppContainer';
import TournamentPanel from '../../../components/tournaments/TournamentPanel';
import Footer from '../../../components/footer/Footer';

function Tournaments({data, id}: Props) {

    const router = useRouter();

    if(router.isFallback) {
        return <div>Loading...</div>
    }

  data = {
      banner: "https://i.redd.it/is8khj2rkcn51.jpg",
      title: "Elite Silver",
      description: "HERE IS DESCRIPTION",
      first: "firster",
      second: 'seconder',
      third: 'thirder'
  }

    return(
        <AppContainer>
            <TournamentPanel />

            <div className=".tournament-container">
                <div className="tournament-description">
                    {data.description}
                </div>
            </div>

            <Footer />
        </AppContainer>
  )
}

export default connect()(Tournaments);

export async function getStaticPaths(){
    const res: Array<any> = await (await fetch('http://localhost:3001/api/tournaments')).json();
    const paths = res.map(tournament => `/tournaments/${tournament.id.toString()}`);

    return { paths, fallback: true };
}

export const getStaticProps = wrapper.getStaticProps(async ({store, params}:any) => {
    const res = await (await fetch(`http://localhost:3001/api/tournaments/${params.tId}/brackets`)).json();
    const tournamentInfo = await (await fetch(`http://localhost:3001/api/tournaments/${params.tId}`)).json();

    store.dispatch(FooterActions.setTitle({content: 'Info' , href: ''}));
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
  data: any,
  id: number
}