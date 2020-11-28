import { TournamentIndex } from '../../components/footer/FooterTabsDefinitions';

import Footer from "../../components/footer/Footer";
import AppContainer from "../../components/style/AppContainer";

import fetcher from '../../utilities/fetcher';
import Table from '../../components/utilities/Table';

function Participants({table, footer}: Props){

    const {texts, tabs, image} = footer;
    const {headers, rows} = table;

    return(
        <AppContainer>
            <Table headers={headers} rows={rows} />
            <Footer texts={texts} tabs={tabs} image={image} />
        </AppContainer>
    )
}

export default Participants;

export async function getStaticProps() {
    const result: any[] = await fetcher('participants');

    const headers = [
        {content: 'Pseudonim'},
        {content: 'Liczba meczy'},
        {content: 'Liczba wygranych'},
        {content: 'Procent zwycięstw'}
    ];

    const rows = result.map(({id, name, noOfMatches, noOfWins}) => {
        
        let winRatio = `${(noOfWins/noOfMatches*100).toFixed(0).toString()} %`;

        return [
            {content: name, href: `/participants/${id}`},
            {content: noOfMatches, href: `participants/${id}/matches`},
            {content: noOfWins, href: `participants/${id}/matches`},
            {content: winRatio, href: `participants/${id}/matches`}
        ]
    });

    return{
      props: {
        table: {
            headers,
            rows
        },
        footer: {
            texts: [
                {text: '', href: ''},
                {text: 'Uczestnicy', href: ''},
                {text: 'Przeglądaj', href: ''}
            ],
            tabs: TournamentIndex
        }
      }
    }
};

type Props = {
    table: any,
    footer: any
};