import { TournamentIndex } from '../../components/footer/FooterTabsDefinitions';

import Footer from "../../components/footer/Footer";
import AppContainer from "../../components/style/AppContainer";
import fetcher from '../../utilities/fetcher';
import Table from '../../components/utilities/Table';

function Champions({table, footer}: Props){

    const {headers, rows} = table;
    const {texts, tabs, image} = footer;

    return(
        <AppContainer>
            <Table headers={headers} rows={rows} />
            <Footer texts={texts} tabs={tabs} image={image} />
        </AppContainer>
    )
}

export default Champions;

export async function getStaticProps() {
    const result: Array<any> = await fetcher('champions');

    const headers = [
        {content: 'Portret'},
        {content: 'Imię'},
        {content: 'Liczba meczy'},
        {content: 'Liczba wygranych (%)'},
        {content: 'Liczba banów'}
    ];

    const rows = result.map(({id, name, picks, wins, bans, avatar}) => {
        
        let winAndWinRatio = picks && `${wins} (${(wins/picks*100).toFixed(0).toString()} %)`;

        return [
            {content: avatar, href: `/champions/${id}`},
            {content: name, href: `/champions/${id}`},
            {content: picks, href: `/champions/${id}`},
            {content: winAndWinRatio, href: `/champions/${id}`},
            {content: bans, href: `/champions/${id}`}
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
                {text: 'Postacie', href: ''},
                {text: 'Przeglądaj', href: ''}
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