import { connect } from 'react-redux';
import { wrapper } from '../src/redux/store';
import * as FooterActions from '../src/redux/actions/footerActions'

import Footer from '../src/components/footer/Footer';
import AppContainer from '../src/components/style/AppContainer';

function Home() {
    return (
        <AppContainer>
            <Footer />
        </AppContainer>
    )
}

export default connect()(Home);

export const getStaticProps =  wrapper.getStaticProps( async ({store, params}:any) => {

    store.dispatch(FooterActions.setTitle({content: '' , href: ''}));
    store.dispatch(FooterActions.setSubtitle({content: '' , href: ``}));
    store.dispatch(FooterActions.setDescription({content: '' , href: ``}));
    store.dispatch(FooterActions.setTabs([]));

    return;
});
