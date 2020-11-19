import { connect } from 'react-redux';
import { wrapper } from '../../redux/store';

import Footer from '../../components/footer/Footer';
import AppContainer from '../../components/style/AppContainer';
import TournamentsList from '../../components/tournaments/TournamentsList';

import { TournamentIndex } from '../../components/footer/FooterTabsDefinitions';
import fetcher from '../../utilities/fetcher';
import Table from '../../components/utils/Table';

function Tournaments({data}: Props){

    return(
        <AppContainer>
            <TournamentsList data={data}/>
            {/* <Table /> */}
            <Footer />
        </AppContainer>
    )
}

export default Tournaments;

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
        content: [row.name, row.startDate, row.endDate, row.noOfMatches, row.noOfPlayers],
        href: `tournaments/${row.id}`
    }))

    store.dispatch(tableActions.setTable({
        headers: ['Nazwa turnieju', 'Data rozpoczęcia', 'Data zakończenia', 'Liczba meczy', 'Liczba graczy'],
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