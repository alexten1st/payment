import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";

export default function CardFields() {
  const [validThruState, setvalidThruState] = useState({
    valid: true,
    number: "",
  });
  const [amountState, setAmountState] = useState({
    valid: true,
    number: "",
  });
  const [validNumberState, setValidNumberState] = useState({
    valid: true,
    number: "",
  });
  const [validCVVState, setValidCVVState] = useState({
    valid: true,
    number: "",
  });
  function handleChangeValid(event) {
    const value = event.target.value;
    setvalidThruState((prevState) => {
      const number = prevState.number;
      let valid =
        isNaN(Number(value.replace("/", ""))) ||
        isNaN(Number(number.replace("/", ""))) ||
        value.length <= 4;
      if (number.length === 2 && value.length > 2) {
        return { number: value.slice(0, 2) + "/" + value.slice(2), valid };
      }
      if (number.length === 2 && value.length === 2) {
        return { number: value, valid };
      }
      if (number.length > 4 && value.length > 4) {
        return { number, valid };
      }
      return { number: value, valid };
    });
  }
  function handleChangeAmount(event) {
    const value = event.target.value;
    setAmountState((prevState) => {
      const number = prevState.number;
      let valid = isNaN(Number(value)) || isNaN(Number(number));
      return { number: value, valid };
    });
  }
  function handleChangeNuber(event) {
    const value = event.target.value;
    setValidNumberState((prevState) => {
      const number = prevState.number;
      let valid =
        isNaN(Number(value)) || isNaN(Number(number)) || value.length <= 15;
      if (number.length > 15 && value.length > 15) {
        return { number, valid };
      }
      return { number: value, valid };
    });
  }
  function handleChangeCVV(event) {
    const value = event.target.value;
    setValidCVVState((prevState) => {
      const number = prevState.number;
      let valid =
        isNaN(Number(value)) || isNaN(Number(number)) || value.length <= 2;
      if (number.length > 2 && value.length > 2) {
        return { number, valid };
      }
      return { number: value, valid };
    });
  }
  function sendRequest(){
    fetch("http://localhost:4000/payment", {method:"post", headers:{
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      cardNumber: validNumberState.number,
      expDate: validThruState.number,
      cvv: validCVVState.number,
      amount: amountState.number,
    })
  })
    .then(res => res.text())
    .then(data => {
      if (data){
        setAmountState({
          valid: true,
          number: "",
        })
        setvalidThruState({
          valid: true,
          number: "",
        })
        setValidNumberState({
          valid: true,
          number: "",
        })
        setValidCVVState({
          valid: true,
          number: "",
        })
      }
     })
}
  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            error={validNumberState.valid}
            fullWidth
            id="cardNumber"
            label="Card number"
            onChange={handleChangeNuber}
            helperText={
              validNumberState.valid ? "Incorrect entry or empty." : ""
            }
            value={validNumberState.number}
          />
        </div>
        <div>
          <TextField
            error={validThruState.valid}
            id="validThru"
            label="Valid thru"
            value={validThruState.number}
            variant="standard"
            onChange={handleChangeValid}
            helperText={validThruState.valid ? "Incorrect entry or empty." : ""}
          />
          <TextField
            error={validCVVState.valid}
            id="cvV"
            label="CVV"
            variant="filled"
            size="small"
            onChange={handleChangeCVV}
            value={validCVVState.number}
            helperText={validCVVState.valid ? "Incorrect entry or empty." : ""}
          />
        </div>
        <div>
          <TextField
            error={amountState.valid}
            id="amount"
            label="Amount"
            helperText="Incorrect entry."
            variant="standard"
            onChange={handleChangeAmount}
            value={amountState.number}
          />
        </div>
      </Box>
      <Button
        disabled={
          validCVVState.valid || validThruState.valid || validNumberState.valid || amountState.valid
        }
        onClick ={sendRequest}
      >
        Оплатить
      </Button>
    </>
  );
}
