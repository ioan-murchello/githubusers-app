import React, { useContext } from 'react';
import { GithubContext } from '../context/context';
import styled from 'styled-components';

const Followers = () => {
  const {followers} = useContext(GithubContext);

  return <Wrapper>
    <div className='followers'>
      {followers.map((follower, index) => {
        const {avatar_url:img,html_url,login} = follower
        return (
          <article key={index}>
            <div className='wrapper'>
              <img src={img} alt={login} />
              <h4>{login}</h4>
            <a href={html_url}>{html_url}</a>
            </div>
          </article>
        );
      })}
    </div>
  </Wrapper>;
};

const Wrapper = styled.article`
  background: var(--clr-white);
  border-top-right-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
  position: relative;

  &::before {
    content: ' followers';
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    background: var(--clr-white);
    color: var(--clr-grey-5);
    border-top-right-radius: var(--radius);
    border-top-left-radius: var(--radius);
    text-transform: capitalize;
    padding: 0.5rem 1rem 0 1rem;
    letter-spacing: var(--spacing);
    font-size: 1rem;
  }
  .followers {
    overflow: scroll;
    height: 260px;
    display: grid; 
    gap: 2rem 1rem;
    margin: 1rem 2rem;
  }
  .wrapper{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 1rem;
  }
  article {
    transition: var(--transition); 
    border-radius: var(--radius);
    display: grid;  
    align-items: center;
    place-items: center;
    column-gap: 1rem;
    padding: 10px;
    img {
      height: 100%;
      width: 45px;
      border-radius: 50%;
      object-fit: cover;
    }
    h4 {
      margin-bottom: 0;
    }
    a {
      color: var(--clr-grey-5);
    }
  }
`;
export default Followers;
