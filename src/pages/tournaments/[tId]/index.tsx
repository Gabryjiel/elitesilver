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
import fetcher from '../../../utilities/fetcher';

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
    const result: Array<any> = await fetcher('tournaments ');
    const paths = result.map(item => `/tournaments/${item.id.toString()}/brackets`);
    return { paths, fallback: true};
}

export const getStaticProps = wrapper.getStaticProps(async ({store, params}:any) => {
    const { id } = params;

    const res = await fetcher(`tournaments/${id}/brackets`);
    const tournamentInfo = await fetcher(`tournaments/${id}`);

    store.dispatch(FooterActions.setTitle({content: 'Info' , href: ''}));
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
            data: res,
            id: id
        },
        revalidate: 1
    }
});

type Props = {
  data: any,
  id: number
}