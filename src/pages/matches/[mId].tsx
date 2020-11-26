import { MatchesTabs } from '../../components/footer/FooterTabsDefinitions';

import AppContainer from '../../components/style/AppContainer';
import Footer from '../../components/footer/Footer';
import fetcher from '../../utilities/fetcher';

function Match({footer}: any){

    return(
        <AppContainer>
            MECZE
            <Footer texts={footer.texts} tabs={footer.tabs} image={footer.image} />
        </AppContainer>
    );
}

export default Match;

export async function getStaticPaths(){
    const result: any[] = await fetcher('matches');
    const paths = result.map(match => `/matches/${match.id.toString()}`);

    return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
    const result = await fetcher(`matches/${params.mId}`);

    return{
        props: {
            data: result,
            id: params.mId,
            footer: {
                texts: [
                    {text: 'Szniff vs Fefu', href: ''},
                    {text: 'EliteSilver I', href: `tournament/1`},
                    {text: 'Ćwierćfinał', href: ''}
                ],
                tabs: MatchesTabs(params.tId, 2),
                image: ''
            }
        }
    }
};