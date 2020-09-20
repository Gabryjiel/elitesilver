import Template from '../src/components/style/Template';
import BracketItem from '../src/components/tournaments/Brackets/BracketItem';

export default function Home() {
  return (
    <Template>
      <BracketItem redPlayer="red" bluePlayer="blue" redScore={1} blueScore="2" />
    </Template>
  )
}
