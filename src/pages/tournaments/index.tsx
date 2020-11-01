import { connect } from 'react-redux';
import { wrapper } from '../../redux/store';
import * as FooterActions from '../../redux/actions/footerActions'

import Footer from '../../components/footer/Footer';
import AppContainer from '../../components/style/AppContainer';
import TournamentsList from '../../components/tournaments/TournamentsList';

import { TournamentIndex } from '../../components/footer/FooterTabsDefinitions';
import fetcher from '../../utilities/fetcher';

function Tournaments({data}: Props){

    return(
        <AppContainer>
            <TournamentsList data={data}/>

            <Footer />
        </AppContainer>
    )
}

export default connect()(Tournaments);

export const getStaticProps =  wrapper.getStaticProps( async ({store, params}:any) => {
    const result = await fetcher('tournaments/getAll');

    store.dispatch(FooterActions.setTitle({content: ' ' , href: ''}));
    store.dispatch(FooterActions.setSubtitle({content: 'Turnieje' , href: ``}));
    store.dispatch(FooterActions.setDescription({content: 'Przeglądaj' , href: ''}));
    store.dispatch(FooterActions.setTabs(TournamentIndex));

    return{
      props: {
        data: result
      },
      revalidate: 1
    }
});

type Props = {
    data: any
}