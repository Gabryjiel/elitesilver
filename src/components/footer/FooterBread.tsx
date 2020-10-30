import { MouseEvent } from "react";

function FooterBread({title, subtitle, description, image, goToPath}:FooterBreadProps){
    
    return(
        <div className='footer-main'>
            <div className="footer-main-bread">

                <div onClick={(event) => goToPath(title.href, event)} className={`footer-main-title ${title.href && 'hoverable'}`}>
                    {title.content}
                </div>

                <div onClick={(event) => goToPath(subtitle.href, event)} className={`footer-main-subtitle ${subtitle.href && 'hoverable'}`}>
                    {subtitle.content}
                </div>

                <div onClick={(event) => goToPath(description.href, event)} className={`footer-main-description ${description.href && 'hoverable'}`}>
                    {description.content}
                </div>

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
    goToPath: (path: string, event?: MouseEvent) => void
};

type HrefContent = {
    href: string,
    content: string
}