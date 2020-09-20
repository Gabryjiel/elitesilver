import React from 'react';

export default function AppContainer({children}: AppContainerProps){
    return(
        <div id="app-container">
            {children}
        </div>
    )
}

type AppContainerProps = {
    children: React.ReactNode
}
