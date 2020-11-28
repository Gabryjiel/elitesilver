import Footer from '../../components/footer/Footer';
import AppContainer from '../../components/style/AppContainer';

import { TournamentIndex } from '../../components/footer/FooterTabsDefinitions';
import fetcher from '../../utilities/fetcher';
import Table from '../../components/utilities/Table';

function Tournaments({table, footer}: Props){

    const {texts, tabs, image} = footer;
    const {rows} = table;

    return(
        <AppContainer>
            <Table rows={rows} />
            <Footer texts={texts} tabs={tabs} image={image} />
        </AppContainer>
    )
}

export default Tournaments;

export async function getStaticProps() {
    const result: Array<any> = await fetcher('tournaments');

    const rows = result.map(tournament => [
        {content: 'https://placeimg.com/250/250/tech', href: ''},
        {content: tournament.name, href: `/tournaments/${tournament.id}`},
        {content: tournament.noOfMatches, href: `/tournaments/${tournament.id}/matches`},
        {content: tournament.noOfPlayers, href: `/tournaments/${tournament.id}/participants`},
        {content: `${tournament.startDate} - ${tournament.endDate}`, href: ''}
    ]);

    return{
      props: {
        table: {
            rows
        }, 
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
    table: any,
    footer: any
}