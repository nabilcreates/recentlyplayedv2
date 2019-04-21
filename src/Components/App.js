import React from 'react'
import extractToken from '../extractToken.js'
import Header from './Header.js'

class App extends React.Component{
    
    constructor(){
        super();
        this.state = {
            token: false,
            data: false,
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
        
        fetch("https://api.spotify.com/v1/me/player/recently-played", {
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
        })

    }
    
    render(){

        return(
            <div>

                <Header />
                
                {this.state.data != false
                    ? this.state.data.map(d => {
                        return(
                            <div id='song' >
                                <h1>{d.track.name}</h1>
                                <p>By {d.track.artists[0].name}</p>

                                <br></br>
                                
                                <a id='button' href={`https://open.spotify.com/track/${d.track.id}`}>Spotify</a>

                            </div>
                        )
                    })

                    : <div>
                        <div id='container' >
                            <h1>Please authenticate yourself</h1>
                            <p>Login using your Spotify account:</p>

                            <br></br>
                            
                            <a id='button' href='https://renabil.github.io/recentlyplayedv2/auth.html' >Authenticate</a>
                        </div>
                    </div>}
            </div>
        )
    }
}

export default App