import { useState } from "react";
import { Container, Row, Col, Form,Button, } from "react-bootstrap";
import Job from "./Job";
import {FaHeart, FaTrash } from 'react-icons/fa'
import { Link } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'

const MainSearch = () => {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);

  const count = useSelector((state) => state.main.count)
  const dispatch = useDispatch()
  

  const baseEndpoint = "https://strive-benchmark.herokuapp.com/api/jobs?search=developer&limit=10";

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch(baseEndpoint + query + "&limit=20");
      if (response.ok) {
        const { data } = await response.json();
        setJobs(data);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={10} className="mx-auto my-3">
          <h1 className="display-1">Remote Jobs Search</h1>
        </Col>
        <Col xs={10} className="mx-auto">
          <Form onSubmit={handleSubmit} className="d-flex">
            <Form.Control type="search" value={query} onChange={handleChange} placeholder="type and press Enter" />
        { <Button className="btn ms-3 btn-danger p-3 text-white"><Link to={"/favorites"}>
          <div className="d-flex align-items-center">
          <FaHeart className="" style={{color:"white"}}></FaHeart>
          <span style={{color:"white", marginLeft:"10px", fontSize:"1.3rem"}}>{count}</span>
          </div>
          </Link>
          </Button> }
            </Form>
        </Col>
        <Col xs={10} className="mx-auto mb-5">
          {jobs.map(jobData => (
            <>
          <div className="d-flex align-items-center" key={jobData._id} >
              <Col xs={8} className="mb-2">
              <Job data={jobData}/>
            </Col>
          <div>
             <Button className="btn ms-3 btn-success p-3 text-white h-100" onClick={() =>{
              dispatch({
                type: 'INCREMENT',
                payload: 1
              })
            }}>Aggiungi ai preferiti</Button>
            <Button className="btn ms-3 btn-danger p-3 text-white h-100" onClick={() =>{
              dispatch({
                type: "DECREMENT",
                payload: count -1,
                counterAziende : jobData,
              })
            }}><FaTrash className="text-white"></FaTrash></Button>
          </div>
          </div>
            </>  
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default MainSearch;
