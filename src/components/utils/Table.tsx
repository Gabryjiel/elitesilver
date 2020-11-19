import { CSSProperties, MouseEvent } from "react";
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

import Image from 'next/image'

function Table({headers, rows}: TableProps){

    const router = useRouter();

    const goTo = (path: string, event?: MouseEvent) => {
        event?.stopPropagation();
        router.push(path);
    };

    return(
        <div className="table">
            
            {/* <div className="table-header">
                {headers.map(item => <div key={item} className="table-header-item">{item}</div>)}
            </div> */}

            <div className="table-body">

                {rows.map(tableRow =>

                    <div className="table-row">
                        
                        {tableRow.map(item => {
                            
                            const onClick = item.href ? (event: MouseEvent) => goTo(String(item.href), event) : () => {};

                            switch (item.type) {
                                case 'text':
                                    return <div className="table-row-item" onClick={onClick}>{item.content}</div>;
                                case 'image':
                                    return <div className="table-row-item"><Image src={item.content} width={75} height={75} alt={"logo"} onClick={onClick} /></div>
                            } 

                        })}

                    </div>

                )}

            </div>

        </div>
    );
};

type table = {headers:Array<string>, rows:Array<any>};

const mapStateToProps = (state:any) => {
    const { headers, rows }:table = state.table;

    const head = ['Logo', 'Nazwa turnieju', 'Data rozpoczęcia', 'Data zakończenia', 'Liczba meczy', 'Liczba graczy'];

    const row = [
        [
            {
                type: 'image',
                content: 'https://placeimg.com/250/250/tech',
                href: '/tournaments/1'
            },
            {
                type: 'text',
                content: 'Elite Bronze',
                href: ''
            },
            {
                type: 'text',
                content: '2016.01.02 - 2016.01.02',
                href: ''
            },
            {
                type: 'text',
                content: '10 graczy',
                href: '/tournaments/1/participants',
                placement: 'right'
            },
            {
                type: 'text',
                content: '9',
                href: '/tournaments/1/matches',
                placement: 'right'
            },
            
        ]
    ];

    const tableRows = row.map(row => {
        let left: TableCell[] = [], right: TableCell[] = [];

        row.forEach(item => {
            item.placement === 'right' ? right.push(item) : left.push(item);
        });

        return [...left, ...right];
    })

    return {
        headers: head,
        rows: tableRows
    }
};

export default connect(mapStateToProps)(Table);

type TableProps = {
    headers: Array<string>,
    rows: Array<Array<TableCell>>
}

type TableCell = {
    type: string,
    content: string,
    href?: string,
    placement?: string
}