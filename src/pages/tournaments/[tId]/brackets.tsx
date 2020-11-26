import Footer from '../../../components/footer/Footer';

import AppContainer from '../../../components/style/AppContainer';
import TournamentPanel from '../../../components/tournaments/TournamentPanel';
import fetcher from '../../../utilities/fetcher';

function Brackets({data, tournamentPanel, id, footer}: Props){

    const {texts, tabs, image} = footer;
    const {title, places} = tournamentPanel;

    return(
        <AppContainer>
            <TournamentPanel title={title} places={places} image={''} />
            {JSON.stringify(data)}
            <Footer texts={texts} tabs={tabs} image={image} />
        </AppContainer>
    )
}

export default Brackets;

export async function getStaticPaths(){
    const result: Array<any> = await fetcher('tournaments');
    const paths = result.map(item => `/tournaments/${item.id}/brackets`);

    return { paths, fallback: true};
}

export async function getStaticProps({ params }:any) {
    const id = params.tId;

    const res = await fetcher(`tournaments/${id}`);
    const tournamentInfo = await fetcher(`tournaments/${id}`);

    const TournamentTabs = await import('../../../components/footer/FooterTabsDefinitions');

    return{
        props: {
            data: res,
            id: id,
            footer: {
                texts: [
                    {text: 'Schemat', href: ''},
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
    data: Array<any>,
    id: number,
    tournamentPanel: any,
    footer: any
};