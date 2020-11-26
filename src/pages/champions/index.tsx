import { TournamentIndex } from '../../components/footer/FooterTabsDefinitions';

import Footer from "../../components/footer/Footer";
import AppContainer from "../../components/style/AppContainer";
import fetcher from '../../utilities/fetcher';
import ChampionsList from '../../components/champions/ChampionsList';

function ChampionsIndex({data, footer}: Props){

    return(
        <AppContainer>
            <ChampionsList data={data} />
            <Footer texts={footer.texts} tabs={footer.tabs} image={footer.image} />
        </AppContainer>
    )
}

export default ChampionsIndex;

export async function getStaticProps() {
    const result: Array<any> = await fetcher('champions');

    return{
      props: {
        data: result,
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
    data: Array<any>,
    footer: any
}