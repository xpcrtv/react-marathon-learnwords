const apiUrl = process.env.REACT_APP_DICTIONARY_URL;

export const getTranslatedWord = async (text, lang = "en|ru") => {
  const response = await fetch(
    `${apiUrl}/get?q=${text}&langpair=${lang}`,
  );
  const word = await response.json();
  return word.responseData.translatedText;
};
