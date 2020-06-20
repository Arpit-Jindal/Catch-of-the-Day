//  Inventory without Login Implemented
/*
// These are your firebase security rules - put them in the "Security & Rules" tab of your database
{
  "rules": {
    // won't let people delete an existing room
    ".write": "!data.exists()",
    ".read": true,
      "$room": {
      // only the store owner can edit the data
      ".write":
        "auth != null && (!data.exists() || data.child('owner').val() === auth.uid)",
      ".read": true
    }
  }
}
*/
// import React from "react";
// import PropTypes from "prop-types";
// import AddFishForm from "./AddFishForm";
// import EditFishForm from "./EditFishForm";

// class Inventory extends React.Component {
//   static propTypes = {
//     fishes: PropTypes.object,
//     updateFish: PropTypes.func,
//     deleteFish: PropTypes.func,
//     addFish: PropTypes.func,
//     loadSampleFishes: PropTypes.func,
//   };

//   render() {
//     return (
//       <div className="inventory">
//         <h2>Inventory</h2>
//         {Object.keys(this.props.fishes).map((key) => (
//           <EditFishForm
//             key={key}
//             index={key}
//             fish={this.props.fishes[key]}
//             updateFish={this.props.updateFish}
//             deleteFish={this.props.deleteFish}
//           />
//         ))}
//         <AddFishForm addFish={this.props.addFish} />
//         <button onClick={this.props.loadSampleFishes}>
//           Load Sample Fishes
//         </button>
//       </div>
//     );
//   }
// }

// export default Inventory;

import React from "react";
import PropTypes from "prop-types";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import firebase from "firebase";
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    addFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    storeId: PropTypes.string,
  };

  state = {
    uid: null,
    owner: null,
    displayName: null,
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async (authData) => {
    //1. Look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, { context: this });
    //2. Claim it if there is no owner
    if (!store.owner) {
      //save it as your own
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid,
      });
      await base.post(`${this.props.storeId}/name`, {
        data: authData.user.displayName,
      });
    }
    //3. Set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
      displayName: store.name || authData.user.displayName,
    });
  };

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };
  handleGuestLogin = () => {
    this.props.guestLogin();
    this.setState({
      uid: "uXLdF3Y38IO5AK3FUzvUdE4oFrL2",
      owner: "uXLdF3Y38IO5AK3FUzvUdE4oFrL2",
      displayName: "Guest",
    });
  };
  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>;
    //1. Check if they are logged in
    if (!this.state.uid)
      return (
        <div>
          <Login
            storeId={this.props.storeId}
            authenticate={this.authenticate}
            Email={this.Email}
          />
          <button
            // onClick={() => { this.props.guestLogin();}}
            onClick={this.handleGuestLogin}
          >
            LOGIN AS GUEST
          </button>
          &nbsp;
          <button
            onClick={() => {
              this.props.goToStorePicker();
            }}
          >
            GO TO STORE PICKER
          </button>
        </div>
      );
    //2. Check if current logged in user is not the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry there is already an owner to this store :(</p>
          {logout}
        </div>
      );
    }
    //3. They must be the owner so render the inventory
    return (
      <div className="Inventory">
        <h2>Inventory</h2>
        <p>
          Welcome <strong>{this.state.displayName}!</strong>
        </p>
        {logout}
        {Object.keys(this.props.fishes).map((key) => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
