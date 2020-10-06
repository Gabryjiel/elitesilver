import React from 'react';
import { connect } from 'react-redux';
import { setTitle } from '../../redux/actions/main';

function Footer({data, goTo}: FooterProps){

    if(!data)
        data = {
            first: {text: 'Fefurusek vs Sznifferek'},
            second: {text: 'Elite Silver I', href: '/tournaments/1'},
            third: {text: 'Finał'},
            tabs: [
                {text: 'Info', href: ''}, 
                {text: 'Schemat', href: '', active: true},
                {text: 'Mecze', href: ''},
                {text: 'Uczestnicy', href: ''}
            ]
        }
    
    return(
        <div className='footer-container'>

            <div className='footer-nav'>
                <div className='contet-nav'>
                    PROFIL
                </div>
            </div>

            <div className='footer-tabs'>
                {data.tabs.map((tab, idx) => 
                    <div className={`${!tab.href ? 'footer-tabs-active' : ''}`} onClick={() => goTo(tab.href)}>
                        {tab.text}
                    </div>
                )}
            </div>
            
            <div className='footer-main'>
                <div className="footer-main-bread">
                    <div className={`footer-main-title ${data.first.href && 'hoverable'}`}>
                        {data.first.text}
                    </div>
                    <div className={`footer-main-subtitle ${data.first.href && 'hoverable'}`} onClick={() => goTo(data.second.href)}>
                        {data.second.text}
                    </div>
                    <div className={`footer-main-description ${data.first.href && 'hoverable'}`}>
                        {data.third.text}
                    </div>
                </div>
                <div className='footer-main-logo'>
                    <img src="https://tinyurl.com/y4qwtnca" />
                </div>
            </div>

        </div>    
    );
}

const mapStateToProps = (state:any) => ({
    title: state
});

const mapDispatchToProps = {
    setTitle: setTitle
}

type FooterProps = {
    data: FooterData,
    goTo: (path:string) => void
}

type FooterData = {
    first: any,
    second: any,
    third: any,
    tabs: Array<any>
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);