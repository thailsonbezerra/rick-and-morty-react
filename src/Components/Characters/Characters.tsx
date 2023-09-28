import React, { FormEvent, useEffect, useState } from "react";
import Head from "../Head";
import styles from "./Characters.module.css";
import { Link } from "react-router-dom";
import { GET_ALL_CHARACTERS } from "../../api";
import useFetch from "../../Hooks/useFetch";
import Button from "../Forms/Button/Button";
import Image from "../../Helper/Image";
import Input from "../Forms/Input/Input";
import useForm from "../../Hooks/useForm";

interface Info {
  count: number;
  next: string;
  pages: number | null;
  prev: number | null;
}

interface Location {
  name: string;
  url: string;
}

interface Characters {
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

const Characters = () => {
  const [characters, setCharacters] = React.useState<Characters[]>([]);
  const [info, setInfo] = React.useState<Info | null>(null);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [lastPage, setLastPage] = React.useState<number>(0);
  const { loading, error, request } = useFetch();
  const pesquisar = useForm();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCharacters([]);
    setCurrentPage(1);
    setLastPage(0);
  };

  const getAllCharacters = async () => {
    try {
      const { url, options } = await GET_ALL_CHARACTERS(
        currentPage,
        pesquisar.value
      );
      const { response, json } = await request(url, options);
      if (response) {
        setCharacters((prevCharacters) => [...prevCharacters, ...json.results]);
        setInfo(json.info);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (lastPage === 0) {
      getAllCharacters();
      setLastPage(currentPage);
      setCurrentPage((prevPage) => prevPage + 1);
    }

    let wait = false;
    const previousScrollPosition =
      window.scrollY || document.documentElement.scrollTop;
    function infiniteScroll() {
      const currentScrollPosition =
        window.scrollY || document.documentElement.scrollTop;

      const sectionHeight =
        document.querySelectorAll("section")[0].offsetHeight;
      const pageHeight = window.scrollY;
      const heightHasFetch = sectionHeight - pageHeight < 1000;

      if (
        heightHasFetch &&
        !wait &&
        currentScrollPosition > previousScrollPosition &&
        lastPage !== currentPage &&
        info?.next &&
        !loading
      ) {
        setLastPage(currentPage);
        getAllCharacters();
        setCurrentPage((prevPage) => prevPage + 1);
        wait = true;
      }
    }

    window.addEventListener("scroll", infiniteScroll);
    window.addEventListener("wheel", infiniteScroll);

    return () => {
      window.removeEventListener("wheel", infiniteScroll);
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, [lastPage, currentPage, info]);

  return (
    <section className={`animeLeft`}>
      <h1 className="title">Personagens</h1>
      <form action="" className={styles.form_pesquisar} onSubmit={handleSubmit}>
        <Input type="text" name="pesquisar" {...pesquisar} />
        <Button>Pesquisar</Button>
      </form>

      <div className={`${styles.characters}`}>
        <Head
          title="RMR - Personagens"
          description="Listagem dos personagens da série Rick and Morty"
        />
        <div className={styles.cards}>
          {characters.map((character) => (
            <Link
              key={character.id}
              to={`/character/${character.id}`}
              className={`${styles.card}`}
            >
              <Image src={character.image} alt={character.name} />
              <img src={character.image} />
              <div className={`${styles.card_content}`}>
                <div className={styles.card_info}>
                  <span className={`${styles.card_title}`}>
                    {character.name}
                  </span>
                  <div className={`${styles.card_subtitle}`}>
                    <div>
                      <p>
                        {character.species}, {character.gender}
                      </p>
                      <p>Origem: {character.origin.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Characters;
