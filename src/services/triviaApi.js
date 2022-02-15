const fetchQuestions = async (token) => {
  try {
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(url);
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchQuestions;
