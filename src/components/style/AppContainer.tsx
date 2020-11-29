import styled from 'styled-components';

function AppContainer({children}: AppContainerProps){
    return(
        <AppWrapper>
            {children}
        </AppWrapper>
    )
}

export default AppContainer;

type AppContainerProps = {
    children: React.ReactNode
}

const AppWrapper = styled.div({

})