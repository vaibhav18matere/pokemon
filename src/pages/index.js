import Layout from "@/components/Layout";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Home({ pokemon }) {
  const router = useRouter();

  return (
    <Layout title="Pokemon App">
      <div className="w-full">
        <div className="">
          <input
            className="w-full rounded-md shadow-md h-10 p-2 text-xl"
            type="text"
            placeholder="Search Pokemon..."
          />
        </div>
        <div className="cursor-pointer">
          {pokemon.map((pokeman, index) => (
            <div
              className="m-4"
              key={index}
              onClick={() => {
                router.push(`/pokemon?id=${index + 1}`);
              }}
            >
              <div className="p-4 bg-white rounded-xl shadow-md">
                <span className="font-bold">{index + 1}.</span>
                <span className="font-bold p-1 ml-4">{pokeman.name}</span>
                <Image
                  src={pokeman.image}
                  alt={pokeman.name}
                  height={150}
                  width={150}
                ></Image>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const { results } = await res.json();

    const pokemon = results.map((result, index) => {
      const paddedIndex = ("00" + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;

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
