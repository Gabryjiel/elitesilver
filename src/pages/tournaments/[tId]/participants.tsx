import AppContainer from '../../../components/style/AppContainer';
import TournamentPanel from '../../../components/tournaments/TournamentPanel';
import Footer from '../../../components/footer/Footer';
import fetcher from '../../../utilities/fetcher';

function Participants({participants, id, footer, tournamentPanel}: Props){

    const {texts, tabs, image} = footer;
    const {title, places, bannerImage} = tournamentPanel;

    return(
        <AppContainer>

            <TournamentPanel title={title} places={places} image={bannerImage}/>

            <Footer texts={texts} tabs={tabs} image={image} />

        </AppContainer>
    )
}

export default Participants;

export async function getStaticPaths(){
    const result: Array<any> = await fetcher('tournaments');
    const paths = result.map(item => `/tournaments/${item.id}/participants`);

    return { paths, fallback: true};
}

export async function getStaticProps({ params }:any) {
    const id = params.tId;

    const result: Array<any> = await fetcher(`tournaments/${id}/participants`);
    const tournamentInfo = await fetcher(`tournaments/${id}`);

    const TournamentTabs = await import('../../../components/footer/FooterTabsDefinitions');


    const rows = result.map(({id, name, rank, userId}) => ({
        content: [userId, name, rank?.name],
        href: `/users/${id}`
    }))
    
    return{
        props: {
            participants: rows,
            id: id,
            footer: {
                texts: [
                    {text: 'Uczestnicy', href: ''},
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
    participants: Array<any>,
    id: number,
    footer: any, 
    tournamentPanel: any
}