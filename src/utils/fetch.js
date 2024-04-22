export const fetchCategories = async () => {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/type/");
        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

export const fetchPokemonsByCategory = async (categoryName) => {
    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/type/${categoryName}`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch pokemons for category");
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching pokemons by category:", error);
        throw error;
    }
};

export async function fetchPokemonDetails(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch Pokémon details: ${name}`);
    }
    const data = await response.json();
    return data;
}
