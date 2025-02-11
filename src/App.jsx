import { useState } from "react";
import useMovies from "./hooks/useMovies.jsx";
import useLocalStorage from "./hooks/useLocalStorage.jsx";
import Pagination from "./components/Pagination.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
import Loading from "./components/Loading.jsx";
import Nav from "./components/Navbar/Nav.jsx";
import Logo from "./components/Navbar/Logo.jsx";
import Search from "./components/Navbar/Search.jsx";
import NavSearchResult from "./components/Navbar/NavSearchResult.jsx";
import Main from "./components/Main.jsx";
import ListContainer from "./components/ListContainer.jsx";
import MovieList from "./components/Movies/MovieList.jsx";
import MyMovieListSummary from "./components/SelectedMovies/MyMovieListSummary.jsx";
import MyMovieList from "./components/SelectedMovies/MyMovieList.jsx";
import MovieDetails from "./components/Movies/MovieDetails.jsx"

const api_key = "insert some key here";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedMovies, setSelectedMovies] = useLocalStorage([], "selectedMovies");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const { movies, loading, error, currentPage, totalPages, total_results, nextPage, previousPage } = useMovies(query);

  function handleSelectedMovie(id) {
    setSelectedMovie(selectedMovie => id === selectedMovie ? null : id);
  }

  function handleUnselectMovie(id) {
    setSelectedMovie(null);
  }

  function handleAddToList(movie) {
    setSelectedMovies(selectedMovies => [...selectedMovies, movie]);
    handleUnselectMovie();
  }

  function handleDeleteFromList(id) {
    setSelectedMovies(selectedMovies => selectedMovies.filter(m => m.id !== id));
  }

  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NavSearchResult totalResults={totalResults} onSelectMovie={handleSelectedMovie} />
      </Nav>
      <Main>
        <div className="row mt-2">
          <div className="col-md-9">
            <ListContainer>
              {loading && <Loading />}
              {!loading && !error && (
                <>
                  {
                    movies.length > 0 && (
                      <>
                        <MovieList movies={movies} onSelectMovie={handleSelectedMovie} selectedMovie={selectedMovie} />
                        <Pagination
                          nextPage={nextPage}
                          previousPage={previousPage}
                          currentPage={currentPage}
                          totalPages={totalPages}
                        />
                      </>
                    )
                  }
                </>
              )}
              {error && <ErrorMessage message={error} />}
            </ListContainer>
          </div>
          <div className="col-md-3">
            <ListContainer>
              {selectedMovie ? (
                <MovieDetails
                  selectedMovie={selectedMovie} onUnSelectMovie={handleUnselectMovie} onAddToList={handleAddToList}
                  selectedMovies={selectedMovies}
                />
              ) : (
                <>
                  <MyMovieListSummary />
                  <MyMovieList selectedMovies={selectedMovies} onDeleteFromList={handleDeleteFromList} />
                </>
              )}
            </ListContainer>
          </div>
        </div>
      </Main>
    </>
  );
}