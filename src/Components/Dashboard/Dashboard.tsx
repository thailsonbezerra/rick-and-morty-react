import { useEffect, useState } from "react";
import Head from "../Head";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

const Dashboard = () => {

  const [scores, setScores] = useState([]);

  const scoreCollectionRef = collection(db, "scores");

  useEffect(() => {
    const getScores = async () => {
      const data = await getDocs(scoreCollectionRef);
      console.log(data.docs.map(doc => ({...doc.data(), id: doc.id})));
    }
    getScores()
  }, []);

  return (
    <section>
      <Head
          title="RMR - Dashboard"
          description="Gráficos do seus scores da digitação."
        />
      <h1 className="title">Dashboard</h1>
    </section>
  );
};

export default Dashboard;
