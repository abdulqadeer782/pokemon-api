"use client"
import React, { useState } from "react";
import styled from "styled-components";
import PokemonDetails from "./PokemonDetails";
import { MotionDiv } from "./MotionDiv";
import Link from "next/link";

const StyledPokemonList = styled(MotionDiv)`
  .pokemon-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 3rem;
  }

  .pokemon-item {
    width: calc(25% - 1rem);
    margin-bottom: 1rem;
  }

  .pokemon-name {
    font-weight: bold;
    color: white;
    font-size: 1.5rem;
    line-height: 1.5;
    text-align: center;
    cursor: pointer;
  }

  .pokemon-name:hover {
    text-decoration: underline;
  }
`;

const PokemonList = ({ pokemons = [], index }) => {
    const [pokemonData, setPokemonData] = useState(null);

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const handleClick = async (pokemonUrl) => {
        try {
            const response = await fetch(pokemonUrl);
            const data = await response.json();
            setPokemonData(data);
        } catch (error) {
            console.error("Error fetching Pokémon:", error);
        }
    };

    return (
        <StyledPokemonList
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{
                delay: index * 0.25,
                ease: "easeInOut",
                duration: 0.5,
            }}
            viewport={{ amount: 0 }}
        >
            <div className="pokemon-container">
                {pokemons.map((pokemon) => (
                    <div
                        key={pokemon.pokemon.name}
                        className="pokemon-item"
                    // onClick={() => handleClick(pokemon.pokemon.url)}
                    >
                        <Link href={`/pokemon/${pokemon?.pokemon.url?.toString()?.split('/')?.reverse()[1]}`}>
                            <span className="pokemon-name">{pokemon.pokemon.name}</span>
                        </Link>
                    </div>
                ))}
            </div>
        </StyledPokemonList>
    );
};

export default PokemonList;
