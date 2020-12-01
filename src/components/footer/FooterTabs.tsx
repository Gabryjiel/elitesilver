import Link from 'next/link';
import styled from 'styled-components';

function FooterTabs({tabs, location}: FooterTabsProps){
    
    return(
        <FooterTabsContainer>

            {tabs && tabs.map((tab, idx) => {
                
                const isActive = location === tab.href;

                return(
                    <Link href={tab.href} key={`Tab no ${idx}`}>
                        <FooterTab active={isActive}>
                            {tab.content}
                        </FooterTab>
                    </Link>
                )}
            )}

        </FooterTabsContainer>
    )
}

export default FooterTabs;

type FooterTabsProps = {
    tabs: Array<any>,
    location: string
}

const FooterTabsContainer = styled.div({
    maxWidth: "60bw",
    display: "flex",
    justifyContent: "space-around",
    borderTop: "1px solid black",
    borderLeft: "1px solid black",
    alignItems: "center",
    backgroundColor: "bisque"
})

const FooterTab = styled.div<{active: boolean}>(({active}: any) => ({
    color: active ? 'red' : 'inherit',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexBasis: 0,
    flexGrow: 1,
    width: "10vw",
    fontSize: "large",
    "&:hover": {
        cursor: active ? "inherit" : "pointer",
        textDecoration: active ? "inherit" : "underline"
    }
}));