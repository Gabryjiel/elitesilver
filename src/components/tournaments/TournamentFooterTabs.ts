export const tabs = (id: number, active: number) => {

    const tabs = [
        {content: 'Info', href: `/tournaments/${id}`}, 
        {content: 'Schemat', href: `/tournaments/${id}/brackets`},
        {content: 'Mecze', href: `/tournaments/${id}/matches`},
        {content: 'Uczestnicy', href: `/tournaments/${id}/participants`}
    ];

    //tabs[active].href = '';

    return tabs;
}