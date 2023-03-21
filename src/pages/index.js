import Layout from "@/components/Layout";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Home({ pokemon }) {
  const router = useRouter();
  // console.log(pokemon);

  return (
    <Layout title="Pokemon App">
      <h1 className="text-2xl text-center">Pokemon NextJS App</h1>
      <ul>
        {pokemon.map((pokeman, index) => (
          <li
            className="cursor-pointer text-white border p-4 border-grey my-4 hover:shadow-md capitalize text-lg bg-gray-600 rounded-md"
            key={index}
            onClick={() => {
              router.push(`/pokemon?id=${index + 1}`);
            }}
          >
            <div>
              <span className="font-bold">{index + 1}.</span>
              <span className="m-8">{pokeman.name}</span>
              <img
                src={pokeman.image}
                alt={pokeman.name}
                height={150}
                width={150}
              />
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps(context) {
  //SSG
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const { results } = await res.json();

    const pokemon = results.map((result, index) => {
      const paddedIndex = ("00" + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
      // console.log(pokemon);

      return {
        ...result,
        image,
      };
    });
    return {
      props: { pokemon },
    };
  } catch (error) {
    console.log(error);
  }
}
