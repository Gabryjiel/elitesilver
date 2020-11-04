import React from 'react';
import { connect } from 'react-redux';
import { wrapper } from '../../redux/store';

import * as FooterActions from '../../redux/actions/footerActions'
import { MatchesTabs } from '../../components/footer/FooterTabsDefinitions';

import AppContainer from '../../components/style/AppContainer';
import Footer from '../../components/footer/Footer';
import fetcher from '../../utilities/fetcher';

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
    const result: Array<any> = await fetcher('matches ');
    const paths = result.map(match => `/matches/${match.id.toString()}`);

    return { paths, fallback: false };
}

export const getStaticProps = wrapper.getStaticProps(async ({store, params}:any) => {
    const result = await fetcher(`matches/getById?id=${params.mId}`);

    store.dispatch(FooterActions.setTitle({content: `Sznifferek vs Fefurusek` , href: ''}));
    store.dispatch(FooterActions.setSubtitle({content: 'EliteSilver' , href: `/tournament/1`}));
    store.dispatch(FooterActions.setDescription({content: 'Ćwierćfinał' , href: ''}));
    store.dispatch(FooterActions.setTabs(MatchesTabs(params.tId,2)));

    return{
        props: {
            data: result,
            id: params.mId
        }
    }
});