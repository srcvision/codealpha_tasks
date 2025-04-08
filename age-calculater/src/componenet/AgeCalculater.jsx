import {React,useState} from 'react'
const AgeCalculater = () => {
    const [dob, setDob] = useState({ day: '', month: '', year: '' });
  const [age, setAge] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setDob({ ...dob, [e.target.name]: e.target.value });
  };

  const calculateAge = () => {
    const { day, month, year } = dob;
    const birthDate = new Date(`${year}-${month}-${day}`);
    
    // Validate
    if (
      !day || !month || !year ||
      birthDate.getDate() != day ||
      birthDate.getMonth() + 1 != month ||
      birthDate.getFullYear() != year
    ) {
      setError("Invalid date. Please check your input.");
      setAge(null);
      return;
    }

    setError("");
    const today = new Date();
    let years = today.getFullYear() - year;
    let months = today.getMonth() - (month - 1);
    let days = today.getDate() - day;

    if (days < 0) {
      months -= 1;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    setAge({ years, months, days });
  };
    return (
    <>
        <div className="container">
      <h1>Age Calculator</h1>
      <div className="input-group">
        <input type="number" name="day" placeholder="Day" onChange={handleChange} />
        <input type="number" name="month" placeholder="Month" onChange={handleChange} />
        <input type="number" name="year" placeholder="Year" onChange={handleChange} />
      </div>
      <button onClick={calculateAge}>Calculate Age</button>
      {error && <p className="error">{error}</p>}
      {age && (
        <p className="result">
          You are {age.years} years, {age.months} months, and {age.days} days old.
        </p>
      )}
    </div>
    </>
  )
}

export default AgeCalculater