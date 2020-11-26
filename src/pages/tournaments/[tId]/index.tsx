import { useRouter } from 'next/router';

import AppContainer from '../../../components/style/AppContainer';
import TournamentPanel from '../../../components/tournaments/TournamentPanel';
import Footer from '../../../components/footer/Footer';
import fetcher from '../../../utilities/fetcher';

function Tournaments({data, id, footer, tournamentPanel}: Props) {

    const {texts, tabs, image} = footer;
    const {title, places} = tournamentPanel

    const router = useRouter();

    if(router.isFallback) {
        return <div>Loading...</div>
    }

    return(
        <AppContainer>
            <TournamentPanel title={title} places={places} image={''} />

            <div className=".tournament-container">
                <div className="tournament-description">
                    {'desc'}
                </div>
            </div>

            <Footer texts={texts} tabs={tabs} image={image} />
        </AppContainer>
  )
}

export default Tournaments;

export async function getStaticPaths(){
    const result: Array<any> = await fetcher('tournaments');
    const paths = result.map(item => `/tournaments/${item.id}`);

    return { paths, fallback: true};
}

export async function getStaticProps({ params }:any) {
    const id = params.tId;

    const tournamentInfo = await fetcher(`tournaments/${id}`);
    const TournamentTabs = await import('../../../components/footer/FooterTabsDefinitions');

    return{
        props: {
            data: tournamentInfo,
            id: id,
            footer: {
                texts: [
                    {text: 'Ogólne', href: ''},
                    {text: tournamentInfo.name, href: `/tournaments/${tournamentInfo.id}`},
                    {text: 'Turnieje', href: '/tournaments'},
                ],
                tabs: TournamentTabs.TournamentTabs(id),
                image: ''
            },
            tournamentPanel: {
                title: tournamentInfo.name,
                places: ['Firster', 'Seconder', 'Thirder']
            }
        },
        revalidate: 1
    }
};

type Props = {
  data: any,
  id: number,
  footer: any,
  tournamentPanel: any
}