import React from "react";
import { GET_ALL_CHARACTERS, GET_CHARACTER } from "../../api";
import useFetch from "../../Hooks/useFetch";
import Button from "../Forms/Button/Button";

interface Info {
    count: number;
    next: string;
    pages: number | null;
    prev: number | null;
}

interface Character {
    created: string;
    episode: string | string[];
    gender: string;
    id: number;
    image: string;
    location: Location;
    name: string;
    origin: Location;
    species: string;
    status: string;
    type: string;
    url: string;
}

const TypeIt = () => {

    const { loading, error, request } = useFetch();
    const [info, setInfo] = React.useState<Info | null>(null);
    const [character, setCharacter] = React.useState<Character | null>(null);
    const [change, setChange] = React.useState<boolean>(false);
    
    const [charName, setCharName] = React.useState<string[] | null>(null);
    const charNameInput: string[] = []

    const changeCharacter = () => {
        setChange(true)
    }
    
    const getAllCharacters = async () => {
        try {
            const { url, options } = await GET_ALL_CHARACTERS(1, '');
            const { response, json } = await request(url, options);
            if (response) {
                setInfo(json.info);
                setChange(true)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getCharacter = async (id: string) => {
        try {
            const { url, options } = await GET_CHARACTER(id);
            const { response, json } = await request(url, options);
            if (response) {
                setCharacter(json)
                setChange(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getAllCharacters();
    }, [])
    
    React.useEffect(() => {
        if(change && info) {
            const id = Math.floor(Math.random() * (info.count - 1 + 1)) + 1
            getCharacter(id.toString());
        }

        if (!change && character) {
            setCharName(character?.name.split(''))
        }
    }, [change, character])

    React.useEffect(() => {
        const handleKeyDown = (event: any) => {

            if(charName && charNameInput.length !== charName.length &&(charName[charNameInput.length].toLowerCase() === event.key.toLowerCase())){
                charNameInput.push(event.key.toLowerCase())

                if(charNameInput.length === charName.length){
                    setCharName(null)
                    changeCharacter()                    
                }
            }
        
        };
    
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [charName]);
    
    React.useEffect(() => {
        
    }, [character]);

    if (loading) return <p>{'Carregando...'}</p>
    if (error) return <p>{'Erro'}</p>
     return (
        <div>
            <p>{character?.name}</p>
            <Button onClick={changeCharacter}>Alterar Personagem</Button>
        </div>
    )
}

export default TypeIt