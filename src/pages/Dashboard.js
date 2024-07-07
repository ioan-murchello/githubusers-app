import React from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';
import { useContext } from 'react';
const Dashboard = () => {
  const { loading } = useContext(GithubContext);
  if (loading) {
    return (
      <main>
        <Search />
        <img className='loading-img' src={loadingImage} alt='loading...' />
      </main>
    );
  }
  return (
    <main>
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  );
};

export default Dashboard;
