import React, { Component } from "react";
import styles from "./styles/popUp.module.css";
export default class PopUp extends Component {
  handleClick = () => {
   this.props.toggle();
  };
render() {
  return (
   <div className="modal">
     <div className="modal_content">
     <span className="close" onClick={this.handleClick}>&times;    </span>
     <p>Spoiler Content Ahead!</p>
    </div>
   </div>
  );
 }
}