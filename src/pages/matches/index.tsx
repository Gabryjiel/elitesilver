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

function MatchesIndex({data}: Props){

    const router = useRouter();

    const goTo = (path: string, event?: MouseEvent) => {
        event?.stopPropagation();
        router.push(path);
    };


    return(
        <AppContainer>
            <Table goTo={goTo} />
            <Footer />
        </AppContainer>
    )
}

export default connect()(MatchesIndex);

export const getStaticProps =  wrapper.getStaticProps( async ({store, params}:any) => {
    const result: Array<any> = await fetcher('matches');

    const tableActions = await import('../../redux/actions/tableActions');
    const footerActions = await import('../../redux/actions/footerActions');

    store.dispatch(footerActions.setFooter({
        title: {content: ' ', href: ''},
        subtitle: {content: 'Mecze', href: ''},
        description: {content: 'Przeglądaj', href: ''},
        tabs: TournamentIndex
    }))

    const rows = result.map(({id, player1, player2, waywin, stage}) => ({
        content: [id, stage?.name, player1?.name, player2?.name, `${player1?.score} : ${player2?.score}`, waywin?.name, player1?.champion?.name || null, player2?.champion?.name || null],
        href: `matches/${id}`
    }))

    store.dispatch(tableActions.setTable({
        headers: ['Id', 'Faza', 'Gracz 1', 'Gracz 2', 'Wynik', 'Sposób', 'Bohater 1', 'Bohater 2'],
        rows: rows
    }))

    return{
      props: {
        data: result
      }
    }
});

type Props = {
    data: Array<any>
}