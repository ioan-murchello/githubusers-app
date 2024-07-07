import React, { useContext } from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const { repos } = useContext(GithubContext);

  let languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;

    if (!language) return total;

    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }

    return total;
  }, {});

  languages = Object.values(languages)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // stars, forks
  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item;
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[forks] = { label: name, value: forks };

      return total;
    },
    { stars: {}, forks: {} }
  );

  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D languages={languages} />
        <Bar3D data={stars} />
        <Doughnut2D data={languages} />
        <Column3D data={forks} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  width: 100%;

  .chart-container {
    flex: 1 1 auto;  
    min-width: 300px;
    max-width: 600px;
    height: 500px;  
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    padding: 1rem;
    border-radius: var(--radius);
    box-shadow: var(--light-shadow);
  }
  .charts-wrapper {
    width: 100%;
    display: flex;
    column-gap: 2rem;
    border: 1px solid #000;
    div {
      flex: 0 1 auto;
    }

    @media (max-width: 992px) {
      flex-direction: column;
    }
  }

  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
