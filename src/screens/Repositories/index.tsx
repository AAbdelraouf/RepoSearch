import React, {useState, useMemo} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Autocomplete from 'react-native-autocomplete-input';
import {
  filterAllRepos,
  generateRandomNumbers,
  highestText,
  insetCalc,
  lookUpFavoriteReposText,
  repoAlreadySavedText,
  repoInputPlaceHolder,
  reposSavedText,
  repoTreshholdAlertText,
  repoTreshHoldNumber,
  sortRepos,
} from '../../utils';
import {
  deleteRepo,
  fetchAllGitHubRepositories,
  fetchRepoList,
  postRepo,
} from '../../api';
import PopupMenu from '../../components/PopupMenu';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './repositoriesStyle';
import {useQuery, useMutation, useQueryClient} from 'react-query';
import {GithubRepoItem, RepoToPostType} from '../../types';

export const Repositories = () => {
  const insets = useSafeAreaInsets();
  const style = useMemo(() => insetCalc(insets), [insets]);
  const [sortStatus, setSortStatus] = useState(highestText);
  const queryClient = useQueryClient();
  const [repoInputValue, setRepoInputValue] = useState('');

  const {isLoading: isGithubReposLoading, data: allGithubRepos} = useQuery({
    queryKey: ['githubRepos'],
    queryFn: async () => await fetchAllGitHubRepositories(),
    placeholderData: [],
    // Since stargazers_count are 0, I injected each repo stargazers_count with random numbers to help //
    onSuccess: data =>
      data.map(
        (repo: GithubRepoItem) =>
          (repo.stargazers_count =
            repo.stargazers_count + generateRandomNumbers()),
      ),
  });

  const {
    isLoading: isFetchSavedReposLoading,
    data: reposFromDatabase,
    isError,
  } = useQuery({
    queryKey: ['fetchSavedRepos'],
    queryFn: async () => await fetchRepoList(),
    placeholderData: [],
  });

  const filteredRepos = useMemo(
    () => filterAllRepos(allGithubRepos, repoInputValue),
    [allGithubRepos, repoInputValue],
  );

  const postRepoFromDropDownSheet = async (data: GithubRepoItem) => {
    const isRepoSavedAlready = reposFromDatabase?.repos?.some(
      (repo: RepoToPostType) => repo.id == data.id,
    );
    const isUpToOrEqualToTreshhold =
      reposFromDatabase?.repos?.length >= repoTreshHoldNumber;

    if (isUpToOrEqualToTreshhold) {
      alert(repoTreshholdAlertText);
      setRepoInputValue('');
      return;
    }
    if (isRepoSavedAlready) {
      alert(repoAlreadySavedText);
      return;
    }

    const objectToPost = {
      id: data.id.toString(),
      fullName: data?.full_name,
      createdAt: data.created_at,
      stargazersCount: data.stargazers_count,
      language: data.language,
      url: data.url,
    };

    await postRepo(objectToPost);
  };

  const {mutate: onSelectRepoFromDropDownSheet} = useMutation({
    mutationFn: (data: GithubRepoItem) => postRepoFromDropDownSheet(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['fetchSavedRepos']);
    },
    onError: error => {
      alert(error);
    },
  });

  const {mutate: onDeleteRepo} = useMutation({
    mutationFn: async id => await deleteRepo(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['fetchSavedRepos']);
    },
    onError: error => {
      alert(error);
    },
  });

  const RenderReposFromDataBase = ({data}: {data: RepoToPostType[]}) => {
    return (
      <ScrollView>
        {isError ? (
          <View style={styles.somethingWentWrongContainer}>
            <Text>Something went wrong</Text>
          </View>
        ) : !isError && data?.length <= 0 ? (
          <View style={styles.somethingWentWrongContainer}>
            <Text>Empty list</Text>
          </View>
        ) : (
          data?.map((repo, index) => {
            // had to hide first name to save space //
            const name = repo.fullName.split('/');
            const stargazersCount = repo.stargazersCount;

            return (
              <View style={styles.repoItemParentContainer} key={index}>
                <View style={styles.repoItemNameContainer}>
                  <Text>{name[1]}</Text>
                </View>
                <View style={styles.repoItemStarsCountContainer}>
                  <Text>({stargazersCount})</Text>
                  <Icon name="star" size={20} color="#FFDF00" />
                </View>
                <TouchableOpacity
                  style={styles.deleteRepoItemContainer}
                  onPress={() => onDeleteRepo(repo.id)}>
                  <Text>Delete</Text>
                  <Icon name="delete-sweep" size={20} color="#CC3333" />
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>
    );
  };

  const RenderRepoItem = ({item}: {item: GithubRepoItem}) => {
    return (
      <TouchableOpacity
        style={styles.renderRepoItemParentContainer}
        onPress={() => onSelectRepoFromDropDownSheet(item)}>
        <Text style={styles.itemText}>{item.name} | </Text>
        <Text style={styles.itemText}>
          {!item.description ? 'Description' : item.description} |
        </Text>
        <Text style={styles.itemText}>{item.language} | </Text>
        <Text style={styles.itemText}>
          {item.stargazers_count}
          <Icon name="star" size={20} color="#FFDF00" />
        </Text>
      </TouchableOpacity>
    );
  };

  const onChangeSorting = (status: string) => {
    if (status === sortStatus) {
      return;
    }

    setSortStatus(status);
    const sortedRepos = sortRepos(reposFromDatabase?.repos, status);
    const previousValue = queryClient.getQueryData(['githubRepos']);
    queryClient.setQueryData(['githubRepos'], [previousValue, sortedRepos]);
  };

  const loadingAggregator = isGithubReposLoading || isFetchSavedReposLoading;

  return (
    <View style={[style, styles.parentContainer]}>
      <SafeAreaView style={styles.saveView}>
        {loadingAggregator ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="small" color="#0000ff" />
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.autocompleteContainer}>
              <Text>{lookUpFavoriteReposText}</Text>
              <Autocomplete
                autoCapitalize="sentences"
                autoCorrect={false}
                data={filteredRepos}
                value={repoInputValue}
                onChangeText={setRepoInputValue}
                placeholder={repoInputPlaceHolder}
                flatListProps={{
                  keyboardShouldPersistTaps: 'always',
                  keyExtractor: repo => repo?.id,
                  renderItem: ({item}: {item: GithubRepoItem}) => {
                    return <RenderRepoItem item={item} />;
                  },
                }}
              />
            </View>

            <View style={styles.reposSavedReposParentContainer}>
              {!isError && reposFromDatabase?.repos?.length ? (
                <View style={styles.repoSavedReposContainer}>
                  <View style={styles.reposSavedTextContainer}>
                    <Text style={styles.reposSavedText}>
                      {reposSavedText} ({reposFromDatabase?.repos?.length})
                    </Text>
                  </View>
                  <PopupMenu onChangeSorting={onChangeSorting} />
                </View>
              ) : null}

              <RenderReposFromDataBase
                data={sortRepos(reposFromDatabase?.repos, sortStatus)}
              />
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};
