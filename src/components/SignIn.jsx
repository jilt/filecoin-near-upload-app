import React from 'react';

export default function SignIn() {
  return (
    <>
      <p>
          This is a simple Near app to upload files on <a href="https://web3/storage" title="filecoin storage" target="_blank">web3.storage</a>.
      </p>
	  <p>
	  Sign in then upload files with <a href="https://web3.storage/docs/how-tos/generate-api-token/" title="web3.storage docs" target="_blank">your API token</a>, when the file is uploaded you'll get the immutable link and timestamp.
	  </p>
      <p>
          You can add a donation, then NEAR will double-check that
          you’re ok with sending money to this app.
		  Check the open source code at this link.
      </p>
    </>
  );
}
