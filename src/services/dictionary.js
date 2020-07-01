const apiKey = process.env.REACT_APP_TRANSLATE_API_KEY;
const apiUrl = process.env.REACT_APP_DICTIONARY_URL;
const headers = {
  Authorization: apiKey,
};

export const getTranslatedWord = async (text, lang = "en-ru") => {
  const response = await fetch(
    `${apiUrl}/translate?text=${text}&lang=${lang}`,
    { headers }
  );
  const word = await response.json();
  return word;
};
