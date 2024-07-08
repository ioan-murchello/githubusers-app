import React, { useState, useEffect, createContext, useCallback } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl ='https://api.github.com'; 

const GithubContext = createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGitubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  const [requests, setRequests] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: false, msg: '' });

  const toggleError = (show = false, msg = '') => {
    setError({ show, msg });
  };

  const searchGitHubuser = async (user) => {
    setLoading(true);
    try {
      const res = await axios(`${rootUrl}/users/${user}`);
      if (res.status !== 200) {
        toggleError(true, 'user not found');
      } else {
        const { login, followers_url } = res.data;

        setGitubUser(res.data);

        await Promise.allSettled([
          axios(`${rootUrl}/users/${login}/repos?per_page=100`),
          axios(`${followers_url}?per_page=100`),
        ]).then((result) => {
          const [repos, followers] = result;
          const status = 'fulfilled';
          if (repos.status === status) {
            setRepos(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        });

        toggleError(false, '');
        checkRequests();
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toggleError(true, 'user not found');
      } else {
        console.log(error);
        toggleError(true, 'an error occurred');
      }
    }
    setLoading(false);
  };

  const checkRequests = useCallback(() => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { limit, remaining },
        } = data;
        setRequests({ limit, remaining });
        if (remaining === 0) {
          toggleError(
            true,
            'sorry you have exceeded your hourly rate limit...'
          );
        }
      })
      .catch((err) => console.log(err));
  }, [setRequests]);

  useEffect(() => {
    checkRequests();
  }, [checkRequests]);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGitHubuser,
        loading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
