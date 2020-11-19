import Image from 'next/image';
import Link from 'next/link';

type TournamentsListProps = {
    data: Array<any>
};

export default function TournamentsList({data}: TournamentsListProps){

    return(
        <div className="tournament-list">

            {data.map(({id, name, noOfPlayers, noOfMatches, startDate, endDate}) =>
                <div className="tournament-item list-item-normal" key={name}>

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
                    
                    <div className={`tournament-status ${endDate && 'red'}`}>{"Zakończony"}</div>
                </div>
            )}

            </div>
    );
};