import React from 'react'
import extractToken from '../extractToken.js'
import Header from './Header.js'

class App extends React.Component{
    
    constructor(){
        super();
        this.state = {
            token: false,
            data: false,
            album_pictures: [],
        }
    }

    componentDidMount(){

        // extract the token and then set the state
        this.setState({
            token: extractToken()
        })

        // Set delay as the token will take approx 1ms to set
        setTimeout(() => {
            this.getRecentlyPlayed(this.state.token)
        }, 1);
        
    }

    getRecentlyPlayed(tk){

        console.log(tk)
        
        fetch("https://api.spotify.com/v1/me/player/recently-played?limit=50", {
            headers: {
                'Authorization': `Bearer ${tk}`
            }
        })
        .then(r => {
            console.log(r.status)
            if(r.status !== 200 && r.status){
                this.setState({
                    data: false
                })
            }else{
                return r.json()
            }

        })
        .then(json => {
            this.setState({
                data: json.items
            })

            this.getAlbumPictures(json.items, this.state.token)
        })

    }

    getAlbumPictures(songs, token){
        songs.map(s => {
            let id = s.track.album.id
            fetch(`https://api.spotify.com/v1/albums/${id}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(r => r.json())
            .then(d => {
                let images_url = d.images[0].url;

                let array = this.state.album_pictures;
                array.push(images_url)
                
                this.setState(p => {
                    return{
                        album_pictures: array
                    }
                })
                
            })
        })
    }


    render(){

        return(
            <div id='body'>   
                {/* {this.state.data !== false ? this.state.data.map(d => {
                        return(
                            <div id='song' >
                                <h1>{d.track.name}</h1>
                                <p>By {d.track.artists[0].name}</p>

                                <br></br>
                                
                                <a id='button' href={`https://open.spotify.com/track/${d.track.id}`}>Spotify</a>

                            </div>
                        )
                    }) : null} */}

                    {this.state.data !== false ? this.state.album_pictures.map(i => {
                        return(
                            <img onClick={this.handleImageClick} src={i}></img>
                        )
                    }) : null}
            </div>
        )
    }
}

export default App