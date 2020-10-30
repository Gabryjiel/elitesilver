import React from 'react';
import { connect } from 'react-redux';
import { wrapper } from '../../../src/redux/store';

import { TournamentTabs } from '../../../src/components/footer/FooterTabsDefinitions';

import * as FooterActions from '../../../src/redux/actions/footerActions'
import * as TournamentPanelActions from '../../../src/redux/actions/tournamentPanelActions';

import AppContainer from '../../../src/components/style/AppContainer';
import TournamentPanel from '../../../src/components/tournaments/TournamentPanel';
import Footer from '../../../src/components/footer/Footer';

function Tournaments({data, id}: Props) {

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

    return { paths, fallback: false };
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
        }
    }
});

type Props = {
  data: any,
  id: number
}