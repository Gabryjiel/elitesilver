import Template from '../../../src/components/style/Template';
import TournamentTabs from '../../../src/components/tournaments/TournamentTabs';
import { useRouter } from 'next/router';
import Footer from '../../../src/components/utils/Footer';

export default function Tournaments({data, id}: Props) {
  
  const router = useRouter();

  const goTo = (path: string) => {
      router.push(path);
  }

  data = {
      banner: "https://i.redd.it/is8khj2rkcn51.jpg",
      title: "Elite Silver",
      description: "HERE IS DESCRIPTION",
      first: "firster",
      second: 'seconder',
      third: 'thirder'
  }

  const footerData = {
    first: {text: 'Informacje'},
    second: {text: data.title, href: `/tournaments/${id}`},
    third: {text: ''},
    tabs: [
        {text: 'Info'}, 
        {text: 'Schemat', href: `/tournaments/${id}/brackets`},
        {text: 'Mecze', href: `/tournaments/${id}/matches`},
        {text: 'Uczestnicy', href: `/tournaments/${id}/participants`}
    ]
}

  return(
        <Template>
      
            <div className=".tournament-container">
                <div className="tournament-banner">
                    <img className="tournament-banner-image" src={data.banner} alt="Tournament Banner"/>
                    <div className="tournament-banner-title">
                        {data.title}
                    </div>
                    <div className="tournament-banner-podium">
                        <div className="trophy-gold">{data.first}</div>
                        <div className="trophy-silver">{data.second}</div>
                        <div className="trophy-bronze">{data.third}</div>
                    </div>
                </div>
                
                <div className="tournament-description">
                    {data.description}
                </div>
            </div>

            <Footer data={footerData} goTo={goTo}/>
        </Template>
  )
}

export async function getStaticPaths(){
    const res: Array<any> = await (await fetch('http://localhost:3001/api/tournaments')).json();
    const paths = res.map(tournament => `/tournaments/${tournament.id.toString()}`);

    return { paths, fallback: false};
}

export async function getStaticProps({params}:any){
  const res = await (await fetch(`http://localhost:3001/api/tournaments/${params.tId}/brackets`)).json();
  
  return{
    props: {
      data: res,
      id: params.tId
    }
  }
}

type Props = {
  data: any,
  id: number
}