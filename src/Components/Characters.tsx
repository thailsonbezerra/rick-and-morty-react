import React, { useEffect } from "react";
import Head from "./Head";
import styles from "./Characters.module.css";

interface Info {
    count: number,
    next: string ,
    pages: number | null,
    prev: number | null 
}

interface Location {
    name: string,
    url: string,
}

interface Characters {
    created: string,
    episode: string | string[],
    gender: string,
    id: number,
    image: string,
    location: Location,
    name: string,
    origin: Location,
    species: string,
    status: string,
    type: string,
    url: string,
}


const Characters = () => {
    const [characters, setCharacters] = React.useState<Characters[]>([]);
    const [info, setInfo] = React.useState<Info | null>(null);
    const [currentPage, setCurrentPage] = React.useState<number>(1);

    const getAllCharacters = async () =>{
        try {            
            const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage}`)
            const data = await response.json();
            setCharacters(prevCharacters => [...prevCharacters,...data.results])
            setInfo(data.info)   
        } catch (error) {
            console.log(error)
        }
    } 

    useEffect(()=>{
        getAllCharacters();
    },[currentPage])

    const loadMoreCharacters = () => {
        getAllCharacters();
        if(info?.next){
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    return (
        <section className={`${styles.characters} animeLeft`}>
            <Head title="RMR - Personagens" description="Listagem dos personagens da série Rick and Morty"/>
           <div className={styles.cards}>
            {characters.map(character =>(
                <div key={character.id}>
                    <img src={character.image} alt={character.name}/>
                    <h1>{character.name}</h1>
                </div>   
            ))}
            </div>
            <button onClick={loadMoreCharacters}>Carregar mais</button>
        </section>
    );
       
}

    

 
export default Characters;