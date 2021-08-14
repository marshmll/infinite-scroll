import { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0%;
  }
  body {
    font-family: sans-serif;
    background: linear-gradient(to right, #336699, #0099cc);
    color: white;
    margin: 0;
    padding: 0 1rem;
  }
  h1 {
    text-align: center;
  }
  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
  }
  li {
    display: block;
    background: #00000050;
    padding: 0.5rem 1rem;
    margin-bottom: 2rem;
    border-radius: 5px;
    border: 1px solid white;
  }
  img {
    width: 15rem;
    border-radius: 8px;
  }
  
`;

export default function Home() {
  const user = "marshmll";
  const [followers, setFollowers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const perPage = 2;
    const ENDPOINT = `https://api.github.com/users/${user}/followers`;
    const URL = `${ENDPOINT}?per_page=${perPage}&page=${currentPage}&order=DESC`;
    fetch(URL)
      .then((response) => response.json())
      .then((newFollowers) =>
        setFollowers((prevFollowers) => [...prevFollowers, ...newFollowers])
      );
  }, [currentPage]);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setCurrentPage((currentValue) => currentValue + 1);
      }
    });
    intersectionObserver.observe(document.querySelector("#observer"));
    return () => intersectionObserver.disconnect();
  }, []);

  return (
    <main>
      <GlobalStyle />
      <h1>Scroll Infinito</h1>
      <ul>
        {followers.map((follower) => (
          <li key={follower.login}>
            <div>
              <img src={`https://github.com/${follower.login}.png`} />
              <p>
                github.com/<strong>{follower.login}</strong>
              </p>
            </div>
          </li>
        ))}
      </ul>
      <li id="observer"></li>
    </main>
  );
}
