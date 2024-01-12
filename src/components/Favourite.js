import React, { Component } from 'react'
import{movies} from './Getfilm'

export default class Favourite extends Component {
    constructor(){
        super();
        this.state = {
            genres: [],
            currgenre: 'All Genres',
            movies: [],
            currsearch: '',
            limit: 5,
            currpage: 1
        }
    }
    componentDidMount(){
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        
        let movobjarr = JSON.parse(localStorage.getItem('movies')) || [];

        let temp = [];
        movobjarr.forEach((movobj)=>{
            if(!temp.includes(genreids[movobj.genre_ids[0]])){
                temp.push(genreids[movobj.genre_ids[0]]);
            }
        })
        temp.unshift('All Genres');
        console.log(temp);
        this.setState({
            genres: [...temp],
            movies: [...movobjarr]
        })
    }
    handlegenrechange=(g)=>{
        this.setState({
            currgenre: g
        })
    }
    sortpopasce=()=>{
        let temp=this.state.movies;
        temp.sort(function(oa, ob){
            return oa.popularity-ob.popularity
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortpopdesc=()=>{
        let temp=this.state.movies;
        temp.sort(function(oa, ob){
            return ob.popularity-oa.popularity
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortrateasce=()=>{
        let temp=this.state.movies;
        temp.sort(function(oa, ob){
            return oa.vote_average-ob.vote_average
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortratedesc=()=>{
        let temp=this.state.movies;
        temp.sort(function(oa, ob){
            return ob.vote_average-oa.vote_average
        })
        this.setState({
            movies:[...temp]
        })
    }

    handlepage=(pgno)=>{
        this.setState({
            currpage: pgno
        })
    }

    handleremove = (id)=>{
        let narr = [];
        narr = this.state.movies.filter((mobj)=>{
            return mobj.id != id;
        })
        this.setState({
            movies: [...narr]
        })
        localStorage.setItem('movies', JSON.stringify(narr));
    }

  render() {
    // const movie = movies.results;
    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

    let filterarr=[];
    if(this.state.currsearch == ''){
        filterarr = this.state.movies;
    }
    else{
        filterarr = this.state.movies.filter((movobj)=>{
            let title = movobj.original_title.toLowerCase();
            return title.includes(this.state.currsearch.toLowerCase());
        })
    }


    if(this.state.currgenre !='All Genres'){
        filterarr = this.state.movies.filter((movobj)=>{
            return genreids[movobj.genre_ids[0]] == this.state.currgenre;
        })
    }
    let pages = Math.ceil(filterarr.length/this.state.limit);
    let pagesarr = [];
    for(let i=1; i<=pages; i++){
        pagesarr.push(i);
    }
    let si=(this.state.currpage-1)*this.state.limit;
    let ei = si+this.state.limit;
    filterarr = filterarr.slice(si, ei);

    return (
      <div>
        <>
            <div className='main'>
                <div className='row fav-generes'>
                    <div className='col-3'>
                        <ul class="list-group">
                            {
                                this.state.genres.map((g)=>(
                                    this.state.currgenre == g?
                                    <li class="list-group-item" style={{backgroundColor:'#0d6efd', color: 'white', fontWeight:'bold' }}>{g}</li>:
                                    <li class="list-group-item" style={{backgroundColor:'white', color: '#0d6efd'}} onClick={()=>this.handlegenrechange(g)}>{g}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className='col-9 '>
                        <div className='row search-sort'>
                            <input type='text' className='input-group-text col' placeholder='Search' value={this.state.currsearch} onChange={(e)=>{this.setState({currsearch: e.target.value})}}  />
                            <input type='number' className='input-group-text col-3'placeholder='Row Count' value={this.state.limit} onChange={(e)=>{this.setState({limit: e.target.value})}} />
                        </div>
                        <div className='fav-tab'>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Generes</th>
                                    <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortpopasce}></i>Popularity<i class="fa-solid fa-sort-down" onClick={this.sortpopdesc}></i></th>
                                    <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortrateasce}></i>Rating<i class="fa-solid fa-sort-down" onClick={this.sortratedesc}></i></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filterarr.map((movobj)=>(
                                        <tr>
                                            <td class="align-middle"><img src={`https://image.tmdb.org/t/p/original${movobj.backdrop_path}`} alt={movobj.title} style={{width:'8rem', borderRadius:'10px'}} className="card-img-top film-img" /></td>
                                            <td class="align-middle">{movobj.original_title}</td>
                                            <td class="align-middle">{genreids[movobj.genre_ids[0]]}</td>
                                            <td class="align-middle">{movobj.popularity}</td>
                                            <td class="align-middle">{movobj.vote_average}</td>
                                            <td class="align-middle"><button type="button" class="btn btn-primary" onClick={()=>this.handleremove(movobj.id)}>Remove</button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className='fav-nav'>
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                {
                                    pagesarr.map((val)=>(
                                        <li class="page-item"><a class="page-link" onClick={()=>this.handlepage(val)}>{val}</a></li>
                                    ))
                                }
                            </ul>
                        </nav>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
      </div>
    )
  }
}
