import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Head from "../Head";
import { GET_CHARACTER } from "../../api";

  interface LocationAndOrigin {
    name: string,
    url: string
  }

  interface Character {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: LocationAndOrigin,
    location: LocationAndOrigin,
    image: string,
    episode: string[],
    url: string,
    created: string
  }

const Character = () => {
    const [character, setCharacter] = useState<Character | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const {id} = useParams()

    const getCharacter = async (url: string, options: RequestInit) =>{
        try {            
            const response = await fetch(url,options)
            const data = await response.json();
            
            if(data.error) setError(`Um error ocorreu: ${data.error}`)
            else setCharacter(data)
            
            setLoading(false)    
            
        } catch (error) {
           setError(`Um erro ocorreu: ${error}`)
        }
    } 

    useEffect(()=>{
        setLoading(true)
        
        const {url, options} = GET_CHARACTER(id!)
        getCharacter(url, options);

    },[id])

    if(loading) return <div className="loading"></div>
    if(error) return <p>{error}</p>
    if(character === null) return null;
    return (
        <section className={`animeLeft`}>
            <Head title={`RMR - ${character.name}`} description={`Personagem ${character.name} da série Rick and Morty.`}/>
            <div>
                <img src={character.image} alt={character.name}/>
                <h1>{character.name}</h1>
                <p>{character.species}, {character.origin.name}</p>
            </div>
        </section>
    );
}
 
export default Character;