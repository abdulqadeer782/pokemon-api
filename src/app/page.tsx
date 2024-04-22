"use client"
import { fetchCategories } from "@/utils/fetch";
import { useQuery } from "react-query";
import CategoryList from "@/components/CategoryList";
import LoadingSpinner from "@/components/LoadingSpinner";
import styled from 'styled-components'
import { useEffect, useState } from "react";

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
  text-transform: capitalize;
`;


export default function Home() {
    const { data, isLoading, error } = useQuery("categories", fetchCategories);
    const [isFiltered, setIsFiltered] = useState(false)
    const [filteredData, setFilteredData] = useState([])
    const [searchVal, setSearchVal] = useState('')

    useEffect(() => {
        if (searchVal) {
            setIsFiltered(true)
            setFilteredData(data?.results?.filter(c => c.name.includes(searchVal)));
        } else setIsFiltered(false)
    }, [searchVal]);

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <section>
            <input onChange={(e) => setSearchVal(e.target.value)} />
            <Title>Categories</Title>
            <CategoryList categories={isFiltered ? filteredData : data.results} index={''} />
        </section>
    );
}
