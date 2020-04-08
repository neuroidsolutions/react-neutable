import React, { Component } from "react";

import ReactNeuTable from "react-neutable";

export default class App extends Component {
  render() {
    return (
      <div>
        <ReactNeuTable
          heading={[
            { name: "#", type: "number", key: "id" },
            { name: "First", type: "string", key: "fName" },
            { name: "Last", type: "string", key: "lName" },
            { name: "Name", type: "string", key: "name" }
          ]}
          rows={[
            { id: 1, fName: "Midhun", lName: "E M", name: "Midhun Em" },
            { id: 2, fName: "Arjun", lName: "xm", name: "Arjun Em" }
          ]}
        />
      </div>
    );
  }
}
