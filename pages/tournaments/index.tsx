import react from 'react';

import Template from '../../src/components/style/Template';
import TournamentsList from '../../src/components/tournaments/TournamentsList';

export default function Tournaments({data}){
    return(
        <Template>
            <TournamentsList data={data}/>
        </Template>
    )
}

export async function getStaticProps(){
    const res = await (await fetch(`http://localhost:3001/api/tournaments`)).json();
  
    return{
      props: {
        data: res
      }
    }
  }