export const TournamentIndex = [
    {content: 'Turnieje', href: '/tournaments'},
    {content: 'Uczestnicy', href: '/participants'},
    {content: 'Mecze', href: '/matches'},
    {content: 'Postacie', href: '/champions'}
]

export const TournamentTabs = (id: number) => {

    const tabs = [
        {content: 'Info', href: `/tournaments/${id}`}, 
        {content: 'Schemat', href: `/tournaments/${id}/brackets`},
        {content: 'Mecze', href: `/tournaments/${id}/matches`},
        {content: 'Uczestnicy', href: `/tournaments/${id}/participants`}
    ];

    return tabs;
};

export const MatchesTabs = (id: number, amount: number) => {

    const tabs = [
        {content: 'Info', href: `/matches/${id}`}
    ];

    for(let i = 0; i < amount; i++)
        tabs.push({content: `Gra ${i + 1}`, href: `/matches/${id}/${i + 1}`})

    return tabs;
};