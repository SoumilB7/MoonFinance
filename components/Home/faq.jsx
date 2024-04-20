import React from 'react';
import "../../app/faq.css";

const Faq = () => {
  return (
    <div class="faq">
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div>
          <h2>-FAQs</h2>
          <h1>Questions ?? Look Here .</h1>
        </div>
      </div>
      <ul class="accordion">
        <li style={{marginTop:"1rem"}}>
          <input type="checkbox" name="accordion" id="first" />
          <label for="first">How does Moon Finance work ?</label>
          <div class="content">
            <p>Moon Finance uses a combination of AI & deep research algorithms by our research analysts to give you a portfolio of assets which are the best suited for your investment needs.</p>
          </div>
        </li>
        <li>
          <input type="checkbox" name="accordion" id="second" />
          <label for="second">Why should I use Moon Finance?</label>
          <div class="content">
            <p>Moon Finance is developed in a way to maximize your returns & minimize your risks. It provides you with SEBI certified Investment advisory.</p>
          </div>
        </li>
        <li>
          <input type="checkbox" name="accordion" id="third" />
          <label for="third">How is my money investment?</label>
          <div class="content">
            <p>The money is invested through your broker.</p>
          </div>
        </li>
        <li>
          <input type="checkbox" name="accordion" id="fourth" />
          <label for="fourth">Where is my money invested?</label>
          <div class="content">
            <p>Your money is invested in the portfolio made by Moon Finance based on your investment profile.</p>
          </div>
        </li>
        <li>
          <input type="checkbox" name="accordion" id="fifth" />
          <label for="fifth">Is my money safe with Moon Finance?</label>
          <div class="content">
            <p>We do not keep your money, the money is directly invested through your broker and the ETFs are transferred to your demat account, i.e you have the full control of your investments.</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Faq;
