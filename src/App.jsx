import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Auth from "./components/Auth";
import { db } from "./config/firebase";

const App = () => {
  const [movieList, setMovieList] = useState([]);

  const movieCollectionRef = collection(db, "movies");
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState();
  const [updatedTitle, setUpdatedTitle] = useState("");

  //Fonction pour recuperer la liste des films depuis la base de données
  async function getMovieList() {
    try {
      const data = await getDocs(movieCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData);
      setMovieList(filteredData);
    } catch (error) {
      alert(error);
    }
  }

  //Fonction pour ajouter des données à la DB
  async function onSubmitMovie(e) {
    e.preventDefault();
    try {
      await addDoc(movieCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
      });
      setNewMovieTitle("");
      setNewReleaseDate("");
      getMovieList();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteMovie(id) {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  }

  async function updateMovieTitle(id, e) {
    e.preventDefault();
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
    setUpdatedTitle("");
    getMovieList();
  }

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <Auth />
      <br />
      <div
        style={{
          border: "solid 1px",
          background: "pink",
          color: "green",
        }}
      >
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1>{movie.title}</h1>
            <p> Date: {movie.releaseDate} </p>
            <button
              style={{ background: "red", color: "white" }}
              onClick={() => deleteMovie(movie.id)}
            >
              Delete
            </button>

            <form onSubmit={(e) => updateMovieTitle(movie.id, e)}>
              <br />
              <input
                type="text"
                placeholder="new title..."
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <input
                style={{ background: "blue", color: "white" }}
                type="submit"
                value="Update Title"
              />
            </form>
          </div>
        ))}
      </div>

      <br />
      <form onSubmit={onSubmitMovie}>
        <input
          value={newMovieTitle}
          placeholder="Movie title..."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          value={newReleaseDate}
          placeholder="Release Date..."
          type="number"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          style={{ background: "green", color: "white" }}
          type="submit"
          value="Submit Movie"
        />
      </form>
    </div>
  );
};

export default App;
