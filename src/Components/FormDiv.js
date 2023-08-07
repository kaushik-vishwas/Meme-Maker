import React from 'react'
// import photoData from './photoData';

export default function FormDiv() {

  //const [memeImage, setMemeImage] = React.useState("");

  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/1bij.jpg",
  });


  const [allMemes, setAllMemes] = React.useState([])

  React.useEffect(()=>{
    fetch("https://api.imgflip.com/get_memes")
    .then(res=>res.json())
    .then(data=>setAllMemes(data.data.memes))
  }, [])

  function getMemeImage(){
    // const allMemes = allMemes.data.memes;
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme(prevMeme=>({
      ...prevMeme,
      randomImage: url
    }));

  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="text" placeholder='Type Here For Upper Text'
                className="form-control"
                id="topText"
                name='topText'
                value={meme.topText}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="text" placeholder='Type Here For Lower Text'
                className="form-control"
                id="bottomText"
                name='bottomText'
                value={meme.bottomText}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <button
              type="button"
              className="btn btn-primary"
              id="getNewImageBtn"
              onClick={getMemeImage}
            >
              Get a New Image
            </button>
          </div>
        </div>
      </div>
      <div className='meme'>
        <img src={meme.randomImage} alt="" className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
