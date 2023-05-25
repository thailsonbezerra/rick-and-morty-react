import foto from '../img/sobre.png';
import styles from './About.module.css';

const About = () => {
    return (
        <section className={`${styles.about} animeLeft`}>
            <img src={foto} alt="foto" />
            <div className={styles.information}>
                <h1>Sobre</h1>
                <p>Rick and Morty é uma série de animação adulta norte-americana de comédia e ficção científica. A série acompanha as perigosas aventuras do cientista alcoólatra Rick e seu neto Morty, que divide seu tempo entre a vida familiar e viagens interdimensionais</p>
                <p>O show gira em torno das aventuras dos membros da família Smith. as aventuras de Rick e Morty ocorrem em um número infinito de realidades, com os personagens viajando para outros planetas e dimensões através de portais usando o veículo voador de Rick.</p>
            </div>
        </section>
    );
}
 
export default About;