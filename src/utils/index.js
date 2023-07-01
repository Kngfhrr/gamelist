export const filterGames = (games, selectedProvider) => {
  return Object.keys(games).reduce((acc, key) => {
    const game = { key, ...games[key] };
    if (!selectedProvider || game.provider === selectedProvider) {
      acc.push(game);
    }
    return acc;
  }, []);
};

export const compareGames = (selectedCurrency) => (gameA, gameB) => {
  const gameAHasCurrency = selectedCurrency in gameA.real ? 1 : 0;
  const gameBHasCurrency = selectedCurrency in gameB.real ? 1 : 0;

  const currencyComparison = gameBHasCurrency - gameAHasCurrency;

  if (currencyComparison !== 0) {
    return currencyComparison;
  } else {
    return gameA.collections.popularity - gameB.collections.popularity;
  }
};
