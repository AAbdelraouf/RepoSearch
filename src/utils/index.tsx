import {EdgeInsets} from 'react-native-safe-area-context';
import {GithubRepoItem, RepoToPostType} from '../types';

export const filterAllRepos = (allRepos: GithubRepoItem[], query: string) => {
  if (!query || !allRepos.length) {
    return [];
  }

  const data = allRepos.filter(repo => {
    return repo?.name?.includes(query);
  });

  return data;
};

export const insetCalc = (insets: EdgeInsets) => ({
  paddingTop: Math.max(insets.top, 16),
  paddingBottom: Math.max(insets.bottom, 16),
  paddingLeft: Math.max(insets.left, 16),
  paddingRight: Math.max(insets.right, 16),
});

export const sortRepos = (data: RepoToPostType[], order: string) => {
  const sortedData = data?.sort((a, b) => {
    if (order === lowestText) {
      return a.stargazersCount - b.stargazersCount;
    }

    if (order === highestText) {
      return b.stargazersCount - a.stargazersCount;
    }
  });

  return sortedData;
};

export const generateRandomNumbers = () => Math.floor(Math.random() * 1000);

export const repoTreshHoldNumber = 10;
export const repoTreshholdAlertText =
  'You can only add up to 10 repos, you`v been warned :)';
export const repoAlreadySavedText = 'Repo already saved';
export const lookUpFavoriteReposText = 'Use input below to find favorite repos';
export const repoInputPlaceHolder = 'Type in repo name';
export const reposSavedText = 'Repos saved';
export const sortOptionsText = 'Sort options';
export const sortByHighestStarsText = 'Sort by highest stars';
export const sortByLowestStarsText = 'Sort by lowest stars';
export const lowestText = 'lowest';
export const highestText = 'highest';
