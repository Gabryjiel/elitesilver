import React, { MouseEvent } from 'react';
import { connect } from 'react-redux';
import { wrapper } from '../../redux/store';

import * as FooterActions from '../../redux/actions/footerActions'
import { TournamentIndex } from '../../components/footer/FooterTabsDefinitions';

import Footer from "../../components/footer/Footer";
import AppContainer from "../../components/style/AppContainer";
import Table from '../../components/utils/Table';
import { useRouter } from 'next/router';
import fetcher from '../../utilities/fetcher';
import ChampionsList from '../../components/champions/ChampionsList';

function ChampionsIndex({data}: Props){

    const router = useRouter();

    const goTo = (path: string, event?: MouseEvent) => {
        event?.stopPropagation();
        router.push(path);
    };

    return(
        <AppContainer>
            {/* <Table goTo={goTo} /> */}
            <ChampionsList data={data} />
            <Footer />
        </AppContainer>
    )
}

export default connect()(ChampionsIndex);

export const getStaticProps =  wrapper.getStaticProps( async ({store, params}:any) => {
    const result: Array<any> = await fetcher('champions');

    const tableActions = await import('../../redux/actions/tableActions');
    const footerActions = await import('../../redux/actions/footerActions');

    store.dispatch(footerActions.setFooter({
        title: {content: ' ', href: ''},
        subtitle: {content: 'Postacie', href: ''},
        description: {content: 'Przeglądaj', href: ''},
        tabs: TournamentIndex
    }))

    // const rows = result.map(({id, name, avatar, profile, splash}) => ({
    //     content: [id, name, avatar],
    //     href: `champions/${id}`
    // }))

    // store.dispatch(tableActions.setTable({
    //     headers: ['Id', 'Nazwa', 'Avatar'],
    //     rows: rows
    // }))

    return{
      props: {
        data: result
      }
    }
});

type Props = {
    data: Array<any>
}