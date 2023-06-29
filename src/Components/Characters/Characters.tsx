import React, { useEffect } from "react";
import Head from "../Head";
import styles from "./Characters.module.css";
import { Link } from "react-router-dom";
import { GET_ALL_CHARACTERS } from "../../api";
import useFetch from "../../Hooks/useFetch";
import Button from "../Forms/Button/Button";
import Image from "../../Helper/Image";

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

    const {loading,error,request} = useFetch()

    const getAllCharacters = async () =>{
        try {            
            const {url, options} = await GET_ALL_CHARACTERS(currentPage)
            const {response, json} = await request(url,options)
            if(response){
                setCharacters(prevCharacters => [...prevCharacters,...json.results])
                setInfo(json.info)  
            }
        } catch (error) {
            console.log(error)
        }
    } 

    useEffect(()=>{
        getAllCharacters();
    },[currentPage])

    const loadMoreCharacters = () => {
        if(info?.next){
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    return (
        <section className={`animeLeft`}>
            <div className={`${styles.characters}`}>
                <Head title="RMR - Personagens" description="Listagem dos personagens da série Rick and Morty"/>
                <div className={styles.cards}>
                    {characters.map(character =>(
                        <Link key={character.id} to={`/character/${character.id}`} className={`${styles.card}`}>
                            <Image src={character.image} alt={character.name}/>
                            <img src={character.image}/>
                            <div className={`${styles.card_content}`}>
                                <div className={styles.card_info}>
                                    <span className={`${styles.card_title}`}>{character.name}</span>
                                    <div className={`${styles.card_subtitle}`}>
                                        <div>
                                            <p>{character.species}, {character.gender}</p>            
                                            <p>Origem: {character.origin.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            {loading ? <Button disabled>Carregando...</Button> : <Button onClick={loadMoreCharacters}>Carregar mais</Button>}          
        </div>
        </section>
    );
       
}

    

 
export default Characters;