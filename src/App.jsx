import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import { saveAs } from 'file-saver';
import './App.css';
import { dummyResults } from './dummyResults';

const App = () => {
  const [symbolNo, setSymbolNo] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [batchYear, setBatchYear] = useState('');
  const [results, setResults] = useState(dummyResults);
  const [selectedResult, setSelectedResult] = useState(null);

  const calculatePercentage = (result) => {
    const totalMarks = result.subjects.reduce((total, subject) => total + subject.fullMarks, 0);
    const obtainedMarks = result.subjects.reduce((total, subject) => total + subject.theoryMarks + subject.practicalMarks, 0);
    return ((obtainedMarks / totalMarks) * 100).toFixed(2);
  };

  const generateResult = () => {
    const result = results.find((result) => result.symbolNo === symbolNo);
    if (result) {
      const percentage = calculatePercentage(result);
      const passStatus = percentage >= result.subjects[0].passMarks ? 'Passed' : 'Failed';

      const resultHTML = `
        <div class="result-container">
          <h2>Result</h2>
          <p><strong>Class:</strong> ${result.grade}</p>
          <p><strong>Roll No:</strong> ${result.section}</p>
          <p><strong>Gender:</strong> ${result.gender}</p>
          <p><strong>School Name:</strong> ABC School</p>
          <p><strong>School Address:</strong> 123 Main Street, City</p>
          <p><strong>Exam:</strong> 2nd Terminal Examination</p>
          <p><strong>Symbol No:</strong> ${result.symbolNo}</p>
          <p><strong>Name:</strong> ${result.name}</p>
          <p><strong>Date of Birth:</strong> ${result.dob}</p>
          <p><strong>Batch Year:</strong> ${result.batchYear}</p>
          <h3>Subjects:</h3>
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Full Marks</th>
                <th>Pass Marks</th>
                <th>Theory Marks</th>
                <th>Practical Marks</th>
                <th>Marks Obtained</th>
              </tr>
            </thead>
            <tbody>
              ${result.subjects
                .map(
                  (subject) => `
                  <tr>
                    <td>${subject.name}</td>
                    <td>${subject.fullMarks}</td>
                    <td>${subject.passMarks}</td>
                    <td>${subject.theoryMarks}</td>
                    <td>${subject.practicalMarks}</td>
                    <td>${Math.min(subject.theoryMarks + subject.practicalMarks, subject.fullMarks)}</td>
                  </tr>
                `
                )
                .join('')}
            </tbody>
          </table>
          <p><strong>Percentage:</strong> ${percentage}%</p>
          <p><strong>Pass Marks Criteria:</strong> ${result.subjects[0].passMarks}</p>
          <p><strong>Pass Status:</strong> ${passStatus}</p>
          <img src="school-logo.png" alt="School Logo" />
        </div>
      `;

      const opt = {
        margin: 1,
        filename: 'result.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };

      setSelectedResult(result);
      html2pdf().from(resultHTML).set(opt).save();
    } else {
      setSelectedResult(null);
    }
  };

  return (
    <div className="app-container">
      <h2>Exam Result</h2>
      <form className="form-container">
        <label>
          Symbol No:
          <input type="text" value={symbolNo} onChange={(e) => setSymbolNo(e.target.value)} />
        </label>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Date of Birth:
          <input type="text" value={dob} onChange={(e) => setDob(e.target.value)} />
        </label>
        <label>
          Batch Year:
          <input type="text" value={batchYear} onChange={(e) => setBatchYear(e.target.value)} />
        </label>
        <button type="button" onClick={generateResult}>
          Generate Result
        </button>
      </form>

      {selectedResult && (
        <div className="result-container">
          <h2>Result</h2>
          <p>
            <strong>School Name:</strong> ABC School
          </p>
          <p>
            <strong>School Address:</strong> 123 Main Street, City
          </p>
          <img src="school-logo.png" alt="School Logo" />
          <p>
            <strong>Symbol No:</strong> {selectedResult.symbolNo}
          </p>
          <p>
            <strong>Name:</strong> {selectedResult.name}
          </p>
          <p>
            <strong>Date of Birth:</strong> {selectedResult.dob}
          </p>
          <p>
            <strong>Batch Year:</strong> {selectedResult.batchYear}
          </p>
          <h3>Subjects:</h3>
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Full Marks</th>
                <th>Pass Marks</th>
                <th>Theory Marks</th>
                <th>Practical Marks</th>
                <th>Marks Obtained</th>
              </tr>
            </thead>
            <tbody>
              {selectedResult.subjects.map((subject) => (
                <tr key={subject.name}>
                  <td>{subject.name}</td>
                  <td>{subject.fullMarks}</td>
                  <td>{subject.passMarks}</td>
                  <td>{subject.theoryMarks}</td>
                  <td>{subject.practicalMarks}</td>
                  <td>{Math.min(subject.theoryMarks + subject.practicalMarks, subject.fullMarks)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            <strong>Percentage:</strong> {calculatePercentage(selectedResult)}%
          </p>
          <p>
            <strong>Pass Marks Criteria:</strong> {selectedResult.subjects[0].passMarks}
          </p>
          <p>
            <strong>Pass Status:</strong> {calculatePercentage(selectedResult) >= selectedResult.subjects[0].passMarks ? 'Passed' : 'Failed'}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
