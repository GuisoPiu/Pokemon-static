import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { pokeApi } from '../../api';

import { Layout } from '../../components/layouts'
import { Pokemon } from '../../interfaces';

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {


  return (
    <Layout title='Algun Pokemon'>
        <h1>{ pokemon.name }</h1>
    </Layout>
  )
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
  const pokemon151 = [...Array(151)].map((value, index) => ( `${ index + 1 }`));
  
  return {
    paths: pokemon151.map( id => ({
      params: { id } // objeto
    })),
    fallback: false
  };
}



export const getStaticProps: GetStaticProps = async ({ params }) => {
 
  const { id } = params as { id: 'string'};
  
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${ id }`);

  
  return {
    props: {
      pokemon: data
    }, // will be passed to the page component as props
  }
}

export default PokemonPage

