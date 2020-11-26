function TournamentPanel({title, image, places}: TournamentPanelProps){

    return(
        <div className="tournament-banner">
            <img className="tournament-banner-image" src={image} alt="Tournament Banner"/>

            <div className="tournament-banner-title">
                {title}
            </div>

            <div className="tournament-banner-podium">
                <div className="trophy-gold">{places[0]}</div>
                <div className="trophy-silver">{places[1]}</div>
                <div className="trophy-bronze">{places[2]}</div>
            </div>
        </div>
    )
};

export default TournamentPanel;

type TournamentPanelProps = {
    title: string,
    image: string,
    places: string[]
}