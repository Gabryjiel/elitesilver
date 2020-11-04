import React from 'react';
import { connect } from 'react-redux';
import { MouseEvent } from "react";

import { useRouter } from 'next/router';
import FooterNav from './FooterNav';
import FooterTabs from './FooterTabs';
import FooterBread from './FooterBread';

function Footer({title, subtitle, description, tabs, image}: FooterProps){
    
    const router = useRouter();

    const goToPath = (path: string, event?: MouseEvent) => {
        if (path) {
            event?.stopPropagation();
            router.push(path).then(() => console.log("AFTER"));
        }
    }

    return(
        <div className='footer-container'>

            <FooterNav info={[]} goToPath={goToPath} />
            {tabs.length > 0 && <FooterTabs tabs={tabs} goToPath={goToPath} />}
            {title.content && <FooterBread title={title} subtitle={subtitle} description={description} image={image} goToPath={goToPath} />}

        </div>    
    );
}

const mapStateToProps = (state:any) => {
    const local = state.footer;

    return {
        title: local.title,
        subtitle: local.subtitle,
        description: local.description,
        image: local.image,
        tabs: local.tabs
    }
};

type FooterProps = {
    data?: FooterData,
    goTo?: (path:string) => void,
    title: any,
    subtitle: any,
    description: any,
    tabs: Array<any>,
    image: string
}

type FooterData = {
    first: any,
    second: any,
    third: any,
    tabs: Array<any>
}

export default connect(mapStateToProps)(Footer);