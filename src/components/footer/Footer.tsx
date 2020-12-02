import { useRouter } from 'next/router';
import styled from 'styled-components';

import FooterNav from './FooterNav';
import FooterTabs from './FooterTabs';
import FooterBread from './FooterBread';

function Footer({texts, tabs, image}: FooterProps){

    const [title, subtitle, description] = texts;
    const location = useRouter().asPath;

    return(
        <FooterContainer>

            <FooterNav info={[]} />
            {tabs.length > 0 && <FooterTabs tabs={tabs} location={location} />}
            {title.text && <FooterBread title={title} subtitle={subtitle} description={description} image={image} />}

        </FooterContainer>    
    );
}

export default Footer;

interface FooterProps {
    texts: FooterText[],
    tabs: Array<any>,
    image: string
};

interface FooterText {
    text: string,
    href: string
}

const FooterContainer = styled.footer({
    display: "flex",
    justifyContent: "space-between",
    height: "10vh",
    width: "100%",
    zIndex: 10
})