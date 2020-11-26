import { useRouter } from 'next/router';

import FooterNav from './FooterNav';
import FooterTabs from './FooterTabs';
import FooterBread from './FooterBread';

function Footer({texts, tabs, image}: FooterProps){

    const [title, subtitle, description] = texts;
    const location = useRouter().asPath;

    return(
        <div className='footer-container'>

            <FooterNav info={[]} />
            {tabs.length > 0 && <FooterTabs tabs={tabs} location={location} />}
            {title.text && <FooterBread title={title} subtitle={subtitle} description={description} image={image} />}

        </div>    
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