import { ALL_CURRENCIES, EXCHANGE_RATES } from './data/currency.js';
import { useState } from 'react';

export default function App() {
  const currencyCodes = ALL_CURRENCIES.map(currency => currency.code);
  const exchangeRatesArray = Object.values(EXCHANGE_RATES);

  const [amount, setAmount] = useState(10);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");


  const conversionRates = exchangeRatesArray.find(entry => {
    return entry.base_code == from
  });

  const conversionRate = Number(Object
    .entries(conversionRates.conversion_rates)
    .find(conversion => 
      conversion[0] === to
  )[1]);

  const convertedAmount = amount * conversionRate;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Exchange Rates</h1>
      </header>
      <div className="conversion-card">
        <form className="conversion-form">
          <fieldset className="currency-fieldset">
            <legend className="fieldset-legend">Currency conversion</legend>
            <Input 
              id="amount" 
              label="Amount" 
              placeholder="Amount" 
              value={amount} 
              onChange={e => setAmount(Number(e.target.value))} 
            />
            <Select 
              id="from" 
              label="Currency" 
              value={from}
              onChange={e => setFrom(e.target.value)}
              currencies={currencyCodes}
            />
            <Select 
              id="to"
              label="Convert into"
              value={to}
              onChange={e => setTo(e.target.value)}
              currencies={currencyCodes}
            />
          </fieldset>
          <div data-testid="result" className="conversion-result">
            <b>{amount} {from}</b> is equal to <b>{convertedAmount} {to}</b>
          </div>
        </form>
      </div>
    </div>
  );
}

function Select({ id, label, value, onChange, currencies }) {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <select 
        id={id} 
        data-testid={id} 
        className="form-select"
        value={value}
        onChange={onChange}
      >
        {currencies.map(currency => 
          <option key={currency} value={currency}>{currency}</option>
        )}
      </select>
    </>
  );
}

function Input({ id, label, placeholder, value, onChange }) {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type="number"
        id={id}
        data-testid={id}
        placeholder={placeholder}
        className="form-input"
        value={value}
        onChange={onChange}
      />
    </>
  );
}
