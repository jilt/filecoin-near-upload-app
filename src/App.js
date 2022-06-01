import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';
import Form from './components/Form';
import SignIn from './components/SignIn';
import Messages from './components/Messages';
import { providers } from 'near-api-js';
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'
// import getConfig from "./config";
// const { networkId } = getConfig(process.env.NODE_ENV || "development");

const SUGGESTED_DONATION = '0';
const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

function getProvider(selector) {
  return new providers.JsonRpcProvider({
    url: selector.network.nodeUrl,
  });
}

const App = ({selector, currentUser}) => {
  const [messages, setMessages] = useState([]);
  const [files, setFiles] = useState(null);

  // storage client with token and endpoint
  useEffect(() => {
    const provider = getProvider(selector);
    provider.query({
      request_type: "call_function",
      account_id: selector.getContractId(),
      method_name: "getMessages",
      args_base64: "",
      finality: "optimistic",
    }).then((res) => {
      setMessages(JSON.parse(Buffer.from(res.result).toString()))
    });
  }, []);

  const onSubmit = async (e) => {
    
    e.preventDefault();
    const {fieldset, message, plainFiles, donation} = e.target.elements;
    fieldset.disabled = true;
	const client = new Web3Storage({ token: message.value });
    const provider = getProvider(selector)
    // const files = plainFiles

    client.put(files).then(async (rootCid) => {
      selector.signAndSendTransaction({
        signerId: window.accountId,
        actions: [{
          type: "FunctionCall",
          params: {
            methodName: "add_message",
            args: {
			  value: message.value,
              text: rootCid,
            },
            gas: BOATLOAD_OF_GAS,
            deposit: Big(donation.value || '0').times(10 ** 24).toFixed(),
          },
        }]
      }).catch(console.error)
        .then(() => {
          provider.query({
            request_type: "call_function",
            account_id: selector.getContractId(),
            method_name: "getMessages",
            args_base64: "",
            finality: "optimistic",
          }).then((res) => {
            setMessages(JSON.parse(Buffer.from(res.result).toString()))
            message.value = '';
            donation.value = SUGGESTED_DONATION;
            fieldset.disabled = false;
            message.focus();
			console.log(APItoken);
          });
        });
    });
  }

  //Handle file input
  const handleChangeFile = (e) => {
    const files = e.target.files;
    setFiles(files);
  }

  const signIn = () => {
    selector.show()
  };

  const signOut = () => {
    selector.signOut();
  };


  return (
    <main>
      <header>
        <h1>NEAR WEB3.storage uploading Dapp</h1>
        {currentUser
          ? <button onClick={signOut}>Log out</button>
          : <button onClick={signIn}>Log in</button>
        }
      </header>
      {currentUser
        ? <Form onSubmit={onSubmit} currentUser={currentUser} handleChangeFile={handleChangeFile} files={files}/>
        : <SignIn/>
      }
      {!!currentUser && !!messages.length && <Messages messages={messages} />}
    </main>
  );
};

App.propTypes = {
  selector: PropTypes.object,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired
  }).isRequired,
};

export default App;