import Link from 'next/link';
import styled from 'styled-components';

function FooterNav({info}: FooterNavProps){

    return(
        <FooterNavContainer>

            <Link href={'/'}>
                <FooterNavItem>
                    Strona główna
                </FooterNavItem>
            </Link>

            <Link href={'/tournaments'}>
                <FooterNavItem>
                    Przeglądaj
                </FooterNavItem>
            </Link>

            {/* <div className='contet-nav' onClick={(event) => goToPath('/', event)}>
                Profil
            </div> */}

        </FooterNavContainer>
    )
}

export default FooterNav;

type FooterNavProps = {
    info: Array<any>
}

const FooterNavContainer = styled.nav({
    display: "flex",
    width: "20vw",
    justifyContent: "center",
    alignItems: "center",
    borderRight: "1px solid black",
    borderTop: "1px solid black",
    backgroundColor: "bisque"
})

const FooterNavItem = styled.div({
    flexBasis: 0,
    flexGrow: 1,
    "&:hover": {
        cursor: "pointer",
        textDecoration: "underline"
    }
})