//import axios from 'axios';
//import { setAlert } from './alert';
//import { GET_PROFILE, PROFILE_ERROR } from './types';
import React, { Fragment, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const boardSetup = (userObj) => {
  let b_column = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
  let i_column = ["16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"];
  let n_column = ["31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];
  let g_column = ["46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"];
  let o_column = ["61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75"];

  let b_cellIdNames = ["b1", "b2", "b3", "b4", "b5"];
  let i_cellIdNames = ["i1", "i2", "i3", "i4", "i5"];
  let n_cellIdNames = ["n1", "n2", "n4", "n5"];
  let g_cellIdNames = ["g1", "g2", "g3", "g4", "g5"];
  let o_cellIdNames = ["o1", "o2", "o3", "o4", "o5"];

  let cellValues = [];
  //let cardNumbers = userObj.user.cardNumbers;
  let user = userObj.user.user
  let cardNumbersKey = "cardNumbers";
  let userObjParsed  = JSON.parse(JSON.stringify(user));

  console.log(" ");
  console.log(" ");
  console.log(" ");
  console.log("user: " + typeof user);
  console.log("user == null " + user == null );
  console.log("user != null " + user != null );
  // console.log("userObjParsed[cardNumbersKey]: " + userObjParsed[cardNumbersKey]);
  console.log(user);
  let key;
  for (key in user) {
    if(key == cardNumbersKey){
      console.log("------> Found cardNumbers key");
    }
    console.log("key: " + key);
    console.log("typeof key: " + typeof key);
    console.log("user[key]: " + user[key]);
    console.log(" ");
    console.log(" ");
    console.log(" ");
}
  //console.log("user: " + JSON.stringify(user.user.user));
  
  //console.log("Card Numbers: " + cardNumbers);
  console.log(" ");
  console.log(" ");
  console.log(" ");
  try {
    // localStorage.setItem(
    //   'b_cellIdNames',
    //   'i_cellIdNames',
    //   'n_cellIdNames',
    //   'g_cellIdNames',
    //   'o_cellIdNames',
    //   JSON.stringify(b_cellIdNames, i_cellIdNames, n_cellIdNames, g_cellIdNames, o_cellIdNames)
    // );

    // 1) Loop through each cells column and fill in with a valid random number
    function fill_b_column() {
      for (var i = 0; i < b_cellIdNames.length; i++) {
        let index = Math.floor(Math.random() * b_column.length);
        let randomString = b_column[index];
        let element = document.getElementById(b_cellIdNames[i]);
        b_column.splice(index, 1);
        element.innerHTML = randomString;
        cellValues[i] = randomString;
      }
    }

    function fill_i_column() {
      for (var i = 0; i < i_cellIdNames.length; i++) {
        let index = Math.floor(Math.random() * i_column.length);
        let randomString = i_column[index];
        let element = document.getElementById(i_cellIdNames[i]);
        i_column.splice(index, 1);
        element.innerHTML = randomString;
        cellValues[i] = randomString;
      }
    }

    function fill_n_column() {
      for (var i = 0; i < n_cellIdNames.length; i++) {
        let index = Math.floor(Math.random() * n_column.length);
        let randomString = n_column[index];
        let element = document.getElementById(n_cellIdNames[i]);
        n_column.splice(index, 1);
        element.innerHTML = randomString;
        cellValues[i] = randomString;
      }
    }

    function fill_g_column() {
      for (var i = 0; i < g_cellIdNames.length; i++) {
        let index = Math.floor(Math.random() * g_column.length);
        let randomString = g_column[index];
        let element = document.getElementById(g_cellIdNames[i]);
        g_column.splice(index, 1);
        element.innerHTML = randomString;
        cellValues[i] = randomString;
      }
    }

    function fill_o_column() {
      for (var i = 0; i < o_cellIdNames.length; i++) {
        let index = Math.floor(Math.random() * o_column.length);
        let randomString = o_column[index];
        let element = document.getElementById(o_cellIdNames[i]);
        o_column.splice(index, 1);
        element.innerHTML = randomString;
        cellValues[i] = randomString;
      }
    }
    // fill_b_column();
    // fill_i_column();
    // fill_n_column();
    // fill_g_column();
    // fill_o_column();

  } catch (err) {
    console.error(err.message);
  }

  function markCell(cellValue){
    console.log("Marking... " + cellValue);
  }
}

export default boardSetup;

