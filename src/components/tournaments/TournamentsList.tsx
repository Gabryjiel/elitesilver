import Image from 'next/image';
import Link from 'next/link';
import { MouseEvent } from 'react';
import TournamentCard from '../TournamentCard/TournamentCard';

function TournamentsList({data}: TournamentsListProps){

    return(
        <div className="table">
            <div className="table-body">

            {data.map(({id, name, noOfPlayers, noOfMatches, startDate, endDate}) =>
                <div className="tournament" key={name}>

                    <Link href={`/tournaments/${id}`}>
                        <div className="tournament-logo">
                            <Image src={"https://placeimg.com/250/250/tech"} width={50} height={50} alt={"logo"} />
                        </div>
                    </Link>

                    <Link href={`/tournaments/${id}`}>
                        <div className="tournament-title">{name}</div>
                    </Link>
                    
                    <Link href={`/tournaments/${id}/participants`}>
                        <div className="tournament-players torunament-hover">{noOfPlayers + ' graczy'}</div>
                    </Link>
                    
                    <Link href={`/tournaments/${id}/matches`}>
                        <div className="tournament-players torunament-hover">{noOfMatches + ' meczy'}</div>
                    </Link>

                    <Link href={`/tournaments/${id}`}>
                        <div className="tournament-date">{`${startDate} - ${endDate}`}</div>
                    </Link>
                    
                    <div className="tournament-status red">{"Zakończony"}</div>
                </div>
            )}

            </div>
        </div>
    );
}

export default TournamentsList;

type TournamentsListProps = {
    data: Array<any>
}