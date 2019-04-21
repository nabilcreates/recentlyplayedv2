import React from 'react';

class Header extends React.Component{

    handleCopy(e){

        // Select the input
        let copyText = document.getElementById('copyLink')

        if(copyText.style.display == 'none'){

            // Change text of button
            e.target.innerText = 'Close Link'

            // Display
            copyText.style.display = 'block'
        }else{
            // Change text of button
            e.target.innerText = 'Share Link'

            // Display to NONE
            copyText.style.display = 'none'
        }
    }
    
    render(){
        return(
            <div id='container' className='header'>
                <h1>recentlyplayed</h1>
                <p>View all of your recently played songs on Spotify and share with your friends!</p>
    
                <br></br>
    
                <a id='button' href='https://renabil.github.io/recentlyplayedv2' >Get started</a>
                <a onClick={this.handleCopy} id='button' >Share Link</a>
    
                <br></br>
                <br></br>
    
                <div id='copyLink' style={{display: 'none'}}>
                    <p>Copy the link and share with your friends! (and press Close Link when done!)</p>
                    <input type='text' readOnly value={document.URL} />
                </div>
            </div>
        )
    }
}

export default Header