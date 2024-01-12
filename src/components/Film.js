import React, { Component } from 'react'
import axios from 'axios'
// import {movies} from './Getfilm'


export default class Film extends Component {
    constructor(){
        super();
        this.state = {
            hoverid: '',
            currpage: 1,
            movies: [],
            mparr: [1],
            favourites: []
        }
    }
    handleenter = (id)=>{
        this.setState({
            hoverid: id
        })
    }
    handleleave = (e)=>{
        this.setState({
            hoverid: ''
        })
    }

    async componentDidMount(){
        let res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currpage}`)
        let data = res.data
        this.setState({
            movies: [...data.results]
        })

        let olddata = JSON.parse(localStorage.getItem('movies')) || [];
        olddata.forEach((mobj) => {
            this.state.favourites.push(mobj.id);
        });

    }
    changemovies = async()=>{
        let res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currpage}`)
        let data = res.data
        this.setState({
            movies: [...data.results]
        })
    }
    handleright=(cpageno)=>{
        if(cpageno+1 > this.state.mparr.length){
            let temparr = [];
            for(let i=1; i<=cpageno+1; i++){
                temparr.push(i);
            }
            this.setState({
                mparr: [...temparr],
                currpage: cpageno+1
            }, this.changemovies)
        }

        if(cpageno+1 <= this.state.mparr.length){
            this.setState({
                currpage: cpageno+1
            }, this.chagemovies);
        }
        // this.changemovies();
    }
    handleleft=()=>{
        if(this.state.currpage != 1){
            this.setState({
                currpage: this.state.currpage-1
            }, this.changemovies)
        }
    }
    pageshift=(pageno)=>{
        this.setState({
            currpage: pageno
        }, this.changemovies)
    }
    handlefavourites=(movobj, e)=>{
        if(e)
            e.preventDefault();
        let olddata = JSON.parse(localStorage.getItem('movies')) || [];
        if(this.state.favourites.includes(movobj.id)){
            olddata = olddata.filter((m)=>{
                return m.id != movobj.id;
            })
        }
        else{
            olddata.push(movobj);
        }
        console.log(olddata);
        localStorage.setItem("movies", JSON.stringify(olddata));
        this.handlefavarr();
    }
    handlefavarr=()=>{
        let oldarr = JSON.parse(localStorage.getItem('movies')) || [];
        let temp = oldarr.map((movobj)=>{
            return movobj.id;
        })
        this.setState({
            favourites: [...temp]
        })
    }
  render() {
    // let mov = movies.results;
    console.log(`fav arr is ${this.state.favourites}`);
    return (
      <>
        {
            this.state.movies.length == 0?
            <div>
                <button className="btn btn-primary" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span className="sr-only">Loading...</span>
                </button>
            </div>:
            <>
            <div><strong>TRENDING</strong></div>
            <div className="film-list">
                {
                    this.state.movies.map((movobj)=>(
                        <div className="card film-card" onMouseEnter={()=>this.handleenter(movobj.id)} onMouseLeave={()=>this.handleleave()}>
                            <img src={`https://image.tmdb.org/t/p/original${movobj.backdrop_path}`} alt={movobj.title} className="card-img-top film-img" />
                            <h5 className="card-title film-title">{movobj.original_title}</h5>
                            {
                                this.state.hoverid == movobj.id && 
                                    <a href="#" className="btn btn-primary film-btn" onClick={(e)=>this.handlefavourites(movobj, e)}>{this.state.favourites.includes(movobj.id)?'Remove From Favourite': 'Add to favourite'}</a>
                            }
                        </div>
                    ))
                }
            </div>
            </>
        }
        <div className="paginate">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item"><a class="page-link" onClick={this.handleleft}>Previous</a></li>
                    {
                        this.state.mparr.map((val)=>(
                            <li class="page-item"><a class="page-link" onClick={()=>this.pageshift(val)}>{val}</a></li>
                        ))
                    }
                    <li class="page-item"><a class="page-link" onClick={()=>this.handleright(this.state.currpage)}>Next</a></li>
                </ul>
            </nav>
        </div>
      </>
    )
  }
}
