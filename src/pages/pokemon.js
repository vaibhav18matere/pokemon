import React from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";

export default function pokemon({ pokeman }) {
  return (
    <>
      <Layout title={pokeman.name}>
        <h1 className="font-extrabold mr-1 text-4xl">{pokeman.name}</h1>
        <Image
          src={pokeman.image}
          alt={pokeman.name}
          height={200}
          width={200}
          className=""
          style={{ maxWidth: "100%", height: "auto" }}
        ></Image>
        <div className="font-bold">Weight : {pokeman.weight}</div>
        <div className="font-bold">Height : {pokeman.height}</div>
        <h2 className="mt-4 mb-2 text-2xl font-bold">Types</h2>
        {pokeman.types.map((type, index) => (
          <p key={index}>{type.type.name}</p>
        ))}
        <p className="mt-10 text-center">
          <Link className="text-2xl underline" href="/">
            Back to home
          </Link>
        </p>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const id = query.id;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokeman = await res.json();
    const paddedIndex = ("00" + id).slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
    pokeman.image = image;
    return {
      props: {
        pokeman,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
