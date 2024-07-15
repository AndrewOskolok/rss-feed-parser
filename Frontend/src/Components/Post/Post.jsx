import * as React from "react";
import moment from "moment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Container from "@mui/material/Container";
import axios from "../../helpers/axios";

const Post = () => {
  const [posts, setPosts] = React.useState([]);
  const [totalPosts, setTotalPosts] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    axios.get("/posts", { params: { page, rowsPerPage } }).then(({ data }) => {
      setPosts(data.rows);
      setTotalPosts(data.totalRows);
    });
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  console.log("posts", posts[0]);
  return (
    <Container
      maxWidth="lg"
      style={{ marginTop: "100px", marginBottom: "50px" }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Categories</TableCell>
              <TableCell>Writer</TableCell>
              <TableCell>Published at</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {posts.map((row) => (
              <TableRow
                key={row.guid}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <a
                    href={row.link}
                    target="_blank"
                    style={{ color: "black" }}
                    rel="noreferrer"
                  >
                    {row.title}
                  </a>
                </TableCell>
                <TableCell>{row.categories}</TableCell>
                <TableCell>{row.creator}</TableCell>
                <TableCell>
                  {moment(row.pubDate).format("MM/DD/YYYY HH:mm")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={totalPosts}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};

export default Post;
