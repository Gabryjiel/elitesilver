import Footer from '../components/footer/Footer';
import AppContainer from '../components/style/AppContainer';
import Table from '../components/utilities/Table';

function Home({footer}: any) {

    return (
        <AppContainer>
            <Table />
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
