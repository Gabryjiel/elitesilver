import Link from 'next/link';

function FooterBread({title, subtitle, description, image}:FooterBreadProps){
    
    return(
        <div className='footer-main'>
            <div className="footer-main-bread">

                <Link href={title.href}>
                    <div className={`footer-main-title ${title.href && 'hoverable'}`}>
                        {title.text}
                    </div>
                </Link>

                <Link href={subtitle.href}>
                    <div className={`footer-main-subtitle ${subtitle.href && 'hoverable'}`}>
                        {subtitle.text}
                    </div>
                </Link>

                <Link href={description.href}>
                    <div className={`footer-main-description ${description.href && 'hoverable'}`}>
                        {description.text}
                    </div>
                </Link>

            </div>

            <div className='footer-main-logo'>
                <img src={image} />
            </div>

        </div>
    )
}

export default FooterBread;

type FooterBreadProps = {
    title: HrefContent,
    subtitle: HrefContent,
    description: HrefContent,
    image: string,
};

type HrefContent = {
    href: string,
    text: string
}