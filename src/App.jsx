import { useState } from "react";

const movie_list = [
  {
    Id: "769",
    Title: "GoodFellas",
    Year: "1990",
    Poster: "/img/goodfellas.jpg"
  },
  {
    Id: "120",
    Title: "Lord of the Rings",
    Year: "2001",
    Poster: "/img/lordoftherings.jpg"
  },
  {
    Id: "27205",
    Title: "Inception",
    Year: "2010",
    Poster: "/img/inception.jpg"
  },
  {
    Id: "105",
    Title: "Back to the Future",
    Year: "1990",
    Poster: "/img/backtothefuture.jpg"
  }
];

const selected_movie_list = [
  {
    Id: "27205",
    Title: "Inception",
    Year: "2010",
    Poster: "/img/inception.jpg",
    Duration: 120,
    Rating: 8.4
  },
  {
    Id: "105",
    Title: "Back to the Future",
    Year: "1990",
    Poster: "/img/backtothefuture.jpg",
    Duration: 110,
    Rating: 7.6
  }
];

const getAverage = (array) => array.reduce((sum, value) => sum + value, 0) / array.length;

export default function App() {

  return (
    <>
      <Nav />
      <Main />
    </>
  );
}

function Nav() {
  return (
    <nav className="bg-primary text-white p-2">
      <div className="container">
        <div className="row align-items-center">
          <Logo />
          <Search />
          <NavSearchResult />
        </div>
      </div>
    </nav>
  );
}

function Logo() {

  return (
    <div className="col-4">
      <i className="bi bi-camera-reels me-2"></i>
      Movie App
    </div>
  );
}

function Search() {

  return (
    <div className="col-4">
      <input type="text" className="form-control" placeholder="Film ara..." />
    </div>
  );
}

function NavSearchResult() {

  return (
    <div className="col-4 text-end">
      <strong>5</strong> kayıt bulundu.
    </div>
  );
}

function Main() {

  return (
    <main className="container">
      <div className="row mt-2">
        <div className="col-md-9">
          <MovieListContainer />
        </div>
        <div className="col-md-3">
          <MyMovieListContainer />
        </div>
      </div>
    </main>
  );
}

function MovieListContainer() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="movie-list">
      <button className="btn btn-sm btn-outline-primary mb-2" onClick={() => setIsOpen((val) => !val)}>
        {isOpen ? (<i className="bi bi-chevron-up"></i>) : (<i className="bi bi-chevron-down"></i>)}
      </button>
      {
        isOpen && <MovieList />
      }
    </div>
  );
}

function MyMovieListContainer() {
  const [selectedMovies, setSElectedMovies] = useState(selected_movie_list);
  const [isSelectedOpen, setIsSelectedOpen] = useState(true);

  return (
    <div className="movie-list">
      <button className="btn btn-sm btn-outline-primary mb-2" onClick={() => setIsSelectedOpen((val) => !val)}>
        {isSelectedOpen ? (<i className="bi bi-chevron-up"></i>) : (<i className="bi bi-chevron-down"></i>)}
      </button>
      {
        isSelectedOpen &&
        <div>
          <MyMovieListSummary />
          <MyMovieList selectedMovies={selectedMovies} />
        </div>
      }
    </div>
  );
}

function MovieList() {
  const [movies, setMovies] = useState(movie_list);

  return (
    (
      <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4 g-4">
        {
          movies.map(movie => <Movie movie={movie} key={movie.Id} />)
        }
      </div>
    )
  );
}

function Movie({ movie }) {
  return (
    <div className="col mb-2">
      <div className="card">
        <img src={movie.Poster} alt={movie.Title} className="card-img-top" />
        <div className="card-body">
          <h6 className="card-title">{movie.Title}</h6>
          <div>
            <i className="bi bi-calendar2-date me-1"></i>
            <span>{movie.Year}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MyMovieListSummary() {
  const avgRating = getAverage(selected_movie_list.map(m => m.Rating));
  const avgDuration = getAverage(selected_movie_list.map(m => m.Duration));

  return (
    <div className="card mb-2">
      <div className="card-body">
        <h5 className="mb-4">Film Listesi</h5>
        <div className="d-flex justify-content-around">
          <p>
            <i className="bi bi-star-fill text-warning me-2"></i>
            <span>{avgRating.toFixed(2)}</span>
          </p>
          <p>
            <i className="bi bi-hourglass text-warning me-2"></i>
            <span>{avgDuration}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function MyMovieList({ selectedMovies }) {

  return (
    selectedMovies.map(movie => <MyListMovie movie={movie} key={movie.Id} />)
  );
}

function MyListMovie({movie }) {
  return (
    <div className="card mb-2">
      <div className="row">
        <div className="col-4">
          <img src={movie.Poster} alt={movie.Title} className="img-fluid rounded-start" />
        </div>
        <div className="col-8">
          <div className="card-body">
            <h6 className="card-title">{movie.Title}</h6>
            <div className="d-flex justify-content-between">
              <p>
                <i className="bi bi-star-fill text-warning me-2"></i>
                <span>{movie.Rating}</span>
              </p>
              <p>
                <i className="bi bi-hourglass text-warning me-1"></i>
                <span>{movie.Duration}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}