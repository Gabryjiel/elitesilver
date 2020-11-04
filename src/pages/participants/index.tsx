import React, { MouseEvent } from 'react';
import { connect } from 'react-redux';
import { wrapper } from '../../redux/store';

import { TournamentIndex } from '../../components/footer/FooterTabsDefinitions';

import Footer from "../../components/footer/Footer";
import AppContainer from "../../components/style/AppContainer";
import Table from '../../components/utils/Table';
import { useRouter } from 'next/router';
import fetcher from '../../utilities/fetcher';

function ParticipantsIndex({data}: Props){

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

export default connect()(ParticipantsIndex);

export const getStaticProps =  wrapper.getStaticProps( async ({ store }:any) => {
    const result: Array<any> = await fetcher('participants');

    const tableActions = await import('../../redux/actions/tableActions');
    const footerActions = await import('../../redux/actions/footerActions');

    store.dispatch(footerActions.setFooter({
        title: {content: ' ', href: ''},
        subtitle: {content: 'Zawodnicy', href: ''},
        description: {content: 'Przeglądaj', href: ''},
        tabs: TournamentIndex
    }))

    const rows = result.map(({id, name, rank, champions}: ParticipantsDTO) => ({
        content: [id, name, rank?.name, champions?.map(champ => champ?.name).join(', ')],
        href: `participants/${id}`
    }))

    store.dispatch(tableActions.setTable({
        headers: ['id', 'name', 'rank', 'champions'],
        rows: rows
    }))

    return{
      props: {
        data: result
      }
    }
});

type ParticipantsDTO = {
    id: number,
    name: string,
    rank: any,
    champions: Array<any>
}

type Props = {
    data: Array<any>
}