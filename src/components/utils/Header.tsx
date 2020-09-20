import React from 'react';
import { useRouter } from 'next/router';

export default function Header(){

    const router = useRouter();

    const goTo = (url: string) => {
        router.push(url);
    };

    return(
        <nav style={header}>
            <span className="header-item" onClick={() => goTo("/")}>Home</span>
            <span className="header-item-grow"></span>
            <span className="header-item" onClick={() => goTo("/tournaments")}>Turnieje</span>
            <span className="header-item" onClick={() => goTo("/profile")}>Statystyki</span>
        </nav>
    );
}

const header: React.CSSProperties = {
    textDecoration: "none",
    listStyleType: "none",
    height: "50px",
    backgroundColor: "#FFE9D6",
    position: "sticky",
    display: "flex",
    justifyContent: "left",
    alignItems: "center"
}