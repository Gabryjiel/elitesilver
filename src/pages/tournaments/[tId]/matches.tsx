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
import Table from '../../../components/utils/Table';

function matches({matches, id}: Props){

    const router = useRouter();

    const goTo = (path: string, event?: React.MouseEvent) => {
        event?.stopPropagation();
        router.push(path);
    }

    return(
        <AppContainer>
            <TournamentPanel />
            <Table goTo={goTo} />
            {/* <div id="matches" className="table-container">
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
            </div> */}

            <Footer />
        </AppContainer>
    )
}

export async function getStaticPaths(){
    const result: Array<any> = await fetcher('tournaments');
    const paths = result.map(item => `/tournaments/${item.id}/matches`);

    return { paths, fallback: true};
}

export const getStaticProps = wrapper.getStaticProps(async ({store, params}:any) => {
    const id = params.tId;

    const result: Array<any> = await fetcher(`tournaments/${id}/matches`);
    const tournamentInfo = await fetcher(`tournaments/${id}`);

    const tableActions = await import('../../../redux/actions/tableActions');
    const footerActions = await import('../../../redux/actions/footerActions');
    const tournamentPanel = await import('../../../redux/actions/tournamentPanelActions');
    const TournamentTabs = await import('../../../components/footer/FooterTabsDefinitions');

    store.dispatch(footerActions.setFooter({
        title: {content: 'Mecze', href: ''},
        subtitle: {content: tournamentInfo.name, href: `/tournaments/${tournamentInfo.id}`},
        description: {content: 'Turnieje', href: '/tournaments'},
        tabs: TournamentTabs.TournamentTabs(id)
    }))

    //store.dispatch(TournamentPanelActions.setImagePath(''));
    store.dispatch(tournamentPanel.setTournamentPanel({
        title: tournamentInfo.name,
        firstPlace: 'Firster',
        secondPlace: 'Seconder',
        thirdPlace: 'Thirder'
    }))

    const rows = result.map(({id, player1, player2, waywin, stage}) => ({
        content: [id, stage?.name, player1?.name, player2?.name, `${player1?.score} : ${player2?.score}`, waywin?.name, player1?.champion?.name || null, player2?.champion?.name || null],
        href: `/matches/${id}`
    }))

    store.dispatch(tableActions.setTable({
        headers: ['Id', 'Faza', 'Gracz 1', 'Gracz 2', 'Wynik', 'Sposób', 'Bohater 1', 'Bohater 2'],
        rows: rows
    }))
    
    return{
        props: {
            matches: rows,
            id: id
        }
    }
});

type Props = {
    matches: Array<any>,
    id: number
}

export default connect()(matches);