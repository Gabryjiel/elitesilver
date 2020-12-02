import Link from 'next/link';
import styled from 'styled-components';

function FooterBread({title, subtitle, description, image}:FooterBreadProps){
    
    return(
        <FooterBreadContainer>
            <FooterBreadTexts>

                {title && 
                    <Link href={title.href}>
                        <FooterBreadText>
                            {title.text}
                        </FooterBreadText>
                    </Link>}

                {subtitle && 
                    <Link href={subtitle.href}>
                        <FooterBreadText>
                            {subtitle.text}
                        </FooterBreadText>
                    </Link>}

                {description && 
                    <Link href={description.href}>
                        <FooterBreadText>
                            {description.text}
                        </FooterBreadText>
                    </Link>}

            </FooterBreadTexts>

            <FooterBreadLogo>
                <img src={image} />
            </FooterBreadLogo>

        </FooterBreadContainer>
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

const FooterBreadContainer = styled.div({
    display: "flex",
    width: "20vw",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderLeft: "1px solid black",
    borderTop: "1px solid black",
    backgroundColor: "bisque"
})

const FooterBreadTexts = styled.div({
    display: "flex",
    flexDirection: "column",
    width: "70%",
    textAlign: "end"
})

const FooterBreadLogo = styled.div({
    minWidth: "25%",
    maxWidth: "25%",
    height: "70%",
    margin: "0 5px",
    "img": {
        display: "block",
        objectFit: "cover",
        width: "100%",
        height: "100%",
        margin: 0,
        padding: 0,
        cursor: "pointer"
    }
})

const FooterBreadText = styled.div({
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: "medium",
    color: "black",
    "&:hover": {
        cursor: "pointer",
        textDecoration: "underline"
    }
})