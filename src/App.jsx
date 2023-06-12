import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import { saveAs } from 'file-saver';
import './App.css';

const App = () => {
  const [symbolNo, setSymbolNo] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [batchYear, setBatchYear] = useState('');
  const [results, setResults] = useState([
    {
      symbolNo: '001',
      name: 'John Doe',
      dob: '1995-07-15',
      batchYear: '2022',
      subjects: [
        { name: 'Math', marks: 80, totalMarks: 100, passMarks: 40 },
        { name: 'Science', marks: 75, totalMarks: 100, passMarks: 40 },
        { name: 'English', marks: 90, totalMarks: 100, passMarks: 40 },
      ],
      passMarksCriteria: 40,
      fullMarksCriteria: 100,
    },
    // Add more dummy results here
  ]);
  const [selectedResult, setSelectedResult] = useState(null);

  const calculatePercentage = (result) => {
    const totalMarks = result.subjects.reduce((total, subject) => total + subject.totalMarks, 0);
    const obtainedMarks = result.subjects.reduce((total, subject) => total + subject.marks, 0);
    return ((obtainedMarks / totalMarks) * 100).toFixed(2);
  };

  const generateResult = () => {
    const result = results.find((result) => result.symbolNo === symbolNo);
    if (result) {
      const percentage = calculatePercentage(result);
      const passMarksCriteria = result.passMarksCriteria;
      const fullMarksCriteria = result.fullMarksCriteria;
      const obtainedMarks = result.subjects.reduce((total, subject) => total + subject.marks, 0);
      const passFailStatus = obtainedMarks >= passMarksCriteria ? 'Passed' : 'Failed';

      const resultHTML = `
        <div class="result-container">
          <h2>Result</h2>
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
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              ${result.subjects
                .map(
                  (subject) => `
                <tr>
                  <td>${subject.name}</td>
                  <td>${subject.totalMarks}</td>
                  <td>${subject.passMarks}</td>
                  <td>${subject.marks}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
          <p><strong>Percentage:</strong> ${percentage}%</p>
          <p><strong>Pass Marks Criteria:</strong> ${passMarksCriteria}</p>
          <p><strong>Full Marks Criteria:</strong> ${fullMarksCriteria}</p>
          <p><strong>Status:</strong> ${passFailStatus}</p>
          <p><strong>Obtained Marks:</strong> ${obtainedMarks}</p>
          <p><strong>School Name:</strong> ABC School</p>
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

  const downloadResult = () => {
    const result = results.find((result) => result.symbolNo === symbolNo);
    if (result) {
      const percentage = calculatePercentage(result);
      const passMarksCriteria = result.passMarksCriteria;
      const fullMarksCriteria = result.fullMarksCriteria;
      const obtainedMarks = result.subjects.reduce((total, subject) => total + subject.marks, 0);
      const passFailStatus = obtainedMarks >= passMarksCriteria ? 'Passed' : 'Failed';

      const resultHTML = `
        <div class="result-container">
          <h2>Result</h2>
          <p><strong>School Name:</strong> ABC School</p>
          <img src="school-logo.png" alt="School Logo" />
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
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              ${result.subjects
                .map(
                  (subject) => `
                <tr>
                  <td>${subject.name}</td>
                  <td>${subject.totalMarks}</td>
                  <td>${subject.passMarks}</td>
                  <td>${subject.marks}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
          <p><strong>Percentage:</strong> ${percentage}%</p>
          <p><strong>Pass Marks Criteria:</strong> ${passMarksCriteria}</p>
          <p><strong>Full Marks Criteria:</strong> ${fullMarksCriteria}</p>
          <p><strong>Status:</strong> ${passFailStatus}</p>
          <p><strong>Obtained Marks:</strong> ${obtainedMarks}</p>
        </div>
      `;

      const opt = {
        margin: 1,
        filename: 'result.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };

      html2pdf().from(resultHTML).set(opt).save();
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
        {selectedResult && (
          <button type="button" onClick={downloadResult}>
            Download Result
          </button>
        )}
      </form>

      {selectedResult && (
        <div className="result-container">
          <h2>Result</h2>
          <p>
            <strong>School Name:</strong> ABC School
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
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              {selectedResult.subjects.map((subject) => (
                <tr key={subject.name}>
                  <td>{subject.name}</td>
                  <td>{subject.totalMarks}</td>
                  <td>{subject.passMarks}</td>
                  <td>{subject.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            <strong>Percentage:</strong> {calculatePercentage(selectedResult)}%
          </p>
          <p>
            <strong>Pass Marks Criteria:</strong> {selectedResult.passMarksCriteria}
          </p>
          <p>
            <strong>Full Marks Criteria:</strong> {selectedResult.fullMarksCriteria}
          </p>
          <p>
            <strong>Status:</strong>{' '}
            {selectedResult.subjects.reduce((total, subject) => total + subject.marks, 0) >= selectedResult.passMarksCriteria ? 'Passed' : 'Failed'}
          </p>
          <p>
            <strong>Obtained Marks:</strong>{' '}
            {selectedResult.subjects.reduce((total, subject) => total + subject.marks, 0)}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
