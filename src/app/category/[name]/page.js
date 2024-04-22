"use client"
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import PokemonList from "../../../components/PokemonList";
import { fetchPokemonsByCategory } from "../../../utils/fetch";
import LoadingSpinner from "../../../components/LoadingSpinner";
import styled from 'styled-components'

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
  text-transform: capitalize;
`;

const Category = () => {
    const { name } = useParams();
    const { data, isLoading, error } = useQuery(["type", name], () =>
        fetchPokemonsByCategory(name)
    );
    const [isFiltered, setIsFiltered] = useState(false)
    const [filteredData, setFilteredData] = useState([])
    const [searchVal, setSearchVal] = useState('')

    useEffect(() => {
        if (searchVal) {
            setIsFiltered(true)
            setFilteredData(data?.pokemon?.filter(t => t.pokemon.name.includes(searchVal)));
        } else setIsFiltered(false)
    }, [searchVal]);



    if (isLoading) return <LoadingSpinner />;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <input onChange={(e) => setSearchVal(e.target.value)} />
            <Title >{name} Pokemons</Title>
            <PokemonList pokemons={isFiltered ? filteredData : data?.pokemon} />
        </div>
    );
};

export default Category;
