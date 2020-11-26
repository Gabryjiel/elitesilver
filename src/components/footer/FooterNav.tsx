import Link from 'next/link';

function FooterNav({info}: FooterNavProps){

    return(
        <div className='footer-nav'>

            <Link href={'/'}>
                <div className='footer-nav-tab'>
                    Strona główna
                </div>
            </Link>

            <Link href={'/tournaments'}>
                <div className='footer-nav-tab'>
                    Przeglądaj
                </div>
            </Link>

            {/* <div className='contet-nav' onClick={(event) => goToPath('/', event)}>
                Profil
            </div> */}

        </div>
    )
}

export default FooterNav;

type FooterNavProps = {
    info: Array<any>
}