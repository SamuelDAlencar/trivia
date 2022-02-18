const fetchQuestions = async (token, category, difficulty, type) => {
  try {
    const url = `https://opentdb.com/api.php?amount=5&token=${token}&category=${category}&difficulty=${difficulty}&type=${type}`;
    const response = await fetch(url);
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchQuestions;
