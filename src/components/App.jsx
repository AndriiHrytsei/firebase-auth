import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import "./App.css";
import Auth from "./auth";
import { getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [newReceivedAnOscar, setNewReceivedAnOscar] = useState(false);

  const movieCollectionRef = collection(db, "movies");

  
  const getMovieList = async () => {
    try {
      const data = await getDocs(movieCollectionRef);
      const filteredDate = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredDate);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovieList();
  }, []);

  
  const onSubmitMovie = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: newReceivedAnOscar,
      });
      getMovieList();
    } catch (error) {
      console.log(error);
    }
  };
  
  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await deleteDoc(movieDoc)
    getMovieList();
  }
  
  return (
    <>
      <div>Firebase auth</div>
      <Auth />
      <div>
        <input
          type="text"
          placeholder="Movie title..."
          onChange={(e) => setNewMovieTitle(e.currentTarget.value)}
        />
        <input
          type="number"
          placeholder="Release date..."
          onChange={(e) => setNewReleaseDate(Number(e.currentTarget.value))}
        />
        <input
          type="checkbox"
          id="receivedAnOscar"
          checked={newReceivedAnOscar}
          onChange={(e) => setNewReceivedAnOscar(e.currentTarget.checked)}
        />
        <label htmlFor="receivedAnOscar">Received an Oscar</label>
        <button type="button" onClick={onSubmitMovie}>
          Submit movie
        </button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div key={movie.title}>
            <h1 style={{ color: movie.receivedAnOscar ? "yellow" : "black" }}>
              {movie.title}
            </h1>
            <p>Release date: {movie.releaseDate}</p>
            <button type="button" onClick={() => deleteMovie(movie.id)}>Delete movie</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
