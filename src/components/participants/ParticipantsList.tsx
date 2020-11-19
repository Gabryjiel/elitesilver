import Image from 'next/image';
import Link from 'next/link';

type TournamentsListProps = {
    data: Array<any>
};

export default function ParticipantsList({data}: TournamentsListProps){

    return(
        <div className="tournament-list">

            {data.map(({id, name, rank, champions, noOfMatches, noOfWins}) =>
                <div className="tournament-item list-item-small" key={name}>

                    <Link href={`/participants/${id}`}>
                        <div className="tournament-title">{name}</div>
                    </Link>

                    <Link href={`/participants/${id}`}>
                        <div className="tournament-players torunament-hover">{rank}</div>
                    </Link>
                    
                    <Link href={`/participants/${id}`}>
                        <div className="tournament-players torunament-hover">{noOfMatches}</div>
                    </Link>
                    
                    <Link href={`/participants/${id}`}>
                        <div className="tournament-players torunament-hover">{noOfMatches ? Number(noOfWins * 100 / noOfMatches).toFixed(0) + '%' : ''}</div>
                    </Link>

                </div>
            )}

            </div> 
    );
};