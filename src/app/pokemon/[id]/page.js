"use client"
import React from 'react'
import { useQuery } from 'react-query';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useParams } from 'next/navigation';
import { fetchPokemonDetails } from '@/utils/fetch';
import PokemonDetails from '@/components/PokemonDetails';

function Page() {
    const { id } = useParams();

    const { data, isLoading, error } = useQuery(["pokemon", id], () =>
        fetchPokemonDetails(id)
    );

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div>Error: {error.message}</div>;

    return <PokemonDetails pokemonDetail={data} index={''} />
}



export default Page;
