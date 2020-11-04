import { MouseEvent } from "react";
import { connect } from 'react-redux';

function Table({headers, rows, goTo}: TableProps){

    return(
        <div className="table">
            
            <div className="table-header">
                {headers.map(item => <div key={item} className="table-header-item">{item}</div>)}
            </div>

            <div className="table-body">
                {rows.map(row => 
                    <div key={row.content[0]} className="table-row" onClick={event => goTo(row.href, event)}>
                        {row.content.map((item, idx) => <div key={row.content[0] + idx} className="table-element table-row-flexed">{item}</div>)}
                    </div>  
                )}
            </div>

        </div>
    );
};

type table = {headers:Array<string>, rows:Array<any>};

const mapStateToProps = (state:any) => {
    const { headers, rows }:table = state.table;

    return {
        headers: headers,
        rows: rows
    }
};

export default connect(mapStateToProps)(Table);

type TableProps = {
    headers: Array<string>,
    rows: Array<TableRows>,
    goTo: (path: string, event?: MouseEvent) => void
}

type TableRows = {
    content: Array<string>,
    href: string
}