import React from "react";
import { GET_ALL_CHARACTERS, GET_CHARACTER } from "../../api";
import useFetch from "../../Hooks/useFetch";
import Button from "../Forms/Button/Button";
import styles from "./TypeIt.module.css";

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

  const inputs: string[] = [];
  const [charName, setCharName] = React.useState<string[] | null>(null);
  const [charNameInput, setCharNameInput] = React.useState<string[]>([]);
  const [charNameRest, setCharNameRest] = React.useState<string[]>([]);

  const changeCharacter = () => {
    setChange(true);
    setCharName(null);
    setCharNameInput([]);
    setCharNameRest([]);
  };

  const getAllCharacters = async () => {
    try {
      const { url, options } = await GET_ALL_CHARACTERS(1, "");
      const { response, json } = await request(url, options);
      if (response) {
        setInfo(json.info);
        setChange(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCharacter = async (id: string) => {
    try {
      const { url, options } = await GET_CHARACTER(id);
      const { response, json } = await request(url, options);
      if (response) {
        setCharacter(json);
        setChange(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getAllCharacters();
  }, []);

  React.useEffect(() => {
    if (change && info) {
      const id = Math.floor(Math.random() * (info.count - 1 + 1)) + 1;
      getCharacter(id.toString());
    }

    if (!change && character) {
      setCharName(character?.name.split(""));
    }
  }, [change, character]);

  React.useEffect(() => {
    if (charNameRest.length === 0 && charName) {
      setCharNameRest(charName);
    }

    const handleKeyDown = (event: any) => {
      event.preventDefault();

      if (
        charName &&
        inputs.length !== charName.length &&
        charName[inputs.length].toLowerCase() === event.key.toLowerCase()
      ) {
        inputs.push(event.key.toLowerCase());
        setCharNameInput([...inputs]);
        setCharNameRest(charName.slice(inputs.length));

        if (inputs.length === charName.length) {
          setCharName(null);
          setCharNameInput([]);
          setCharNameRest([]);
          changeCharacter();
        }
      } else {
        const app = document.querySelector(".App");
        if (app) {
          app.classList.add("skew-shake-y");
          setTimeout(() => {
            app.classList.remove("skew-shake-y");
          }, 300);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [charName]);

  if (loading) return <p>{"Carregando..."}</p>;
  if (error) return <p>{"Erro"}</p>;
  return (
    <section className={styles.typeit_container}>
      <p className={styles.character_name}>
        <span className={styles.input}>{charNameInput}</span>
        <span className={styles.rest}>{charNameRest}</span>
      </p>
      <Button onClick={changeCharacter}>Alterar Personagem</Button>
    </section>
  );
};

export default TypeIt;
