import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const showList = arr => arr.map(good => (
  <li key={good} data-cy="Good">
    {good}
  </li>
));

const defaultList = showList(goodsFromServer);

export const App = () => {
  const [actualList, setActualList] = useState(defaultList);
  const [actualListArr, setActualListArr] = useState([...goodsFromServer]);
  const [sortMethod, setSortMethod] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const sortArray = (arr, method) => {
    let sortedArr;
    switch (method) {
      case 'alphabetically':
        sortedArr = [...arr].sort((a, b) => a.localeCompare(b));
        break;
      case 'byLength':
        sortedArr = [...arr].sort((a, b) => a.length - b.length);
        break;
      default:
        sortedArr = arr;
    }
    return sortedArr;
  };

  const handleSort = method => {
    let sortedArr = sortArray(goodsFromServer, method);

    if (isReversed) {
      sortedArr = [...sortedArr].reverse();
    }

    setSortMethod(method);
    setActualListArr(sortedArr);
    setActualList(showList(sortedArr));
  };;

  const handleReverse = () => {
    const reversedArr = [...actualListArr].reverse();

    setIsReversed(!isReversed);
    setActualListArr(reversedArr);
    setActualList(showList(reversedArr));
  };

  const handleReset = () => {
    setSortMethod(null);
    setIsReversed(false);
    setActualListArr([...goodsFromServer]);
    setActualList(defaultList);
  };

  const getButtonClass = method => {
    if (sortMethod === method) {
      return 'button';
    }
    return 'button is-light';
  };

  const reverseButtonClass = `button ${isReversed ? '' : 'is-light'}`;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => handleSort('alphabetically')}
          type="button"
          className={getButtonClass('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => handleSort('byLength')}
          type="button"
          className={getButtonClass('byLength')}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={reverseButtonClass}
        >
          Reverse
        </button>

        {sortMethod || isReversed ? (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>{actualList}</ul>
    </div>
  );
};
