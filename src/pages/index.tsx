import Footer from '../components/footer/Footer';
import AppContainer from '../components/style/AppContainer';

function Home({footer}: any) {

    return (
        <AppContainer>
            <Footer texts={footer.texts} tabs={footer.tabs} image={footer.image} />
        </AppContainer>
    )
}

export default Home;

export async function getStaticProps() {

    return {
        props: {
            footer: {
                texts: [
                    {text: '', href: ''},
                    {text: '', href: ''},
                    {text: '', href: ''}
                ],
                tabs: [],
                image: ''
            }
        }
    };
};
