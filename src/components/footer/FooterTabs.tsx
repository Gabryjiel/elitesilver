import { useRouter } from "next/router";
import { MouseEvent } from "react";

function FooterTabs({tabs, goToPath}: FooterTabsProps){
    
    const location = useRouter().asPath;

    return(
        <div className='footer-tabs'>

            {tabs && tabs.map((tab, idx) => {
                
                const isActive = location === tab.href;

                return(
                    <div key={tab.content} onClick={(event) => !isActive && goToPath(tab.href, event)} className={`${isActive ? 'footer-tabs-active' : ''}`}>
                        {tab.content}
                    </div>
                )}
            )}

        </div>
    )
}

export default FooterTabs;

type FooterTabsProps = {
    tabs: Array<any>,
    goToPath: (path: string, event?: MouseEvent) => void
}