import { MouseEvent } from "react";

function Table({header, rows, goTo}: TableProps){

    return(
        <div className="table">
            
            <div className="table-header">
                {header.map(item => <div key={item} className="table-header-item">{item}</div>)}
            </div>

            <div className="table-rows">
                {rows.map(row => 
                    <div key={row.content[0]} className="table-row" onClick={event => goTo(row.href, event)}>
                        {row.content.map(item => <div key={item} className="table-row-item">{item}</div>)}
                    </div>  
                )}
            </div>

        </div>
    );
};

export default Table;

type TableProps = {
    header: Array<string>,
    rows: Array<TableRows>,
    goTo: (path: string, event?: MouseEvent) => void
}

type TableRows = {
    content: Array<string>,
    href: string
}