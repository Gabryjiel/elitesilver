import Link from 'next/link';
import styled from 'styled-components';

function Table({headers, rows}: TableProps) {

    return(
        <TableContainer>
            {headers && 
                <TableHeader>
                    <TableHeaderRow>

                    {headers.map((item, itemNo) => (
                            <TableHeaderItem key={`Header item no ${itemNo}`}>
                                <span className={item.classes}>
                                    { item.content }
                                </span>
                            </TableHeaderItem>
                    ))}

                    </TableHeaderRow>
            </TableHeader>}

            <TableBody>

                {rows?.map((row, rowNo) => (
                    <TableRow key={`Row no ${rowNo}`} >

                        {row?.map((item, itemNo) => (
                            <TableRowItem key={`Row no ${rowNo}/Item no ${itemNo}`}>
                                <Link href={item.href || ''}>
                                    {String(item.content).includes('http') ?
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
    rows: TableItem[][],
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
    alignItems: 'center',
    tableLayout: 'fixed',
    fontSize: '1.2vw'
});

const TableHeader = styled.thead({
    position: "fixed",
    top: 0,
    display: 'flex',
    width: '100vw',
    height: '5vh',
    backgroundColor: 'bisque',
    justifyContent: 'space-around',
    padding: '0 5vw'
});

const TableHeaderItem = styled.th({
    display: 'flex',
    height: '100%',
    flexGrow: 1,
    flexBasis: 0,
    justifyContent: 'flex-start',
    alignItems: 'center'
});

const TableBody = styled.tbody({
    display: 'flex',
    position: "fixed",
    top: "5%",
    width: '90vw',
    height: '85vh',
    flexDirection: "column",
    overflowY: "scroll",
    scrollbarWidth: "none"
});

const TableHeaderRow = styled.tr({
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around'
});

const TableRow = styled.tr({
    width: '100%',
    display: 'flex',
    height: '50px',
    justifyContent: 'space-around',
    boxSizing: 'content-box',
    padding: '10px 0',
    borderBottom: '1px solid black',
    '&:last-child': {
        borderBottom: 'none'
    }
});

const TableRowItem = styled.td({
    display: 'flex',
    flexGrow: 1,
    flexBasis: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'visible',
    'span:hover': {
        cursor: 'pointer',
        textDecoration: 'underline'
    },
    ".blue": {
        color: 'darkblue'
    },
    ".red": {
        color: 'darkred'
    }
});

const TableRowImage = styled.img({
    height: '100%',
    width: '100%',
    objectFit: 'contain',
    objectPosition: '0 0'
});