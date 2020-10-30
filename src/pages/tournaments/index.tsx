import { connect } from 'react-redux';
import { wrapper } from '../../redux/store';
import * as FooterActions from '../../redux/actions/footerActions'

import Footer from '../../components/footer/Footer';
import AppContainer from '../../components/style/AppContainer';
import TournamentsList from '../../components/tournaments/TournamentsList';

import { TournamentIndex } from '../../components/footer/FooterTabsDefinitions';

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
    const res = await (await fetch(`http://localhost:3001/api/tournaments`)).json();

    store.dispatch(FooterActions.setTitle({content: ' ' , href: ''}));
    store.dispatch(FooterActions.setSubtitle({content: 'Turnieje' , href: ``}));
    store.dispatch(FooterActions.setDescription({content: 'Przeglądaj' , href: ''}));
    store.dispatch(FooterActions.setTabs(TournamentIndex));

    return{
      props: {
        data: res
      },
      revalidate: 1
    }
});

type Props = {
    data: any
}