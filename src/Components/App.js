import React from 'react'
import extractToken from '../extractToken.js'
import { throws } from 'assert';

class App extends React.Component{
    
    constructor(){
        super();
        this.state = {
            token: false,
            albums: [],
            recently_played: null,
        }
    }

    componentDidMount(){
        
        if(extractToken() !== false){
            this.setState({
                token: extractToken(),
            })

            setTimeout(() => {
                this.getRecentlyPlayed(this.state.token, 50)
            }, 1);
        }
    }

    getRecentlyPlayed(tk, limit){
        fetch('https://api.spotify.com/v1/me/player/recently-played?limit=' + limit, {
            headers: {
                'Authorization': `Bearer ${tk}`
            }
        }).then(r => r.json())
        .then(d => {
            let items = d.items;
            this.setState({
                recently_played: items
            })

            items.map(i => {
                let id = i.track.album.id

                setTimeout(() => {
                    this.getAlbums(id, tk)
                }, 100);
            })
        })
    }

    getAlbums(id, tk){
        fetch(`https://api.spotify.com/v1/albums/${id}`, {
            headers: {
                'Authorization': `Bearer ${tk}`
            }
        }).then(r => r.json())
        .then(d => {
            let array = this.state.albums;
            array.push(d)
            this.setState({
                albums: array
            })
        })
    }

    render(){

        console.log(this.state.token)
        
        return(
            <div>
                <div id='body'>
                    {this.state.token !== false ? 
                        this.state.albums !== [] ? 
                        this.state.albums.map(d=>{
                            let img = d.images[0].url;
                            let albumtype = d.album_type

                            // console.log(d)
                            
                            return(
                                <div>

                                <a href={d.external_urls.spotify}>
                                    <img id='images' src={img}></img>
                                </a>

                                {/* <p id='album_name' >{d.name}</p> */}
                                </div>
                            )
                        })
                        : <h1>not loaded</h1>
                    : <div>
                        <h1>Please authenticate yourself</h1>
                        <p>Login to your Spotify account and accept</p>
                        <a href='https://renabil.github.io/recentlyplayedv2/auth.html' >Authorize</a>
                    </div>}
                </div>
            </div>
        )
    }
}

export default App