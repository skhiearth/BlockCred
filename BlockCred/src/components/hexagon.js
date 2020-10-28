import React, { Component } from "react";

const styles = ({
    hexagon: {
      width: 100,
      height: 55
    },
    hexagonInner: {
      width: 100,
      height: 55,
      backgroundColor: 'red'
    },
    hexagonAfter: {
      position: 'absolute',
      bottom: -25,
      left: 0,
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderLeftWidth: 50,
      borderLeftColor: 'transparent',
      borderRightWidth: 50,
      borderRightColor: 'transparent',
      borderTopWidth: 25,
      borderTopColor: 'red'
    },
    hexagonBefore: {
      position: 'absolute',
      top: -25,
      left: 0,
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderLeftWidth: 50,
      borderLeftColor: 'transparent',
      borderRightWidth: 50,
      borderRightColor: 'transparent',
      borderBottomWidth: 25,
      borderBottomColor: 'red'
  
    }
  });

  function Hexagon(){
    return (
        <div style={styles.hexagon}>
          <div style={styles.hexagonInner} />
          <div style={styles.hexagonBefore} />
          <div style={styles.hexagonAfter} />
        </div>
    );
  }

  export default Hexagon;