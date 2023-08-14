import {StyleSheet, Platform} from 'react-native';
export const styles = StyleSheet.create({
  parentContainer: {flex: 1},
  paragraph: {
    marginBottom: 16,
  },
  saveView: {
    flex: 1,
  },
  container: {
    position: 'relative',
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 50,
    ...Platform.select({
      android: {
        marginTop: 25,
      },
      default: {
        marginTop: 0,
      },
    }),
  },
  itemText: {
    fontSize: 11,
    margin: 2,
  },
  infoText: {
    textAlign: 'center',
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
    padding: 5,
  },
  repoItemParentContainer: {
    marginHorizontal: 10,
    height: 33,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  repoItemNameContainer: {flex: 1},
  repoItemStarsCountContainer: {flexDirection: 'row', marginHorizontal: 10},
  deleteRepoItemContainer: {flexDirection: 'row'},
  renderRepoItemParentContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  reposSavedReposParentContainer: {
    flex: 1,
    marginTop: 250,
    backgroundColor: '#F5FCFF',
    borderWidth: 1,
  },
  repoSavedReposContainer: {
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reposSavedTextContainer: {alignItems: 'center', justifyContent: 'center'},
  reposSavedText: {fontWeight: 'bold'},
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  somethingWentWrongContainer: {
    marginTop: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
