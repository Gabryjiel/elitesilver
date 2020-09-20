import React from 'react';

export default function TournamentTabs({path, goTo, id}: TournamentTabsProps){

    const tabs = [
        { name: 'Info', href: `/tournaments/${id}`},
        { name: 'Schemat', href: `/tournaments/${id}/brackets`},
        { name: 'Mecze', href: `/tournaments/${id}/matches`},
        { name: 'Uczestnicy', href: `/tournaments/${id}/participants`},
    ]

    return(
        <nav className="navigation-tabs">
            {tabs.map(tab => {

                const active = path === tab.href

                return(
                    <div key={tab.name} onClick={() => goTo(tab.href)} className={`navigation-tabs-item 
                        ${active ? 'navigation-tabs-item-active' : ''}`}>
                        {tab.name}
                    </div>
                )
            })}
        </nav>
    )
}

type TournamentTabsProps = {
    path: string,
    goTo: (path: string, event?: React.MouseEvent) => void,
    id: number
}