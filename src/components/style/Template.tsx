import Header from "../utils/Header";
import AppContainer from "./AppContainer";

export default function Template({children}: TemplateProps){
    return(
        <AppContainer>
            <Header />
            
            <main style={style}>
                {children}
            </main>
        </AppContainer>
    );
}

const style: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    margin: "10px 10vw",
    height: "90vh",
    //overflow: "hidden"
};

type TemplateProps = {
    children: React.ReactNode
}