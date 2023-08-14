import React from 'react';
import {View} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {
  sortOptionsText,
  sortByHighestStarsText,
  sortByLowestStarsText,
  lowestText,
} from '../../utils';

type Props = {
  onChangeSorting?: () => void;
};

const PopupMenu = ({onChangeSorting}: Props) => {
  return (
    <View>
      <Menu>
        <MenuTrigger text={sortOptionsText} />
        <MenuOptions>
          <MenuOption
            onSelect={onChangeSorting}
            text={sortByHighestStarsText}
            value="highest"
          />
          <MenuOption
            onSelect={onChangeSorting}
            text={sortByLowestStarsText}
            value={lowestText}
          />
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default PopupMenu;
