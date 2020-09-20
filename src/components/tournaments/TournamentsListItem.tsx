import Trophy from '../../icons/trophy';

export default function TournamentsListItem({tournament, goTo}: TournamentsListItemProps){
    return(
        <div className="list-card-item" >
            <div className="list-card-item-image" onClick={() => goTo(`/tournaments/${tournament.id}`)}>
                {tournament.image && <img alt="" src={tournament.image}/>}
                {!tournament.image && <div style={{background: "black", height: "100%", width: "100%"}}></div>}
            </div>
            <div className="list-card-item-title" onClick={() => goTo(`/tournaments/${tournament.id}`)}>
                {tournament.name}
            </div>
            <div className="list-card-item-aside">
                {tournament.enddate ?
                    <>
                        <div onClick={() => goTo('/stats')}>
                            <Trophy fill="goldenrod"/>
                            <span onClick={() => goTo('/')}>{tournament.first}</span>
                        </div>
                        <div onClick={() => goTo('/stats')}>
                            <Trophy fill="silver"/>
                            <span onClick={() => goTo('/')}>{tournament.second}</span>
                        </div>
                        <div onClick={() => goTo('/stats')}>
                            <Trophy fill="#F06C00"/>
                            <span onClick={() => goTo('/')}>{tournament.third}</span>
                        </div>
                    </>
                : 
                    <div>Aktywny</div>}
            </div>
            <div className="list-card-item-details" onClick={() => goTo(`/tournaments/${tournament.id}`)}>
                {tournament.enddate ?
                    <>
                        Data zakończenia: {tournament.enddate.slice(0,tournament.enddate.indexOf('T'))}
                    </> :
                    <>
                        Aktywny
                    </>
                }
            </div>
        </div>
    )
}

type TournamentsListItemProps = {
    tournament: tournament,
    goTo: (path: string) => void
}

type tournament = {
    id: number,
    name: string,
    image: string,
    startdate: string,
    enddate: string,
    first: string,
    second: string,
    third: string
}