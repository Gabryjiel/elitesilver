import React from 'react';
import { connect } from 'react-redux';
import { wrapper } from '../../../redux/store';
import { useRouter } from 'next/router';

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
    const result: Array<any> = await fetcher('tournaments');
    const paths = result.map(item => `/tournaments/${item.id}`);

    return { paths, fallback: true};
}

export const getStaticProps = wrapper.getStaticProps(async ({store, params}:any) => {
    const id = params.tId;

    const tournamentInfo = await fetcher(`tournaments/${id}`);

    const footerActions = await import('../../../redux/actions/footerActions');
    const tournamentPanel = await import('../../../redux/actions/tournamentPanelActions');
    const TournamentTabs = await import('../../../components/footer/FooterTabsDefinitions');

    store.dispatch(footerActions.setFooter({
        title: {content: 'Info', href: ''},
        subtitle: {content: tournamentInfo.name, href: ''},
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
            data: tournamentInfo,
            id: id
        },
        revalidate: 1
    }
});

type Props = {
  data: any,
  id: number
}