import { useRouter } from 'next/router';
import { MouseEvent } from 'react';
import Table from '../utils/Table';

function TournamentsList({data}: TournamentsListProps){

    const router = useRouter();

    const goTo = (path: string, event?: MouseEvent) => {
        event?.stopPropagation();
        router.push(path);
    }

    const header = ["Nazwa", "Status", "Ilość uczestników"];
    const rows = data.map(row => ({
        content: [row.name, row.startDate, row.id], 
        href: `/tournaments/${row.id}`
    }));

    return(
        <Table header={header} rows={rows} goTo={goTo} />
    );
}

export default TournamentsList;

type TournamentsListProps = {
    data: any[]
}