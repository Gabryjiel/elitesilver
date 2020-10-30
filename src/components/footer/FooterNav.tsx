import { MouseEvent } from "react";

function FooterNav({info, goToPath}: FooterNavProps){

    return(
        <div className='footer-nav'>

            <div className='footer-nav-tab' onClick={(event) => goToPath('/', event)}>
                Strona główna
            </div>

            <div className='footer-nav-tab' onClick={(event) => goToPath('/tournaments', event)}>
                Przeglądaj
            </div>

            {/* <div className='contet-nav' onClick={(event) => goToPath('/', event)}>
                Profil
            </div> */}

        </div>
    )
}

export default FooterNav;

type FooterNavProps = {
    info: Array<any>,
    goToPath: (path: string, event?: MouseEvent) => void
}