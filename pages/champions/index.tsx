import React, { MouseEvent } from 'react';
import { connect } from 'react-redux';
import { wrapper } from '../../src/redux/store';

import * as FooterActions from '../../src/redux/actions/footerActions'
import { TournamentIndex } from '../../src/components/footer/FooterTabsDefinitions';

import Footer from "../../src/components/footer/Footer";
import AppContainer from "../../src/components/style/AppContainer";
import Table from '../../src/components/utils/Table';
import { useRouter } from 'next/router';

function ChampionsIndex({data}: Props){

    const router = useRouter();

    const goTo = (path: string, event?: MouseEvent) => {
        event?.stopPropagation();
        router.push(path);
    };

    const header = ['Nazwa', 'Ilość meczy', 'Winratio'];
    const rows = data.map(item => ({
        content: [item.name, '10', '50%'],
        href: `/champions/${item.id}`
    }));

    return(
        <AppContainer>
            <Table header={header} rows={rows} goTo={goTo} />
            <Footer />
        </AppContainer>
    )
}

export default connect()(ChampionsIndex);

export const getStaticProps =  wrapper.getStaticProps( async ({store, params}:any) => {
    const res = await (await fetch(`http://localhost:3001/api/champions`)).json();

    store.dispatch(FooterActions.setTitle({content: ' ' , href: ''}));
    store.dispatch(FooterActions.setSubtitle({content: 'Postacie' , href: ''}));
    store.dispatch(FooterActions.setDescription({content: 'Przeglądaj' , href: '/tournaments'}));
    store.dispatch(FooterActions.setTabs(TournamentIndex));

    return{
      props: {
        data: res
      }
    }
});

type Props = {
    data: Array<any>
}