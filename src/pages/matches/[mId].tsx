import React from 'react';
import { connect } from 'react-redux';
import { wrapper } from '../../redux/store';

import * as FooterActions from '../../redux/actions/footerActions'
import { MatchesTabs } from '../../components/footer/FooterTabsDefinitions';

import AppContainer from '../../components/style/AppContainer';
import Footer from '../../components/footer/Footer';

function Match(){

    return(
        <AppContainer>
            MECZE
            <Footer />
        </AppContainer>
    );
}

export default connect()(Match);

export async function getStaticPaths(){
    const res: Array<any> = await (await fetch('http://localhost:3001/api/matches')).json();
    const paths = res.map(match => `/matches/${match.id.toString()}`);

    return { paths, fallback: false };
}

export const getStaticProps = wrapper.getStaticProps(async ({store, params}:any) => {
    const res = await (await fetch(`http://localhost:3001/api/matches/${params.mId}`)).json();
    const tournamentInfo = await (await fetch(`http://localhost:3001/api/tournaments/1`)).json();

    store.dispatch(FooterActions.setTitle({content: `Sznifferek vs Fefurusek` , href: ''}));
    store.dispatch(FooterActions.setSubtitle({content: 'EliteSilver' , href: `/tournament/1`}));
    store.dispatch(FooterActions.setDescription({content: 'Ćwierćfinał' , href: ''}));
    store.dispatch(FooterActions.setTabs(MatchesTabs(params.tId,2)));

    return{
        props: {
            data: res,
            id: params.mId
        }
    }
});