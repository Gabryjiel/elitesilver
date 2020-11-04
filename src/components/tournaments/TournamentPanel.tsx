import React from 'react';
import { connect } from 'react-redux';

function TournamentPanel({title, image, firstPlace, secondPlace, thirdPlace}: TournamentPanelProps){

    return(
        <div className="tournament-banner">
            <img className="tournament-banner-image" src={image} alt="Tournament Banner"/>

            <div className="tournament-banner-title">
                {title}
            </div>

            <div className="tournament-banner-podium">
                <div className="trophy-gold">{firstPlace}</div>
                <div className="trophy-silver">{secondPlace}</div>
                <div className="trophy-bronze">{thirdPlace}</div>
            </div>
        </div>
    )
}

const mapStateToProps = (state:any) => {
    const local = state.tournamentPanel;

    return {
        title: local.title,
        image: local.image,
        firstPlace: local.firstPlace,
        secondPlace: local.secondPlace,
        thirdPlace: local.thirdPlace
    }
};

export default connect(mapStateToProps)(TournamentPanel);

type TournamentPanelProps = {
    title: string,
    image: string,
    firstPlace: string,
    secondPlace: string,
    thirdPlace: string
}