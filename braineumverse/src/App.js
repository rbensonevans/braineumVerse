import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
//import BraineumToken from '../abis/BraineumToken.json'
import brain from './brain.png'
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:8000');

const CARD_ARRAY = [
  {
    name: 'space_station_v',
    description: 'BraineumAI: Your trip to Space Station V has been finalized and your hotel is fully covered. So nothing to worry about. Dr. X: Finally on my way to Space Station V.',
    img: '/images/Space_station_v.jpeg',
  },
  {
    name: 'pan_american',
    description: 'Approaching the arrival gate.',
    img: '/images/pan_american.jpeg',
  },
  {
    name: 'the_arrival',
    description: 'Welcome Dr. X. Glad you could finally make it.',
    img: '/images/11_picturephone-booth.jpeg',
  },
  {
    name: 'the_bedroom',
    description: 'This is your room. Enjoy.',
    img: '/images/2001_monolith_bedroom.jpeg'
  },
  {
    name: 'the_lobby',
    description: 'Meeting friends in the lobby',
    img: '/images/Station_V_01.jpeg'
  },
  {
    name: 'heading_to_bed',
    description: 'Long day ahead, will head to bed',
    img: '/images/in_the_bed.jpeg'
  },
  {
    name: 'waking_up',
    description: 'Time to get up. Long day ahead',
    img: '/images/Hotel-monolith_12_and_3.jpeg'
  },
  {
    name: 'morning_exercise',
    description: 'Doing the required morning exercise routines',
    img: '/images/Discovery-interior.jpeg'
  },
  {
    name: 'suiting_up',
    description: 'Now which of these suits will I use.',
    img: '/images/One_of_a_kind.jpeg'
  },
  {
    name: 'green_helment_spacesuit',
    description: 'Great, the spacesuit fits just right',
    img: '/images/Green_helmet_is_the_best.jpeg'
  },
  {
    name: 'problem',
    description: 'Now what is the problem?? Oops, we have a malfunction',
    img: '/images/HAL_Malfunction.png'
  },
  {
    name: 'checking_computer',
    description: 'Checking the computer system',
    img: '/images/checking_computer.jpeg'
  },
  {
    name: 'lunch',
    description: 'Will think of this problem over lunch',
    img: '/images/A_2001_Ipad_lunch.jpeg'
  },
  {
    name: 'taking_the_pod',
    description: 'Will have to take a pod and investigate',
    img: '/images/The_pod_pod_bay.jpeg'
  },
  {
    name: 'on_the_pod',
    description: 'Taking an EVA tour of the space station',
    img: '/images/EVA_POD.jpeg'
  },
  {
    name: 'external_view',
    description: 'Amazing sight.',
    img: '/images/Site-background-light.jpeg'
  },
  {
    name: 'relaxing',
    description: 'Its been a long day. Need to relax a bit. Think things over.',
    img: '/images/relaxing.jpeg'
  },
  {
    name: 'the_tunnel',
    description: 'Figured out the problem',
    img: '/images/2001_Tunnel.jpeg',
  },
  {
    name: 'hardware_replacement',
    description: 'Swapping out the defective hardware.',
    img: '/images/2001halshutdown.jpeg'
  },
  {
    name: 'space_station_departure',
    description: 'Problem solved. Departing the space station.',
    img: '/images/2001_title_page.jpg'
  },
  {
    name: 'earth_bound',
    description: 'Earth bound. Touchdown is a few hours away.',
    img: '/images/Orion_III_Spaceplane.jpeg'
  },
  // index = 21.
  {
    name: 'macys_shopping_1',
    description: 'Intesting suit....',
    img: '/images/macys_suit_modern_fit.jpeg'
  },
  {
    name: 'macys_shopping_2',
    description: 'This is interesting too...',
    img: '/images/macys_suit_classic_fit.jpeg'
  },
  {
    name: 'macys_shopping_3',
    description: 'and so is this suit...',
    img: '/images/macys_suit_skinny_fit.jpeg'
  },
  {
    name: 'macys_shopping_4',
    description: 'this is stylish...',
    img: '/images/macys_suit_slim_fit.jpeg'
  },
  // index = 25.
  {
    name: 'starbucks_meeting_1',
    description: 'Approaching Starbucks',
    img: '/images/starbucks_meeting_1.jpeg'
  },
  {
    name: 'starbucks_meeting_2',
    description: 'nice place...',
    img: '/images/starbucks_meeting_2.jpeg'
  },
  {
    name: 'starbucks_meeting_3',
    description: 'cool crowd...',
    img: '/images/starbucks_meeting_3.jpeg'
  },
]



class App extends Component {

  // Benson's Note: I replaced CheckForMatch with this function.
  /*
  MintBraineumToken = async () => {
    alert('MintBraineum has been called; Code needs to be reviewed further');
    // hardcode the URL.
    this.state.token.methods.mint(
      this.state.account,
      'http://www.braineum.net/nft'
    )
    .send({ from: this.state.account })
    .on('transactionHash', (hash) => {
      this.setState({ amountMinted: this.state.bankAccount})
    })
  }
  */

  // added from websocketclient example
  onButtonClicked = (value) => {
   /* this.setState({imageIndex: this.state.imageIndex+1});*/
    client.send(JSON.stringify({
      type: "message",
      msg: value
    }));
  }


  // added from websocketclient example
 componentDidMount() {
    client.onopen = () => {
    console.log('BraineumVerse Client Connected');
    };

 

    client.onmessage = (message) => {
       // fields: type, amount, region, infomsg.
        const dataFromServer = JSON.parse(message.data);
        console.log('got reply! ', dataFromServer);
        this.setState({bankAccount: dataFromServer.amount});
        this.setState({brainRegion: dataFromServer.region});
        this.setState({infoMessage: dataFromServer.infomsg});
        this.setState({imageIndex: dataFromServer.imageindex}); 
        this.setState({pubAddress: dataFromServer.pubaddress});
        this.setState({wontoken: dataFromServer.wontoken}); 
        this.setState({dateTimeVal: dataFromServer.datetimeval});            
        this.setState({miner1: dataFromServer.miner1});
        this.setState({miner2: dataFromServer.miner2});
        this.setState({miner3: dataFromServer.miner3});
        this.setState({miner4: dataFromServer.miner4});
        this.setState({miner5: dataFromServer.miner5});
        this.setState({miningOnFlag: dataFromServer.miningonflag});

    }
}

  async componentWillMount() {
    await this.loadWeb3()
    //await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  



 /* async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    // Load smart contract
    const networkId = await web3.eth.net.getId()
    const networkData = BraineumToken.networks[networkId]
    if(networkData) {
      const abi = BraineumToken.abi
      const address = networkData.address
      const token = new web3.eth.Contract(abi, address)
      this.setState({ token })
      const totalSupply = await token.methods.totalSupply().call()
      this.setState({ totalSupply })
      // Load Tokens
      let balanceOf = await token.methods.balanceOf(accounts[0]).call()
      for (let i = 0; i < balanceOf; i++) {
        let id = await token.methods.tokenOfOwnerByIndex(accounts[0], i).call()
        let tokenURI = await token.methods.tokenURI(id).call()
        this.setState({
          tokenURIs: [...this.state.tokenURIs, tokenURI]
        })
      }
    } else {
      alert('Smart contract not deployed to detected network.')
    }
  } */


  chooseImage = (cardId) => {
    //return window.location.origin + CARD_ARRAY[cardId].img;
    if (this.state.pubAddress === "USING_LOCAL_ADDRESS") {
      return CARD_ARRAY[cardId].img;
    }
    
    return this.state.pubAddress; // display the ipfs/web3.storage image.
    } 

    chooseDescription = (cardId) => {
      if (this.state.pubAddress === "USING_LOCAL_ADDRESS") {
        return CARD_ARRAY[cardId].description;
      }

      return this.state.pubAddress; // show the ipfs/web3.storage address.
    } 


  constructor(props) {
    super(props);
    this.state = {
      account: '0x0',
      token: null,
      totalSupply: 0,
      tokenURIs: [],
      cardArray: [],
      cardsChosen: [],
      cardsChosenId: [],
      cardsWon: [],
      bankAccount: 0,
      brainRegion: 0,
      infoMessage: "BraineumVerse will be great",
      imageIndex: 0,
      miner1: null,
      miner2: null,
      miner3: null,
      miner4: null,
      miner5: null,
      miningOnFlag: 0,
      amountMinted: 0,
      pubAddress: "",
      wonToken: 0,
      lastPubAddressWon: "",
      lastTokenWon: 0,
      dateTimeVal: "",
      population: 1,
    }
  }

  render() {
    return (
      <div>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
            <div className="d-4">
              <h3>BraineumVerse</h3>
              <h2>Map The Real World into BraineumAI</h2>
              <h3>Populate BraineumVerse</h3>
              <h3>Become a Citizen</h3>
              <h6><a href='add_citizen_nft'>Create a Citizen NFT</a></h6>
              <h6><a href='#add_home'>Link Your Home Address</a></h6>
              <h6><a href='#add_streets'>Link Streets, Roads, Highways</a></h6>
              <h6><a href='#sign_up'>Sign Up</a>&nbsp;or&nbsp;<a href='#sign_in'>Sign In</a></h6>
              <div>
              <h5>Today's News</h5>
              <h6><button>show next</button><button>show previous</button></h6><br/><br/><br/><br/>
              <h5>BraineumAI's Suggestions</h5>
              <h6><button>show next</button><button>show previous</button></h6><br/><br/><br/><br/>
              <h5>Search for Teleportations</h5>
              <h6><button>show next</button><button>show previous</button></h6><br/><br/><br/><br/>
              <h5>Create a New Economy</h5>
              <h6><a href='#add_store'>Create a Store</a></h6>
              <h6><a href='#add_company'>Create a Company</a></h6>
              <h6><a href='#add_to_economy'>Add to the economy</a></h6>
              <br/>
              <h5>Metaverses</h5>
              <h6><a href='#moonbase'>MoonBase</a></h6>
              <h6><a href='#marsbase'>MarsBase</a></h6>
              <br/>
              <h5>Mining</h5>
              <h6><a href='#precious_metals'>Braineum Precious Metals</a></h6>
              
{/*
              <h5>Create a Store</h5>
              <h6>Create a Company</h6>
              <h6>Create a Movie Theatre</h6>
              <h6>Create a Museum</h6>
              <h6>Create a Factory</h6>
              <h6>Create a Farm</h6>
              <br/>
              <h4>Create the Financial System</h4>
              <h5>Create a Bank</h5>
              <h6>Create an Exchange</h6>
              <h6>Create an Investment Company</h6>
              <br/>
              <h4>Create Entertainment</h4>
              <h5>Create a Stadium</h5>
              <h6>Create a Teams</h6>
              <br/>
              <h4>Create General Entities</h4>
              <h5>Create an Entity</h5>
              <br/>
              <h4>The Miners</h4>
              <h5>The Rigs</h5>
              <h6>Mom and Pop</h6>
*/}
              </div>
            <div className='teleport'>
            <br/>
            <h4>BraineumVerse</h4>
            <h6>Population: {this.state.population}</h6>

 
             <br/> <br/> <h5>The Transporter: For instantaneous travel</h5>
              <br/>
              <button onClick={()=>this.onButtonClicked('StartBraineumAI')}>Start BraineumAI</button>
              &nbsp; &nbsp; &nbsp;
              <button onClick={()=>this.onButtonClicked('PauseBraineumAI')}>Pause BraineumAI</button>
              &nbsp; &nbsp; &nbsp;
              <button onClick={()=>this.onButtonClicked('ContinueBraineumAI')}>Continue BraineumAI</button>
              &nbsp; &nbsp; &nbsp;

             <br/><br/>
              <h5>{this.chooseDescription(this.state.imageIndex)}</h5>
             <img width="650px" height="400px" src={this.chooseImage(this.state.imageIndex)}/>
              <br/>
 
             </div>
             <div className='teleport_locations'>
             
              <div>
              <h6><a href='#create_teleport'>Create/Publish a Teleport</a></h6>
              <br/>
             <button onClick={()=>this.onButtonClicked('PauseTeleport')}><h4>Pause Teleport</h4></button>&nbsp;
             <button onClick={()=>this.onButtonClicked('ContinueTeleport')}><h4>Continue Teleport</h4></button>&nbsp;
             <button onClick={()=>this.onButtonClicked('EndTeleport')}><h4>End Teleport</h4></button>
             </div>
             <br/><br/><br/>
             <button onClick={()=>this.onButtonClicked('TeleportMacys')}>Teleport to Macys Men's Department</button>
             <button onClick={()=>this.onButtonClicked('PurchaseMacys')}>Purchase</button>
             <button onClick={()=>this.onButtonClicked('AudioMacys')}>Audio</button>
             <button onClick={()=>this.onButtonClicked('VideoMacys')}>Video</button>
             <button onClick={()=>this.onButtonClicked('LiveMacys')}>Live</button><br/>
             <br/>
             <button onClick={()=>this.onButtonClicked('TeleportStarbucks')}>Teleport to Starbucks Meeting</button>
             <button onClick={()=>this.onButtonClicked('PurchaseStarbucks')}>Purchase</button>
             <button onClick={()=>this.onButtonClicked('AudioStarbucks')}>Audio</button>
             <button onClick={()=>this.onButtonClicked('VideoStarbucks')}>Video</button>
             <button onClick={()=>this.onButtonClicked('LiveStarbucks')}>Live</button><br/>
             <br/>
             <button onClick={()=>this.onButtonClicked('TeleportBrooklynMuseum')}>Teleport to the Brooklyn Museum</button>
             <button onClick={()=>this.onButtonClicked('PurchaseMuseum')}>Purchase</button>
             <button onClick={()=>this.onButtonClicked('PurchaseMuseumNFT')}>PurchaseNFT</button>
             <button onClick={()=>this.onButtonClicked('AudioMuseum')}>Audio</button>
             <button onClick={()=>this.onButtonClicked('VideoMuseum')}>Video</button>
             <button onClick={()=>this.onButtonClicked('LiveMuseum')}>Live</button><br/>
             <br/>
             <button onClick={()=>this.onButtonClicked('TeleportRandomNew')}>Teleport to a Random New Scene</button>
             <button onClick={()=>this.onButtonClicked('PurchaseNewScene')}>Purchase</button>
             <button onClick={()=>this.onButtonClicked('AudioNewScene')}>Audio</button>
             <button onClick={()=>this.onButtonClicked('VideoNewScene')}>Video</button>
             <button onClick={()=>this.onButtonClicked('LiveNewScene')}>Live</button><br/>
             <br/><br/>
             </div>
             <div>
              <br/>
              <h5>
             <button onClick={()=>this.onButtonClicked('TeleportHome')}>Teleport Home</button>
             <button onClick={()=>this.onButtonClicked('UnlockHome')}>Password</button>
             <button onClick={()=>this.onButtonClicked('AudioHome')}>Audio</button>
             <button onClick={()=>this.onButtonClicked('VideoHome')}>Video</button>
             <button onClick={()=>this.onButtonClicked('LiveHome')}>Live</button><br/>
            <br/>
             <button onClick={()=>this.onButtonClicked('TeleportGlobal')}>Teleport Global</button>
             <button onClick={()=>this.onButtonClicked('AudioHome')}>Audio</button>
             <button onClick={()=>this.onButtonClicked('VideoHome')}>Video</button>
             <button onClick={()=>this.onButtonClicked('LiveHome')}>Live</button><br/>
             <br/>
             <button onClick={()=>this.onButtonClicked('TeleportFriends')}>Teleport Friends</button>
             <button onClick={()=>this.onButtonClicked('AudioHome')}>Audio</button>
             <button onClick={()=>this.onButtonClicked('VideoHome')}>Video</button>
             <button onClick={()=>this.onButtonClicked('LiveHome')}>Live</button><br/>
             <br/>
             <button onClick={()=>this.onButtonClicked('TeleportCities')}>Teleport Cities</button>
             <button onClick={()=>this.onButtonClicked('AudioHome')}>Audio</button>
             <button onClick={()=>this.onButtonClicked('VideoHome')}>Video</button>
             <button onClick={()=>this.onButtonClicked('LiveHome')}>Live</button><br/>
             <br/>
             <button onClick={()=>this.onButtonClicked('TeleportLiveEvent')}>Teleport to a Live Event</button>
             <button onClick={()=>this.onButtonClicked('PurchaseGame')}>Purchase</button>
             <button onClick={()=>this.onButtonClicked('AudioGame')}>Audio</button>
             <button onClick={()=>this.onButtonClicked('VideoGame')}>Video</button>
             <button onClick={()=>this.onButtonClicked('LiveGame')}>Live</button><br/>
             <br/>           
             <button onClick={()=>this.onButtonClicked('TeleportFlatbushAvenue')}>Teleport Down Flatbush Avenue</button>
             <button onClick={()=>this.onButtonClicked('CarFlatbushAve')}>Drive</button>
             <button onClick={()=>this.onButtonClicked('WalkingFlatbushAve')}>Walk</button>
             <button onClick={()=>this.onButtonClicked('AudioFlatbushAve')}>Audio</button>
             <button onClick={()=>this.onButtonClicked('VideoFlatbushAve')}>Video</button>
             <button onClick={()=>this.onButtonClicked('LiveFlatbushAve')}>Live</button><br/>
             <br/>
             </h5>
             </div>
{/*             <div>
             <button>Todo List: Possible Teleportations:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
            <br/><br/>
             <h5>Scenarios Ordered by High Priority:</h5>
             <br/>
             <button onClick={()=>this.onButtonClicked('TeleportationTodoScenario_1')}>Teleportation Todo List Scenario 1</button>
             <button onClick={()=>this.onButtonClicked('CarTodoScenario_1')}>Drive</button>
             <button onClick={()=>this.onButtonClicked('WalkingTodoScenario_1')}>Walk</button>
             <button onClick={()=>this.onButtonClicked('AudioTodoScenario_1e')}>Audio</button>
             <button onClick={()=>this.onButtonClicked('VideoTodoScenario_1')}>Video</button>
             <button onClick={()=>this.onButtonClicked('LiveTodoScenario_1')}>Live</button>
             <br/><br/>
             <button onClick={()=>this.onButtonClicked('TeleportationTodoScenario_2')}>Teleportation Todo List Scenario 2</button>
             <button onClick={()=>this.onButtonClicked('CarTodoScenario_2')}>Drive</button>
             <button onClick={()=>this.onButtonClicked('WalkingTodoScenario_2')}>Walk</button>
             <button onClick={()=>this.onButtonClicked('AudioTodoScenario_2')}>Audio</button>
             <button onClick={()=>this.onButtonClicked('VideoTodoScenario_2')}>Video</button>
             <button onClick={()=>this.onButtonClicked('LiveTodoScenario_2')}>Live</button>
             <br/><br/>
             <button onClick={()=>this.onButtonClicked('TeleportationTodoScenario_3')}>Teleportation Todo List Scenario 3</button>
             <button onClick={()=>this.onButtonClicked('CarTodoScenario_3')}>Drive</button>
             <button onClick={()=>this.onButtonClicked('WalkingTodoScenario_3')}>Walk</button>
             <button onClick={()=>this.onButtonClicked('AudioTodoScenario_3')}>Audio</button>
             <button onClick={()=>this.onButtonClicked('VideoTodoScenario_3')}>Video</button>
             <button onClick={()=>this.onButtonClicked('LiveTodoScenario_3')}>Live</button>
             <br/>
             </div>
*/}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
