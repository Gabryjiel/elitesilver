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

function ParticipantsIndex({data}: Props){

    const router = useRouter();

    const goTo = (path: string, event?: MouseEvent) => {
        event?.stopPropagation();
        router.push(path);
    };

    const header = ['Pseudonim', 'Winratio', 'Ilość meczy', 'Najczęściej grane'];
    const rows = data.map(item => ({
        content: [item.name, '50%', 'brak', 'Lulu, Lux, Lucian'],
        href: `/participants/${item.id}`
    }));

    return(
        <AppContainer>
            <Table header={header} rows={rows} goTo={goTo} />
            <Footer />
        </AppContainer>
    )
}

export default connect()(ParticipantsIndex);

export const getStaticProps =  wrapper.getStaticProps( async ({store, params}:any) => {
    const result = await fetcher('participants/getAll');

    store.dispatch(FooterActions.setTitle({content: ' ' , href: ''}));
    store.dispatch(FooterActions.setSubtitle({content: 'Uczestnicy' , href: ``}));
    store.dispatch(FooterActions.setDescription({content: 'Przeglądaj' , href: '/tournaments'}));
    store.dispatch(FooterActions.setTabs(TournamentIndex));

    return{
      props: {
        data: result
      }
    }
});

type Props = {
    data: Array<any>
}