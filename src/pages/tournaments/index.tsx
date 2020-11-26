import Footer from '../../components/footer/Footer';
import AppContainer from '../../components/style/AppContainer';
import TournamentsList from '../../components/tournaments/TournamentsList';

import { TournamentIndex } from '../../components/footer/FooterTabsDefinitions';
import fetcher from '../../utilities/fetcher';

function Tournaments({data, footer}: Props){

    return(
        <AppContainer>
            <TournamentsList data={data}/>
            <Footer texts={footer.texts} tabs={footer.tabs} image={footer.image} />
        </AppContainer>
    )
}

export default Tournaments;

export async function getStaticProps() {
    const result: Array<any> = await fetcher('tournaments');

    const rows = result.map(row => ({
        content: [row.name, row.startDate, row.endDate, row.noOfMatches, row.noOfPlayers],
        href: `tournaments/${row.id}`
    }))

    return{
      props: {
        data: result,
        footer: {
            texts: [
                {text: '', href: ''},
                {text: 'Turnieje', href: ''},
                {text: 'Przeglądaj', href: ''}
            ],
            tabs: TournamentIndex,
            image: ''
        }
      },
      revalidate: 1
    }
};

type Props = {
    data: any,
    footer: any
}