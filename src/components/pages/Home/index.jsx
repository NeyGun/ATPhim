

function Home() {

    const url = 'https://ophim1.com/v1/api/home';
const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));
    return (
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim maxime aliquam soluta nisi, aut repellendus quia optio explicabo itaque ratione et culpa aliquid quae sequi dicta facilis corrupti illum consequatur!</div>
    );
}

export default Home;