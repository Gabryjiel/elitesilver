function TournamentCard({title, participants, games, winner, endDate}: Props){
    return(
        <div className="mediacard">

                    <div className="mediacard-image">
                        <img src="https://placeimg.com/250/250/tech" />
                    </div>
                    
                    <div className="mediacard-text">
                        <div className="mediacard-title">
                            <span>{title}</span>
                        </div>

                        <div className="mediacard-content">
                            <div className="users"><span>{participants}</span></div>
                            <div className="games"><span>{games}</span></div>
                            {winner && <div className="trophy"><span>{winner}</span></div>}
                            {endDate && <div className="calendar"><span>{endDate}</span></div>}
                        </div>
                    </div>

            </div>
    )
}

export default TournamentCard;

type Props = {
    title: string,
    participants: number,
    games: number,
    winner?: string,
    endDate?: string
}