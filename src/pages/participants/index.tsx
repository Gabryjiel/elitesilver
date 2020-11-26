import { TournamentIndex } from '../../components/footer/FooterTabsDefinitions';

import Footer from "../../components/footer/Footer";
import AppContainer from "../../components/style/AppContainer";

import fetcher from '../../utilities/fetcher';
import ParticipantsList from '../../components/participants/ParticipantsList';

function ParticipantsIndex({data, footer}: Props){

    return(
        <AppContainer>
            <ParticipantsList data={data}/>
            <Footer texts={footer.texts} tabs={footer.tabs} image={footer.image}/>
        </AppContainer>
    )
}

export default ParticipantsIndex;

export async function getStaticProps() {
    const result: Array<any> = await fetcher('participants');

    // const rows = result.map(({id, name, rank, champions}: ParticipantsDTO) => ({
    //     content: [id, name, rank?.name, champions?.map(champ => champ?.name).join(', ')],
    //     href: `participants/${id}`
    // }))

    // store.dispatch(tableActions.setTable({
    //     headers: ['id', 'name', 'rank', 'champions'],
    //     rows: rows
    // }))

    return{
      props: {
        data: result,
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
    data: Array<any>,
    footer: any
};