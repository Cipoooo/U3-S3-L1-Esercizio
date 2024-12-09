import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useSelector } from "react-redux";

const Favorites = () =>{

   const Aziende = useSelector((state) => state.main.aziende)

   return(
    <>
    {Aziende.lenght > 0 && Aziende.map((azienda) =>{
    <ListGroup>
    <ListGroupItem>{azienda.title}</ListGroupItem>
   </ListGroup>
   })
   }
   </>
  );
};
export default Favorites;