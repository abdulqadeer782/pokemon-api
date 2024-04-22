import React from "react";
import styled from "styled-components";
import DynamicChart from "react-apexcharts";

// Styled components
const Container = styled.div`
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
  text-transform: capitalize;
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
  color: #666;
  margin-top: 2rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 0.5rem;
`;

const ListItem = styled.li`
  font-size: 1.2rem;
  color: #888;
`;

const ChartContainer = styled.div`
  margin-top: 2rem;
`;

const PokemonDetails = ({ pokemonDetail }) => {
    const { name, stats, abilities } = pokemonDetail;

    if (!stats || !abilities) {
        return <div>Error fetching Pokémon details</div>;
    }

    const chartOptions = {
        chart: {
            id: "stats-chart",
            toolbar: {
                show: false,
            },
        },
        xaxis: {
            categories: stats.map((stat) => stat.stat.name),
            labels: {
                style: {
                    colors: "#333",
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#333",
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            bar: {
                columnWidth: "45%",
            },
        },
        colors: ["#f44336"],
    };

    const series = [{ name: "Stats", data: stats.map((stat) => stat.base_stat) }];

    return (
        <Container>
            <Title>{name} Details</Title>
            <SubTitle>Abilities</SubTitle>
            <List>
                {abilities.map((ability) => (
                    <ListItem key={ability.ability.name}>{ability.ability.name}</ListItem>
                ))}
            </List>
            <SubTitle>Stats</SubTitle>
            <ChartContainer>
                <DynamicChart options={chartOptions} series={series} type="bar" />
            </ChartContainer>
        </Container>
    );
};

export default PokemonDetails;
