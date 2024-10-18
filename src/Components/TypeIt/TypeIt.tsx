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
  const [input, setInput] = React.useState<string>("");
  const [charName, setCharName] = React.useState<string[] | null>(null);
  const [charNameInput, setCharNameInput] = React.useState<string[]>([]);
  const [charNameRest, setCharNameRest] = React.useState<string[]>([]);

  const [inputQuantity, setInputQuantity] = React.useState<number>(0);
  const [inputCorrectQuantity, setInputCorrectQuantity] =
    React.useState<number>(0);
  const [skippedCharQuantity, setskippedCharQuantity] =
    React.useState<number>(0);
  const [sequenceQuantityCorrect, setSequenceQuantityCorrect] =
    React.useState<number>(0);
  const [isSequenceVisible, setIsSequenceVisible] = React.useState(false);

  const changeCharacter = (
    event: React.MouseEvent<HTMLButtonElement> | null = null
  ) => {
    event && setskippedCharQuantity((prev) => prev + 1);

    setChange(true);
    setCharName(null);
    setCharNameInput([]);
    setCharNameRest([]);
    setInput("");
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
      if (character?.name.includes("’")) changeCharacter();
    }
  }, [change, character]);

  React.useEffect(() => {
    if (sequenceQuantityCorrect % 6 === 0 && sequenceQuantityCorrect !== 0) {
      setIsSequenceVisible(true);
      const timer = setTimeout(() => {
        setIsSequenceVisible(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [sequenceQuantityCorrect]);

  React.useEffect(() => {
    if (charNameRest.length === 0 && charName) {
      setCharNameRest(charName);
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();

      const allowedCharacters =
        " abcçdefghijklmnopqrstuvwxyzABCÇDEFGHIJKLMNOPQRSTUVWXYZ0123456789,.:-?!()[]{}<>+=@#$%&*;\"'\\|/`^~_<>";

      if (allowedCharacters.includes(event.key)) {
        setInputQuantity((prev) => prev + 1);
        setInput(event.key);
        setTimeout(() => {
          setInput("");
        }, 3500);
      }

      if (
        charName &&
        inputs.length !== charName.length &&
        charName[inputs.length].toLowerCase() === event.key.toLowerCase()
      ) {
        setInputCorrectQuantity((prev) => prev + 1);
        setSequenceQuantityCorrect((prev) => prev + 1);
        inputs.push(charName[inputs.length]);
        setCharNameInput([...inputs]);
        setCharNameRest(charName.slice(inputs.length));

        if (inputs.length === charName.length) {
          setCharName(null);
          setCharNameInput([]);
          setCharNameRest([]);
          changeCharacter();
        }
      } else {
        setSequenceQuantityCorrect(0);
        setIsSequenceVisible(false);
        const app = document.querySelector(".App");
        if (app && allowedCharacters.includes(event.key)) {
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

  if (loading)
    return <p className={styles.loading_typeit}>{"Carregando..."}</p>;
  if (error) return <p>{"Erro"}</p>;
  return (
    <>
      <section className={styles.score}>
        <span>{inputQuantity}</span>
        <span className={styles.score_input_success}>
          {inputCorrectQuantity}
        </span>
        <span className={styles.score_input_fail}>
          {inputQuantity - inputCorrectQuantity}
        </span>
      </section>
      <section className={styles.typeit_container}>
        <h1 className={styles.typed}>{input}</h1>
        <div>
          <p className={styles.character_name}>
            <span className={styles.input}>{charNameInput}</span>
            <span className={styles.rest}>{charNameRest}</span>
          </p>
          <Button onClick={changeCharacter}>Alterar Personagem</Button>
          <p>2:13</p>
        </div>
      </section>
      {isSequenceVisible && (
        <span className={styles.score_sequence_success}>
          x{sequenceQuantityCorrect}
        </span>
      )}
    </>
  );
};

export default TypeIt;
