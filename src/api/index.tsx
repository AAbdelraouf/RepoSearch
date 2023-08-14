import {RepoToPostType} from '../types';

// fetch all repositories from my github
export const fetchAllGitHubRepositories = async () => {
  const data = await fetch('https://api.github.com/user/repos', {
    headers: {
      Accept: 'application/vnd.github+json',
      // Temporary auth token for the assignment //
      Authorization:
        'Bearer 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',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  const response = await data.json();
  return response;
};

// check health
export const checkRepoHealth = async () => {
  const data = await fetch('http://localhost:8080/health/');
  const response = await data.json();

  return response;
};

// fetch all repositories
export const fetchRepoList = async () => {
  const data = await fetch('http://localhost:8080/repo/');
  const response = await data.json();

  return response;
};

// post a selected repo to database
export const postRepo = async (data: RepoToPostType) =>
  await fetch('http://localhost:8080/repo/', {
    method: 'POST',
    body: JSON.stringify(data),
  });

// delete a selected database from database
export const deleteRepo = async (id: string | number) => {
  await fetch(`http://localhost:8080/repo/${id}`, {
    method: 'DELETE',
  });
};
