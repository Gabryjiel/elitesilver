import Link from 'next/link';
import styled from 'styled-components';

function Table({headers, rows}: TableProps) {

    const h: TableItem[] = [
        {content: 'Logo', classes: ''},
        {content: 'Nazwa', classes: ''},
        {content: 'Czas trwania', classes: ''},
        {content: 'Status', classes: ''}
    ];

    const r: TableItem[][] = [
        [
            {content: 'https://placeimg.com/250/250/tech', href: ''},
            {content: 'Elite Bronze', href: '/tournaments/1'},
            {content: '3 days', href: '', classes: 'red'},
            {content: 'Zakończony', href: ''}
        ],
        [
            {content: 'https://placeimg.com/250/250/tech', href: ''},
            {content: 'Elite Silver', href: '/tournaments/2'},
            {content: '3 days', href: ''},
            {content: 'Zakończony', href: ''}
        ],
        [
            {content: 'https://placeimg.com/250/250/tech', href: ''},
            {content: 'Elite Gold', href: '/tournaments/3'},
            {content: '3 days', href: ''},
            {content: 'Zakończony', href: ''}
        ]
    ]

    return(
        <TableContainer>
            <TableHeader>

                {h?.map(item => (
                    <TableHeaderItem><span className={item.classes}>{ item.content }</span></TableHeaderItem>
                ))}

            </TableHeader>

            <TableBody>

                {r?.map(row => (
                    <TableRow>

                        {row?.map(item => (
                            <TableRowItem>
                                <Link href={item.href || ''}>
                                    {item.content.includes('http') ?
                                        <div className={item.classes} style={{height: '100%'}}>
                                            <TableRowImage src={item.content} alt={'image'} />
                                        </div>
                                        :
                                        <span className={item.classes}>
                                            {item.content}
                                        </span>
                                    }
                                </Link>
                            </TableRowItem>
                        ))}

                    </TableRow>
                ))}

            </TableBody>
        </TableContainer>
    );
}

export default Table;

interface TableProps{
    headers?: TableItem[],
    rows?: TableItem[],
    style?: any
}

interface TableItem{
    content: string,
    href?: string,
    classes?: string
}

const TableContainer = styled.table({
    display: 'flex',
    width: '100vw',
    height: '90vh',
    flexDirection: 'column',
    justifyContent: 'center',
    overflowX: 'hidden',
    overflowY: 'scroll'
});

const TableHeader = styled.thead({
    display: 'flex',
    width: '100vw',
    height: '50px',
    backgroundColor: 'bisque',
    justifyContent: 'space-around'
});

const TableHeaderItem = styled.th({
    display: 'flex',
    width: '20%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center'
});

const TableBody = styled.tbody({
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: "column"
});

const TableRow = styled.tr({
    display: 'flex',
    height: '50px',
    justifyContent: 'space-around',
    borderBottom: '1px solid black',
    boxSizing: 'content-box',
    padding: '10px 0'
});

const TableRowItem = styled.td({
    display: 'flex',
    width: '20%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    'span:hover': {
        cursor: 'pointer',
        textDecoration: 'underline'
    }
});

const TableRowImage = styled.img({
    height: '100%',
    width: '100%',
    objectFit: 'contain',
    objectPosition: '0 0'
});