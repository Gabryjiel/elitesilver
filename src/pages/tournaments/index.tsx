import { connect } from 'react-redux';
import { wrapper } from '../../redux/store';

import Footer from '../../components/footer/Footer';
import AppContainer from '../../components/style/AppContainer';
import TournamentsList from '../../components/tournaments/TournamentsList';

import { TournamentIndex } from '../../components/footer/FooterTabsDefinitions';
import fetcher from '../../utilities/fetcher';
import { table } from 'console';

function Tournaments({data}: Props){

    return(
        <AppContainer>
            <TournamentsList data={data}/>

            <Footer />
        </AppContainer>
    )
}

export default connect()(Tournaments);

export const getStaticProps =  wrapper.getStaticProps( async ({store}: any) => {
    const result: Array<any> = await fetcher('tournaments');

    const tableActions = await import('../../redux/actions/tableActions');
    const footerActions = await import('../../redux/actions/footerActions');

    store.dispatch(footerActions.setFooter({
        title: {content: ' ', href: ''},
        subtitle: {content: 'Turnieje', href: ''},
        description: {content: 'Przeglądaj', href: ''},
        tabs: TournamentIndex
    }))

    const rows = result.map(row => ({
        content: [row.id, row.name, row.description, row.startDate, row.endDate, row.createdAt],
        href: `tournaments/${row.id}`
    }))

    store.dispatch(tableActions.setTable({
        headers: Object.keys(result[0]),
        rows: rows
    }))

    return{
      props: {
        data: result
      },
      revalidate: 1
    }
});

type Props = {
    data: any
}