import React from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';
import { useFilePicker } from "use-file-picker";

export default function Form({ onSubmit, currentUser }) {
	 const [openFileSelector, { filesContent, loading, errors, plainFiles, clear }] = useFilePicker({
     multiple: true,
     readAs: 'DataURL',
	 readFilesContent: false,
     });
	 if (errors.length) {
		return (
			<div>
				<button onClick={() => openFileSelector()}>Something went wrong, retry! </button>
			</div>
		);
	}
	if (loading) {
    return <div>Loading...</div>;
	}
  return (
    <form onSubmit={onSubmit}>
      <fieldset id="fieldset">
        <p>Sign the guest book, { currentUser.accountId }!</p>
        <p className="highlight">
          <label htmlFor="message"><a href="https://web3.storage" title="filecoin storage" target="blank">Storage</a> API token:</label>
          <input
            autoComplete="off"
            autoFocus
            id="message"
            required
          />
          </p>
          <p className="highlight">
          <label htmlFor="upload">Upload :</label><br/>
          <button onClick={() => openFileSelector()}>Select file </button>
		  <button onClick={() => clear()}>Clear</button>
		  <br/>
		  Number of selected files:
		  {plainFiles.length}
		  <br/>
		  {/* If readAs is set to DataURL, You can display an image */}
		  {!!filesContent.length && <img src={filesContent[0].content} />}
		  <br/>
		  {plainFiles.map(file => (
		  <div key={file.name}>{file.name}</div>
		  ))}
		  </p>
		  <p>
          <label htmlFor="donation">Donation (optional):</label>
          <input
            autoComplete="off"
            defaultValue={'0'}
            id="donation"
            max={Big(currentUser.balance).div(10 ** 24)}
            min="0"
            step="0.01"
            type="number"
          />
          <span title="NEAR Tokens">Ⓝ</span>
        </p>
        <button type="submit">
          Sign
        </button>
      </fieldset>
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  })
};
