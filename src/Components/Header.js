import React from 'react';

class Header extends React.Component{

    handleCopy(e){

        // Select the input
        let copyText = document.getElementById('textwithlink')

        // Display so that it can select the text (temp)
        copyText.style.display = 'block'

        // Select eh text
        copyText.select()

        /* Copy the text inside the text field */
        document.execCommand("copy");

        /* Alert */
        alert("Copied! Now share the link with your friends!");

        // Hide the input back
        copyText.style.display = 'none'
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
    
                <input style={{display: 'none'}} id='textwithlink' type='text' value={document.URL} />
            </div>
        )
    }
}

export default Header