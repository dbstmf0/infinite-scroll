import CircleBar from "./CircleBar";
import LibCircle from "./LibCircle";

const MovieDetail = ({info,onClose}) => {
    // const style={
    //     backgroundImage : `url(https://image.tmdb.org/t/p/w500${info.backdrop_path})`,
    //     backgroundSize:'cover',
    //     backgroundPosition:'center',
    //     backgroundColor: 'rgba(255,255,255,0.4)'
    //     }
    return (
        <div className="movie-detail">
            <div className="popup">
                <h1>{info.title}</h1>
                <div className="txt">
                    <span>{info.original_title}</span>
                    <span>{info.release_date.replaceAll('-','.')}</span>
                </div>
                <img src={`https://image.tmdb.org/t/p/w342${info.backdrop_path}`}/>
                <p>줄거리 : {info.overview}</p>
                <div className="average">
                    <p>평점 : {info.vote_average}</p>
                    {/* <CircleBar percentage={info.vote_average*10}/> */}
                    <LibCircle percentage={Math.floor(info.vote_average*10)}/>
                </div>
                <button onClick={onClose}>X</button>
            </div>
        </div>
    );
};

export default MovieDetail;