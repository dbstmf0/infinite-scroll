import axios from "axios";
import MovieDetail from "./MovieDetail";
import { useEffect, useState } from "react";
const API_KEY='decc67e8f617c228c9c976bb05cd39ca';

const GenreList = () => {
    const [genres,setGenres]=useState([]);
    const [selected,setSelected]=useState([]);
    const [isLoading,setIsLoading]=useState(false);
    const [errorMsg,setErrorMsg]=useState(null);
    const [movies,setMovise]=useState([]);
    const [isModalOpen,setIsModalOpen]=useState(false);
    const [viewObj,setViewObj]=useState(null);

    const fetchGenreList=async()=>{
        const url=`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=ko-KR`;
        setIsLoading(true);
        try{
            const response=await axios.get(url);
            setGenres(response.data.genres);
        }catch(err){
            setErrorMsg('장르 리스트 가져오기 중 실패');
        }
    }
    useEffect(()=>{
        fetchGenreList();
    },[]);
    const handleWrap=(id)=>{
        // let result=[];
        // if(selected.includes(id)){
        //     //지금 id를 빼고 배열 생성
        //     result=selected.filter((list)=>{
        //         return list !== id;
        //     })
        // } else{
        //     //추가
        //     result=[...selected, id];
        // }
        // setSelected(result);
        setSelected((prev)=>{  //prev -> selected 지금까지 세팅되어있는 값
            return prev.includes(id) ? prev.filter((list)=>{return list !== id}) : [...prev,id]
        });
    }
    const fetchSearch=async()=>{
        const GENRE_ID=selected.join(',');
        const url=`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${GENRE_ID}&language=ko-KR`;
        try{
            const response = await axios.get(url);
            setMovise(response.data.results);
            setIsLoading(false);
        }catch(error){
            setErrorMsg('장르별 영화 정보 가져오기 실패');
        }
    }
    const handleSearch=()=>{
        if(selected.length <=0) return;
        setIsLoading(true);
        fetchSearch();
    }
    const handleClick=(info)=>{    //list 값을 info로 받음
        setIsModalOpen(true);
        setViewObj(info);
    }
    const handleClose=()=>{
        setIsModalOpen(false);
        setViewObj(null);
    }
    return (
        <div className="genre-list">
            <div className="list-wrap">
                {
                    genres.map((list)=>{
                        return <button
                        key={list.id}
                        className={selected.includes(list.id) ? 'active' : ''}
                        onClick={()=>{handleWrap(list.id)}}
                        >{list.name}</button>
                    })
                }
            </div>
            <button onClick={handleSearch}>검색</button>
            {
                isLoading && <p>Loading...</p>
            }
            {
                errorMsg && <p>{errorMsg}</p>
            }
            <div className="container">
                {
                    movies.map((list)=>{
                        return (
                            <div key={list.id} className="movie-card" onClick={()=>{handleClick(list)}}>
                                <img src={`https://image.tmdb.org/t/p/w342${list.poster_path}`} alt={list.title}/>
                                <div className="overlay">{list.title}</div>
                            </div>
                        )
                    })
                }
            {
            isModalOpen && <MovieDetail info={viewObj} onClose={handleClose}/>
            }
            </div>
        </div>
    );
};

export default GenreList;