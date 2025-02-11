import {} from '../../Helpers';

export default function MyMovieListSummary() {
  
  const avgRating = getAverage(selectedMovies.map(m => m.vote_avarage));
  const avgDuration = getAverage(selectedMovies.map(m => m.runtime));
  const avgUserRating = getAverage(selectedMovies.map(m => m.userRating));

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
            <i className="bi bi-stars text-warning me-2"></i>
            <span>{avgUserRating.toFixed(2)}</span>
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