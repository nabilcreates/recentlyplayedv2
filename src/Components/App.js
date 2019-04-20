import React from 'react'
import extractToken from '../extractToken.js'
class App extends React.Component{
    
    constructor(){
        super();
        this.state = {
            token: false,
            data: false,
        }
    }

    componentDidMount(){

        // If no tokem is found, function will return false
        if(extractToken() == false){
            window.location.replace('https://renabil.github.io/recentlyplayedv2/auth.html')
        }else{
            // extract the token and then set the state
            this.setState({
                token: extractToken()
            })
        }

        // Set delay as the token will take approx 1ms to set
        setTimeout(() => {
            this.getRecentlyPlayed(this.state.token)
        }, 1);
        
    }

    // getAlbumImage(album_id, tk){
    //     fetch('https://api.spotify.com/v1/albums/' + album_id, {
    //         headers: {
    //             'Authorization': `Bearer ${tk}`
    //         }
    //     }).then(r => r.json())
    //     .then(json => {
    //         let img_url = json.images[0].url
    //     })
    // }
    
    getRecentlyPlayed(tk){

        console.log(tk)
        
        fetch("https://api.spotify.com/v1/me/player/recently-played", {
            headers: {
                'Authorization': `Bearer ${tk}`
            }
        })
        .then(r => r.json())
        .then(json => {
            this.setState({
                data: json.items
            })
        })

    }
    
    render(){

        return(
            <div>
                {this.state.data != false
                    ? this.state.data.map(d => {
                        // this.getAlbumImage(d.track.album.id, this.state.token)
                        return(
                            <div id='song' >
                                <h6>{new Date(d.played_at).toTimeString().split('GMT')[0]}</h6>
                                <h1>
                                    <a href={`https://open.spotify.com/track/${d.track.id}`}>{d.track.name}</a>
                                </h1>
                                <p>{d.track.artists[0].name}</p>
                            </div>
                        )
                    })

                    : null}
            </div>
        )
    }
}

export default App