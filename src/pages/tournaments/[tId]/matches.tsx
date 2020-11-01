import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { wrapper } from '../../../redux/store';

import { TournamentTabs } from '../../../components/footer/FooterTabsDefinitions';

import * as FooterActions from '../../../redux/actions/footerActions'
import * as TournamentPanelActions from '../../../redux/actions/tournamentPanelActions';

import AppContainer from '../../../components/style/AppContainer';
import TournamentPanel from '../../../components/tournaments/TournamentPanel';
import Footer from '../../../components/footer/Footer';
import fetcher from '../../../utilities/fetcher';

function matches({matches, id}: Props){

    const router = useRouter();

    const goTo = (path: string, event?: React.MouseEvent) => {
        event?.stopPropagation();
        router.push(path);
    }

    return(
        <AppContainer>
            <TournamentPanel />

            <div id="matches" className="table-container">
                <div className="table-header">
                    <span className="table-row-flexed">Zwycięzca</span>
                    <span className="table-row-flexed">Przegrany</span>
                    <span>Wynik</span>
                    <span>Faza</span>
                </div>
                <div className="table-body">
                    {matches.map(match => 
                            <div className="table-row" key={`${match.player1} vs ${match.player2} in ${match.stage}`} onClick={(event) => goTo(`/matches/${match.id}`, event)}>
                                <div className="table-element table-row-flexed">
                                    <span onClick={(event) => goTo(`/participants/${match.player1id}`, event)} className="table-hoverable">{match.player1}</span>
                                </div>
                                <div className="table-element table-row-flexed">
                                    <span onClick={(event) => goTo(`/participants/${match.player1id}`, event)} className="table-hoverable">{match.player2}</span>
                                </div>
                                <div className="table-element">
                                    <span>{`${match.p1score} : ${match.p2score}`}</span>
                                </div>
                                <div className="table-element">
                                    <span>{match.stage}</span>
                                </div>
                            </div>
                    )}
                </div>
            </div>

            <Footer />
        </AppContainer>
    )
}

export async function getStaticPaths(){
    const result: Array<any> = await fetcher('tournaments/getAll');
    const paths = result.map(item => `/tournaments/${item.id.toString()}/brackets`);
    return { paths, fallback: false};
}

export const getStaticProps = wrapper.getStaticProps(async ({store, params}:any) => {
    const res = await (await fetch(`http://localhost:3001/api/tournaments/${params.tId}/matches`)).json();
    const tournamentInfo = await fetcher(`tournaments/getById?id=${params.tId}`);

    store.dispatch(FooterActions.setTitle({content: 'Mecze' , href: `/tournaments/${tournamentInfo.id}/matches`}));
    store.dispatch(FooterActions.setSubtitle({content: tournamentInfo.name , href: `/tournaments/${tournamentInfo.id}`}));
    store.dispatch(FooterActions.setDescription({content: 'Turnieje', href: '/tournaments'}))
    store.dispatch(FooterActions.setTabs(TournamentTabs(params.tId)));

    //store.dispatch(TournamentPanelActions.setImagePath(''));
    store.dispatch(TournamentPanelActions.setTitle(tournamentInfo.name));
    store.dispatch(TournamentPanelActions.setFirstPlace('Firster'));
    store.dispatch(TournamentPanelActions.setSecondPlace('Seconder'));
    store.dispatch(TournamentPanelActions.setThirdPlace('Thirder'));
    
    return{
        props: {
            matches: res,
            id: params.tId
        }
    }
});

type Props = {
    matches: Array<any>,
    id: number
}

export default connect()(matches);