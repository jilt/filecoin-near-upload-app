import React from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';
import { useFilePicker } from "use-file-picker";

export default function Form({ onSubmit, currentUser, handleChangeFile, files }) {
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
        <p>Upload your files on Web3.storage, paste here your <a href="https://web3.storage/tokens/" title="web.storage" target="_blank">API</a> token{ currentUser.accountId }!</p>
        <p className="highlight">
          <label htmlFor="message"><a href="https://web3.storage" title="filecoin storage" target="blank">web3 Storage</a> API token:</label>
          <input
            autoComplete="off"
            autoFocus
            id="message"
            required
          />
          </p>
          <p className="highlight">
          <label htmlFor="upload">Upload :</label><br/>
          <label htmlFor="file-input" type="button" className="inputFile">
            Select file
          </label>
          <input id="file-input" type="file"  onChange={handleChangeFile} hidden={true} required={true}/>
		  <button onClick={() => clear()}>Clear</button>
		  <br/>
		  Number of selected files:
		  {files?.length > 0 ? " " + files.length : " " + 0}
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
          Upload File
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
