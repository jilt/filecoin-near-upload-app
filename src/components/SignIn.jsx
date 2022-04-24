import React from 'react';

export default function SignIn() {
  return (
    <>
      <p>
          This is a simple guestbook app implementation that lets you choose the wallet to connect to the NEAR blockchain.
      </p>
	  <p>
	  The app is built on a guestobbok contract (which you can manipulate as you like) but made to be a template to use web3.storage to store the files of your near dApps to filecoin free immutable storage service
	  </p>
      <p>
          You can sign in the guestbook Dapp and add a donation, then NEAR will double-check that
          you’re ok with sending money to this app.
      </p>
    </>
  );
}
