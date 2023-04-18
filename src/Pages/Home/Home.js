import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

export const Container = styled.div`
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: "Poppins", sans-serif;
  height: 100vh;
  width: 100%;
`;

export const Title = styled.h1`
  color: #333;
  font-size: 36px;
  margin-bottom: 50px;
  position: relative;
  bottom: 10rem;
`;

export const ClearButton = styled.button`
  background-color: #0069d9;
  position: relative;
  bottom: 10rem;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 50px;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-color: #f44336;
  }
`;

const buttonStyles = {
  confirmButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 50px",
    fontSize: "18px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#0069d9",
    },
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 50px",
    fontSize: "18px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#0069d9",
    },
  },
};

function Home() {
  const [userName, setUserName] = useState("");

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: buttonStyles,
    buttonsStyling: true,
  });

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const currentUser = users[users.length - 1];
    if (currentUser) {
      setUserName(`${currentUser.firstName} ${currentUser.lastName}`);
    }
  }, []);

  const handleClear = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.length > 0) {
      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel it!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem("users");
            setUserName("");
            swalWithBootstrapButtons.fire(
              "Deleted!",
              "Your data has been deleted.",
              "success"
            );
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
              "Cancelled",
              "Don't worry! Your data is safe.",
              "error"
            );
          }
        });
    } else {
      swalWithBootstrapButtons.fire(
        "No data found",
        "There is no data in the local storage.",
        "info"
      );
    }
  };

  return (
    <Container>
      <Title>Welcome to the TaskMaster{userName && `, ${userName}`}!</Title>
      <ClearButton onClick={handleClear}>Clear</ClearButton>
    </Container>
  );
}

export default Home;
