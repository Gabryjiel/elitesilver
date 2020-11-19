import Link from 'next/link';

type TournamentsListProps = {
    data: Array<any>
};

export default function ChampionsList({data}: TournamentsListProps){

    return(
        <div className="tournament-list">

            {data.map(({id, name, picks, wins, bans}) =>
                <div className="tournament-item list-item-small" key={name}>

                    <Link href={`/champions/${id}`}>
                        <div className="tournament-title">{name}</div>
                    </Link>

                    <Link href={`/champions/${id}`}>
                        <div className="tournament-players torunament-hover">{picks}</div>
                    </Link>
                    
                    
                    <Link href={`/champions/${id}`}>
                        <div className="tournament-players torunament-hover">{picks ? Number(wins * 100 / picks).toFixed(0) + '%' : ''}</div>
                    </Link>

                    <Link href={`/champions/${id}`}>
                        <div className="tournament-players torunament-hover">{bans}</div>
                    </Link>

                </div>
            )}

            </div> 
    );
};