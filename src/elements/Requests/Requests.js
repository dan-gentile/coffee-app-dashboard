import React, { useEffect, useState } from "react";
import RequestCard from "../../components/Request/Request";
import API from "../../utils/API";
import "./Requests.scss";

export default function Requests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadRequests();
  }, []);

  // Retrieves request from database and loads them on to dashboard
  const loadRequests = () => {
    API.getRequests()
      .then((res) => {
        setRequests(res.data);
      })
      .catch((err) => console.log(err));
  };
  // Deletes request by the id of the request in which the delete button is selected
  const deleteRequest = (id) => {
    let token = localStorage.getItem("token");
    API.deleteRequest(id, token)
      .then((res) => loadRequests())
      .catch((err) => console.log(err));
  };

  return (
    <div className="Requests">
      <h4>Incoming Requests</h4>
      {requests.map((item) => {
        return (
          <RequestCard
            key={item._id}
            id={item._id}
            username={item.username}
            email={item.email}
            cafe_name={item.cafe_name}
            cafe_address={item.cafe_address}
            notes={item.notes}
            deleteRequest={deleteRequest}
          />
        );
      })}
    </div>
  );
}
