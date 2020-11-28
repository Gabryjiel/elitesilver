import { TournamentIndex } from '../../components/footer/FooterTabsDefinitions';

import Footer from "../../components/footer/Footer";
import AppContainer from "../../components/style/AppContainer";
import fetcher from '../../utilities/fetcher';
import Table from '../../components/utilities/Table';

function MatchesIndex({table, footer}: Props){

    const {headers, rows} = table;
    const {texts, tabs, image} = footer;

    return(
        <AppContainer>
            <Table headers={headers} rows={rows} />
            <Footer texts={texts} tabs={tabs} image={image} />
        </AppContainer>
    )
}

export default MatchesIndex;

export async function getStaticProps() {
    const result: Array<any> = await fetcher('matches');

    const headers = [
        {content: 'Zawodnik 1'},
        {content: 'Zawodnik 2'},
        {content: 'Wynik'},
        {content: 'Sposób'},
        {content: 'Bohater 1'},
        {content: 'Bohater 2'},
        {content: 'Faza'}
    ];

    const rows = result.map(({id, player1, player2, waywin, stage}) => [
        {content: player1?.name, href: `/participants/${player1.id}`, classes: 'blue'},
        {content: player2?.name, href: `/participants/${player2.id}`, classes: 'red'},
        {content: `${player1?.score} : ${player2?.score}`, href: `/matches/${id}`, classes: `${player1?.score > player2?.score ? 'blue' : 'red'}`},
        {content: waywin.name, href: `/matches/${id}`},
        {content: player1?.champion?.name || null, href: `/champions/${player1?.champion?.id}`, classes: 'blue'},
        {content: player2?.champion?.name || null, href: `/champions/${player2?.champion?.id}`, classes: 'red'},
        {content: stage?.name}
    ]);

    return{
      props: {
        table: {
            headers,
            rows
        },
        footer: {
            texts: [
                {text: '', href: ''},
                {text: 'Mecze', href: ''},
                {text: 'Przeglądaj', href: ''},
            ],
            tabs: TournamentIndex,
            image: ''
        }
      }
    }
};

type Props = {
    table: any,
    footer: any
}