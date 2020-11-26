import { TournamentIndex } from '../../components/footer/FooterTabsDefinitions';

import Footer from "../../components/footer/Footer";
import AppContainer from "../../components/style/AppContainer";
import fetcher from '../../utilities/fetcher';

function MatchesIndex({data, footer}: Props){

    return(
        <AppContainer>
            <Footer texts={footer.texts} tabs={footer.tabs} image={footer.image} />
        </AppContainer>
    )
}

export default MatchesIndex;

export async function getStaticProps() {
    const result: Array<any> = await fetcher('matches');


    const rows = result.map(({id, player1, player2, waywin, stage}) => ({
        content: [id, stage?.name, player1?.name, player2?.name, `${player1?.score} : ${player2?.score}`, waywin?.name, player1?.champion?.name || null, player2?.champion?.name || null],
        href: `matches/${id}`
    }))

    // store.dispatch(tableActions.setTable({
    //     headers: ['Id', 'Faza', 'Gracz 1', 'Gracz 2', 'Wynik', 'Sposób', 'Bohater 1', 'Bohater 2'],
    //     rows: rows
    // }))

    return{
      props: {
        data: result,
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
    data: Array<any>,
    footer: any
}