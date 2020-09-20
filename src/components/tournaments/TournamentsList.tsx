import Link from 'next/link';
import { useRouter } from 'next/router';

import TournamentsListItem from './TournamentsListItem'

export default function TournamentsList({data}: TournamentsListProps){

    const router = useRouter();

    const goTo = (path:string) => {
        router.push(path);
    }

    return(
        <div className="list-card">
            {data.map(tournament => {
                return(
                    <TournamentsListItem key={tournament.id} tournament={tournament} goTo={goTo}/>
                );
            })}
        </div>
    )
}

type TournamentsListProps = {
    data: Tournament[]
}

type Tournament = {
    id: number,
    name: string
}