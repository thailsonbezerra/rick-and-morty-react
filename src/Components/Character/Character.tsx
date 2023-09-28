import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Head from "../Head";
import { GET_ALL_EPISODES, GET_CHARACTER, GET_LOCATION } from "../../api";
import Image from "../../Helper/Image";
import styles from "./Character.module.css";
import Dropdown from "../../Utils/Dropdown/Dropdown";
import Button from "../Forms/Button/Button";
import Modal from "../../Utils/Modal/Modal";

interface LocationAndOrigin {
  name: string;
  url: string;
}

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: LocationAndOrigin;
  location: LocationAndOrigin;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residentes: string[];
  error?: string;
}

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
  error?: string;
}

const Character = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [location, setLocation] = useState<string[] | null>(null);
  const [episodes, setEpisodes] = useState<Episode[] | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getCharacter = async (url: string, options: RequestInit) => {
    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (data.error) setError(`Um error ocorreu: ${data.error}`);
      else setCharacter(data);

      setLoading(false);
    } catch (error) {
      setError(`Um erro ocorreu: ${error}`);
    }
  };

  const getLocation = async (url: string, options: RequestInit) => {
    try {
      const response = await fetch(url, options);
      const data: Location = await response.json();

      if (data.error) setError(`Um error ocorreu: ${data.error}`);
      else {
        const localizacao = [
          `Nome: ${data.name}`,
          `Dimensão: ${data.dimension}`,
          `Tipo: ${data.type}`,
        ];

        setLocation(localizacao);
      }

      setLoading(false);
    } catch (error) {
      setError(`Um erro ocorreu: ${error}`);
    }
  };

  const getAllEpisodes = async (url: string, options: RequestInit) => {
    try {
      const response = await fetch(url, options);
      const data: Episode[] | Episode = await response.json();

      if (Array.isArray(data)) setEpisodes(data);
      else if (data.error) setEpisodes([]);
      else setEpisodes([data]);

      setLoading(false);
    } catch (error) {
      setError(`Um erro ocorreu: ${error}`);
    }
  };

  useEffect(() => {
    setLoading(true);

    const { url, options } = GET_CHARACTER(id!);
    getCharacter(url, options);
  }, [id]);

  useEffect(() => {
    if (character && character.location && character.location.url !== null) {
      const { url, options } = GET_LOCATION(character.location.url);
      getLocation(url, options);
    }

    if (character && character.episode) {
      const ids = character.episode.map((episode) => {
        return episode.replace("https://rickandmortyapi.com/api/episode/", "");
      });

      if (ids) {
        const { url, options } = GET_ALL_EPISODES(ids);
        getAllEpisodes(url, options);
      }
    }
  }, [character]);

  if (loading) return <div className="loading"></div>;
  if (error) return <p>{error}</p>;
  if (character === null) return null;
  return (
    <section className={`animeLeft ${styles.character_container}`}>
      <Head
        title={`RMR - ${character.name}`}
        description={`Personagem ${character.name} da série Rick and Morty.`}
      />
      <div className={`${styles.character_content}`}>
        <h1 className="title">{character.name}</h1>
        <ul>
          <li>Genero: {character.gender}</li>
          <li>Origem: {character.origin.name}</li>
          <li>Especie: {character.species}</li>
          <li>Estado: {character.status}</li>
          <Dropdown items={location ? location : []}>Ver localização</Dropdown>
        </ul>
      </div>
      <div>
        <img src={character.image} alt={character.name} />
        <Button onClick={openModal} className={styles.btn_eps}>
          Lista de Episódios
        </Button>
        <Modal
          title={"Lista de episódios"}
          isOpen={isModalOpen}
          onClose={closeModal}
        >
          <ul>
            {episodes !== null &&
              episodes.map((episode) => (
                <li
                  key={episode.id}
                >{`${episode.episode} - ${episode.name}`}</li>
              ))}
          </ul>
        </Modal>
      </div>
    </section>
  );
};

export default Character;
