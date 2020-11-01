import { connect } from 'react-redux';
import { wrapper } from '../redux/store';
import * as FooterActions from '../redux/actions/footerActions'

import Footer from '../components/footer/Footer';
import AppContainer from '../components/style/AppContainer';

function Home() {
    return (
        <AppContainer>
            <Footer />
        </AppContainer>
    )
}

export default connect()(Home);

export const getStaticProps =  wrapper.getStaticProps( async ({store, params}:any) => {

    const fetched = await fetch('http://localhost:3000/api/tournaments/getAll');
    const payload = await fetched.json();

    store.dispatch(FooterActions.setTitle({content: '' , href: ''}));
    store.dispatch(FooterActions.setSubtitle({content: '' , href: ``}));
    store.dispatch(FooterActions.setDescription({content: '' , href: ``}));
    store.dispatch(FooterActions.setTabs([]));

    return;
});
