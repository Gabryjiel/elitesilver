import Link from 'next/link';

function FooterTabs({tabs, location}: FooterTabsProps){
    
    return(
        <div className='footer-tabs'>

            {tabs && tabs.map((tab, idx) => {
                
                const isActive = location === tab.href;

                return(
                    <Link href={tab.href}>
                        <div key={tab.content} className={`${isActive ? 'footer-tabs-active' : ''}`}>
                            {tab.content}
                        </div>
                    </Link>
                )}
            )}

        </div>
    )
}

export default FooterTabs;

type FooterTabsProps = {
    tabs: Array<any>,
    location: string
}