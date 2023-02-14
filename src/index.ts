
import algosdk from "algosdk";
import swal from 'sweetalert';
import { MyAlgoSession} from './wallets/myalgo'
import { Voting } from './voting_client';


// const atc = new algosdk.AtomicTransactionComposer()
const myAlgo = new MyAlgoSession();
const algodClient = new algosdk.Algodv2('', "https://node.testnet.algoexplorerapi.io", '');
const indexerClient = new algosdk.Indexer('', "https://algoindexer.testnet.algoexplorerapi.io", '');

async function signer(txns: algosdk.Transaction[]) {
  const sTxns = await myAlgo.signTxns(txns)
  return sTxns.map(s => s.blob)
}

let APPID = 157951484;
let ASSETID = 157951645;


(async() => {
  let response = await indexerClient.lookupApplications(APPID).includeAll(true).do();
  
  let globalState = response.application.params["global-state"];
  let num_of_voters = globalState.find((state: { key: string; }) => {
    return state.key === Buffer.from("num_of_voters", 'utf8').toString('base64')
  })
  let vote_count = globalState.find((state: { key: string; }) => {
    return state.key === Buffer.from("vote_count", 'utf8').toString('base64')
  })
  document.getElementById("num_of_voters").innerHTML = `${num_of_voters.value.uint}`
  document.getElementById("vote_count").innerHTML = `${vote_count.value.uint}`
  
})();

const buttonIds = ['connect', 'create_app','create_asset', 'create_registration_and_voting', 'optin_to_app', 'register', 'optin_to_asset', 'transfer_asset', 'cast_vote_yes', 'cast_vote_no', 'clear_vote', 'asset_holding'];
const buttons: {[key: string]: HTMLButtonElement} = {};
const accountsMenu = document.getElementById('accounts') as HTMLSelectElement;

let amountInput = document.getElementById("transfer_amount") as HTMLInputElement


buttonIds.forEach(id => {
  buttons[id] = document.getElementById(id) as HTMLButtonElement
})

buttons.connect.onclick = async () => {
  await myAlgo.getAccounts()
  myAlgo.accounts.forEach(account => {
    accountsMenu.add(new Option(`${account.name} - ${account.address}`, account.address))
    localStorage.setItem("userAddr", account.address)
    
  })
  
}

buttons.create_app.onclick = async () => {
  if(myAlgo.accounts){
    const votingApp = new Voting({
      client: algodClient,
      signer,
      sender: localStorage.getItem("userAddr"),
    });

    const { appId, appAddress, txId } = await votingApp.create();

    document.getElementById('create_app_status').innerHTML = `App created with id: ${appId} and address: ${appAddress} in txId: ${txId}`;
  }
  
}

buttons.create_asset.onclick = async () => {
  if(myAlgo.accounts){
    const votingApp = new Voting({
      client: algodClient,
      signer,
      sender: localStorage.getItem("userAddr"),
      appId: APPID
    });

    
    const result = await votingApp.create_asset({
      asset_name: String("Energy Now On Sale"),
      unit_name: String("ENS"),
      total_supply: BigInt(100_000),
      decimals: BigInt(0)
    });
  }
  
}

buttons.create_registration_and_voting.onclick = async () => {
  if(myAlgo.accounts){
    const votingApp = new Voting({
      client: algodClient,
      signer,
      sender: localStorage.getItem("userAddr"),
      appId: APPID
    });

    await votingApp.create_registration_and_voting({
      reg_begin: BigInt(120),
      reg_end: BigInt(600),

      vote_begin: BigInt(900),
      vote_end: BigInt(10800)

    })
    .then(() => {
      swal('Registration begins in 2 minutes until 10 minutes. Voting begins in 15 minutes until 3 hours')
    })
  }
}

buttons.optin_to_app.onclick = async () => {
  if(myAlgo.accounts){
    const votingApp = new Voting({
      client: algodClient,
      signer,
      sender: localStorage.getItem("userAddr"),
      appId: APPID
    });

    // const result = await votingApp.optIn();
    // if(result == htt) {
    //   console.log("You have opted into the contract successfully");
    // } else {
    //   console.log("You have opted into the contract successfully");
    // } 
    await votingApp.optIn()
    .then(() => {
      swal("You have opted into the contract successfully");
    })
    .catch(() => {
      swal("Looks like you have already opted into the contract");
    })
    
    
  }
}

buttons.register.onclick = async () => {
  if(myAlgo.accounts){
    const votingApp = new Voting({
      client: algodClient,
      signer,
      sender: localStorage.getItem("userAddr"),
      appId: APPID
    });

    await votingApp.register()
    .then(() => {
      swal("You have registered successfully for voting.")
    })
    .catch(() => {
      swal("Make sure its voting period and you have not registered before.")
    })
  }
}


buttons.optin_to_asset.onclick = async () => {
  if(myAlgo.accounts){
    const votingApp = new Voting({
      client: algodClient,
      signer,
      // sender: accountsMenu.selectedOptions[0].value,
      sender: localStorage.getItem("userAddr"),
      appId: APPID
    });

    const opt_txn1 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      // from: accountsMenu.selectedOptions[0].value,
      from: localStorage.getItem("userAddr"),
      // to: accountsMenu.selectedOptions[0].value,
      to: localStorage.getItem("userAddr"),
      amount: 0,
      suggestedParams: await algodClient.getTransactionParams().do(),
      assetIndex: ASSETID,
    })


    await votingApp.optin_asset({opt_txn: opt_txn1})
    .then(() => {
      swal("You have opted into the asset successfully");
    })
  }
}



buttons.transfer_asset.onclick = async () => {
  if(myAlgo.accounts){
    const votingApp = new Voting({
      client: algodClient,
      signer,
      sender: localStorage.getItem("userAddr"),
      // sender: accountsMenu.selectedOptions[0].value,
      appId: APPID
    });

    await votingApp.transfer_asset({receiver: localStorage.getItem("userAddr"), amount: BigInt(amountInput.valueAsNumber)})
    .then(() => {
      swal(`${amountInput.valueAsNumber} ENS has been transferred to your wallet`)
    })
    .catch(() => {
      swal(`There is an error sending faucet to your wallet. Please try again.`)
    })
  }
}

buttons.cast_vote_yes.onclick = async () => {
  if(myAlgo.accounts){
    const votingApp = new Voting({
      client: algodClient,
      signer,
      sender: localStorage.getItem("userAddr"),
      appId: APPID
    });

    await votingApp.cast_vote({vote_choice: String("yes")})
    .then(() => {
      swal('You have voted yes')
    })
    .catch(() => {
      swal("There seems to be a problem with your vote. Make sure you have registered for voting, its voting period and you have up to 1000 ENS")
    })
  }
}

buttons.cast_vote_no.onclick = async () => {
  if(myAlgo.accounts){
    const votingApp = new Voting({
      client: algodClient,
      signer,
      sender: localStorage.getItem("userAddr"),
      appId: APPID
    });

    await votingApp.cast_vote({vote_choice: String("no")})
    .then(() => {
      swal('You have voted no')
    })
    .catch(() => {
      swal("There seems to be a problem with your vote. Make sure you have registered for voting, its voting period and you have up to 1000 ENS")
    })
  }
}

buttons.clear_vote.onclick = async () => {
  if(myAlgo.accounts){
    const votingApp = new Voting({
      client: algodClient,
      signer,
      sender: localStorage.getItem("userAddr"),
      appId: APPID
    });

    await votingApp.closeOut()
    .then(() => {
      swal('You have successfully cleared your vote')
    })
  }
}

// const getAssetHolding = async (addr: any, asset_id: any) => {
//   const accountInfo = await algodClient.accountInformation(addr).do();
//   const asset = accountInfo["assets"].find((asset: { [x: string]: number; } ) => {
//     return asset["asset-id"] === asset_id
//   });
//   return asset;
// }

// buttons.asset_holding.onclick = async () => {

  // const votingApp = new Voting({
//     client: algodClient,
//     signer,
//     sender: localStorage.getItem("userAddr"),
//     appId: APPID
//   });
//   const state = await votingApp.getAccountState(localStorage.getItem("userAddr"));
//   // const state = await votingApp.getApplicationState();
//   console.log(state);



// }
