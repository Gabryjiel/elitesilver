function AppContainer({children}: AppContainerProps){
    return(
        <div id="app-container">
            {children}
        </div>
    )
}

export default AppContainer;

type AppContainerProps = {
    children: React.ReactNode
}
