import React from 'react';
import { MatchCard } from '../../../interfaces/global'

export default function BracketItem({bluePlayer, redPlayer, blueScore, redScore}: MatchCard){

    const isBlueWinner = blueScore > redScore ? true : false;

    return(
        <div className="list-brackets-col-item">
            <div className="list-brackets-col-item-player">
                {bluePlayer}
            </div>
            <div className={`list-brackets-col-item-score ${isBlueWinner ? 'winner' : 'loser'}`}>
                {blueScore}
            </div>
            <div className="list-brackets-col-item-player">
                {redPlayer}
            </div>
            <div className={`list-brackets-col-item-score ${isBlueWinner ? 'loser' : 'winner'}`}>
                {redScore}
            </div>  
        </div>
    )
}