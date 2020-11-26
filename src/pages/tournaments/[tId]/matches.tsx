import { useRouter } from 'next/router';

import AppContainer from '../../../components/style/AppContainer';
import TournamentPanel from '../../../components/tournaments/TournamentPanel';
import Footer from '../../../components/footer/Footer';
import fetcher from '../../../utilities/fetcher';

function Matches({matches, id, footer, tournamentPanel}: Props){

    const {texts, tabs, image} = footer;
    const {title, places, bannerImage} = tournamentPanel;

    const router = useRouter();

    const goTo = (path: string, event?: React.MouseEvent) => {
        event?.stopPropagation();
        router.push(path);
    }

    return(
        <AppContainer>
            <TournamentPanel title={title} places={places} image={bannerImage} />

            <Footer texts={texts} tabs={tabs} image={image} />
        </AppContainer>
    )
}

export default Matches;

export async function getStaticPaths(){
    const result: Array<any> = await fetcher('tournaments');
    const paths = result.map(item => `/tournaments/${item.id}/matches`);

    return { paths, fallback: true};
}

export async function getStaticProps({ params }:any) {
    const id = params.tId;

    const result: Array<any> = await fetcher(`tournaments/${id}/matches`);
    const tournamentInfo = await fetcher(`tournaments/${id}`);

    const TournamentTabs = await import('../../../components/footer/FooterTabsDefinitions');

    const rows = result.map(({id, player1, player2, waywin, stage}) => ({
        content: [id, stage?.name, player1?.name, player2?.name, `${player1?.score} : ${player2?.score}`, waywin?.name, player1?.champion?.name || null, player2?.champion?.name || null],
        href: `/matches/${id}`
    }))
    
    return{
        props: {
            matches: rows,
            id: id,
            footer: {
                texts: [
                    {text: 'Mecze', href: ''},
                    {text: tournamentInfo.name, href: `/tournaments/${tournamentInfo.id}`},
                    {text: 'Turnieje', href: '/tournaments'},
                ],
                tabs: TournamentTabs.TournamentTabs(id)
            },
            tournamentPanel: {
                title: tournamentInfo.name,
                places: ['Firster', 'Seconder', 'Thirder'],
                bannerImage: ''
            }
        }
    }
};

type Props = {
    matches: Array<any>,
    id: number
    footer: any,
    tournamentPanel: any
};