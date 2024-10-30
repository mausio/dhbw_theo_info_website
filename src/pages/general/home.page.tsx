import { GenericMainContainer } from '../../styles/general/generic.style.ts';

const HomePage = () => {
  return (
    <GenericMainContainer>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>ALGO</h1>
        <h2>Welcome to the exercises of algorithms!</h2>
        <p>It is not necessary to log in in order to do the exercises.</p>
        <p>⚠️ However, if you would like to gain the lecture bonus, you must log in and submit completed tasks.</p>
        <ul>
          <li>To log in, use the information given by your lecturer. 📜</li>
          <li>To gain the bonus, complete all the tasks before the exam!!! ⏳</li>
        </ul>
        <h3>💡 Tipps:</h3>
        <ul>
          <li>After completing a task successfully, don't forget to click the submit button! 🔔</li>
          <li>It is nicer to use big screens 🤓</li>
        </ul>
        <p>Have fun! 🎉</p>
        <br />
        <p></p>
      </div>
    </GenericMainContainer>
  );
};

export default HomePage;
